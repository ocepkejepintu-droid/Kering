"""Change map and frame bundle for the satellite concepts page.

Reads ../out/spots/pecatu.json (Pecatu and Ungasan frames) and a dry-season rain dict, writes data.json:
per-pixel code 254 = sea, 255 = land without lasting change, k = first frame index where the
pixel turned bright (roof, concrete, cleared limestone) and stayed bright in most later frames,
including at least one later frame. Brightness is normalised per frame to the median land
luminance so a hazy year does not light up the whole scene. Then:
  python3 -c "..."  # inject data.json into satellite.template.html (see README)
"""
import base64, io, json, sys
import numpy as np
from PIL import Image
from scipy import ndimage

src = json.load(open("../out/spots/pecatu.json"))
dry = json.load(open(sys.argv[1])) if len(sys.argv) > 1 else {}
frames = [{"year": y["year"], "date": y["date"], "img": y["img"]} for y in src["frames"]]
A = np.stack([np.asarray(Image.open(io.BytesIO(base64.b64decode(f["img"].split(",")[1]))).convert("RGB")).astype(float) for f in frames])
R, G, B = A[..., 0], A[..., 1], A[..., 2]
sea = ndimage.binary_dilation(((B > R + 12) & (R < 70)).mean(0) > 0.3, iterations=4)
land = ~sea
lum = A.sum(-1)
med = np.array([np.median(l[land]) for l in lum])
target = float(np.median(med))
bright = (lum * (target / med)[:, None, None] > 470) & land & (np.abs(R - B) < 55)
n = len(A)
base = bright[:2].any(0)
first = np.full(lum.shape[1:], -1)
for k in range(2, n - 1):
    hit = bright[k] & (bright[k:].mean(0) >= 0.75) & bright[k + 1:].any(0) & ~base & (first < 0)
    first[hit] = k
lab, nl = ndimage.label(first >= 0)
sizes = ndimage.sum(np.ones_like(lab), lab, range(1, nl + 1))
first[~np.isin(lab, np.where(sizes >= 5)[0] + 1)] = -1
code = np.where(sea, 254, np.where(first >= 0, first, 255)).astype(np.uint8)
h, w = code.shape
json.dump({"label": src["label"], "bbox": src["bbox"], "frames": frames, "dryRain": dry,
           "change": {"w": int(w), "h": int(h), "b64": base64.b64encode(code.tobytes()).decode()},
           "norm": {"median": med.round(1).tolist(), "target": target}}, open("data.json", "w"), separators=(",", ":"))
