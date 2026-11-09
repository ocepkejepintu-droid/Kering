"""Building outlines dated by the satellite record, for the Satellite view's time lens.

Library used by spot.py. For one area:
  1. Fetch every building footprint in the frame from Overture Maps (OpenStreetMap, Google
     Open Buildings and Microsoft ML Buildings, merged), anonymous S3 read via DuckDB.
  2. Build a conservative per-pixel change map from the Sentinel-2 frames: a pixel counts when
     it turns bright after 2019 and stays bright in most later frames, including at least one
     later frame. Brightness is normalised per frame to the median land luminance.
  3. Date each footprint: the first frame where its pixels changed (strict), else the first
     frame after which its coverage-weighted luminance stays above the early/late midpoint
     while it is no longer mostly green (footprint-level). Otherwise undated: standing by
     2019, or too small or dark-roofed to see at 10 m.
  4. Fetch June-October rain for 2018-2026 at the frame centre (Open-Meteo, ERA5).

"""
import base64, io, json, os, sys, time, urllib.request
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
from shapely import wkt as WKT
from shapely.geometry import MultiPolygon

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../out")
OVERTURE = "s3://overturemaps-us-west-2/release/2026-09-23.0/theme=buildings/type=building/*"
SCALE = 20  # coordinates stored as image px × 20 (0.05 px ≈ 0.6 m)


def change_map(A):
    R, G, B = A[..., 0], A[..., 1], A[..., 2]
    sea = ndimage.binary_dilation(((B > R + 12) & (R < 70)).mean(0) > 0.3, iterations=4)
    land = ~sea
    lum = A.sum(-1)
    med = np.array([np.median(l[land]) for l in lum])
    L = lum * (np.median(med) / med)[:, None, None]
    bright = (L > 470) & land & (np.abs(R - B) < 55)
    n = len(A)
    base = bright[:2].any(0)
    first = np.full(lum.shape[1:], -1)
    for k in range(2, n - 1):
        hit = bright[k] & (bright[k:].mean(0) >= 0.75) & bright[k + 1:].any(0) & ~base & (first < 0)
        first[hit] = k
    lab, nl = ndimage.label(first >= 0)
    sizes = ndimage.sum(np.ones_like(lab), lab, range(1, nl + 1))
    first[~np.isin(lab, np.where(sizes >= 5)[0] + 1)] = -1
    green = (G > R + 5) & (G > B)
    return first, L, green, land


def fetch_buildings(bbox):
    import duckdb
    for k in list(os.environ):
        if k.startswith("AWS_"):
            os.environ.pop(k)  # anonymous read; a proxy-injected key would be rejected
    con = duckdb.connect()
    con.execute("INSTALL httpfs; LOAD httpfs; INSTALL spatial; LOAD spatial;")
    con.execute("CREATE OR REPLACE SECRET anon (TYPE s3, PROVIDER config, KEY_ID '', SECRET '', REGION 'us-west-2');")
    x0, y0, x1, y1 = bbox
    return con.execute(f"""
        SELECT ST_AsText(geometry), sources[1].dataset FROM read_parquet('{OVERTURE}', hive_partitioning=1)
        WHERE bbox.xmin < {x1} AND bbox.xmax > {x0} AND bbox.ymin < {y1} AND bbox.ymax > {y0}""").fetchall()


def dry_rain(lat, lon):
    url = (f"https://archive-api.open-meteo.com/v1/archive?latitude={lat}&longitude={lon}"
           "&start_date=2018-01-01&end_date=2026-10-31&daily=precipitation_sum&timezone=Asia%2FMakassar")
    for attempt in range(5):
        try:
            d = json.load(urllib.request.urlopen(url, timeout=120))["daily"]
            break
        except Exception as e:  # rate limits happen; back off
            print("rain retry", e, file=sys.stderr)
            time.sleep(15 * (attempt + 1))
    else:
        return None  # rate limited for the day; the caller falls back to the village rain series
    out = {}
    for t, v in zip(d["time"], d["precipitation_sum"]):
        if 6 <= int(t[5:7]) <= 10:
            out[t[:4]] = out.get(t[:4], 0) + (v or 0)
    return {k: round(v) for k, v in out.items()}


def date_buildings(A, rows, bbox, years):
    """Date each footprint against frames A (n, h, w, 3). Returns the encoded record for the app."""
    h, w = A.shape[1:3]
    first, L, green, land = change_map(A)
    n = len(A)
    x0, y0, x1, y1 = bbox
    to_px = lambda lon, lat: ((lon - x0) / (x1 - x0) * w, (y1 - lat) / (y1 - y0) * h)
    flat, counts, how = [], {}, {"pixel": 0, "footprint": 0, "none": 0}
    for wkt, src in rows:
        g = WKT.loads(wkt)
        rings = [[to_px(*c) for c in p.exterior.coords][:-1] for p in (g.geoms if isinstance(g, MultiPolygon) else [g])]
        xs = [p[0] for r in rings for p in r]; ys = [p[1] for r in rings for p in r]
        bx0, by0 = max(0, int(min(xs)) - 1), max(0, int(min(ys)) - 1)
        bx1, by1 = min(w, int(max(xs)) + 2), min(h, int(max(ys)) + 2)
        if bx1 <= bx0 or by1 <= by0:
            continue
        S = 4
        im = Image.new("L", ((bx1 - bx0) * S, (by1 - by0) * S), 0)
        dr = ImageDraw.Draw(im)
        for r in rings:
            dr.polygon([((x - bx0) * S, (y - by0) * S) for x, y in r], fill=1)
        m = np.asarray(im, dtype=float).reshape(by1 - by0, S, bx1 - bx0, S).mean((1, 3))
        if m.sum() == 0:
            continue
        sl = (slice(by0, by1), slice(bx0, bx1))
        ks = first[sl][(m > 0.2) & (first[sl] >= 0)]
        yr, kind = (int(ks.min()), "pixel") if ks.size else (-1, "none")
        if yr < 0:
            cov = m / m.sum()
            lumY = [(L[k][sl] * cov).sum() for k in range(n)]
            grY = [(green[k][sl] * cov).sum() for k in range(n)]
            early, late = np.mean(lumY[:2]), np.mean(lumY[-3:])
            if late - early > 60 and np.mean(grY[-3:]) < 0.5:
                mid = (early + late) / 2
                for k in range(2, n - 1):
                    if all(v > mid for v in lumY[k:]):
                        yr, kind = k, "footprint"
                        break
        how[kind] += 1
        if yr >= 0:
            counts[years[yr]] = counts.get(years[yr], 0) + 1
        flat += [yr, len(rings)]
        for r in rings:
            flat.append(len(r))
            for x, y in r:
                flat += [round(x * SCALE), round(y * SCALE)]
    arr = np.array(flat, dtype=np.int16)
    return {"n": sum(how.values()), "how": how, "firstSeen": counts, "scale": SCALE,
            "b64": base64.b64encode(arr.tobytes()).decode(),
            "source": "Overture Maps 2026-09-23 (OpenStreetMap, Google Open Buildings, Microsoft ML Buildings)"}
