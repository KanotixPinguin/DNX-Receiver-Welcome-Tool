#!/bin/bash
# DNX Welcome-Tool v1.1: baut dnx_welcome.js (v4) in die Receiver-init.js ein
# - ersetzt vorhandene v2/v3-Module chirurgisch, haengt an, falls kein Welcome da ist
# - Backup + node --check + Rollback
set -u
ZIEL="${1:-/opt/owrx-docker/plugins/receiver/init.js}"
HERE="$(cd "$(dirname "$0")" && pwd)"
SRC="$HERE/dnx_welcome.js"
[ -f "$SRC" ] || { echo "FEHLER: dnx_welcome.js liegt nicht neben dem Skript"; exit 2; }
[ -f "$ZIEL" ] || { echo "FEHLER: ZIEL nicht gefunden: $ZIEL"; exit 2; }
if grep -q "dnx-welcome v4" "$ZIEL"; then echo "Welcome v4 schon vorhanden - nichts zu tun"; exit 0; fi
BAK="$ZIEL.bak-$(date +%Y%m%d-%H%M%S)"
cp -a "$ZIEL" "$BAK"
TMP="$(mktemp "${TMPDIR:-/tmp}/dnxwelcome.XXXXXX.js")"
python3 - "$ZIEL" "$TMP" "$SRC" <<'PY'
import re, sys
ziel, tmp, src = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(ziel, encoding="utf-8", errors="replace").read()
neu = open(src, encoding="utf-8").read()
m = re.search(r"/\* dnx-welcome v[23]:.*?\n\}\)\(\);\n", s, re.S)
if m:
    s = s[:m.start()] + neu + s[m.end():]
else:
    s = s + "\n" + neu
open(tmp, "w", encoding="utf-8").write(s)
PY
if ! node --check "$TMP"; then
  echo "SYNTAXFEHLER - ZIEL bleibt unveraendert"
  rm -f "$TMP"; exit 4
fi
cp -a "$TMP" "$ZIEL"; rm -f "$TMP"
echo "Welcome v4 eingebaut | Backup: $BAK"
