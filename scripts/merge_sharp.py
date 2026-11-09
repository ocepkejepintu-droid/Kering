"""Embed the sharp building dates (out/sharp/<id>.json) into the app's area files (out/spots/<id>.json).

The app reads buildings.sharp next to buildings.b64. Per building, in b64 order:
  first     Int8, base64   capture index where it first shows; -1 = there in its earliest covering capture
                           ("there by"); -2 = no sharp date (see status)
  before    Int8, base64   last capture showing open ground there, -1 none
  earliest  Int8, base64   earliest usable capture covering it, -1 none
  meta      Uint8, base64  bits 0-2 status (0 dated, 1 low confidence, 2 there by, 3 not seen, 4 no usable
                           capture, 5 demolished), bit 3 small (< 25 m2), bits 4-7 conf quantised to 0..15
  gone      [[building, capture], ...] for demolished buildings: the capture where it is gone
plus the area's captures [{date, rid, res, sensor, provider}] and the source version.

Only derived numbers are stored, never imagery (Esri terms). Idempotent: rerun as more areas finish;
areas without a finished sharp file are left untouched, and a sharp file whose building count does not
match the outlines is refused.

Guard: an area ships sharp dates only once someone has checked its boxes against the imagery (REVIEWED),
is not on hold (HELD), and no single capture holds most of its dates (MAX_SHARE: the sign of a dark or
hazy early capture read as open ground, as on Lembongan). A refused area has any earlier sharp record
removed, so the app falls back to its Sentinel-2 dates. After checking a new area by eye, add it to
REVIEWED (or pass --unreviewed to merge every finished area that passes the share test).

Vision overrides: if out/sharp/<id>.vision.json exists ({"area", "method", "labels": [{"index", "first", "note"}]},
first = "YYYY-MM-DD" of the first capture showing a roof, "there_by" = roof already in its earliest usable capture,
"none" = no building in any capture), each label replaces that building's sharp state before the guards and the
packing: first -> the capture with that date among the building's covering captures (else the label is skipped),
status 0 dated (2 there by, 3 not seen for "none"), conf 1, gone cleared, before = last usable covering capture
before the new first. Covering captures come from the pipeline's scratch scores file (<scratch>/<id>.scores.json,
$SHARP_SCRATCH); without it a dated label is only checked to fall at or after the building's earliest usable
capture, and before is kept when first is unchanged, else -1. A date equal to the earliest usable capture becomes
"there by", the pipeline's own encoding. Counts of applied / skipped labels are printed.

Usage: python3 scripts/merge_sharp.py [area ...]     (default: every area with out/sharp/<id>.json)
       python3 scripts/merge_sharp.py --check        (report only, write nothing)
       python3 scripts/merge_sharp.py --unreviewed   (also merge areas not yet checked by eye)
       python3 scripts/merge_sharp.py --selftest     (unit check of the vision overrides, writes nothing)
"""
import base64, json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
VERSIONS = {"sharp-3"}
# checked by eye in the app: boxes switch from "not built yet" to standing where the roofs appear
REVIEWED = {"pecatu", "uluwatu", "jimbaran", "ubud", "seminyak"}
# finished but wrong where it shows: kept out until the pipeline is fixed
HELD = {
    "pererenan": "blind check 23 of 31 (74%) within one capture; old village roofs in the hazy 2014 z17 capture "
                 "read as open ground and get dated Nov 2019",
    "lembongan": "the dark 2011 and 2013 captures read as open ground: 5,996 of 9,860 buildings dated Oct 2019, "
                 "though Jungutbatu village is full of roofs in Oct 2013",
}
MAX_SHARE = 0.6   # largest share of dated buildings one capture may hold (Pecatu 0.36, Uluwatu 0.40)
SCRATCH = os.environ.get("SHARP_SCRATCH", os.path.join(os.path.expanduser("~"), ".cache", "kering-sharp"))
STATUS_DATED, STATUS_THERE_BY, STATUS_NOT_SEEN = 0, 2, 3


