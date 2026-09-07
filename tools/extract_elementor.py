#!/usr/bin/env python3
"""Extrait le contenu textuel reel des pages Elementor d'un dump WordPress.

Le contenu des pages construites avec Elementor n'est PAS dans post_content mais
dans postmeta._elementor_data, sous forme d'un arbre JSON de widgets. Ce script
parcourt cet arbre et restitue le texte de chaque page en Markdown lisible.

Usage : python extract_elementor.py <database.sql> <dossier_de_sortie>
"""
import html
import io
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from inventaire_wp import iter_inserts, POSTS_COLS, POSTMETA_COLS

# Cles de settings Elementor qui portent du texte visible, par ordre de priorite.
TEXT_KEYS = [
    "title", "editor", "text", "description_text", "title_text", "sub_title",
    "heading", "content", "tab_title", "tab_content", "item_title",
    "item_description", "caption", "html", "shortcode", "button_text",
    "form_name", "email_subject", "message",
]
LINK_KEYS = ["link", "url", "website_link", "button_link"]


def strip_html(raw):
    if not raw:
        return ""
    raw = re.sub(r"(?is)<(script|style).*?</\1>", " ", raw)
    raw = re.sub(r"(?i)<br\s*/?>", "\n", raw)
    raw = re.sub(r"(?i)</(p|div|li|h[1-6]|tr)>", "\n", raw)
    raw = re.sub(r"(?i)<li[^>]*>", "- ", raw)
    raw = re.sub(r"<[^>]+>", " ", raw)
    raw = html.unescape(raw)
    raw = raw.replace(" ", " ")
    raw = re.sub(r"[ \t]+", " ", raw)
    raw = re.sub(r"\n\s*\n\s*\n+", "\n\n", raw)
    return raw.strip()


def walk(node, out, depth=0):
    """Parcourt recursivement l'arbre Elementor et collecte les textes."""
    if isinstance(node, list):
        for n in node:
            walk(n, out, depth)
        return
    if not isinstance(node, dict):
        return

    settings = node.get("settings") or {}
    widget = node.get("widgetType") or node.get("elType") or ""

    if isinstance(settings, dict):
        for key in TEXT_KEYS:
            val = settings.get(key)
            if isinstance(val, str) and val.strip():
                txt = strip_html(val)
                if txt and len(txt) > 1:
                    out.append(("%s.%s" % (widget, key), txt))
        # Listes d'items (accordeons, onglets, icon-list, FAQ...)
        for key, val in settings.items():
            if isinstance(val, list):
                for item in val:
                    if isinstance(item, dict):
                        for k2, v2 in item.items():
                            if isinstance(v2, str) and v2.strip() and (
                                    k2 in TEXT_KEYS or "title" in k2 or "text" in k2
                                    or "content" in k2 or "description" in k2):
                                txt = strip_html(v2)
                                if txt and len(txt) > 1:
                                    out.append(("%s.%s[]" % (widget, k2), txt))
        for key in LINK_KEYS:
            val = settings.get(key)
            if isinstance(val, dict) and val.get("url"):
                out.append(("%s.lien" % widget, val["url"]))

    for child in (node.get("elements") or []):
        walk(child, out, depth + 1)


def main(sql_path, out_dir):
    os.makedirs(out_dir, exist_ok=True)

    # 1. Recuperer les pages (id -> slug/titre)
    pages = {}
    for row in iter_inserts(sql_path, "posts"):
        if len(row) != len(POSTS_COLS):
            continue
        p = dict(zip(POSTS_COLS, row))
        if p["post_type"] == "page" and p["post_status"] == "publish":
            pages[p["ID"]] = {"slug": p["post_name"], "title": p["post_title"],
                              "content": p["post_content"] or ""}

    # 2. Recuperer _elementor_data
    for row in iter_inserts(sql_path, "postmeta"):
        if len(row) != len(POSTMETA_COLS):
            continue
        m = dict(zip(POSTMETA_COLS, row))
        if m["meta_key"] == "_elementor_data" and m["post_id"] in pages:
            pages[m["post_id"]]["elementor"] = m["meta_value"]

    # 3. Produire un fichier par page
    index = []
    for pid, p in sorted(pages.items(), key=lambda x: x[1]["slug"] or ""):
        blocks = []
        raw = p.get("elementor")
        if raw:
            try:
                tree = json.loads(raw)
                walk(tree, blocks)
            except (ValueError, TypeError) as exc:
                blocks.append(("ERREUR", "JSON illisible : %s" % exc))
        if not blocks and p["content"]:
            blocks.append(("post_content", strip_html(p["content"])))

        # Dedupliquer en conservant l'ordre
        seen, uniq = set(), []
        for src, txt in blocks:
            if txt not in seen:
                seen.add(txt)
                uniq.append((src, txt))

        name = "%s.md" % (p["slug"] or pid)
        path = os.path.join(out_dir, name)
        with io.open(path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write("# %s\n\n" % html.unescape(p["title"] or ""))
            fh.write("- **slug** : `/%s/`\n- **post_id** : %s\n- **blocs** : %d\n\n---\n\n"
                     % (p["slug"], pid, len(uniq)))
            for src, txt in uniq:
                fh.write("<!-- %s -->\n%s\n\n" % (src, txt))
        total = sum(len(t) for _, t in uniq)
        index.append((p["slug"], len(uniq), total, name))
        print("  %-58s %3d blocs  %6d car." % ("/%s/" % p["slug"], len(uniq), total))

    print("\n%d pages ecrites dans %s" % (len(index), out_dir))


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
