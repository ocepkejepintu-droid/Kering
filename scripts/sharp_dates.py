"""Sharp building dates: when did each mapped building first appear in 0.3-0.5 m imagery?

The Sentinel-2 dates in out/spots/<id>.json come from 10 m pixels, where a villa is one or two
pixels, so many are wrong. This script dates every building again from the sharp captures
(Maxar/Vantor WorldView, GeoEye, Legion) that Esri World Imagery Wayback has published over the years.

Stages (each cached, so a rerun is cheap):
  1. coverage  For every Wayback release, the capture polygons of its metadata layers over the area
               (layer 5 = 60 cm band = zoom 18, layer 6 = 1.2 m band = zoom 17), plus the release's
               tilemap: which release each tile's bytes really come from. A building sees capture C
               in tile T when the release that made T's bytes says, in its own metadata, that C
               covers the building's whole crop (footprint box + 7 m: a crop across a seam mixes two
               captures). Captures coarser than 0.6 m and panchromatic ones are skipped.
  2. features  Per capture, zoom-18 mosaics (zoom 17 upsampled 2x for captures only published at 17).
               Registration: capture-wide shift (+-20 px), per-tile shift (+-8 px, from footprints >= 100 m2,
               penalised for leaving the capture-wide shift), then +-2 px per building; the moved copies get the
               same treatment. 31 features per footprint (edges, vegetation, contrast, texture, brightness, hue,
               shadows; outline edges measured on the part not shared with a neighbouring footprint), a grey patch for temporal similarity, and local look stats for the haze test.
  3. dating    Unknown = cloud/haze over the 50 m context or over the footprint itself (edges washed out and
               brighter/greyer than this spot usually is). Round-1 MLP: self-supervised (footprint in its newest
               capture vs the same shape moved onto open ground). Temporal similarity s = gradient NCC with the
               building's current look. EM change-point fit over all buildings: absent* present* absent* per
               building, per-capture error tables over P(roof) x s, absent state anchored by the moved copies,
               appearance-year prior. Round-2 MLP retrained on every capture with the EM's confident labels
               (cleared soil before construction becomes a negative), cross-fitted by tile; EM again -> dates.
               Output per building: first, before, earliest, conf (P right within one capture), status
               (dated / weak / there by / not seen / unseen / demolished), gone, small (< 25 m2).

Imagery is never written to the repo: tiles live under the scratch directory only (Esri terms).
Only derived per-building numbers go to out/sharp/<id>.json.

Usage:
  python3 scripts/sharp_dates.py run pecatu              # one area -> out/sharp/pecatu.json (skips if done)
  python3 scripts/sharp_dates.py run all                 # all 9, smallest first; resumable, skips finished
  python3 scripts/sharp_dates.py run uluwatu,jimbaran    # a list
  python3 scripts/sharp_dates.py status                  # done / todo and minutes per area
  python3 scripts/sharp_dates.py coverage pecatu         # captures covering the area
  python3 scripts/sharp_dates.py sheets pecatu 12,40     # review sheets for given buildings
  python3 scripts/sharp_dates.py review pecatu           # stratified review sheets (+ every hand-labelled one)
  python3 scripts/sharp_dates.py eval pecatu             # accuracy vs hand labels (scratch labels/<area>.json)
  --workers N (default 3), --force (redo finished areas), --refresh (recompute cached geometry and features),
  --labels FILE. The old form `sharp_dates.py pecatu [--sheets ..|--review]` still works.

Logs: <scratch>/logs/<area>.log (appended per run); runtimes: <scratch>/runs.json and stats.timing_s in the output.
Scratch (never the repo): $SHARP_SCRATCH, default the session scratchpad /sharp: tiles/, meta/, tilemap/,
<area>.geo.v3.pkl, <area>.feats.v4.pkl, <area>.scores.json, <area>.borderline.json, sheets/<area>/<i>.png, labels/.
"""
import argparse, base64, io, json, math, os, random, sys, time, urllib.parse, urllib.request, zlib
import concurrent.futures as cf
import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SCRATCH = os.environ.get("SHARP_SCRATCH", os.path.join(os.path.expanduser("~"), ".cache", "kering-sharp"))
CONFIG = "https://s3-us-west-2.amazonaws.com/config.maptiles.arcgis.com/waybackconfig.json"
TILE = "https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/WMTS/1.0.0/default028mm/MapServer/tile/{rid}/{z}/{y}/{x}"
TILEMAP = "https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tilemap/{rid}/{z}/{y}/{x}/{h}/{w}"
SPOTS = {s["id"]: s for s in json.load(open(os.path.join(HERE, "spots.json")))}
W, H = 480, 339                      # Sentinel frame size the footprints are stored in
LAYER = {19: 4, 18: 5, 17: 6}       # metadata layer per zoom (scale bands 850-1700, 1700-3400, 3400-6800)


MAXRES = 0.6                         # m: coarser captures (Ikonos 1 m) cannot resolve a villa
SEAM_PAD_M = 7                       # m around a footprint's box that must lie inside the capture's polygons
Z = 18                               # scoring zoom
MAXREQ = 12

assert not os.path.abspath(SCRATCH).startswith(os.path.abspath(ROOT)), "imagery must stay out of the repo"


# ---------------------------------------------------------------- http

_pool = cf.ThreadPoolExecutor(MAXREQ)


def fetch(url, timeout=40, tries=5, ok404=True):
    """GET with retries and backoff. Returns bytes, or None on 404 (no tile)."""
    for k in range(tries):
        try:
            return urllib.request.urlopen(url, timeout=timeout).read()
        except urllib.error.HTTPError as e:
            if e.code == 404 and ok404:
                return None
            if e.code not in (429, 500, 502, 503, 504):
                raise
        except Exception:
            pass
        time.sleep(min(30, 1.5 * 2 ** k + random.random()))
    raise RuntimeError(f"failed {url}")


def cached_json(path, url):
    if os.path.exists(path):
        return json.load(open(path))
    b = fetch(url, ok404=False)
    d = json.loads(b)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".tmp"
    json.dump(d, open(tmp, "w"))
    os.replace(tmp, path)
    return d


def pmap(fn, items):
    return list(_pool.map(fn, items))


# ---------------------------------------------------------------- geometry

def merc(lon, lat, z):
    """Global pixel coordinates at zoom z (256 px tiles)."""
    n = 256 * 2 ** z
    lat = np.radians(lat)
    return (np.asarray(lon) + 180) / 360 * n, (1 - np.log(np.tan(lat) + 1 / np.cos(lat)) / math.pi) / 2 * n


def unmerc(px, py, z):
    n = 256 * 2 ** z
    lon = np.asarray(px) / n * 360 - 180
    lat = np.degrees(np.arctan(np.sinh(math.pi * (1 - 2 * np.asarray(py) / n))))
    return lon, lat


def m_per_px(z, lat):
    return 156543.03392 * math.cos(math.radians(lat)) / 2 ** z


def load_buildings(area):
    """Buildings in the order of the spot's b64: rings in lon/lat, centroid, old Sentinel first index."""
    spot = json.load(open(os.path.join(ROOT, "out/spots", f"{area}.json")))
    x0, y0, x1, y1 = spot["bbox"]
    d = spot["buildings"]
    a = np.frombuffer(base64.b64decode(d["b64"]), dtype="<i2").astype(np.int64)
    s, i, out = d["scale"], 0, []
    while i < len(a):
        first, nr = int(a[i]), int(a[i + 1]); i += 2
        rings = []
        for _ in range(nr):
            n = int(a[i]); i += 1
            p = a[i:i + 2 * n].reshape(-1, 2) / s; i += 2 * n
            if len(p) and (p[0] != p[-1]).any():
                p = np.vstack([p, p[:1]])     # stored rings are open
            rings.append(np.stack([x0 + p[:, 0] / W * (x1 - x0), y1 - p[:, 1] / H * (y1 - y0)], 1))
        allp = np.concatenate([r[:-1] for r in rings])
        out.append({"first": first, "rings": rings, "lon": float(allp[:, 0].mean()), "lat": float(allp[:, 1].mean())})
    assert len(out) == d["n"], (len(out), d["n"])
    return spot, out


def point_in_rings(x, y, rings):
    """Even-odd test of points (arrays) against esri rings (outer + holes)."""
    inside = np.zeros(len(x), bool)
    for r in rings:
        r = np.asarray(r, float)
        xa, ya, xb, yb = r[:-1, 0], r[:-1, 1], r[1:, 0], r[1:, 1]
        for k in range(len(xa)):
            c = ((ya[k] > y) != (yb[k] > y)) & (x < (xb[k] - xa[k]) * (y - ya[k]) / (yb[k] - ya[k] + 1e-300) + xa[k])
            inside ^= c
    return inside


# ---------------------------------------------------------------- stage 1: coverage

def releases():
    cfg = cached_json(os.path.join(SCRATCH, "config.json"), CONFIG)
    rs = [{"rid": int(k), "release": v["itemTitle"][-11:-1], "meta": v["metadataLayerUrl"]} for k, v in cfg.items()]
    return sorted(rs, key=lambda r: (r["release"], r["rid"]))


def _meta_url(r, layer, bbox, geom):
    q = {"geometry": ",".join(map(str, bbox)), "geometryType": "esriGeometryEnvelope", "inSR": 4326,
         "spatialRel": "esriSpatialRelIntersects", "outFields": "OBJECTID,SRC_DATE,SRC_RES,SRC_DESC,NICE_DESC",
         "returnGeometry": "true" if geom else "false", "f": "json"}
    if geom:
        q.update({"outSR": 4326, "geometryPrecision": 7})
    return f"{r['meta']}/{layer}/query?{urllib.parse.urlencode(q)}"


def meta_query(area, r, layer, bbox):
    path = os.path.join(SCRATCH, "meta", area, f"{r['rid']}_{layer}.json")
    if not os.path.exists(path):
        # Esri times out (502) on some full-geometry queries over old releases. Ask without geometry
        # first: most releases hold no capture over the area, and then there is nothing to fetch.
        try:
            head = cached_json(path + ".nogeom", _meta_url(r, layer, bbox, False))
        except RuntimeError:
            # even the light query times out on some old releases over big areas: ask per quarter
            feats, failed = [], 0
            x0, y0, x1, y1 = bbox; mx, my = (x0 + x1) / 2, (y0 + y1) / 2
            for qb in ((x0, y0, mx, my), (mx, y0, x1, my), (x0, my, mx, y1), (mx, my, x1, y1)):
                try:
                    feats += json.loads(fetch(_meta_url(r, layer, qb, False), ok404=False, tries=3)).get("features", [])
                except RuntimeError:
                    failed += 1
            if failed:
                # leave it uncached so a later run retries; a capture in this release alone is missed for now
                print(f"warning: metadata for release {r['rid']} layer {layer} unavailable ({failed}/4 quarters); skipped",
                      file=sys.stderr, flush=True)
                return []
            head = {"features": feats}
        if "error" in head:
            raise RuntimeError(f"metadata error {r['rid']} {layer}: {head['error']}")
        if not any(len(str(f["attributes"].get("SRC_DATE") or "")) == 8 for f in head.get("features", [])):
            d = {"features": []}
        else:
            try:
                d = json.loads(fetch(_meta_url(r, layer, bbox, True), ok404=False, tries=3))
            except RuntimeError:
                # still timing out: ask per quarter of the area and merge by feature id
                x0, y0, x1, y1 = bbox; mx, my = (x0 + x1) / 2, (y0 + y1) / 2
                seen, feats = set(), []
                for qb in ((x0, y0, mx, my), (mx, y0, x1, my), (x0, my, mx, y1), (mx, my, x1, y1)):
                    part = json.loads(fetch(_meta_url(r, layer, qb, True), ok404=False))
                    if "error" in part:
                        raise RuntimeError(f"metadata error {r['rid']} {layer}: {part['error']}")
                    for f in part.get("features", []):
                        k = f["attributes"].get("OBJECTID")
                        if k not in seen:
                            seen.add(k); feats.append(f)
                d = {"features": feats}
        os.makedirs(os.path.dirname(path), exist_ok=True)
        json.dump(d, open(path + ".tmp", "w")); os.replace(path + ".tmp", path)
    d = json.load(open(path))
    if "error" in d:
        raise RuntimeError(f"metadata error {r['rid']} {layer}: {d['error']}")
    if d.get("exceededTransferLimit"):
        print("warning: transfer limit", r["rid"], layer, file=sys.stderr)
    feats = []
    for f in d.get("features", []):
        a = f["attributes"]
        sd = str(a.get("SRC_DATE") or "")
        if len(sd) != 8 or not f.get("geometry"):
            continue
        feats.append({"date": f"{sd[:4]}-{sd[4:6]}-{sd[6:8]}", "res": a.get("SRC_RES"), "sensor": a.get("SRC_DESC") or "?",
                      "provider": a.get("NICE_DESC") or "", "rings": f["geometry"]["rings"]})
    return feats