def load_cover(area, sh):
    """Per building, its covering captures [(capture index, usable)] in date order, from the pipeline's scratch
    scores file (derived numbers only), or None when that file is missing or does not match the sharp file."""
    path = os.path.join(SCRATCH, f"{area}.scores.json")
    if not os.path.exists(path):
        return None
    sc = json.load(open(path))
    key = lambda cs: [(c["date"], c["sensor"]) for c in cs]
    if key(sc["captures"]) != key(sh["captures"]) or len(sc["buildings"]) != len(sh["first"]):
        return None
    # obs = [capture, p, features | "why unknown", ...]: a string there marks a hazy / clouded (unusable) look
    return [[(o[0], not isinstance(o[2], str)) for o in b["obs"]] for b in sc["buildings"]]


def apply_vision(sh, vision, cover=None):
    """Apply eye-checked labels to the sharp dict sh in place. Returns (applied, skipped, reasons)."""
    caps = sh["captures"]
    n = len(sh["first"])
    applied, skipped, reasons = 0, 0, {}

    def skip(why):
        nonlocal skipped
        skipped += 1
        reasons[why] = reasons.get(why, 0) + 1

    for lab in vision.get("labels", []):
        i, f = lab.get("index"), lab.get("first")
        if not isinstance(i, int) or not 0 <= i < n:
            skip("index out of range")
            continue
        cov = cover[i] if cover is not None else None
        usable = [j for j, ok in cov if ok] if cov is not None else None
        earliest = (usable[0] if usable else -1) if cov is not None else sh["earliest"][i]
        if f == "none":
            first, before, status = -2, -1, STATUS_NOT_SEEN
        elif f == "there_by":
            if earliest < 0:
                skip("there_by but no usable capture")
                continue
            first, before, status = -1, -1, STATUS_THERE_BY
        elif isinstance(f, str):
            js = [j for j, c in enumerate(caps) if c["date"] == f]
            if cov is not None:
                js = [j for j in js if any(j == k for k, _ in cov)]
            else:   # coverage unknown: only rule out captures before the building's earliest usable one
                js = [j for j in js if earliest >= 0 and j >= earliest]
            if len(js) != 1:
                skip("date not one of its covering captures" if not js else "date matches two covering captures")
                continue
            j = js[0]
            if j == earliest:     # roof in its earliest usable capture: the pipeline calls that "there by"
                first, before, status = -1, -1, STATUS_THERE_BY
            else:
                if cov is not None:
                    pre = [k for k in usable if k < j]
                    before = pre[-1] if pre else -1
                else:
                    before = sh["before"][i] if sh["first"][i] == j else -1
                first, status = j, STATUS_DATED
        else:
            skip("unknown label")
            continue
        sh["first"][i], sh["before"][i], sh["status"][i] = first, before, status
        sh["conf"][i], sh["gone"][i] = 1.0, -1
        if cov is not None:
            sh["earliest"][i] = earliest
        applied += 1
    return applied, skipped, reasons


def vision_for(area, sh):
    """Apply out/sharp/<area>.vision.json to sh if present; returns a short report ('' when there is none)."""
    vp = os.path.join(ROOT, "out/sharp", f"{area}.vision.json")
    if not os.path.exists(vp):
        return ""
    vision = json.load(open(vp))
    if vision.get("area") != area:
        raise SystemExit(f"{area}: vision file is for {vision.get('area')}")
    cover = load_cover(area, sh)
    a, k, why = apply_vision(sh, vision, cover)
    return (f"vision labels {a} applied, {k} skipped"
            + (" (" + ", ".join(f"{v} {w}" for w, v in sorted(why.items())) + ")" if why else "")
            + ("" if cover is not None else ", coverage unchecked (no scratch scores file)") + "; ")


def count_outlines(b64):
    """Number of buildings in the Int16 outline stream: [first, rings, (n, x0, y0, ...)*rings]*."""
    raw = base64.b64decode(b64)
    a = memoryview(raw).cast("h")
    i = n = 0
    while i < len(a):
        rings = a[i + 1]
        i += 2
        for _ in range(rings):
            i += 1 + 2 * a[i]
        n += 1
    if i != len(a):
        raise ValueError("outline stream does not end on a building boundary")
    return n


