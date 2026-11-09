"""Bake every area into one HTML file for use without a server or a network.

  python3 make_offline.py            # kering.html + out/spots/*.json -> kering-offline.html

The result opens with a double-click. Satellite areas, outlines, the map and the planner work
offline; the sharp Maxar layer streams from Esri and needs a connection (its tiles are not stored).
"""
import json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
html = open(os.path.join(ROOT, "kering.html"), encoding="utf-8").read()
spots = {}
for f in sorted(os.listdir(os.path.join(ROOT, "out/spots"))):
    if f.endswith(".json") and f != "pecatu.json":  # Pecatu is already inside the page
        spots[f[:-5]] = json.load(open(os.path.join(ROOT, "out/spots", f)))
payload = json.dumps(spots, separators=(",", ":")).replace("</", "<\\/")
tag = f"<script>window.__KERING_SPOTS__={payload};</script>"
# before the app's module script, so the data is there when the app starts
html, n = re.subn(r'(<script type="module")', lambda m: tag + "\n" + m.group(1), html, count=1)
assert n == 1, "app script not found"
out = os.path.join(ROOT, "kering-offline.html")
open(out, "w", encoding="utf-8").write(html)
print(out, round(len(html) / 1e6, 1), "MB,", len(spots) + 1, "areas")
