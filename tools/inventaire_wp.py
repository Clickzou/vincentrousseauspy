#!/usr/bin/env python3
"""Inventaire d'un dump WordPress issu d'une archive .wpress (All-in-One WP Migration).

Lit database.sql en streaming et produit :
  - la liste des contenus publies (pages, articles) avec slug, titre, date, statut
  - les metadonnees Yoast associees (title, metadesc, canonical, noindex)
  - un reperage des tables contenant des donnees personnelles

Usage : python inventaire_wp.py <database.sql> <dossier_de_sortie>
"""
import csv
import io
import json
import os
import re
import sys

PREFIX = "SERVMASK_PREFIX_"

# Colonnes de wp_posts dans l'ordre du schema WordPress standard.
POSTS_COLS = [
    "ID", "post_author", "post_date", "post_date_gmt", "post_content", "post_title",
    "post_excerpt", "post_status", "comment_status", "ping_status", "post_password",
    "post_name", "to_ping", "pinged", "post_modified", "post_modified_gmt",
    "post_content_filtered", "post_parent", "guid", "menu_order", "post_type",
    "post_mime_type", "comment_count",
]
POSTMETA_COLS = ["meta_id", "post_id", "meta_key", "meta_value"]

YOAST_KEYS = {
    "_yoast_wpseo_title": "yoast_title",
    "_yoast_wpseo_metadesc": "yoast_metadesc",
    "_yoast_wpseo_canonical": "yoast_canonical",
    "_yoast_wpseo_meta-robots-noindex": "yoast_noindex",
    "_yoast_wpseo_focuskw": "yoast_focus_kw",
}


def split_values(blob):
    """Decoupe le contenu d'un INSERT ... VALUES en tuples, puis en champs.

    Gere les quotes simples, les echappements backslash et les NULL. Ecrit
    a la main parce qu'aucun parseur CSV ne gere correctement le SQL MySQL.
    """
    rows, field, row = [], [], []
    in_str = False
    esc = False
    depth = 0
    buf = []
    for ch in blob:
        if in_str:
            if esc:
                buf.append(ch)
                esc = False
            elif ch == "\\":
                buf.append(ch)
                esc = True
            elif ch == "'":
                in_str = False
            else:
                buf.append(ch)
            continue
        if ch == "'":
            in_str = True
            continue
        if ch == "(":
            depth += 1
            if depth == 1:
                row, buf = [], []
                continue
        if ch == ")":
            depth -= 1
            if depth == 0:
                row.append("".join(buf).strip())
                rows.append(row)
                row, buf = [], []
                continue
        if depth == 1 and ch == ",":
            row.append("".join(buf).strip())
            buf = []
            continue
        if depth >= 1:
            buf.append(ch)
    return rows


# Table d'echappement MySQL (manuel MySQL, section String Literals).
_MYSQL_ESC = {"0": "\0", "b": "\b", "n": "\n", "r": "\r", "t": "\t",
              "Z": "\x1a", "\\": "\\", "'": "'", '"': '"'}


def unescape(v):
    """Desechappe une valeur SQL en UNE SEULE passe.

    Indispensable : des replace() successifs corrompent toute donnee contenant
    elle-meme des echappements. Dans le JSON d'Elementor, la sequence SQL \\n
    represente les deux caracteres JSON \\ et n, pas un saut de ligne reel :
    la convertir en newline casse le document.
    """
    if v == "NULL":
        return None
    if "\\" not in v:
        return v
    out = []
    i, n = 0, len(v)
    while i < n:
        ch = v[i]
        if ch == "\\" and i + 1 < n:
            nxt = v[i + 1]
            if nxt in _MYSQL_ESC:
                out.append(_MYSQL_ESC[nxt])
            else:
                # Sequence non reconnue : MySQL rend le caractere tel quel, mais
                # on conserve l'antislash car il appartient souvent aux donnees
                # (echappements JSON \/ et \uXXXX du contenu Elementor).
                out.append("\\" + nxt)
            i += 2
        else:
            out.append(ch)
            i += 1
    return "".join(out)