def pack_i8(xs):
    if any(x < -128 or x > 127 for x in xs):
        raise ValueError("value out of Int8 range")
    return base64.b64encode(bytes((x + 256) % 256 for x in xs)).decode()


def compact(sh, n):
    for k in ("first", "before", "earliest", "conf", "status", "gone", "small"):
        if len(sh[k]) != n:
            raise ValueError(f"{k} has {len(sh[k])} entries for {n} buildings")
    nc = len(sh["captures"])
    for k in ("first", "before", "earliest", "gone"):
        if any(x >= nc or x < -2 for x in sh[k]):
            raise ValueError(f"{k} points past the {nc} captures")
    if any(s < 0 or s > 5 for s in sh["status"]):
        raise ValueError("unknown status code")
    meta = bytes(s | (1 << 3 if sm else 0) | (min(15, max(0, round(c * 15))) << 4)
                 for s, sm, c in zip(sh["status"], sh["small"], sh["conf"]))
    return {
        "version": sh["version"],
        "captures": [{k: c[k] for k in ("date", "rid", "res", "sensor", "provider")} for c in sh["captures"]],
        "first": pack_i8(sh["first"]),
        "before": pack_i8(sh["before"]),
        "earliest": pack_i8(sh["earliest"]),
        "meta": base64.b64encode(meta).decode(),
        "gone": [[i, g] for i, g in enumerate(sh["gone"]) if g >= 0],
    }


def refusal(area, sh, unreviewed):
    """Why this area's sharp dates must not ship, or None."""
    if area in HELD:
        return f"on hold: {HELD[area]}"
    dated = [f for f in sh["first"] if f >= 0]
    if dated:
        top = max(set(dated), key=dated.count)
        share = dated.count(top) / len(dated)
        if share > MAX_SHARE:
            return (f"{share:.0%} of its dated buildings fall in one capture ({sh['captures'][top]['date']}); "
                    "check the earlier captures by eye")
    if area not in REVIEWED and not unreviewed:
        return "not yet checked by eye (add it to REVIEWED, or pass --unreviewed)"
    return None


def drop(area, op, spot, text, why, check):
    """Remove an earlier sharp record, so the area falls back to Sentinel-2."""
    if "sharp" not in spot["buildings"]:
        return f"{area}: sharp dates not merged, {why}"
    del spot["buildings"]["sharp"]
    if not check:
        write(op, json.dumps(spot, separators=(",", ":")))
    return f"{area}: sharp record {'would be ' if check else ''}removed, {why}"


def write(op, out):
    tmp = op + ".tmp"
    with open(tmp, "w") as f:
        f.write(out)
    os.replace(tmp, op)


def merge(area, check=False, unreviewed=False):
    sp = os.path.join(ROOT, "out/sharp", f"{area}.json")
    op = os.path.join(ROOT, "out/spots", f"{area}.json")
    if not os.path.exists(sp):
        return f"{area}: no sharp file yet, left as is"
    sh = json.load(open(sp))
    if sh.get("version") not in VERSIONS:
        return f"{area}: sharp file version {sh.get('version')!r} not supported, left as is"
    text = open(op).read()
    spot = json.loads(text)
    vis = vision_for(area, sh)
    why = refusal(area, sh, unreviewed)
    if why:
        return vis + drop(area, op, spot, text, why, check)
    b = spot["buildings"]
    n = count_outlines(b["b64"])
    if n != b["n"]:
        raise SystemExit(f"{area}: outline stream holds {n} buildings but n = {b['n']}")
    if sh["area"] != area:
        raise SystemExit(f"{area}: sharp file is for {sh['area']}")
    rec = compact(sh, n)
    old = b.get("sharp")
    b["sharp"] = rec
    out = json.dumps(spot, separators=(",", ":"))
    grow = len(out) - len(text)
    same = old == rec
    if not check and not same:
        write(op, out)
    sharp_bytes = len(json.dumps(rec, separators=(",", ":")))
    return vis + (f"{area}: {n} buildings, {len(rec['captures'])} captures, sharp record {sharp_bytes / 1e3:.0f} kB "
            f"({100 * sharp_bytes / (len(out) - sharp_bytes):.1f}% of the rest), "
            + ("unchanged" if same else ("would write" if check else f"written ({grow:+d} bytes)")))


