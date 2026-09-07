#!/usr/bin/env python3
"""Extracteur d'archives .wpress (All-in-One WP Migration).

Format : suite de blocs [header 4377 o][contenu du fichier].
Header = nom(255) + taille(14) + mtime(12) + chemin(4096), champs termines par \\x00.

ATTENTION : les versions recentes d'AI1WM collent un marqueur hexadecimal de
8 caracteres a la FIN du champ chemin, apres le padding de zeros. Il faut donc
couper au PREMIER \\x00 (split) et surtout PAS avec rstrip, sinon le chemin
recupere contient des nuls incorpores et os.makedirs echoue.

Un header entierement nul marque la fin de l'archive.

Usage : python extract_wpress.py archive.wpress [dossier_de_sortie]
"""
import os
import sys

HEADER_SIZE = 4377
FIELDS = ((0, 255), (255, 269), (269, 281), (281, 4377))  # name, size, mtime, prefix


def _field(header, start, end):
    return header[start:end].split(b"\x00")[0].decode("utf-8", "replace")


def extract(archive_path, out_dir):
    total = 0
    skipped = 0
    with open(archive_path, "rb") as fh:
        while True:
            header = fh.read(HEADER_SIZE)
            if len(header) < HEADER_SIZE or header == b"\x00" * HEADER_SIZE:
                break
            name, size, _mtime, prefix = (_field(header, s, e) for s, e in FIELDS)
            size = int(size)
            if not name:
                # Entree sans nom de fichier (marqueur de dossier presente par
                # certaines versions d'AI1WM) : on saute son contenu et on continue.
                skipped += 1
                while size:
                    chunk = fh.read(min(1 << 20, size))
                    if not chunk:
                        break
                    size -= len(chunk)
                continue
            dest = os.path.join(out_dir, prefix.replace("\\", "/"), name)
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            with open(dest, "wb") as out:
                remaining = size
                while remaining:
                    chunk = fh.read(min(1 << 20, remaining))
                    if not chunk:
                        raise EOFError("archive tronquee sur %s" % dest)
                    out.write(chunk)
                    remaining -= len(chunk)
            total += 1
            if total % 1000 == 0:
                print("  %d fichiers..." % total, flush=True)
    if skipped:
        print("  (%d entrees sans nom ignorees)" % skipped)
    return total


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = sys.argv[1]
    dst = sys.argv[2] if len(sys.argv) > 2 else os.path.splitext(src)[0] + "_extracted"
    os.makedirs(dst, exist_ok=True)
    print("Extraction de %s -> %s" % (src, dst))
    print("Termine : %d fichiers extraits." % extract(src, dst))
