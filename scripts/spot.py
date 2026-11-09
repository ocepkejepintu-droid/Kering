"""Build one Satellite-view area: dry-season Sentinel-2 frames plus dated building outlines.

  pip install duckdb shapely scipy pillow numpy rasterio pystac-client planetary-computer
  python3 spot.py <id> [<id> ...]        fetch and build the listed areas from spots.json
                                         (about 10 minutes each; run several in parallel)

Writes ../out/spots/<id>.json. Frame selection: per year, the June 1 - November 15 Sentinel-2 L2A
pass with the least cloud (scene classification) and haze (B02 median) over the area, stitched
from every tile of that pass. Dating rules are those in buildings.py.
"""
import base64, io, json, os, sys
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "../out")
sys.path.insert(0, HERE)
from buildings import change_map, fetch_buildings, dry_rain, date_buildings  # noqa: E402

SPOTS = {s["id"]: s for s in json.load(open(os.path.join(HERE, "spots.json")))}


def fetch_frames(bbox, years=range(2018, 2027)):
    import rasterio, pystac_client, planetary_computer as pc
    from rasterio.warp import transform_bounds
    from rasterio.windows import from_bounds
    cat = pystac_client.Client.open("https://planetarycomputer.microsoft.com/api/stac/v1", modifier=pc.sign_inplace)

    def read(items, band):
        """One band over the area, stitched from every tile of the same pass (tiles share a UTM grid)."""
        out = None
        for it in items:
            with rasterio.open(it.assets[band].href) as src:
                w = from_bounds(*transform_bounds("EPSG:4326", src.crs, *bbox), src.transform)
                f = src.res[0] / 10
                arr = src.read(1, window=w, out_shape=(int(round(w.height * f)), int(round(w.width * f))), boundless=True,
                               fill_value=0, resampling=rasterio.enums.Resampling.bilinear).astype("float32")
            if out is None:
                out = arr
            else:
                h, ww = min(out.shape[0], arr.shape[0]), min(out.shape[1], arr.shape[1])
                out, arr = out[:h, :ww], arr[:h, :ww]
                gap = (out == 0) & (arr != 0)
                out[gap] = arr[gap]
        return out

    offset = lambda it: 1000.0 if it.properties["datetime"] >= "2022-01-25" else 0.0
    frames = []
    for y in years:
        items = list(cat.search(collections=["sentinel-2-l2a"], bbox=bbox, datetime=f"{y}-06-01/{y}-11-15",
                                query={"eo:cloud_cover": {"lt": 40}}).items())
        # group the tiles of one pass: same day, same satellite
        passes = {}
        for it in items:
            passes.setdefault((it.properties["datetime"][:10], it.properties.get("platform")), []).append(it)
        ranked = sorted(passes.values(), key=lambda g: max(i.properties["eo:cloud_cover"] for i in g))[:12]
        best = None
        for group in ranked:
            try:
                off = offset(group[0])
                raw2 = read(group, "B02")
                if (raw2 == 0).mean() > 0.01:
                    continue  # the pass does not cover the whole area
                b2 = (raw2 - off) / 1e4
                if np.nanmedian(b2) <= 0.01:
                    continue
                # cloud from the scene classification (8, 9 medium/high cloud, 10 cirrus; 3 shadow counts half):
                # a brightness test would call a town full of white roofs cloudy
                scl = read(group, "SCL")
                cloud = float(np.isin(scl, [8, 9, 10]).mean() + 0.5 * (scl == 3).mean())
                haze = float(np.median(b2))
                bad = cloud + max(0, haze - 0.09) * 5
                if best is None or bad < best[0]:
                    best = (bad, group, cloud)
                if cloud < 0.005 and haze < 0.08:
                    break
            except Exception as e:
                print("  read error", e, file=sys.stderr)
        if not best or best[2] > 0.08:
            print(f"  {y}: no clear scene", flush=True)
            continue
        _, group, cloud = best
        off = offset(group[0])
        B = {b: (read(group, b) - off) / 1e4 for b in ["B04", "B03", "B02", "B08"]}
        h = min(a.shape[0] for a in B.values()); w = min(a.shape[1] for a in B.values())
        R, G, Bl, N = (B[k][:h, :w] for k in ["B04", "B03", "B02", "B08"])
        ndvi = (N - R) / np.maximum(N + R, 1e-6)
        land = (N > 0.12) & ~((Bl > 0.15) & (R > 0.15))
        rgb = np.clip(np.dstack([R, G, Bl]) / 0.26, 0, 1) ** (1 / 1.3)
        img = Image.fromarray((rgb * 255).astype("uint8")).resize((480, int(480 * h / w)), Image.LANCZOS)
        buf = io.BytesIO(); img.save(buf, "JPEG", quality=80)
        green = float((ndvi[land] > 0.4).mean() * 100) if land.any() else 0.0
        date = group[0].properties["datetime"][:10]
        frames.append({"year": y, "date": date, "cloudPct": round(cloud * 100, 1), "tiles": len(group),
                       "greenPct": round(green, 1), "img": "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()})
        print(f"  {y}: {date} cloud {frames[-1]['cloudPct']}% from {len(group)} tile(s)", flush=True)
    return frames


def build(spot, frames, rows=None):
    A = np.stack([np.asarray(Image.open(io.BytesIO(base64.b64decode(f["img"].split(",")[1]))).convert("RGB")).astype(float) for f in frames])
    rows = rows if rows is not None else fetch_buildings(spot["bbox"])
    b = date_buildings(A, rows, spot["bbox"], [f["year"] for f in frames])
    x0, y0, x1, y1 = spot["bbox"]
    rain = dry_rain(round((y0 + y1) / 2, 3), round((x0 + x1) / 2, 3))
    if rain is None:
        # Open-Meteo refused (daily limit): use the village's ERA5 series from villages.py, 2018-2025; 2026 stays missing
        row = next(r for r in json.load(open(f"{OUT}/rows.json")) if r["desa"] == spot["village"] and r.get("rainDrySeries"))
        rain = {str(1996 + i): v for i, v in enumerate(row["rainDrySeries"]) if 1996 + i >= 2018}
        print(f"{spot['id']}: rain from the village series (2026 missing)", flush=True)
    b["dryRain"] = rain
    out = {**spot, "frames": frames, "buildings": b}
    os.makedirs(f"{OUT}/spots", exist_ok=True)
    json.dump(out, open(f"{OUT}/spots/{spot['id']}.json", "w"), separators=(",", ":"))
    print(f"{spot['id']}: {len(frames)} frames, {b['n']} buildings, {sum(b['firstSeen'].values())} dated, "
          f"{os.path.getsize(f'{OUT}/spots/' + spot['id'] + '.json') // 1024} KB", flush=True)


def main(args):
    for sid in args:
        spot = SPOTS[sid]
        print(f"{sid}: fetching frames", flush=True)
        build(spot, fetch_frames(spot["bbox"]))


if __name__ == "__main__":
    main(sys.argv[1:])