def selftest():
    caps = [{"date": d, "rid": 1, "res": 0.5, "sensor": s, "provider": "x"} for d, s in
            (("2010-01-01", "A"), ("2012-01-01", "A"), ("2014-01-01", "A"), ("2016-01-01", "A"), ("2016-01-01", "B"))]
    base = lambda: {"area": "fake", "version": "sharp-3", "captures": caps,
                    "first": [2, -1, -2, 3, 1, 2], "before": [1, -1, -1, 2, 0, 1], "earliest": [0, 0, 0, 1, 0, 0],
                    "conf": [0.4] * 6, "status": [1, 2, 5, 0, 0, 0], "gone": [-1, -1, 3, -1, -1, -1],
                    "small": [0] * 6}
    # covering captures (index, usable): building 0 skips 2012 and has a hazy 2010; building 5 sees both 2016s
    cover = [[(0, False), (2, True), (3, True)], [(0, True), (1, True)], [(0, True), (1, True), (2, True), (3, True)],
             [(1, True), (2, True), (3, True)], [(0, True), (1, True), (2, True)], [(0, True), (3, True), (4, True)]]
    vision = {"area": "fake", "labels": [
        {"index": 0, "first": "2014-01-01"},   # earliest usable -> there by
        {"index": 1, "first": "2012-01-01"},   # dated, before = 2010
        {"index": 2, "first": "2014-01-01"},   # demolished -> dated, gone cleared, before = 2012
        {"index": 3, "first": "none"},         # not seen
        {"index": 4, "first": "2016-01-01"},   # not covering -> skipped
        {"index": 5, "first": "2016-01-01"},   # two covering captures that day -> skipped
        {"index": 9, "first": "there_by"},     # out of range -> skipped
        {"index": 1, "first": "2011-05-05"},   # no such capture -> skipped
    ]}
    sh = base()
    a, k, why = apply_vision(sh, vision, cover)
    assert (a, k) == (4, 4), (a, k, why)
    assert sh["first"][:4] == [-1, 1, 2, -2] and sh["status"][:4] == [2, 0, 0, 3], sh
    assert sh["before"][:4] == [-1, 0, 1, -1] and sh["earliest"][0] == 2 and sh["gone"][2] == -1, sh
    assert sh["conf"][:4] == [1.0] * 4 and sh["first"][4:] == [1, 2] and sh["conf"][4] == 0.4, sh
    once = json.dumps(sh)
    apply_vision(sh, vision, cover)
    assert json.dumps(sh) == once, "not idempotent"
    compact(sh, 6)            # still packs
    # without coverage: date only checked against earliest; before kept only when first is unchanged
    sh = base()
    a, k, _ = apply_vision(sh, {"labels": [{"index": 0, "first": "2014-01-01"}, {"index": 3, "first": "2010-01-01"},
                                           {"index": 4, "first": "2014-01-01"}]})
    assert (a, k) == (2, 1) and sh["first"][0] == 2 and sh["before"][0] == 1 and sh["before"][4] == -1, sh
    print("selftest ok")


def main():
    if "--selftest" in sys.argv:
        return selftest()
    flags = {a for a in sys.argv[1:] if a.startswith("-")}
    unknown = flags - {"--check", "--unreviewed", "--selftest"}
    if unknown:
        sys.exit(f"unknown option {' '.join(sorted(unknown))}; see the docstring at the top of this file")
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    check = "--check" in sys.argv
    unreviewed = "--unreviewed" in sys.argv
    areas = args or sorted(s["id"] for s in json.load(open(os.path.join(HERE, "spots.json"))))
    for a in areas:
        print(merge(a, check, unreviewed))


if __name__ == "__main__":
    main()