def iter_inserts(path, table):
    """Rend les tuples de valeurs des INSERT visant `table`, en streaming."""
    needle = "INSERT INTO `%s%s`" % (PREFIX, table)
    with io.open(path, encoding="utf-8", errors="replace") as fh:
        buf = ""
        for line in fh:
            if buf:
                buf += line
            elif line.startswith(needle):
                buf = line
            else:
                continue
            # Une instruction se termine par ");" en fin de ligne.
            if buf.rstrip().endswith(");"):
                start = buf.index("VALUES") + len("VALUES")
                for row in split_values(buf[start:]):
                    yield [unescape(v) for v in row]
                buf = ""


def main(sql_path, out_dir):
    os.makedirs(out_dir, exist_ok=True)

    # ---- 1. posts ----
    posts = {}
    type_counts = {}
    for row in iter_inserts(sql_path, "posts"):
        if len(row) != len(POSTS_COLS):
            continue
        p = dict(zip(POSTS_COLS, row))
        key = (p["post_type"], p["post_status"])
        type_counts[key] = type_counts.get(key, 0) + 1
        if p["post_type"] in ("attachment", "revision", "customize_changeset",
                              "oembed_cache", "custom_css", "wp_global_styles"):
            continue
        posts[p["ID"]] = {
            "id": p["ID"],
            "type": p["post_type"],
            "status": p["post_status"],
            "slug": p["post_name"],
            "title": p["post_title"],
            "date": p["post_date"],
            "modified": p["post_modified"],
            "parent": p["post_parent"],
            "guid": p["guid"],
            "content_len": len(p["post_content"] or ""),
            "has_elementor": False,
            "elementor_len": 0,
        }

    # ---- 2. postmeta : Yoast + Elementor ----
    for row in iter_inserts(sql_path, "postmeta"):
        if len(row) != len(POSTMETA_COLS):
            continue
        m = dict(zip(POSTMETA_COLS, row))
        post = posts.get(m["post_id"])
        if not post:
            continue
        k = m["meta_key"]
        if k in YOAST_KEYS:
            post[YOAST_KEYS[k]] = m["meta_value"]
        elif k == "_elementor_data":
            post["has_elementor"] = True
            post["elementor_len"] = len(m["meta_value"] or "")

    # ---- 3. sorties ----
    ordered = sorted(posts.values(),
                     key=lambda x: (x["type"], x["status"], x["slug"] or ""))

    fields = ["id", "type", "status", "slug", "title", "date", "modified",
              "content_len", "has_elementor", "elementor_len",
              "yoast_title", "yoast_metadesc", "yoast_canonical",
              "yoast_noindex", "yoast_focus_kw", "guid"]
    csv_path = os.path.join(out_dir, "inventaire-contenus.csv")
    with io.open(csv_path, "w", encoding="utf-8-sig", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=fields, extrasaction="ignore")
        w.writeheader()
        for p in ordered:
            w.writerow(p)

    json_path = os.path.join(out_dir, "inventaire-contenus.json")
    io.open(json_path, "w", encoding="utf-8").write(
        json.dumps(ordered, ensure_ascii=False, indent=2))

    # ---- 4. resume console ----
    print("=== VOLUMETRIE PAR TYPE / STATUT (avant filtrage) ===")
    for (t, s), n in sorted(type_counts.items(), key=lambda x: -x[1]):
        print("  %-28s %-12s %6d" % (t, s, n))

    print("\n=== CONTENUS RETENUS : %d ===" % len(ordered))
    by_type = {}
    for p in ordered:
        by_type.setdefault((p["type"], p["status"]), []).append(p)
    for k in sorted(by_type):
        print("  %-20s %-10s %4d" % (k[0], k[1], len(by_type[k])))

    pub = [p for p in ordered if p["status"] == "publish"]
    print("\n=== %d CONTENUS PUBLIES ===" % len(pub))
    for p in sorted(pub, key=lambda x: (x["type"], x["slug"] or "")):
        flag = "ELEM" if p["has_elementor"] else "    "
        yo = "Y" if p.get("yoast_title") else "-"
        print("  [%s][%s] %-9s /%-42s %s" % (
            flag, yo, p["type"], (p["slug"] or "")[:42], (p["title"] or "")[:45]))

    print("\nEcrit : %s" % csv_path)
    print("Ecrit : %s" % json_path)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