def tilemap(area, rid, z, tx0, ty0, tx1, ty1):
    """Per tile (x, y) in the window: (source rid of its bytes, byte size), or None when the release has no tile."""
    out = {}
    jobs = []
    for y in range(ty0, ty1 + 1, 32):
        for x in range(tx0, tx1 + 1, 32):
            h, w = min(32, ty1 + 1 - y), min(32, tx1 + 1 - x)
            jobs.append((x, y, w, h))

    def one(j):
        x, y, w, h = j
        path = os.path.join(SCRATCH, "tilemap", area, f"{rid}_{z}_{x}_{y}_{w}_{h}.json")
        return j, cached_json(path, TILEMAP.format(rid=rid, z=z, y=y, x=x, h=h, w=w))

    for (x, y, w, h), d in map(one, jobs):
        data, sel, size = d.get("data", []), d.get("select"), d.get("size")
        for k in range(w * h):
            if k < len(data) and data[k]:
                out[(x + k % w, y + k // w)] = (int(sel[k]) if sel else rid, int(size[k]) if size else 0)
    return out


def coverage(area, bld, zooms=(18, 17)):
    """For each building, the captures it can be seen in, in date order: [(capture key, zoom, source rid)]."""
    spot = SPOTS[area]
    bbox = spot["bbox"]
    rs = releases()
    t0 = time.time()
    metas = {}
    jobs = [(r, z) for r in rs for z in zooms]
    for (r, z), feats in zip(jobs, pmap(lambda j: meta_query(area, j[0], LAYER[j[1]], bbox), jobs)):
        metas[(r["rid"], z)] = feats
    print(f"[{area}] metadata {len(jobs)} queries {time.time() - t0:.0f}s", flush=True)

    lon = np.array([b["lon"] for b in bld]); lat = np.array([b["lat"] for b in bld])
    # corners of each footprint's box + ~7 m (its scoring crop): a building counts as seen in capture C only when
    # all four lie inside C's polygons. Near a seam the crop mixes two captures and the seam reads as a roof edge.
    pad = SEAM_PAD_M / 111320
    cor = np.array([[(x0, y0), (x0, y1), (x1, y0), (x1, y1)] for x0, y0, x1, y1 in
                    ((p[:, 0].min() - pad, p[:, 1].min() - pad, p[:, 0].max() + pad, p[:, 1].max() + pad)
                     for p in (np.concatenate(b["rings"]) for b in bld))])
    order = {r["rid"]: k for k, r in enumerate(rs)}
    caps = {}          # (date, sensor) -> info
    kid, keys = {}, []
    seen = {}          # (building, capture) -> (zoom, src rid, tile)
    for z in zooms:
        px, py = merc(lon, lat, z)
        tx, ty = (px // 256).astype(int), (py // 256).astype(int)
        win = (int(tx.min()), int(ty.min()), int(tx.max()), int(ty.max()))
        t0 = time.time()
        tms = pmap(lambda r: tilemap(area, r["rid"], z, *win), rs)
        print(f"[{area}] tilemaps z{z} {time.time() - t0:.0f}s", flush=True)
        # which capture covers each building in the release that made the bytes
        which = {}     # src rid -> per building capture id or -1

        def cap_at(rid):
            if rid in which:
                return which[rid]
            key = np.full(len(bld), -1, int)
            polys = {}
            for f in metas.get((rid, z), []):
                if (f["res"] or 9) > MAXRES:
                    continue
                inside = point_in_rings(lon, lat, f["rings"])
                k = (f["date"], f["sensor"])
                caps.setdefault(k, {"date": f["date"], "sensor": f["sensor"], "res": f["res"], "provider": f["provider"]})
                if k not in kid:
                    kid[k] = len(kid); keys.append(k)
                key[inside & (key < 0)] = kid[k]
                polys.setdefault(kid[k], []).append(f["rings"])
            for kk, rl in polys.items():          # whole crop inside the union of this capture's polygons
                sel = np.flatnonzero(key == kk)
                if not len(sel):
                    continue
                pts = cor[sel].reshape(-1, 2)
                cin = np.zeros(len(pts), bool)
                for rings in rl:
                    cin |= point_in_rings(pts[:, 0], pts[:, 1], rings)
                key[sel[~cin.reshape(-1, 4).all(1)]] = -1
            which[rid] = key
            return key

        bt = list(zip(tx.tolist(), ty.tolist()))
        for r, tm in zip(rs, tms):
            srcs = {}
            for i, t in enumerate(bt):
                v = tm.get(t)
                if v is None:
                    continue
                srcs.setdefault(v[0], []).append(i)
            for src, idx in srcs.items():
                if src not in order:
                    continue
                key = cap_at(src)
                for i in idx:
                    if key[i] < 0:
                        continue
                    k = keys[key[i]]
                    prev = seen.get((i, k))
                    # prefer the sharper zoom, then the earliest source release
                    if prev is None or (z > prev[0]) or (z == prev[0] and order[src] < order[prev[1]]):
                        seen[(i, k)] = (z, src, bt[i])
    per = [[] for _ in bld]
    for (i, k), (z, src, t) in seen.items():
        per[i].append((k, z, src))
    for p in per:
        p.sort()
    for c in caps.values():
        c["n"], c["rids"], c["zooms"] = 0, {}, {}
    for p in per:
        for k, z, src in p:
            c = caps[k]
            c["n"] += 1
            c["rids"][src] = c["rids"].get(src, 0) + 1
            c["zooms"][z] = c["zooms"].get(z, 0) + 1
    caps = {k: c for k, c in caps.items() if c["n"]}
    for c in caps.values():   # earliest release that shows it (by release order)
        c["rid"] = min(c["rids"], key=lambda r: order[r])
    return caps, per


# ---------------------------------------------------------------- tiles and mosaics (scratch only)

def tile_file(z, rid, x, y):
    return os.path.join(SCRATCH, "tiles", str(z), str(rid), f"{x}_{y}.jpg")


def get_tile(z, rid, x, y):
    """Fetch one tile into the scratch cache. Returns True when the tile exists."""
    p = tile_file(z, rid, x, y)
    if os.path.exists(p):
        return True
    if os.path.exists(p + ".none"):
        return False
    b = fetch(TILE.format(rid=rid, z=z, y=y, x=x))
    os.makedirs(os.path.dirname(p), exist_ok=True)
    if b is None:
        open(p + ".none", "w").close()
        return False
    open(p + ".tmp", "wb").write(b)
    os.replace(p + ".tmp", p)
    return True


def fetch_tiles(jobs, label=""):
    jobs = sorted(set(jobs))
    todo = [j for j in jobs if not (os.path.exists(tile_file(*j)) or os.path.exists(tile_file(*j) + ".none"))]
    t0 = time.time()
    for k in range(0, len(todo), 600):
        pmap(lambda j: get_tile(*j), todo[k:k + 600])
        print(f"  tiles {label} {min(k + 600, len(todo))}/{len(todo)} ({len(jobs)} needed) {time.time() - t0:.0f}s", flush=True)
    return len(todo)


def read_tile(z, rid, x, y):
    p = tile_file(z, rid, x, y)
    if not os.path.exists(p):
        return None
    try:
        return np.asarray(Image.open(p).convert("RGB"))
    except Exception:
        return None


def mosaic(z, rid, x0, y0, x1, y1):
    """RGB mosaic on the zoom-18 grid of tiles x0..x1, y0..y1 (zoom-18 tile numbers), from zoom-z tiles of release rid.
    Zoom-17 tiles are upsampled 2x. Returns (uint8 image, bool valid)."""
    nx, ny = x1 - x0 + 1, y1 - y0 + 1
    if z == 18:
        img = np.zeros((ny * 256, nx * 256, 3), np.uint8)
        ok = np.zeros((ny * 256, nx * 256), bool)
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                t = read_tile(18, rid, x, y)
                if t is not None:
                    img[(y - y0) * 256:(y - y0 + 1) * 256, (x - x0) * 256:(x - x0 + 1) * 256] = t
                    ok[(y - y0) * 256:(y - y0 + 1) * 256, (x - x0) * 256:(x - x0 + 1) * 256] = True
        return img, ok
    assert z == 17
    a0, b0, a1, b1 = x0 // 2, y0 // 2, x1 // 2, y1 // 2
    small = np.zeros(((b1 - b0 + 1) * 256, (a1 - a0 + 1) * 256, 3), np.uint8)
    sok = np.zeros(small.shape[:2], np.uint8)
    for y in range(b0, b1 + 1):
        for x in range(a0, a1 + 1):
            t = read_tile(17, rid, x, y)
            if t is not None:
                small[(y - b0) * 256:(y - b0 + 1) * 256, (x - a0) * 256:(x - a0 + 1) * 256] = t
                sok[(y - b0) * 256:(y - b0 + 1) * 256, (x - a0) * 256:(x - a0 + 1) * 256] = 1
    big = np.asarray(Image.fromarray(small).resize((small.shape[1] * 2, small.shape[0] * 2), Image.BILINEAR))
    bok = np.repeat(np.repeat(sok, 2, 0), 2, 1).astype(bool)
    ox, oy = (x0 - 2 * a0) * 256, (y0 - 2 * b0) * 256
    return big[oy:oy + ny * 256, ox:ox + nx * 256].copy(), bok[oy:oy + ny * 256, ox:ox + nx * 256].copy()


def degrade(img):
    """What a zoom-17 tile of this zoom-18 image looks like on the zoom-18 grid (2x2 mean, bilinear back up)."""
    h, w = img.shape[:2]
    s = img[:h // 2 * 2, :w // 2 * 2].astype(np.float32).reshape(h // 2, 2, w // 2, 2, 3).mean((1, 3))
    return np.asarray(Image.fromarray(s.round().astype(np.uint8)).resize((w // 2 * 2, h // 2 * 2), Image.BILINEAR))


# ---------------------------------------------------------------- footprint geometry on the zoom-18 grid

MARGIN = 12      # px around a footprint in its crop
RING = (2, 7)    # ring around the footprint: from 2 to 7 px out
STEP = 2         # px in/out of the outline for the edge step


def _dilate(m, r):
    from scipy.ndimage import binary_dilation
    if r <= 0:
        return m
    yy, xx = np.mgrid[-r:r + 1, -r:r + 1]
    return binary_dilation(m, structure=(xx * xx + yy * yy) <= r * r + 0.5)


def geometry(bld, seed=0):
    """Per building: polygon on the zoom-18 global pixel grid, crop mask, ring, outline samples,
    plus one negative: the same shape moved onto nearby ground with no footprint."""
    rng = np.random.default_rng(seed)
    polys = []
    for b in bld:
        pr = []
        for r in b["rings"]:
            X, Y = merc(r[:, 0], r[:, 1], Z)
            pr.append(np.stack([X, Y], 1))
        polys.append(pr)
    allp = np.concatenate([np.concatenate(p) for p in polys])
    TX0, TY0 = int(allp[:, 0].min() // 256) - 1, int(allp[:, 1].min() // 256) - 1
    TX1, TY1 = int(allp[:, 0].max() // 256) + 1, int(allp[:, 1].max() // 256) + 1
    OX, OY = TX0 * 256, TY0 * 256
    Wm, Hm = (TX1 - TX0 + 1) * 256, (TY1 - TY0 + 1) * 256
    occ_img = Image.new("1", (Wm, Hm), 0)
    d = ImageDraw.Draw(occ_img)
    for pr in polys:
        for k, r in enumerate(pr):
            d.polygon([(float(x - OX), float(y - OY)) for x, y in r], fill=1 if k == 0 else 0)
    occ = np.asarray(occ_img).astype(bool)
    occ_d = _dilate(occ, 2)

    ents = []

    def entry(i, pr, dx, dy, neg):
        rr = [r + (dx, dy) for r in pr]
        p = np.concatenate(rr)
        x0, y0 = int(math.floor(p[:, 0].min())) - MARGIN, int(math.floor(p[:, 1].min())) - MARGIN
        x1, y1 = int(math.ceil(p[:, 0].max())) + MARGIN, int(math.ceil(p[:, 1].max())) + MARGIN
        w, h = x1 - x0, y1 - y0
        im = Image.new("1", (w, h), 0)
        dd = ImageDraw.Draw(im)
        for k, r in enumerate(rr):
            dd.polygon([(float(x - x0), float(y - y0)) for x, y in r], fill=1 if k == 0 else 0)
        m = np.asarray(im).astype(bool)
        if m.sum() < 4:
            return None
        lx, ly = x0 - OX, y0 - OY
        if lx < 0 or ly < 0 or lx + w > Wm or ly + h > Hm:
            return None
        others = occ[ly:ly + h, lx:lx + w].copy()
        if not neg:
            others &= ~m
        ring = _dilate(m, RING[1]) & ~_dilate(m, RING[0]) & ~_dilate(others, 1)
        # outline samples every ~1 px with outward normals, per edge
        sx, sy, nx, ny, eid = [], [], [], [], []
        e = 0
        for k, r in enumerate(rr):
            a = 0.5 * np.sum(r[:-1, 0] * r[1:, 1] - r[1:, 0] * r[:-1, 1])
            sgn = 1 if a > 0 else -1          # y points down: outward normal flips with orientation
            if k > 0:
                sgn = -sgn
            for j in range(len(r) - 1):
                (ax, ay), (bx, by) = r[j], r[j + 1]
                L = math.hypot(bx - ax, by - ay)
                if L < 2:
                    continue
                n = max(2, int(L))
                t = (np.arange(n) + 0.5) / n
                sx.append(ax + (bx - ax) * t - x0); sy.append(ay + (by - ay) * t - y0)
                nxv, nyv = sgn * (by - ay) / L, -sgn * (bx - ax) / L
                nx.append(np.full(n, nxv)); ny.append(np.full(n, nyv)); eid.append(np.full(n, e)); e += 1
        if not sx:
            return None
        cx, cy = p[:, 0].mean(), p[:, 1].mean()
        # outline samples not shared with a neighbouring footprint: a shared wall carries the neighbour's roof edge
        # even before this building exists (extensions, row houses, kampung roof fields)
        sxa, sya = np.concatenate(sx), np.concatenate(sy)
        od = _dilate(others, 3)
        free = ~od[np.clip(sya.astype(int), 0, h - 1), np.clip(sxa.astype(int), 0, w - 1)]
        return {"i": i, "neg": neg, "x0": lx, "y0": ly, "m": m, "ring": ring, "free": free,
                "sx": np.concatenate(sx).astype(np.float32), "sy": np.concatenate(sy).astype(np.float32),
                "nx": np.concatenate(nx).astype(np.float32), "ny": np.concatenate(ny).astype(np.float32),
                "eid": np.concatenate(eid).astype(np.int32),
                "tile": (int(cx // 256), int(cy // 256)), "area": float(m.sum())}

    pos, neg = [None] * len(bld), [None] * len(bld)
    for i, pr in enumerate(polys):
        e = entry(i, pr, 0, 0, False)
        pos[i] = e
        if e is None:
            continue
        # check the outward normals point out: the sample just outside should be off the mask mostly
        for _ in range(40):
            ang, dist = rng.uniform(0, 2 * math.pi), rng.uniform(25, 110)
            dx, dy = int(round(dist * math.cos(ang))), int(round(dist * math.sin(ang)))
            y0, x0 = e["y0"] + dy, e["x0"] + dx
            h, w = e["m"].shape
            if x0 < 0 or y0 < 0 or x0 + w > Wm or y0 + h > Hm:
                continue
            if (occ_d[y0:y0 + h, x0:x0 + w] & _dilate(e["m"], 1)).any():
                continue
            neg[i] = entry(i, pr, dx, dy, True)
            break
    grid = {"OX": OX, "OY": OY, "TX0": TX0, "TY0": TY0, "TX1": TX1, "TY1": TY1}
    return pos, neg, grid


# ---------------------------------------------------------------- stage 2: registration and features

FEATS = ["edge_n", "edge_nt", "step_rel", "step", "exg_in", "green_in", "green_ring", "green_diff", "contrast",
         "std_in", "std_ring", "bright_in", "bright_ring", "sat_in", "sat_ring", "log_area", "edge_abs",
         "edge_frac", "grad_in", "rch_in", "gch_in", "rch_ring", "red_in", "shadow_out", "shadow_asym", "shadow_dark",
         "huec_in", "hues_in", "huec_ring", "hues_ring", "flat_in"]
SEARCH = 8        # px per tile, around the capture-wide shift
SEARCH0 = 20      # px for the capture-wide shift
REG_MIN_PX = 300  # footprints at least this big (zoom-18 px, ~100 m2) set the per-tile shift
REFINE = 2        # px: per-building shift refinement around the tile shift (same for the moved copies)
PM = 6            # px of margin kept around the footprint box in the stored patch (temporal similarity)


def planes(img):
    from scipy.ndimage import gaussian_filter, sobel
    g = img.astype(np.float32) @ np.array([0.299, 0.587, 0.114], np.float32)
    g = gaussian_filter(g, 0.8)
    return g, sobel(g, 1) / 8, sobel(g, 0) / 8


def _pts(e, ox, oy):
    return e["sx"] + e["x0"] - ox, e["sy"] + e["y0"] - oy


def register(gx, gy, ents, ox, oy, rng):
    """One shift per zoom-18 tile: maximise |gradient . outline normal| summed over the tile's footprints.
    ents: positive entries in this capture. Returns {tile: (dx, dy)}, capture-wide shift, sharpness."""
    H_, W_ = gx.shape
    by_tile = {}
    for e in ents:
        by_tile.setdefault(e["tile"], []).append(e)
    # small footprints (sheds, tanks, annexes) pick up neighbouring roof edges: estimate shifts from the
    # large ones (>= REG_MIN_PX) wherever a tile has enough of their outline, and apply the shift to all
    for t, es in by_tile.items():
        big = [e for e in es if e["area"] >= REG_MIN_PX]
        if sum(len(e["sx"]) for e in big) >= 120:
            by_tile[t] = big

    def score_map(es, cx, cy, R, cap=6000):
        x = np.concatenate([_pts(e, ox, oy)[0] for e in es]); y = np.concatenate([_pts(e, ox, oy)[1] for e in es])
        nx = np.concatenate([e["nx"] for e in es]); ny = np.concatenate([e["ny"] for e in es])
        if len(x) > cap:
            k = rng.choice(len(x), cap, replace=False)
            x, y, nx, ny = x[k], y[k], nx[k], ny[k]
        s = np.arange(-R, R + 1)
        xi = np.clip(np.floor(x[None, None, :] + (s + cx)[None, :, None]).astype(np.int32), 0, W_ - 1)
        yi = np.clip(np.floor(y[None, None, :] + (s + cy)[:, None, None]).astype(np.int32), 0, H_ - 1)
        v = np.abs(gx[yi, xi] * nx + gy[yi, xi] * ny)
        return v.mean(2), len(x)

    # capture-wide, coarse
    allm, _ = score_map([e for es in by_tile.values() for e in es], 0, 0, SEARCH0, cap=20000)
    cy, cx = np.unravel_index(np.argmax(allm), allm.shape)
    cx, cy = int(cx) - SEARCH0, int(cy) - SEARCH0
    maps, npts = {}, {}
    for t, es in by_tile.items():
        m, n = score_map(es, cx, cy, SEARCH)
        sd = m.std()
        maps[t] = (m - m.mean()) / (sd + 1e-6)
        npts[t] = n
    pad = np.pad(allm, SEARCH, mode="edge")      # the capture-wide shift can sit near the edge of its search
    prior = pad[SEARCH0 + cy:SEARCH0 + cy + 2 * SEARCH + 1, SEARCH0 + cx:SEARCH0 + cx + 2 * SEARCH + 1]
    prior = (prior - prior.mean()) / (prior.std() + 1e-6)
    shifts, sharp = {}, {}
    ss = np.arange(-SEARCH, SEARCH + 1)
    dist2 = ss[None, :] ** 2 + ss[:, None] ** 2
    for (tx, ty), m in maps.items():
        w = min(1.0, npts[(tx, ty)] / 150)            # few outline pixels: lean on neighbours and the prior
        # the capture-wide shift is the prior; a tile must earn a large departure from it
        acc = w * m + 0.6 * prior - 0.03 * dist2
        for ddx in (-1, 0, 1):
            for ddy in (-1, 0, 1):
                if (ddx or ddy) and (tx + ddx, ty + ddy) in maps:
                    acc = acc + 0.25 * min(1.0, npts[(tx + ddx, ty + ddy)] / 150) * maps[(tx + ddx, ty + ddy)]
        yy, xx = np.unravel_index(np.argmax(acc), acc.shape)
        shifts[(tx, ty)] = (cx + int(xx) - SEARCH, cy + int(yy) - SEARCH)
        sharp[(tx, ty)] = float(m.max())
    return shifts, (cx, cy), sharp


def features(img, ok, g, gx, gy, e, ox, oy, dx, dy):
    """Feature vector of entry e in this image, shifted by (dx, dy); None when not observable (no data, cloud)."""
    h, w = e["m"].shape
    x0, y0 = e["x0"] - ox + dx, e["y0"] - oy + dy
    if x0 < 0 or y0 < 0 or y0 + h > img.shape[0] or x0 + w > img.shape[1]:
        return None
    okc = ok[y0:y0 + h, x0:x0 + w]
    if okc.mean() < 0.98:
        return None
    rgb = img[y0:y0 + h, x0:x0 + w].astype(np.float32)
    gc, gxc, gyc = g[y0:y0 + h, x0:x0 + w], gx[y0:y0 + h, x0:x0 + w], gy[y0:y0 + h, x0:x0 + w]
    mx, mn = rgb.max(2), rgb.min(2)
    sat = (mx - mn) / (mx + 1)
    exg = 2 * rgb[..., 1] - rgb[..., 0] - rgb[..., 2]
    # cloud / haze: bright, colourless and flat across the whole crop; no data: flat black
    if ((gc > 195) & (sat < 0.12)).mean() > 0.5 and gc.std() < 14:
        return "cloud"
    if (mx < 8).mean() > 0.3:
        return None
    m, ring = e["m"], e["ring"]
    if ring.sum() < 6:
        ring = ~_dilate(m, 1)
    sx, sy, nx, ny, eid = e["sx"], e["sy"], e["nx"], e["ny"], e["eid"]
    fr = e.get("free")
    if fr is not None and not fr.all() and fr.sum() >= max(8, 0.3 * len(fr)):
        sx, sy, nx, ny, eid = sx[fr], sy[fr], nx[fr], ny[fr], eid[fr]
    xi, yi = np.clip(sx.astype(np.int32), 0, w - 1), np.clip(sy.astype(np.int32), 0, h - 1)
    gn = np.abs(gxc[yi, xi] * nx + gyc[yi, xi] * ny)
    gt = np.abs(gxc[yi, xi] * -ny + gyc[yi, xi] * nx)
    xo, yo = np.clip((sx + STEP * nx).astype(np.int32), 0, w - 1), np.clip((sy + STEP * ny).astype(np.int32), 0, h - 1)
    xn, yn = np.clip((sx - STEP * nx).astype(np.int32), 0, w - 1), np.clip((sy - STEP * ny).astype(np.int32), 0, h - 1)
    d = gc[yo, xo] - gc[yn, xn]
    cnt = np.bincount(eid)
    per = np.abs(np.bincount(eid, d) / np.maximum(cnt, 1))
    step = float((per * cnt).sum() / cnt.sum())
    gm = float(np.hypot(gxc, gyc).mean())
    gi, gr = gc[m], gc[ring]
    ci, cr = rgb[m].mean(0), rgb[ring].mean(0)
    green_in, green_ring = float((exg[m] > 20).mean()), float((exg[ring] > 20).mean())
    en = float(gn.mean())
    gmag = np.hypot(gxc, gyc)
    chi = ci / (ci.sum() + 1); chr_ = cr / (cr.sum() + 1)
    r_, g_, b_ = rgb[..., 0][m], rgb[..., 1][m], rgb[..., 2][m]
    # shadows: a raised roof darkens a strip on one side (sun side opposite); flat ground does not
    bd = []
    for ang in range(8):
        ddx, ddy = int(round(3 * math.cos(ang * math.pi / 4))), int(round(3 * math.sin(ang * math.pi / 4)))
        st = np.roll(np.roll(m, ddy, 0), ddx, 1) & ~m
        bd.append(float(gc[st].mean()) if st.any() else float(gr.mean()))
    bd = np.array(bd)
    asym = float(np.max(np.roll(bd, 4) - bd))
    extra = [float((gn > 6).mean()), float(gmag[m].mean()) / (gm + 2), chi[0], chi[1], chr_[0],
             float(((r_ > g_ + 15) & (r_ > b_ + 25)).mean()), float((gr < gi.mean() - 30).mean()),
             asym / (gr.std() + 4), float(gr.mean() - bd.min()) / (gr.std() + 4)]
    # hue (saturation weighted) inside and around: tile roofs, metal roofs, bare soil and lawn differ in hue
    # even when edges and brightness look alike; and how much of the inside is a flat plane
    hue = np.arctan2(math.sqrt(3) * (rgb[..., 1] - rgb[..., 2]), 2 * rgb[..., 0] - rgb[..., 1] - rgb[..., 2])
    hc, hs = np.cos(hue) * sat, np.sin(hue) * sat
    extra += [float(hc[m].mean()), float(hs[m].mean()), float(hc[ring].mean()), float(hs[ring].mean()),
              float((gmag[m] < 2.5).mean())]
    return np.array([en / (gm + 2), en / (gt.mean() + 2), step / (gr.std() + 4), step / 255, exg[m].mean() / 255,
                     green_in, green_ring, green_in - green_ring, float(np.linalg.norm(ci - cr)) / 255,
                     gi.std() / 255, gr.std() / 255, gi.mean() / 255, gr.mean() / 255, sat[m].mean(), sat[ring].mean(),
                     math.log(e["area"]), en / 255] + extra, np.float32)


G = {}   # worker globals, set before forking


def score_group(job):
    """Register and score one (capture, source release, zoom) group. Runs in a worker process."""
    ck, z, src, idx, newest = job
    pos, neg, grid = G["pos"], G["neg"], G["grid"]
    rng = np.random.default_rng(zlib.crc32(repr((ck, z, src)).encode()))   # not hash(): str hashes vary per process
    ents = [pos[i] for i in idx if pos[i] is not None]
    negs = [neg[i] for i in idx if neg[i] is not None]
    tiles = {e["tile"] for e in ents} | {n["tile"] for n in negs}
    tx0, ty0 = min(t[0] for t in tiles) - 1, min(t[1] for t in tiles) - 1
    tx1, ty1 = max(t[0] for t in tiles) + 1, max(t[1] for t in tiles) + 1
    t0 = time.time()
    img, ok = mosaic(z, src, tx0, ty0, tx1, ty1)
    ox, oy = (tx0 - grid["TX0"]) * 256, (ty0 - grid["TY0"]) * 256
    g, gx, gy = planes(img)
    shifts, s0, sharp = register(gx, gy, ents, ox, oy, rng)
    out = {"ck": ck, "z": z, "src": src, "shift0": s0, "shifts": {f"{a},{b}": v for (a, b), v in shifts.items()},
           "pos": {}, "neg": {}, "pos17": {}, "neg17": {}, "ctx": {}, "nctx": {}, "ref": {}, "patch": {}, "loc": {}}
    H_, W_ = g.shape
    gmag = np.hypot(gx, gy)
    offs = np.arange(-REFINE, REFINE + 1)
    cpen = 1 - 0.01 * (offs[None, :] ** 2 + offs[:, None] ** 2)

    def sh(e):
        """Tile shift, then a +-REFINE px local search on outline edge strength (residual relief / footprint offset)."""
        dx, dy = shifts.get(e["tile"], s0)
        x, y = _pts(e, ox, oy)
        xi = np.clip(np.floor(x[None, None, :] + dx + offs[None, :, None]).astype(np.int32), 0, W_ - 1)
        yi = np.clip(np.floor(y[None, None, :] + dy + offs[:, None, None]).astype(np.int32), 0, H_ - 1)
        v = np.abs(gx[yi, xi] * e["nx"] + gy[yi, xi] * e["ny"]).mean(2) * cpen
        iy, ix = np.unravel_index(np.argmax(v), v.shape)
        return dx + int(ix) - REFINE, dy + int(iy) - REFINE

    def loc(e, dx, dy):
        """Local look of the crop (footprint + ~7 m): grey mean, saturation mean, gradient energy, white-flat share."""
        h, w = e["m"].shape
        x0, y0 = e["x0"] - ox + dx, e["y0"] - oy + dy
        if x0 < 0 or y0 < 0 or y0 + h > H_ or x0 + w > W_:
            return None
        rr = img[y0:y0 + h, x0:x0 + w]
        mx, mn = rr.max(2).astype(np.float32), rr.min(2)
        st = (mx - mn) / (mx + 1)
        gg, gm = g[y0:y0 + h, x0:x0 + w], gmag[y0:y0 + h, x0:x0 + w]
        return (round(float(gg.mean()), 1), round(float(st.mean()), 3), round(float(gm.mean()), 2),
                round(float(((gg > 170) & (st < 0.15) & (gm < 4)).mean()), 3))

    def patch(e, dx, dy):
        h, w = e["m"].shape
        x0, y0 = e["x0"] - ox + dx + MARGIN - PM, e["y0"] - oy + dy + MARGIN - PM
        hh, ww = h - 2 * (MARGIN - PM), w - 2 * (MARGIN - PM)
        if x0 < 0 or y0 < 0 or y0 + hh > H_ or x0 + ww > W_:
            return None
        return np.clip(g[y0:y0 + hh, x0:x0 + ww], 0, 255).astype(np.uint8)

    for e in ents:
        dx, dy = sh(e)
        out["ref"][e["i"]] = (dx, dy)
        out["pos"][e["i"]] = features(img, ok, g, gx, gy, e, ox, oy, dx, dy)
        out["loc"][e["i"]] = loc(e, dx, dy)
        out["patch"][e["i"]] = patch(e, dx, dy)
    for e in negs:
        out["neg"][e["i"]] = features(img, ok, g, gx, gy, e, ox, oy, *sh(e))
    newest = set(newest)
    for key, es in (("ctx", ents), ("nctx", negs)):   # context for the haze test: grey std and mean over ~50 m
        for e in es:
            h, w = e["m"].shape
            cx, cy = e["x0"] - ox + w // 2, e["y0"] - oy + h // 2
            sl = (slice(max(0, cy - 42), cy + 42), slice(max(0, cx - 42), cx + 42))
            gg, rr = g[sl], img[sl]
            if gg.size:
                mx, mn = rr.max(2).astype(np.float32), rr.min(2)
                white = float(((gg > 165) & ((mx - mn) / (mx + 1) < 0.16)).mean())
                out[key][e["i"]] = (float(gg.std()), float(gg.mean()), white, float(((mx - mn) / (mx + 1)).mean()))
    sats = [c[3] for c in out["ctx"].values()]
    out["sat"] = float(np.median(sats)) if sats else 0.0      # around the buildings this group scores
    if z == 18 and newest:      # the same footprints in a zoom-17-like copy, to train the zoom-17 model
        img2 = degrade(img)
        g2, gx2, gy2 = planes(img2)
        for e in ents:
            if e["i"] in newest:
                out["pos17"][e["i"]] = features(img2, ok, g2, gx2, gy2, e, ox, oy, *out["ref"][e["i"]])
        for e in negs:
            if e["i"] in newest:
                out["neg17"][e["i"]] = features(img2, ok, g2, gx2, gy2, e, ox, oy, *sh(e))
    out["secs"] = time.time() - t0
    return out


# ---------------------------------------------------------------- stage 2b: classifier (self-supervised)

def expand(X):
    return np.hstack([X, X ** 2])


class Logit:
    """L2-regularised logistic regression (Newton / IRLS) on standardised features and their squares."""

    def __init__(self, lam=1.0):
        self.lam = lam

    def fit(self, X, y):
        X = expand(X)
        self.mu, self.sd = X.mean(0), X.std(0) + 1e-6
        A = np.hstack([np.ones((len(X), 1)), (X - self.mu) / self.sd])
        w = np.zeros(A.shape[1])
        R = self.lam * np.eye(A.shape[1]); R[0, 0] = 0
        for _ in range(50):
            p = 1 / (1 + np.exp(-np.clip(A @ w, -30, 30)))
            gr = A.T @ (p - y) + R @ w
            Hs = (A * (p * (1 - p))[:, None]).T @ A + R
            step = np.linalg.solve(Hs, gr)
            w -= step
            if np.abs(step).max() < 1e-6:
                break
        self.w = w
        return self

    def p(self, X):
        X = expand(np.atleast_2d(X))
        A = np.hstack([np.ones((len(X), 1)), (X - self.mu) / self.sd])
        return 1 / (1 + np.exp(-np.clip(A @ self.w, -30, 30)))

    def dump(self):
        return {"mu": self.mu.round(5).tolist(), "sd": self.sd.round(5).tolist(), "w": self.w.round(5).tolist()}


class MLP:
    """One hidden layer (ReLU) network, full-batch Adam, averaged over a few seeds. numpy only."""

    def __init__(self, hid=32, epochs=500, lr=0.01, l2=1e-3, seeds=3):
        self.hid, self.epochs, self.lr, self.l2, self.seeds = hid, epochs, lr, l2, seeds

    def fit(self, X, y):
        self.mu, self.sd = X.mean(0), X.std(0) + 1e-6
        X = (X - self.mu) / self.sd
        self.nets = []
        for seed in range(self.seeds):
            rng = np.random.default_rng(seed)
            P = [rng.normal(0, 1 / np.sqrt(X.shape[1]), (X.shape[1], self.hid)), np.zeros(self.hid),
                 rng.normal(0, 1 / np.sqrt(self.hid), self.hid), np.zeros(1)]
            M = [np.zeros_like(q) for q in P]; V = [np.zeros_like(q) for q in P]
            for t in range(1, self.epochs + 1):
                Hd = np.maximum(0, X @ P[0] + P[1])
                p = 1 / (1 + np.exp(-np.clip(Hd @ P[2] + P[3][0], -30, 30)))
                d = (p - y) / len(y)
                dH = np.outer(d, P[2]) * (Hd > 0)
                grads = [X.T @ dH + self.l2 * P[0], dH.sum(0), Hd.T @ d + self.l2 * P[2], np.array([d.sum()])]
                for k, gk in enumerate(grads):
                    M[k] = 0.9 * M[k] + 0.1 * gk; V[k] = 0.999 * V[k] + 0.001 * gk * gk
                    P[k] = P[k] - self.lr * (M[k] / (1 - 0.9 ** t)) / (np.sqrt(V[k] / (1 - 0.999 ** t)) + 1e-8)
            self.nets.append(P)
        return self

    def p(self, X):
        X = (np.atleast_2d(X) - self.mu) / self.sd
        out = 0
        for P in self.nets:
            out = out + 1 / (1 + np.exp(-np.clip(np.maximum(0, X @ P[0] + P[1]) @ P[2] + P[3][0], -30, 30)))
        return out / len(self.nets)

    def dump(self):
        r = lambda a: np.round(a, 5).tolist()
        return {"kind": "mlp", "mu": r(self.mu), "sd": r(self.sd), "nets": [[r(q) for q in P] for P in self.nets]}


def train(Xp, Xn, tiles_p, tiles_n, label):
    """Fit on 80 % of tiles, report held-out accuracy on the other 20 %. Labels are noisy both ways: some
    footprints show no roof in their newest capture (trees over it, built later, bad footprint) and some moved
    copies land on buildings Overture does not map. So clean once (drop positives the first model puts below
    0.15 and negatives above 0.85), refit, report held-out accuracy on raw and on cleaned labels, refit on all."""
    hold = lambda t: (t[0] * 7919 + t[1] * 104729) % 5 == 0
    hp, hn = np.array([hold(t) for t in tiles_p]), np.array([hold(t) for t in tiles_n])
    fit = lambda A, B: MLP().fit(np.vstack([A, B]), np.r_[np.ones(len(A)), np.zeros(len(B))])
    acc = lambda pp, pn: float(((pp >= 0.5).sum() + (pn < 0.5).sum()) / max(1, len(pp) + len(pn)))
    lg = Logit().fit(np.vstack([Xp[~hp], Xn[~hn]]), np.r_[np.ones((~hp).sum()), np.zeros((~hn).sum())])
    acc_logit = acc(lg.p(Xp[hp]), lg.p(Xn[hn]))
    m0 = fit(Xp[~hp], Xn[~hn])
    pp, pn = m0.p(Xp[hp]), m0.p(Xn[hn])
    acc0 = acc(pp, pn)
    cp, cn = pp >= 0.15, pn <= 0.85
    kp, kn = m0.p(Xp) >= 0.15, m0.p(Xn) <= 0.85            # cleaning decided by the first model
    m = fit(Xp[~hp & kp], Xn[~hn & kn])
    pp, pn = m.p(Xp[hp]), m.p(Xn[hn])
    acc1 = acc(pp, pn)
    rep = {"n_pos": int(len(Xp)), "n_neg": int(len(Xn)), "held_pos": int(hp.sum()), "held_neg": int(hn.sum()),
           "heldout_acc_logistic": round(acc_logit, 4), "heldout_acc_mlp": round(acc0, 4),
           "heldout_acc_mlp_cleaned_train": round(acc1, 4),
           "heldout_acc_on_clean_labels": round(acc(pp[cp], pn[cn]), 4),
           "heldout_recall": round(float((pp >= 0.5).mean()), 4), "heldout_false_pos": round(float((pn >= 0.5).mean()), 4),
           "dropped_pos": int((~kp).sum()), "dropped_neg": int((~kn).sum())}
    print(f"  model {label}: {rep}", flush=True)
    return fit(Xp[kp], Xn[kn]), rep


# ---------------------------------------------------------------- stage 3: temporal similarity, haze, dating

FEAT_VERSION = 4          # cache key of <area>.feats.v<N>.pkl (bump when score_group output or coverage changes)
GEO_VERSION = 3           # cache key of <area>.geo.v<N>.pkl (footprint geometry only)
VERSION = "sharp-3"       # out/sharp/<area>.json written by this version; older ones are redone
SMALL_M2 = 25             # footprints below this (tanks, sheds, wall bits) are flagged 'small'
PB = np.array([0.1, 0.3, 0.5, 0.7, 0.9])          # P(roof) bin edges
SB = np.array([0.15, 0.35, 0.55, 0.75])           # temporal-similarity bin edges (+1 bin: no reference)
NPB, NSB = len(PB) + 1, len(SB) + 2
YB = np.array([1990.0] + list(range(2010, 2028)) + [2100.0])   # appearance bins: <2010, each year, after 2026/never
Z17_WEIGHT = 1.0          # log-likelihood weight of zoom-17 captures (2010, 2015 here)
ROUND1_MAX = 15000        # round-1 training pairs per zoom (Pecatu has 12k)
TEMPER = 0.5             # likelihood power for the reported confidence (correlated errors per building)
STATUS = {"dated": 0, "dated_weak": 1, "there_by": 2, "not_seen": 3, "unseen": 4, "demolished": 5}


def dyear(d):
    y, m, dd = int(d[:4]), int(d[5:7]), int(d[8:10])
    return y + (m - 1) / 12 + (dd - 1) / 365


def grad_patch(p):
    from scipy.ndimage import gaussian_filter, sobel
    a = gaussian_filter(p.astype(np.float32), 1.0)
    return np.hypot(sobel(a, 1), sobel(a, 0)) / 8


def sim_matrix(patches, m, R=2):
    """Pairwise similarity of one building across captures: NCC of gradient magnitude over the footprint + 3 px,
    best over +-R px (residual misregistration). patches: equal-shape grey patches (PM margin); m: crop mask."""
    G = np.stack([grad_patch(p) for p in patches])
    n, hh, ww = G.shape
    o = MARGIN - PM + R
    mk = _dilate(m, 3)[o:m.shape[0] - o, o:m.shape[1] - o]
    if mk.shape != (hh - 2 * R, ww - 2 * R) or mk.sum() < 6:
        return None

    def norm(A):
        A = A - A.mean(1, keepdims=True)
        return A / (np.linalg.norm(A, axis=1, keepdims=True) + 1e-3)
    Bm = norm(G[:, R:hh - R, R:ww - R][:, mk])
    best = np.full((n, n), -1.0)
    for dy in range(-R, R + 1):
        for dx in range(-R, R + 1):
            best = np.maximum(best, norm(G[:, R + dy:hh - R + dy, R + dx:ww - R + dx][:, mk]) @ Bm.T)
    return np.maximum(best, best.T)


def sim_job(job):
    """Per building: s_k = similarity of capture k with the building as it looks now (mean of the best two of the
    three newest other known captures). nan when there is no reference."""
    i, ks, patches = job
    m = G["pos"][i]["m"]
    out = {}
    ok = [(k, p) for k, p in zip(ks, patches) if p is not None]
    if len(ok) < 2:
        return i, {k: float("nan") for k in ks}
    S = sim_matrix([p for _, p in ok], m)
    if S is None:
        return i, {k: float("nan") for k in ks}
    kk = [k for k, _ in ok]
    for a, k in enumerate(kk):
        refs = [b for b in range(len(kk) - 1, -1, -1) if b != a][:3]
        v = sorted((S[a, b] for b in refs), reverse=True)[:2]
        out[k] = float(np.mean(v))
    for k in ks:
        out.setdefault(k, float("nan"))
    return i, out


def bins(p, s):
    p, s = np.asarray(p, float), np.asarray(s, float)
    return np.searchsorted(PB, p), np.where(np.isnan(s), NSB - 1, np.searchsorted(SB, np.nan_to_num(s, nan=0.0)))


def fit_dates(seqs, size, cap_t, ncap, init, negcnt, cw=None, iters=60, alpha=30.0, dmax=0.01, never_max=0.05, ws=0.7,
              log=None):
    """Single change-point dating of every building at once, with per-capture error rates learned from the data
    (Dawid-Skene style EM). A building's history over its usable captures is absent* present* absent*: it appears
    once (or is there from its first capture, or never shows) and may be demolished.
    Emissions per capture c: P(P(roof) bin | state, c, size class) x P(similarity bin | state, c)^ws. A blurry, hazy
    or dark capture, or a classifier that over-reads soil in 2010, thus gets low weight automatically instead of
    vetoing or creating a date. The absent-state P(roof) table is anchored by the moved copies (known open ground,
    negcnt[c, size, pbin]) so 'absent' cannot drift into 'present but faint'. Appearance-year prior: per-area
    histogram (interval censored, also EM); 'never appears' is capped (the footprint is mapped today).
    cw[c] weights capture c's log-likelihood: the zoom-17 (~1.2 m) captures get Z17_WEIGHT, because blur merges a
    footprint with the roof next to it, a failure the moved copies (open ground) cannot measure.
    seqs[b] = [(capture, pbin, sbin)] in date order (usable observations only); init[b] = initial P(present) per obs."""
    B = len(seqs)
    n = np.array([len(s) for s in seqs])
    N = max(1, int(n.max()))
    C = np.zeros((B, N), int); XP = np.zeros((B, N), int); XS = np.zeros((B, N), int)
    V = np.zeros((B, N), bool); gam = np.zeros((B, N))
    for b, s in enumerate(seqs):
        if s:
            k = len(s)
            C[b, :k] = [o[0] for o in s]; XP[b, :k] = [o[1] for o in s]; XS[b, :k] = [o[2] for o in s]
            V[b, :k] = True; gam[b, :k] = init[b]
    S = np.asarray(size)[:, None].repeat(N, 1)
    cw = np.ones(ncap) if cw is None else np.asarray(cw, float)
    Tt = np.where(V, cap_t[C], 3000.0)
    pats = [(u, v) for u in range(N) for v in range(u + 1, N + 1)]
    U, Vv = np.array([u for u, _ in pats]), np.array([v for _, v in pats])
    ar = np.arange(N)
    I = ((ar[None, :] >= U[:, None]) & (ar[None, :] < Vv[:, None])).astype(float)       # (P, N) present?
    Uo = (ar[None, :] == U[:, None]).astype(float)                                       # (P, N) appears at
    valid = (Vv[None, :] <= n[:, None]) & (n[:, None] > 0)
    lo, hi = YB[:-1], YB[1:]
    FT = np.clip((Tt[..., None] - lo) / (hi - lo), 0, 1)                                  # (B, N, Y)
    FTp = np.concatenate([np.zeros((B, 1, len(lo))), FT[:, :-1]], 1)
    last = np.maximum(n - 1, 0)
    pi = np.full(len(lo), 1.0 / len(lo))
    late = lo >= 2026                     # after the newest captures / never: capped
    delta = 0.005
    rows = np.arange(B)
    demol = Vv[None, :] < n[:, None]
    for it in range(iters):
        # M-step: emission tables, shrunk towards the pooled table of the same size class and state
        cp = np.zeros((ncap, 3, 2, NPB)); cs = np.zeros((ncap, 2, NSB))
        np.add.at(cp, (C[V], S[V], 1, XP[V]), gam[V]); np.add.at(cp, (C[V], S[V], 0, XP[V]), 1 - gam[V])
        np.add.at(cs, (C[V], 1, XS[V]), gam[V]); np.add.at(cs, (C[V], 0, XS[V]), 1 - gam[V])
        cp[:, :, 0, :] += negcnt
        pool = cp.sum(0, keepdims=True) + 1.0
        pool /= pool.sum(-1, keepdims=True)
        thp = (cp + alpha * pool) / (cp.sum(-1, keepdims=True) + alpha)
        pools = cs.sum(0, keepdims=True) + 1.0
        pools /= pools.sum(-1, keepdims=True)
        ths = (cs + alpha * pools) / (cs.sum(-1, keepdims=True) + alpha)
        lthp, lths = np.log(thp), np.log(ths)
        # E-step
        L1 = np.where(V, (lthp[C, S, 1, XP] + ws * lths[C, 1, XS]) * cw[C], 0.0)
        L0 = np.where(V, (lthp[C, S, 0, XP] + ws * lths[C, 0, XS]) * cw[C], 0.0)
        cs0 = np.concatenate([np.zeros((B, 1)), np.cumsum(L0, 1)], 1)
        cs1 = np.concatenate([np.zeros((B, 1)), np.cumsum(L1, 1)], 1)
        tot0 = cs0[rows, n]
        ll = cs0[:, U] + cs1[:, Vv] - cs1[:, U] + tot0[:, None] - cs0[:, Vv]
        F = FT @ pi; Fp = FTp @ pi
        pa = np.maximum(F - Fp, 1e-9)
        pA = np.maximum(1 - F[rows, last], 1e-9)
        ld = np.where(demol, math.log(delta) + (Vv - 1 - U)[None, :] * math.log(1 - delta),
                      (n[:, None] - 1 - U[None, :]) * math.log(1 - delta))
        lp = np.where(valid, ll + np.log(pa[:, U]) + ld, -np.inf)
        lA = np.where(n > 0, tot0 + np.log(pA), -np.inf)
        Mx = np.maximum(lp.max(1), lA)
        Mx = np.where(np.isfinite(Mx), Mx, 0)
        w = np.exp(lp - Mx[:, None]); wA = np.exp(lA - Mx)
        Zs = w.sum(1) + wA + 1e-300
        w /= Zs[:, None]; wA /= Zs
        gam_new = w @ I
        # M-step: appearance-year histogram (late bins capped) and demolition rate
        a = w @ Uo
        r = ((a / pa)[..., None] * (FT - FTp)).sum((0, 1)) + (wA / pA) @ (1 - FT[rows, last])
        r = r * pi + 1e-3
        pi = r / r.sum()
        if pi[late].sum() > never_max:
            pi[late] *= never_max / pi[late].sum()
            pi[~late] *= (1 - never_max) / pi[~late].sum()
        expo = np.where(demol, Vv - U, n[:, None] - 1 - U[None, :])
        D, E = (w * demol).sum(), (w * np.where(valid, expo, 0)).sum()
        delta = float(np.clip(D / max(E, 1), 1e-4, dmax))
        change = float(np.abs(gam_new - gam)[V].max()) if V.any() else 0.0
        gam = gam_new
        if change < 1e-3:
            break
    if log:
        log(f"  EM {it + 1} iterations, demolition rate {delta:.4f}, appearance prior "
            + " ".join(f"{int(l) if l > 2000 else '<2010'}:{p:.3f}" for l, p in zip(lo, pi) if p > 0.005))
    # Decision: MAP pattern. Demolition needs strong, repeated evidence (>= 2 usable captures after it, tempered
    # posterior >= 0.8); otherwise the best pattern without it. Confidence: a tempered posterior (likelihood ^ TEMPER)
    # because errors of one building are correlated across captures (same outline offset, same neighbour roof),
    # so the plain product of per-capture likelihoods is overconfident.
    lpT = np.where(valid, TEMPER * ll + np.log(pa[:, U]) + ld, -np.inf)
    lAT = np.where(n > 0, TEMPER * tot0 + np.log(pA), -np.inf)
    MT = np.maximum(lpT.max(1), lAT)
    MT = np.where(np.isfinite(MT), MT, 0)
    wT = np.exp(lpT - MT[:, None]); wAT = np.exp(lAT - MT)
    ZT = wT.sum(1) + wAT + 1e-300
    wT /= ZT[:, None]; wAT /= ZT
    aT = wT @ Uo
    pdem = (wT * demol).sum(1)
    lpn = np.where(demol, -np.inf, lp)
    best = np.where(lp.max(1) >= lA, lp.argmax(1), -1)
    bestn = np.where(lpn.max(1) >= lA, lpn.argmax(1), -1)
    out = []
    for b in range(B):
        if n[b] == 0:
            out.append(None)
            continue
        k = best[b]
        if k >= 0 and demol[b, k] and not (pdem[b] >= 0.8 and n[b] - Vv[k] >= 2):
            k = bestn[b]
        if k < 0:
            out.append({"u": None, "v": None, "conf": float(wAT[b]), "gam": gam[b, :n[b]]})
            continue
        u, v = int(U[k]), int(Vv[k])
        if v < n[b]:
            conf = float(pdem[b])
        elif u == 0:
            conf = float(aT[b, :2].sum())
        else:
            conf = float(aT[b, max(0, u - 1):u + 2].sum())
        out.append({"u": u, "v": v, "conf": conf, "gam": gam[b, :n[b]]})
    return out, {"thp": thp, "ths": ths, "pi": pi, "delta": delta}


def fold_of(tile):
    return (tile[0] * 7919 + tile[1] * 104729) % 2


def crossfit(X, y, folds, label, log):
    """Two-fold MLP cross-fitting (folds by tile): model f never saw fold f. Returns the two models and a report."""
    p = np.zeros(len(y))
    ms = []
    for f in (0, 1):
        idx = np.flatnonzero(folds != f)
        if len(idx) > 40000:
            idx = np.random.default_rng(f).choice(idx, 40000, replace=False)
        m = MLP().fit(X[idx], y[idx])
        te = folds == f
        p[te] = m.p(X[te])
        ms.append(m)
    rep = {"n": int(len(y)), "pos_share": round(float(y.mean()), 3),
           "crossfit_acc_vs_em_labels": round(float(((p >= 0.5) == (y > 0.5)).mean()), 4)}
    log(f"  model {label}: {rep}")
    return ms, rep


def prepare(area, workers, refresh, T, log):
    import pickle, multiprocessing as mp
    t0 = time.time()
    spot, bld = load_buildings(area)
    caps, per = coverage(area, bld)
    keys = sorted(caps)                       # date order
    kidx = {k: j for j, k in enumerate(keys)}
    T["coverage"] = time.time() - t0
    log(f"[{area}] {len(bld)} buildings, {len(keys)} captures, coverage {T['coverage']:.0f}s")

    t1 = time.time()
    geo_p = os.path.join(SCRATCH, f"{area}.geo.v{GEO_VERSION}.pkl")
    if os.path.exists(geo_p) and not refresh:
        pos, neg, grid = pickle.load(open(geo_p, "rb"))
    else:
        pos, neg, grid = geometry(bld)
        pickle.dump((pos, neg, grid), open(geo_p + ".tmp", "wb")); os.replace(geo_p + ".tmp", geo_p)
    T["geometry"] = time.time() - t1

    groups, newest = {}, {}
    for i, p in enumerate(per):
        for k, z, src in p:
            groups.setdefault((k, z, src), []).append(i)
        if p:
            newest.setdefault((p[-1][0], p[-1][1], p[-1][2]), []).append(i)

    t1 = time.time()
    need = []
    for (k, z, src), idx in groups.items():
        ts = set()
        for i in idx:
            for e in (pos[i], neg[i]):
                if e is None:
                    continue
                tx, ty = e["tile"]
                for a in (-1, 0, 1):
                    for b in (-1, 0, 1):
                        ts.add((tx + a, ty + b))
        if z == 17:
            ts = {(x // 2, y // 2) for x, y in ts}
        need += [(z, src, x, y) for x, y in ts]
    nnew = fetch_tiles(need, area)
    T["tiles"] = time.time() - t1
    T["tiles_needed"], T["tiles_fetched"] = len(set(need)), nnew
    log(f"[{area}] tiles {len(set(need))} needed, {nnew} fetched, {T['tiles']:.0f}s")

    t1 = time.time()
    feat_p = os.path.join(SCRATCH, f"{area}.feats.v{FEAT_VERSION}.pkl")
    if os.path.exists(feat_p) and not refresh:
        res = pickle.load(open(feat_p, "rb"))
    else:
        G.update(pos=pos, neg=neg, grid=grid)
        jobs = [(k, z, src, idx, newest.get((k, z, src), [])) for (k, z, src), idx in groups.items()]
        jobs.sort(key=lambda j: -len(j[3]))
        res = []
        with mp.get_context("fork").Pool(workers) as pool:
            for r in pool.imap_unordered(score_group, jobs):
                res.append(r)
                log(f"  scored {r['ck'][0]} z{r['z']} rid {r['src']}: {len(r['pos'])} bld, shift {r['shift0']}, {r['secs']:.0f}s")
        pickle.dump(res, open(feat_p + ".tmp", "wb")); os.replace(feat_p + ".tmp", feat_p)
    # fixed order: imap_unordered returns groups in completion order, and the order of the observations and moved
    # copies built from res sets the round-2 folds and subsamples, so an unsorted res made reruns differ
    res.sort(key=lambda r: (r["ck"], r["z"], r["src"]))
    T["features"] = time.time() - t1
    return {"area": area, "spot": spot, "bld": bld, "caps": caps, "per": per, "keys": keys, "kidx": kidx,
            "pos": pos, "neg": neg, "grid": grid, "res": res, "newest": newest}


def run(area, workers=3, refresh=False, log=print):
    import multiprocessing as mp
    from collections import Counter
    T = {}
    t0 = time.time()
    ctx = prepare(area, workers, refresh, T, log)
    spot, bld, caps, keys, kidx = ctx["spot"], ctx["bld"], ctx["caps"], ctx["keys"], ctx["kidx"]
    pos, neg, res, newest = ctx["pos"], ctx["neg"], ctx["res"], ctx["newest"]
    nb, ncap = len(bld), len(keys)

    # ---- round 1: self-supervised (newest capture of each building = positive, its moved copy = negative)
    t1 = time.time()
    models, reports = {}, {}
    for z in (18, 17):
        Xp, Xn, tp, tn = [], [], [], []
        for r in res:
            src_p, src_n = ("pos", "neg") if z == 18 else ("pos17", "neg17")
            if z == 18 and r["z"] != 18:
                continue
            for i in newest.get((r["ck"], r["z"], r["src"]), []):
                fp, fn = r[src_p].get(i), r[src_n].get(i)
                if isinstance(fp, np.ndarray) and isinstance(fn, np.ndarray):
                    Xp.append(fp); tp.append(pos[i]["tile"]); Xn.append(fn); tn.append(neg[i]["tile"])
        if len(Xp) > ROUND1_MAX:      # big areas: a random subset of pairs is plenty and keeps training time flat
            keep = np.sort(np.random.default_rng(z).choice(len(Xp), ROUND1_MAX, replace=False))
            Xp, Xn = [Xp[k] for k in keep], [Xn[k] for k in keep]
            tp, tn = [tp[k] for k in keep], [tn[k] for k in keep]
        models[z], reports[f"round1_z{z}"] = train(np.array(Xp), np.array(Xn), tp, tn, f"round1 z{z}")
    T["train1"] = time.time() - t1

    # ---- observations: one per (building, capture)
    gray = {r["ck"] for r in res if r.get("sat", 1) < 0.08}   # panchromatic captures: colour features do not apply
    if gray:
        log(f"  grey (panchromatic) captures skipped: {sorted(c[0] for c in gray)}")
    ctxs, locs = {}, {}
    # edge energy depends on the capture's sharpness (2010 z17 ~4, 2025 ~12): compare it relative to the
    # capture's 75th percentile, so a building's own history across captures is comparable
    capE = {r["ck"]: float(np.percentile([c[2] for c in r["loc"].values() if c] or [1.0], 75)) + 1e-3 for r in res}
    for r in res:
        for i, c in r["ctx"].items():
            ctxs.setdefault(i, []).append(c)
        if r["ck"] in gray:
            continue
        for i, c in r["loc"].items():
            if c is not None and isinstance(r["pos"].get(i), np.ndarray):
                locs.setdefault(i, []).append((c[0], c[1], c[2] / capE[r["ck"]], c[3]))
    med = {i: tuple(np.median([c[k] for c in v]) for k in range(3)) for i, v in ctxs.items()}
    lmed = {i: tuple(np.median([c[k] for c in v]) for k in range(4)) for i, v in locs.items()}

    def hazy(i, c):
        """Cloud or haze over the ~50 m context: flat and brighter than this place usually is, or much whiter."""
        if c is None or i not in med:
            return False
        return c[0] < 7 or (c[0] < 0.45 * med[i][0] and c[1] > med[i][1]) or \
            (c[2] > 0.3 and c[2] > med[i][2] + 0.25 and c[1] > med[i][1] + 20)

    def hazy_local(i, c, ck):
        """Cloud or haze over the footprint itself (+ ~7 m), against this spot's usual look across captures (edge
        energy relative to the capture's norm): edges washed out and much brighter; or much greyer, a bit brighter
        and flatter; or far brighter and greyer; or a white flat patch covering much more of it than usual."""
        if c is None or i not in lmed:
            return False
        g_, s_, e_, w_ = c
        e_ = e_ / capE[ck]
        mg, ms, me, mw = lmed[i]
        return ((g_ > mg + 25 and e_ < 0.6 * me) or (s_ < 0.5 * ms and g_ > mg + 5 and e_ < 0.8 * me)
                or (g_ > mg + 35 and s_ < 0.75 * ms and e_ < 0.9 * me) or (w_ > 0.3 and w_ > mw + 0.25))

    O = {}     # (i, j) -> record
    nneg = {}
    for r in res:
        j = kidx[r["ck"]]
        for i, f in r["pos"].items():
            why = None
            if r["ck"] in gray:
                why = "grey"
            elif not isinstance(f, np.ndarray):
                why = f if isinstance(f, str) else "n/a"
            elif hazy(i, r["ctx"].get(i)):
                why = "haze"
            elif hazy_local(i, r["loc"].get(i), r["ck"]):
                why = "haze_local"
            O[(i, j)] = {"z": r["z"], "f": f if isinstance(f, np.ndarray) else None, "why": why,
                         "patch": r["patch"].get(i), "rec": r}
        if r["ck"] not in gray:
            for i, f in r["neg"].items():
                if isinstance(f, np.ndarray) and not hazy(i, r["nctx"].get(i)):
                    nneg.setdefault("j", []).append(j); nneg.setdefault("z", []).append(r["z"])
                    nneg.setdefault("i", []).append(i); nneg.setdefault("f", []).append(f)
    NJ, NZ, NI = (np.array(nneg.get(k, []), int) for k in "jzi")
    NF = np.array(nneg.get("f", []), np.float32).reshape(len(NJ), -1)
    NFOLD = np.random.default_rng(1).integers(0, 2, len(NJ))
    NP1, NP2 = np.zeros(len(NJ)), np.zeros(len(NJ))
    for z in (18, 17):
        if (NZ == z).any():
            NP1[NZ == z] = models[z].p(NF[NZ == z])
    # round-1 predictions, batched per zoom
    for z in (18, 17):
        ks = [k for k, o in O.items() if o["z"] == z and o["f"] is not None]
        if ks:
            pz = models[z].p(np.array([O[k]["f"] for k in ks]))
            for k, p in zip(ks, pz):
                O[k]["p1"] = float(p)
    log(f"  observations {len(O)}, unknown: " + str(dict(Counter(o['why'] for o in O.values() if o['why']))))

    # ---- temporal similarity to the building's current look
    t1 = time.time()
    byb = {}
    for (i, j), o in sorted(O.items()):
        if o["why"] is None:
            byb.setdefault(i, []).append((j, o["patch"]))
    jobs = [(i, [j for j, _ in v], [p for _, p in v]) for i, v in byb.items() if pos[i] is not None]
    G.update(pos=pos)
    with mp.get_context("fork").Pool(workers) as pool:
        for i, sims in pool.imap_unordered(sim_job, jobs, chunksize=64):
            for j, s in sims.items():
                O[(i, j)]["s"] = s
    T["similarity"] = time.time() - t1
    log(f"  temporal similarity {T['similarity']:.0f}s")

    cap_t = np.array([dyear(caps[k]["date"]) for k in keys])
    cw = np.array([Z17_WEIGHT if max(caps[k]["zooms"]) == 17 else 1.0 for k in keys])
    lat0 = float(np.mean([b["lat"] for b in bld]))
    size = np.array([0 if pos[i] is None else (0 if pos[i]["area"] * m_per_px(Z, lat0) ** 2 < SMALL_M2 else
                                               (1 if pos[i]["area"] < REG_MIN_PX else 2)) for i in range(nb)])

    obs_by_b = [[] for _ in range(nb)]
    for (i, j) in sorted(O):
        if O[(i, j)]["why"] is None and O[(i, j)]["f"] is not None:
            obs_by_b[i].append(j)

    def sequences(pkey):
        seqs, init = [], []
        for i in range(nb):
            ks = obs_by_b[i]
            pb, sb = bins([O[(i, j)][pkey] for j in ks], [O[(i, j)].get("s", float("nan")) for j in ks])
            seqs.append(list(zip(ks, pb.tolist(), sb.tolist())))
            init.append([O[(i, j)][pkey] for j in ks])
        return seqs, init, obs_by_b

    def negcnt(np_):
        """Moved copies (open ground) per capture, size class and P(roof) bin: anchors the absent state."""
        c = np.zeros((ncap, 3, NPB))
        np.add.at(c, (NJ, size[NI], np.searchsorted(PB, np_)), 1.0)
        return c

    # ---- EM round 1 on the round-1 classifier
    t1 = time.time()
    seqs, init, idx = sequences("p1")
    fit1, rates1 = fit_dates(seqs, size, cap_t, ncap, init, negcnt(NP1), cw, log=log)
    T["em1"] = time.time() - t1

    # ---- round 2: retrain on every capture, labelled by the EM fit (confident observations only, including
    # the absent-before-construction ones: cleared soil, slabs, building sites), plus the moved copies.
    # Cross-fitted by tile so no observation is scored by a model that saw it.
    t1 = time.time()
    lab = {}
    for i, fr in enumerate(fit1):
        if fr is None:
            continue
        for j, gm in zip(idx[i], fr["gam"]):
            if gm >= 0.9 or gm <= 0.1:
                lab[(i, j)] = float(gm >= 0.5)
    for z in (18, 17):
        ks = [k for k, o in O.items() if o["z"] == z and o["f"] is not None]
        if not ks:
            continue
        Xb = np.array([O[k]["f"] for k in ks]); yb = np.array([lab.get(k, -1.0) for k in ks])
        fb = np.array([fold_of(pos[k[0]]["tile"]) for k in ks])
        # moved copies that the round-1 model calls a sure roof mostly sit on unmapped buildings: not trained on
        nsel = (NZ == z) & (NP1 <= 0.85)
        Xn, fn = NF[nsel], NFOLD[nsel]
        L = yb >= 0
        X = np.vstack([Xb[L], Xn]); y = np.r_[yb[L], np.zeros(len(Xn))]; fo = np.r_[fb[L], fn]
        ms, rep = crossfit(X, y, fo, f"round2 z{z}", log)
        rep["em_labelled_obs"] = int(L.sum()); rep["moved_copies"] = int(len(Xn))
        reports[f"round2_z{z}"] = rep
        p2 = np.zeros(len(ks))
        for f in (0, 1):
            te = fb == f
            if te.any():
                p2[te] = ms[f].p(Xb[te])
            tn = (NZ == z) & (NFOLD == f)
            if tn.any():
                NP2[tn] = ms[f].p(NF[tn])
        for k, p in zip(ks, p2):
            O[k]["p2"] = float(p)
    T["train2"] = time.time() - t1

    # ---- EM round 2 on the round-2 classifier: the dates
    t1 = time.time()
    seqs, init, idx = sequences("p2")
    fit2, rates = fit_dates(seqs, size, cap_t, ncap, init, negcnt(NP2), cw, log=log)
    T["em2"] = time.time() - t1

    first, before, earliest, conf, status, gone = [], [], [], [], [], []
    for i in range(nb):
        fr, ks = fit2[i], idx[i]
        allk = sorted(j for j in range(ncap) if (i, j) in O)
        e = ks[0] if ks else (allk[0] if allk else -1)
        earliest.append(e)
        if fr is None:
            first.append(-2); before.append(-1); conf.append(0.0); status.append("unseen"); gone.append(-1)
            continue
        c = round(fr["conf"], 2)
        if fr["u"] is None:
            first.append(-2); before.append(-1); conf.append(c); status.append("not_seen"); gone.append(-1)
        elif fr["v"] < len(ks):
            first.append(-2); before.append(-1); conf.append(c); status.append("demolished"); gone.append(ks[fr["v"]])
        elif fr["u"] == 0:
            first.append(-1); before.append(-1); conf.append(c); status.append("there_by"); gone.append(-1)
        else:
            first.append(ks[fr["u"]]); before.append(ks[fr["u"] - 1]); conf.append(c); gone.append(-1)
            status.append("dated" if c >= 0.5 else "dated_weak")
    small = [int(s == 0) for s in size]

    # ---- stats
    frames = spot["frames"]
    cap_list = [{"date": caps[k]["date"], "rid": caps[k]["rid"], "res": caps[k]["res"], "sensor": caps[k]["sensor"],
                 "provider": caps[k]["provider"], "zoom": max(caps[k]["zooms"]), "n": caps[k]["n"]} for k in keys]
    st = Counter(status)
    yr_first, yr_first_big = Counter(), Counter()
    for i, (f, e) in enumerate(zip(first, earliest)):
        key = (cap_list[f]["date"][:4] if f >= 0 else ("by " + cap_list[e]["date"][:4] if f == -1 else status[i]))
        yr_first[key] += 1
        if not small[i]:
            yr_first_big[key] += 1
    agree = Counter()
    for i, b in enumerate(bld):
        old, f = b["first"], first[i]
        if f == -2:
            agree["no sharp date"] += 1
            continue
        hi = cap_list[f]["date"] if f >= 0 else cap_list[earliest[i]]["date"]
        lo = cap_list[before[i]]["date"] if f >= 0 else "0000"
        if old < 0:
            agree["old <=2019/undated, new by " + ("2019" if hi <= "2019-09-01" else "later")] += 1
            continue
        olo, ohi = frames[old - 1]["date"] if old > 0 else "0000", frames[old]["date"]
        if lo < ohi and olo < hi:
            agree["old dated, overlaps"] += 1
        elif hi <= olo:
            agree["old dated, sharp earlier"] += 1
        else:
            agree["old dated, sharp later"] += 1
    thp, ths = rates["thp"], rates["ths"]
    hiP = np.searchsorted(PB, 0.5)       # P(roof) bins at or above 0.5
    cnt_known, cnt_unk = Counter(), {}
    for (i, j), o in O.items():
        if o["why"] is None:
            cnt_known[j] += 1
        else:
            cnt_unk.setdefault(j, Counter())[o["why"]] += 1
    per_cap = {}
    for j, c in enumerate(cap_list):
        nj = NJ == j
        per_cap[c["date"]] = {"usable": cnt_known[j], "unknown": dict(cnt_unk.get(j, {})),
                              "em_recall_at_0.5": round(float(thp[j, 1:, 1, hiP:].sum(-1).mean()), 3),
                              "em_false_pos_at_0.5": round(float(thp[j, 1:, 0, hiP:].sum(-1).mean()), 3),
                              "moved_copies_false_pos_at_0.5": round(float((NP2[nj] >= 0.5).mean()), 3) if nj.any() else None}
    T["total"] = time.time() - t0
    stats = {"buildings": nb, "status": dict(st), "small_lt_25m2": int(sum(small)),
             "grey_captures": sorted(caps[k]["date"] for k in gray),
             "first_year": dict(sorted(yr_first.items())), "first_year_excl_small": dict(sorted(yr_first_big.items())),
             "sharp_dated_pct": round(100 * sum(f != -2 for f in first) / nb, 1),
             "conf_median_dated": round(float(np.median([c for c, s in zip(conf, status) if s in ("dated", "dated_weak")] or [0])), 3),
             "vs_sentinel": dict(agree), "model": reports, "per_capture": per_cap,
             "demolition_rate_per_interval": round(rates["delta"], 4),
             "timing_s": {k: round(v, 1) if isinstance(v, float) else v for k, v in T.items()}}
    out = {"area": area, "version": VERSION,
           "captures": [{k: c[k] for k in ("date", "rid", "res", "sensor", "provider", "zoom")} for c in cap_list],
           "first": first, "before": before, "earliest": earliest, "conf": conf,
           "status": [STATUS[s] for s in status], "gone": gone, "small": small,
           "status_codes": {str(v): k for k, v in STATUS.items()},
           "method": METHOD, "stats": stats}
    os.makedirs(os.path.join(ROOT, "out/sharp"), exist_ok=True)
    op = os.path.join(ROOT, "out/sharp", f"{area}.json")
    json.dump(out, open(op + ".tmp", "w"), separators=(",", ":"))
    os.replace(op + ".tmp", op)

    groups_out = {}
    for r in res:
        j = kidx[r["ck"]]
        for i in r["pos"]:
            t = pos[i]["tile"]
            dx, dy = r["shifts"].get(f"{t[0]},{t[1]}", r["shift0"])
            rx, ry = r["ref"].get(i, (dx, dy))
            groups_out[f"{i}:{j}"] = [r["z"], r["src"], rx, ry, dx, dy, *r["shift0"]]
    B_out = []
    for i in range(nb):
        ob = []
        for j in range(ncap):
            o = O.get((i, j))
            if o is None:
                continue
            fr = fit2[i]
            gm = None
            if o["why"] is None and fr is not None and j in idx[i]:
                gm = round(float(fr["gam"][idx[i].index(j)]), 3)
            s = o.get("s")
            ob.append([j, o.get("p2") and round(o["p2"], 3), o["why"] or [round(float(v), 4) for v in o["f"]],
                       o.get("p1") and round(o["p1"], 3), None if s is None or s != s else round(s, 3), gm])
        B_out.append({"i": i, "old": bld[i]["first"], "first": first[i], "before": before[i], "earliest": earliest[i],
                      "conf": conf[i], "status": status[i], "gone": gone[i], "small": small[i], "obs": ob})
    scores = {"area": area, "version": VERSION, "features": FEATS, "captures": cap_list,
              "models": {f"round1_z{z}": models[z].dump() for z in models}, "groups": groups_out,
              "em": {"p_table": np.round(thp, 4).tolist(), "s_table": np.round(ths, 4).tolist(),
                     "appearance_prior": np.round(rates["pi"], 4).tolist()},
              "buildings": B_out}
    json.dump(scores, open(os.path.join(SCRATCH, f"{area}.scores.json"), "w"), separators=(",", ":"))
    border = sorted(i for i in range(nb) if status[i] in ("dated", "dated_weak", "there_by") and conf[i] < 0.5)
    json.dump({"area": area, "rule": "dated or there-by with conf (P within one capture) < 0.5", "indices": border},
              open(os.path.join(SCRATCH, f"{area}.borderline.json"), "w"))
    log(json.dumps({k: v for k, v in stats.items() if k != "per_capture"}, indent=1))
    log(json.dumps(per_cap))
    return out, scores


METHOD = ("Sharp dates from Esri World Imagery Wayback captures (Maxar/Vantor WorldView, GeoEye, Legion; 0.3-0.5 m; "
          "pre-2017 captures only published at zoom 17, ~1.2 m). Per building: the captures whose metadata "
          "polygons cover its whole crop (footprint box + 7 m) in the release that made the tile bytes; captures coarser than 0.6 m and panchromatic ones "
          "are skipped. Footprints registered per capture (capture-wide shift, per-tile shift from footprints >= 100 m2, "
          "+-2 px per building), on outline edge strength. Observations under cloud or haze (context or footprint) are unknown. "
          "P(roof) per observation from a small neural net on 31 edge/vegetation/contrast/texture/colour/shadow features: "
          "round 1 self-supervised (footprint in its newest capture vs the same shape moved onto open ground), round 2 "
          "retrained on every capture with labels from the round-1 dating, cross-fitted by tile. Dating: one change point "
          "per building (absent, then present, optionally demolished) fitted jointly over all buildings by EM, with "
          "per-capture error rates learned from the data over P(roof) x similarity to the building's current look, and "
          "an appearance-year prior. first = capture where it first shows (-1 = there by its earliest usable capture "
          "earliest[]; -2 = no current-building date, see status); before = last usable capture before it, read as open "
          "ground. conf = posterior probability that the date is right within one capture (there by: first or second "
          "capture; not seen / demolished: probability of that state). status: 0 dated, 1 dated with conf < 0.5, "
          "2 there by, 3 not seen as a roof in any usable capture, 4 no usable capture, 5 demolished (gone = capture "
          "where it is gone). small = footprint under 25 m2 (tank, shed): treat its date as indicative only.")


# ---------------------------------------------------------------- review sheets (scratch only)

def crop_global(z, rid, gx0, gy0, size):
    """size x size RGB crop at zoom z whose top-left is global pixel (gx0, gy0); fetches tiles as needed."""
    out = np.zeros((size, size, 3), np.uint8)
    tx0, ty0, tx1, ty1 = gx0 // 256, gy0 // 256, (gx0 + size - 1) // 256, (gy0 + size - 1) // 256
    jobs = [(z, rid, x, y) for y in range(ty0, ty1 + 1) for x in range(tx0, tx1 + 1)]
    pmap(lambda j: get_tile(*j), jobs)
    for _, _, x, y in jobs:
        t = read_tile(z, rid, x, y)
        if t is None:
            continue
        ax, ay = x * 256 - gx0, y * 256 - gy0
        sx0, sy0 = max(0, -ax), max(0, -ay)
        dx0, dy0 = max(0, ax), max(0, ay)
        w, h = min(256 - sx0, size - dx0), min(256 - sy0, size - dy0)
        out[dy0:dy0 + h, dx0:dx0 + w] = t[sy0:sy0 + h, sx0:sx0 + w]
    return out


def z19_ok(area, rid, tx18, ty18):
    """True when release rid's zoom-19 tiles over this zoom-18 tile come from rid itself (so: the same capture)."""
    d = cached_json(os.path.join(SCRATCH, "tilemap", area, f"{rid}_19_{2 * tx18}_{2 * ty18}_2_2.json"),
                    TILEMAP.format(rid=rid, z=19, y=2 * ty18, x=2 * tx18, h=2, w=2))
    if not d.get("data") or not all(d["data"]):
        return False
    return all(int(s) == rid for s in (d.get("select") or [rid] * 4))


def sheets(area, indices, tag="", labels=None, sc=None):
    """One PNG per building (scratch only): every capture covering it, outline at the building's registered shift
    (yellow) and at the capture-wide shift (cyan). Caption: P(roof) final (round 1), similarity s, posterior g.
    Borders: green = first, red = before (open ground), orange = gone."""
    sc = sc or json.load(open(os.path.join(SCRATCH, f"{area}.scores.json")))
    spot, bld = load_buildings(area)
    caps = sc["captures"]
    frames = spot["frames"]
    odir = os.path.join(SCRATCH, "sheets", area)
    os.makedirs(odir, exist_ok=True)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 12)
        small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 11)
    except Exception:
        font = small = ImageFont.load_default()
    labels = labels or {}
    f2 = lambda v: "-" if v is None else f"{v:.2f}"
    paths = []
    for i in indices:
        b = sc["buildings"][i]
        rings = [np.stack(merc(r[:, 0], r[:, 1], Z), 1) for r in bld[i]["rings"]]
        cx, cy = merc(bld[i]["lon"], bld[i]["lat"], Z)
        cx, cy = float(cx), float(cy)
        t18 = (int(cx // 256), int(cy // 256))
        cells_ = []
        for j, p, f, p1, s, gm in b["obs"]:
            g = sc["groups"].get(f"{i}:{j}")
            if not g:
                continue
            z, src, dx, dy, tdx, tdy, s0x, s0y = g
            if z == 18 and z19_ok(area, src, *t18):
                zz, k = 19, 2
            else:
                zz, k = z, 2 ** (z - 18)        # 1 at 18, 0.5 at 17
            size = int(round(70 / m_per_px(zz, bld[i]["lat"])))
            ccx, ccy = (cx + dx) * k, (cy + dy) * k
            gx0, gy0 = int(ccx - size / 2), int(ccy - size / 2)
            im = Image.fromarray(crop_global(zz, src, gx0, gy0, size)).resize((200, 200), Image.LANCZOS)
            sc_ = 200 / size
            d = ImageDraw.Draw(im)
            for (ox_, oy_), col in (((s0x, s0y), (0, 200, 230)), ((dx, dy), (255, 230, 0))):
                for r in rings:
                    d.line([(((x + ox_) * k - gx0) * sc_, ((y + oy_) * k - gy0) * sc_) for x, y in r], fill=col, width=1)
            col = (40, 200, 60) if j == b["first"] else ((220, 50, 50) if j == b["before"] else
                                                          ((255, 140, 0) if j == b.get("gone") else None))
            if col:
                d.rectangle([0, 0, 199, 199], outline=col, width=3)
            c = caps[j]
            l1 = f"{c['date']} {c['res']}m z{zz}"
            l2 = f"p={f2(p)} ({f2(p1)}) s={f2(s)} g={f2(gm)}" if not isinstance(f, str) else f"unknown: {f}"
            cells_.append((im, l1, l2))
        old = b["old"]
        old_txt = f"{frames[old]['year']}" if old >= 0 else "<=2019 or undated"
        st = b["status"]
        if b["first"] >= 0:
            new_txt = f"{caps[b['first']]['date']}" + (f" (open ground {caps[b['before']]['date']})" if b["before"] >= 0 else "")
        elif b["first"] == -1:
            new_txt = f"there by {caps[b['earliest']]['date']}"
        elif st == "demolished":
            new_txt = f"demolished, gone by {caps[b['gone']]['date']}"
        else:
            new_txt = f"no sharp date ({st})"
        lab = labels.get(str(i))
        head = (f"{area} #{i}  old Sentinel: {old_txt}   sharp: {new_txt}   [{st}] conf {b['conf']:.2f}"
                + ("  SMALL" if b.get("small") else "") + (f"   reviewer: {lab}" if lab else "") + f"  {tag}")
        ncol = min(5, max(1, len(cells_)))
        nrow = max(1, math.ceil(len(cells_) / ncol))
        sheet = Image.new("RGB", (max(ncol * 204 + 4, 820), 26 + nrow * 234), (20, 20, 20))
        d = ImageDraw.Draw(sheet)
        d.text((6, 6), head, fill=(255, 255, 255), font=font)
        for n_, (im, l1, l2) in enumerate(cells_):
            x, y = 4 + (n_ % ncol) * 204, 26 + (n_ // ncol) * 234
            sheet.paste(im, (x, y))
            d.text((x + 2, y + 202), l1, fill=(230, 230, 230), font=small)
            d.text((x + 2, y + 216), l2, fill=(230, 230, 230), font=small)
        p_ = os.path.join(odir, f"{i}.png")
        sheet.save(p_)
        paths.append(p_)
    return paths


def load_labels(area, path=None):
    path = path or os.path.join(SCRATCH, "labels", f"{area}.json")
    return json.load(open(path))["labels"] if os.path.exists(path) else {}


def review(area, seed=7, labels_path=None):
    """Review sheets, stratified: the 25 random ones (same seed as before), every hand-labelled building, and the
    places where errors hide: sharp later than Sentinel, not seen, demolished, borderline, small, and the biggest
    disagreements in both directions."""
    sc = json.load(open(os.path.join(SCRATCH, f"{area}.scores.json")))
    spot = json.load(open(os.path.join(ROOT, "out/spots", f"{area}.json")))
    frames, caps, B = spot["frames"], sc["captures"], sc["buildings"]
    labels = load_labels(area, labels_path)
    rng = random.Random(seed)
    year = lambda d: int(d[:4]) + (int(d[5:7]) - 0.5) / 12

    def new_year(b):
        if b["first"] >= 0:
            return year(caps[b["first"]]["date"])
        if b["first"] == -1:
            return year(caps[b["earliest"]]["date"])
        return None

    old_year = lambda b: frames[b["old"]]["year"] + 0.6 if b["old"] >= 0 else 2019.6
    rand = rng.sample(range(len(B)), 25)
    taken = set(rand) | {int(k) for k in labels}
    r2 = random.Random(seed + 1)

    def pick(name, cand, k):
        cand = [i for i in cand if i not in taken]
        out = r2.sample(cand, min(k, len(cand)))
        taken.update(out)
        return out
    dated = [b for b in B if new_year(b) is not None]
    later = [b["i"] for b in dated if b["old"] >= 0 and new_year(b) > old_year(b) + 1]
    earlier = sorted([b for b in dated if b["old"] >= 0], key=lambda b: new_year(b) - old_year(b))
    sets = {"random": rand, "labelled": sorted(int(k) for k in labels),
            "sharp_later": pick("later", later, 10),
            "not_seen": pick("ns", [b["i"] for b in B if b["status"] == "not_seen"], 8),
            "demolished": pick("dem", [b["i"] for b in B if b["status"] == "demolished"], 6),
            "borderline": pick("bord", [b["i"] for b in B if b["status"] in ("dated", "dated_weak", "there_by")
                                        and b["conf"] < 0.5], 8),
            "small": pick("small", [b["i"] for b in dated if b.get("small")], 5),
            "most_earlier": pick("earl", [b["i"] for b in earlier[:300]], 6)}
    out = {}
    for name, idx in sets.items():
        out[name] = sheets(area, idx, name, labels, sc)
        print(name, idx, flush=True)
    json.dump(out, open(os.path.join(SCRATCH, "sheets", area, "index.json"), "w"), indent=1)
    return out


def evaluate(area, labels_path=None, scores_path=None, out_path=None, quiet=False):
    """Accuracy on hand-labelled buildings: is the date right within one capture of the building's own capture list?
    Compares the old Sentinel date (interval between Sentinel frames; -1 = standing by the 2019 frame) with the sharp
    date (dated: |first - truth| <= 1 capture; there by: truth at most one capture after earliest; no date: right
    only when the truth is 'none' or 'demolished')."""
    labels = load_labels(area, labels_path)
    sc = json.load(open(scores_path or os.path.join(SCRATCH, f"{area}.scores.json")))
    out = json.load(open(out_path or os.path.join(ROOT, "out/sharp", f"{area}.json")))
    spot = json.load(open(os.path.join(ROOT, "out/spots", f"{area}.json")))
    frames, caps = spot["frames"], sc["captures"]
    res = {"old": [0, 0, 0], "sharp": [0, 0, 0]}
    rows = []
    for k, truth in sorted(labels.items(), key=lambda kv: int(kv[0])):
        if truth == "unclear":
            continue
        i = int(k)
        b = sc["buildings"][i]
        lst = [o[0] for o in b["obs"] if o[2] != "grey"]
        dates = [caps[j]["date"] for j in lst]
        f, e = out["first"][i], out["earliest"][i]
        st = b.get("status", "")
        if truth in ("none", "demolished"):
            ok_new = f == -2 and st not in ("unseen",)
            ex_new = ok_new and (truth == "demolished") == (st == "demolished")
            ok_old = ex_old = False
            pred = st
        else:
            r = dates.index(truth)
            if f >= 0:
                pf = lst.index(f)
                ok_new, ex_new = abs(pf - r) <= 1, pf == r
                pred = caps[f]["date"]
            elif f == -1:
                pe = lst.index(e)
                ok_new, ex_new = r <= pe + 1, r <= pe
                pred = "by " + caps[e]["date"]
            else:
                ok_new = ex_new = False
                pred = st
            old = b["old"]
            olo = frames[old - 1]["date"] if old > 0 else "0000"
            ohi = frames[old]["date"] if old >= 0 else frames[1]["date"]
            lo1, hi1 = (dates[r - 2] if r >= 2 else "0000"), (dates[r + 1] if r + 1 < len(dates) else "9999")
            lo0, hi0 = (dates[r - 1] if r >= 1 else "0000"), dates[r]
            ok_old, ex_old = (olo < hi1 and ohi > lo1), (olo < hi0 and ohi > lo0)
        res["old"][0] += ok_old; res["old"][1] += ex_old; res["old"][2] += 1
        res["sharp"][0] += ok_new; res["sharp"][1] += ex_new; res["sharp"][2] += 1
        rows.append({"i": i, "truth": truth, "sharp": pred, "conf": out["conf"][i], "sharp_ok": bool(ok_new),
                     "old": (frames[b["old"]]["year"] if b["old"] >= 0 else "<=2019"), "old_ok": bool(ok_old)})
    summ = {k: {"within_one": v[0], "exact": v[1], "n": v[2]} for k, v in res.items()}
    if not quiet:
        for r_ in rows:
            print(f"  #{r_['i']:>6} truth {r_['truth']:<11} sharp {str(r_['sharp']):<16} conf {r_['conf']:.2f} "
                  f"{'ok ' if r_['sharp_ok'] else 'BAD'}   old {r_['old']} {'ok' if r_['old_ok'] else 'BAD'}")
        print(json.dumps(summ))
    return summ, rows


# ---------------------------------------------------------------- CLI: one area, several or all; resumable, logged

ORDER = ["uluwatu", "lembongan", "pecatu", "pererenan", "jimbaran", "ubud", "seminyak", "canggu", "kerobokan"]


class Tee:
    def __init__(self, path):
        os.makedirs(os.path.dirname(path), exist_ok=True)
        self.f, self.o = open(path, "a", buffering=1), sys.__stdout__

    def write(self, s):
        self.o.write(s); self.f.write(s)

    def flush(self):
        self.o.flush(); self.f.flush()


def finished(area):
    p = os.path.join(ROOT, "out/sharp", f"{area}.json")
    if not os.path.exists(p):
        return None
    try:
        d = json.load(open(p))
    except Exception:
        return None
    return d if d.get("version") == VERSION else None


def areas_of(target):
    if target in (None, "all"):
        return list(ORDER)
    out = [a for a in target.split(",") if a]
    bad = [a for a in out if a not in SPOTS]
    if bad:
        sys.exit(f"unknown area(s) {bad}; known: {', '.join(ORDER)}")
    return out


def run_many(areas, workers, refresh, force):
    runs_p = os.path.join(SCRATCH, "runs.json")
    runs = json.load(open(runs_p)) if os.path.exists(runs_p) else {}
    failed = []
    for area in areas:
        if not force and finished(area):
            print(f"[{area}] already done with {VERSION} (out/sharp/{area}.json); --force to redo", flush=True)
            continue
        sys.stdout = Tee(os.path.join(SCRATCH, "logs", f"{area}.log"))
        t0 = time.time()
        print(f"==== {area} start {time.strftime('%Y-%m-%d %H:%M:%S')} ({VERSION}, workers {workers})", flush=True)
        try:
            out, _ = run(area, workers, refresh)
            secs = time.time() - t0
            runs[area] = {"version": VERSION, "finished": time.strftime("%Y-%m-%d %H:%M:%S"), "seconds": round(secs),
                          "buildings": out["stats"]["buildings"], "stages_s": out["stats"]["timing_s"],
                          "sharp_dated_pct": out["stats"]["sharp_dated_pct"]}
            json.dump(runs, open(runs_p, "w"), indent=1)
            print(f"==== {area} done in {secs / 60:.1f} min", flush=True)
        except Exception:
            import traceback
            traceback.print_exc(file=sys.stdout)
            failed.append(area)
            print(f"==== {area} FAILED after {(time.time() - t0) / 60:.1f} min (caches kept; rerun resumes)", flush=True)
        finally:
            sys.stdout.f.close()
            sys.stdout = sys.__stdout__
    status()
    return failed


def status():
    runs_p = os.path.join(SCRATCH, "runs.json")
    runs = json.load(open(runs_p)) if os.path.exists(runs_p) else {}
    for a in ORDER:
        d = finished(a)
        r = runs.get(a, {})
        n = json.load(open(os.path.join(ROOT, "out/spots", f"{a}.json")))["buildings"]["n"]
        print(f"  {a:<10} {n:>6} buildings  {'done' if d else 'todo':<4}  "
              + (f"{r.get('seconds', 0) / 60:5.1f} min  dated {d['stats']['sharp_dated_pct']}%" if d else ""))


def main():
    cmds = ["run", "status", "coverage", "sheets", "review", "eval"]
    argv = sys.argv[1:]
    if argv and not argv[0].startswith("-") and argv[0] not in cmds:
        argv = ["run"] + argv          # old form: sharp_dates.py <area> ...
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("cmd", choices=cmds)
    ap.add_argument("target", nargs="?", help="area, comma list, or 'all' (run/status)")
    ap.add_argument("indices", nargs="?", help="sheets: comma separated building indices")
    ap.add_argument("--workers", type=int, default=3)
    ap.add_argument("--refresh", action="store_true", help="recompute cached geometry and features")
    ap.add_argument("--force", action="store_true", help="redo areas already finished with this version")
    ap.add_argument("--labels", help="hand labels JSON (default: scratch labels/<area>.json)")
    ap.add_argument("--sheets", help="(old form) comma separated building indices")
    ap.add_argument("--review", action="store_true", help="(old form) standard review sheets")
    a = ap.parse_args(argv)
    if a.cmd == "run" and a.sheets:
        a.cmd, a.indices = "sheets", a.sheets
    if a.cmd == "run" and a.review:
        a.cmd = "review"
    if a.cmd == "status":
        status()
    elif a.cmd == "coverage":
        spot, bld = load_buildings(a.target)
        caps, per = coverage(a.target, bld)
        for k in sorted(caps):
            print(k, caps[k]["res"], caps[k]["n"], caps[k]["zooms"], caps[k]["rid"])
    elif a.cmd == "sheets":
        print("\n".join(sheets(a.target, [int(x) for x in a.indices.split(",")], labels=load_labels(a.target, a.labels))))
    elif a.cmd == "review":
        review(a.target, labels_path=a.labels)
    elif a.cmd == "eval":
        evaluate(a.target, a.labels)
    else:
        failed = run_many(areas_of(a.target), a.workers, a.refresh, a.force)
        sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
