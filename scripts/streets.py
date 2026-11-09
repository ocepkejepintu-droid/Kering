"""Street names for the satellite view: named roads from Overture Maps (OpenStreetMap) per area.

For each area in spots.json, reads the named road segments inside its bbox from the Overture
transportation theme, joins the pieces of each street into long lines, simplifies them in the
480 x 339 frame the app draws in, and stores them in out/spots/<id>.json under "streets":

  {"source": ..., "scale": 20, "names": ["Jl. Raya Uluwatu", ...],
   "lines": [[name index, rank, x0, y0, x1, y1, ...], ...]}   (x, y in frame px * scale)

rank: 0 trunk/primary, 1 secondary, 2 tertiary, 3 residential and smaller. The app labels the
higher ranks first and only where a label fits along the road. Rerun after spot.py rebuilds an area.
Usage: python3 scripts/streets.py [area ...]
"""
import json, os, sys
from shapely import wkt as WKT
from shapely.geometry import LineString, MultiLineString, box
from shapely.ops import linemerge

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "../out/spots")
RELEASE = "2026-09-23.0"
SEGMENTS = f"s3://overturemaps-us-west-2/release/{RELEASE}/theme=transportation/type=segment/*"
W, H, SCALE = 480, 339, 20
RANK = {"motorway": 0, "trunk": 0, "primary": 0, "secondary": 1, "tertiary": 2,
        "residential": 3, "unclassified": 3, "living_street": 3, "service": 3}


def short(name):
    """Local usage: "Jalan Raya Uluwatu" is written "Jl. Raya Uluwatu" on signs and maps."""
    n = " ".join(name.split())
    for full in ("Jalan ", "jalan ", "JALAN ", "Jln. ", "Jln ", "Jl "):
        if n.startswith(full):
            return "Jl. " + n[len(full):]
    return n


def fetch(bbox):
    import duckdb
    for k in list(os.environ):
        if k.startswith("AWS_"):
            os.environ.pop(k)  # anonymous read; a proxy-injected key would be rejected
    con = duckdb.connect()
    con.execute("INSTALL httpfs; LOAD httpfs; INSTALL spatial; LOAD spatial;")
    con.execute("CREATE OR REPLACE SECRET anon (TYPE s3, PROVIDER config, KEY_ID '', SECRET '', REGION 'us-west-2');")
    x0, y0, x1, y1 = bbox
    return con.execute(f"""
        SELECT class, names.primary, ST_AsText(geometry) FROM read_parquet('{SEGMENTS}', hive_partitioning=1)
        WHERE bbox.xmin < {x1} AND bbox.xmax > {x0} AND bbox.ymin < {y1} AND bbox.ymax > {y0}
          AND subtype = 'road' AND names.primary IS NOT NULL""").fetchall()


def build(spot):
    x0, y0, x1, y1 = spot["bbox"]
    frame = box(x0, y0, x1, y1)
    to_px = lambda lon, lat: ((lon - x0) / (x1 - x0) * W, (y1 - lat) / (y1 - y0) * H)
    parts, rank = {}, {}
    for cls, name, g in fetch(spot["bbox"]):
        if cls not in RANK or not name.strip():
            continue
        n = short(name)
        parts.setdefault(n, []).append(WKT.loads(g))
        rank[n] = min(rank.get(n, 9), RANK[cls])
    names, lines = [], []
    for n in sorted(parts, key=lambda k: (rank[k], k)):
        merged = linemerge(MultiLineString([p for p in parts[n] if isinstance(p, LineString)]))
        geoms = merged.geoms if hasattr(merged, "geoms") else [merged]
        kept = []
        for ln in geoms:
            ln = ln.intersection(frame)
            for piece in (ln.geoms if hasattr(ln, "geoms") else [ln]):
                if not isinstance(piece, LineString) or piece.is_empty:
                    continue
                px = LineString([to_px(*c) for c in piece.coords]).simplify(0.08)
                if px.length < 1.5:  # under ~17 m: never long enough to carry a label
                    continue
                flat = []
                for x, y in px.coords:
                    flat += [round(x * SCALE), round(y * SCALE)]
                kept.append(flat)
        if kept:
            names.append(n)
            lines += [[len(names) - 1, rank[n]] + f for f in kept]
    return {"source": f"OpenStreetMap contributors, via Overture Maps {RELEASE} (ODbL)", "scale": SCALE,
            "names": names, "lines": lines}


def main():
    spots = json.load(open(os.path.join(HERE, "spots.json")))
    want = set(sys.argv[1:])
    for s in spots:
        if want and s["id"] not in want:
            continue
        path = os.path.join(OUT, f"{s['id']}.json")
        d = json.load(open(path))
        d["streets"] = build(s)
        tmp = path + ".tmp"
        with open(tmp, "w") as f:
            json.dump(d, f, separators=(",", ":"))
        os.replace(tmp, path)
        st = d["streets"]
        print(f"{s['id']}: {len(st['names'])} streets, {len(st['lines'])} lines, "
              f"{len(json.dumps(st, separators=(',', ':'))) // 1024} kB", flush=True)


if __name__ == "__main__":
    main()
