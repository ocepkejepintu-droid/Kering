"""Sharp imagery index: which Esri World Imagery Wayback releases show new imagery over each area.

Esri publishes every past version of its World Imagery basemap (Maxar/DigitalGlobe, about
0.3-0.5 m over Bali) as "Wayback" releases. Most releases repeat older imagery for a given place,
so for each area this script fetches the zoom-17 tile at the area centre from every release,
keeps the releases whose tile differs from the previous one, and reads each capture's date,
sensor and resolution from the release's metadata service.

Writes ../out/wayback.json. Tiles are not stored: the app streams them from Esri at view time,
with attribution. Check Esri's terms of use for your use case (attribution is required; commercial
use may need an ArcGIS licence).
"""
import base64, hashlib, io, json, math, os, urllib.parse, urllib.request
import concurrent.futures as cf
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
CONFIG = "https://s3-us-west-2.amazonaws.com/config.maptiles.arcgis.com/waybackconfig.json"
SPOTS = json.load(open(os.path.join(HERE, "spots.json")))


def tile_xy(lon, lat, z):
    n = 2 ** z
    return int((lon + 180) / 360 * n), int((1 - math.log(math.tan(math.radians(lat)) + 1 / math.cos(math.radians(lat))) / math.pi) / 2 * n)


def fetch(url, timeout=30, tries=3):
    for _ in range(tries):
        try:
            return urllib.request.urlopen(url, timeout=timeout).read()
        except Exception:
            pass
    return None


def capture(meta_url, lon, lat):
    q = urllib.parse.urlencode({"geometry": f"{lon},{lat}", "geometryType": "esriGeometryPoint", "inSR": 4326,
                                "spatialRel": "esriSpatialRelIntersects", "outFields": "SRC_DATE,SRC_RES,SRC_DESC,NICE_DESC",
                                "returnGeometry": "false", "f": "json"})
    for layer in range(0, 14):
        b = fetch(f"{meta_url}/{layer}/query?{q}", timeout=20, tries=1)
        if not b:
            continue
        feats = json.loads(b).get("features")
        if feats:
            a = feats[0]["attributes"]
            d = str(a.get("SRC_DATE") or "")
            return {"captured": f"{d[:4]}-{d[4:6]}-{d[6:8]}" if len(d) == 8 else None,
                    "res": a.get("SRC_RES"), "sensor": a.get("SRC_DESC"), "provider": a.get("NICE_DESC")}
    return {}


def hotspot(area_id, bbox):
    """Where the lens opens: the 24 px cell of the 480 x 339 frame with the most dated buildings."""
    d = json.load(open(os.path.join(HERE, f"../out/spots/{area_id}.json")))["buildings"]
    a = np.frombuffer(base64.b64decode(d["b64"]), dtype=np.int16).astype(np.int64).tolist()
    s, i, counts = d["scale"], 0, {}
    while i < len(a):
        first, rings = a[i], a[i + 1]; i += 2
        xs, ys = [], []
        for _ in range(rings):
            n = a[i]; i += 1
            xs += a[i:i + 2 * n:2]; ys += a[i + 1:i + 2 * n:2]; i += 2 * n
        if first >= 0 and xs:
            c = (int(sum(xs) / len(xs) / s // 24), int(sum(ys) / len(ys) / s // 24))
            counts[c] = counts.get(c, 0) + 1
    cx, cy = max(counts, key=counts.get) if counts else (10, 7)
    x0, y0, x1, y1 = bbox
    return x0 + (cx + 0.5) * 24 / 480 * (x1 - x0), y1 - (cy + 0.5) * 24 / 339 * (y1 - y0)


def cloudiness(rid_url, lon, lat, z=16):
    """Share of near-white, low-saturation pixels in the 3 x 3 tiles around a point: cloud and haze."""
    tx, ty = tile_xy(lon, lat, z)
    px = []
    for dx in (-1, 0, 1):
        for dy in (-1, 0, 1):
            b = fetch(rid_url.replace("{level}", str(z)).replace("{row}", str(ty + dy)).replace("{col}", str(tx + dx)))
            if b:
                px.append(np.asarray(Image.open(io.BytesIO(b)).convert("RGB")).reshape(-1, 3).astype(float))
    if not px:
        return None
    p = np.concatenate(px)
    mx, mn = p.max(1), p.min(1)
    return round(float(((mn > 175) & (mx - mn < 30)).mean()), 3)


def main():
    cfg = json.loads(fetch(CONFIG))
    releases = sorted(({"rid": int(k), "release": v["itemTitle"][-11:-1], "url": v["itemURL"], "meta": v["metadataLayerUrl"]}
                       for k, v in cfg.items()), key=lambda r: r["release"])
    template = releases[-1]["url"].replace(f"/tile/{releases[-1]['rid']}/", "/tile/{rid}/")
    # the newest release shows each place at its most recent capture, newer than the frame centre in places
    out = {"template": template, "attribution": "Imagery: Esri World Imagery Wayback (Maxar, Earthstar Geographics)", "areas": {},
           "latest": {"rid": releases[-1]["rid"], "release": releases[-1]["release"]}}
    for s in SPOTS:
        x0, y0, x1, y1 = s["bbox"]
        lon, lat = (x0 + x1) / 2, (y0 + y1) / 2
        z = 17
        tx, ty = tile_xy(lon, lat, z)

        def get(r):
            b = fetch(r["url"].replace("{level}", str(z)).replace("{row}", str(ty)).replace("{col}", str(tx)))
            return r, (hashlib.md5(b).hexdigest() if b else None)

        with cf.ThreadPoolExecutor(12) as ex:
            got = list(ex.map(get, releases))
        distinct, last = [], None
        for r, h in got:  # releases in date order: keep each one whose imagery changed
            if h and h != last:
                distinct.append(r)
                last = h
        caps = []
        for r in distinct:
            c = capture(r["meta"], lon, lat)
            if c.get("captured"):
                caps.append({"rid": r["rid"], "release": r["release"], **c})
        # the same capture can come back in a later release (re-processed); keep its first release
        uniq, seen = [], set()
        for c in caps:
            if c["captured"] not in seen:
                seen.add(c["captured"])
                uniq.append(c)
        uniq.sort(key=lambda c: c["captured"])
        hlon, hlat = hotspot(s["id"], s["bbox"])
        url_of = {r["rid"]: r["url"] for r in releases}
        for c in uniq:
            c["cloud"] = cloudiness(url_of[c["rid"]], hlon, hlat)
        out["areas"][s["id"]] = uniq
        print(s["id"], [(c["captured"], c["cloud"]) for c in uniq], flush=True)
    json.dump(out, open(os.path.join(HERE, "../out/wayback.json"), "w"), indent=1)


if __name__ == "__main__":
    main()
