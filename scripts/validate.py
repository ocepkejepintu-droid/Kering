"""Pre-registered checks for the Kering groundwater-pressure score, version 4 (docs/modules/kering-score.md).

Offline. Reads out/rows.json, out/water.json and out/artesis.json, re-implements web/src/lib/score.ts,
and writes out/validation.json.

Usage:  python3 scripts/validate.py [--ts-scores path.json]
The optional --ts-scores file is a dump of rankAll(DEFAULT_WEIGHTS) from the TypeScript app
(id, name, score, rank) used for the E0 equivalence check. Without it E0 is reported as NOT RUN.
--v2-scores is the same kind of dump from the previous score version, for the A1 agreement check
(a dump from the previous score version).
--outside is a CSV for O1/O2 (see outside_check below); without it O1 and O2 are reported NOT RUNNABLE.
"""
import argparse
import csv
import json
import os
from datetime import date

import numpy as np

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ROWS = os.path.join(ROOT, "out", "rows.json")
WATER = os.path.join(ROOT, "out", "water.json")
ARTESIS = os.path.join(ROOT, "out", "artesis.json")
OUT = os.path.join(ROOT, "out", "validation.json")

# score.ts v4, verbatim in intent (same key order as PARTS). Dry-season rain is context only since v4.
VERSION = 4
KEYS = ["tourism", "growth", "sealed", "wells", "coast"]
DEFAULT_WEIGHTS = {"growth": 25, "sealed": 25, "wells": 25, "tourism": 15, "coast": 10}
MIN_COVERAGE, MIN_PARTS = 0.9, 3
HAND_CODED_INPUTS = []  # v1 had karst (name list) and the 0-1 coast scale
BANDS = [("critical", 75), ("high", 60), ("watch", 40), ("low", 0)]


def band(s):
    for name, lo in BANDS:
        if s >= lo:
            return name


def load():
    rows = json.load(open(ROWS))
    water = json.load(open(WATER))["villages"]
    vill = [r for r in rows if r.get("built") and r.get("rainCell")]
    art = json.load(open(ARTESIS))
    for v in vill:
        b = (water.get(str(v["i"])) or {}).get("buildings")
        v["footprintPct"] = b["footprintPct"] if b else None
        a = art["villages"].get(str(v["i"])) or {}
        v["sipaPerKm2"] = a.get("sipaPerKm2")
        v["sipaCount"] = a.get("sipaCount")
    load.artesis_meta = art["meta"]
    cov = {r["i"]: r.get("coverage") for r in rows}
    return vill, cov


def raw(v, k):
    if k == "tourism":  # the public data carries only the rank of listings per km2 (same order)
        return v.get("listingsKm2") if v.get("listingsKm2") is not None else v.get("tourismPct")
    if k == "growth":
        c = v.get("coverage")
        return v.get("newHa", 0) / (v["areaHa"] / 100) if c is not None and c >= MIN_COVERAGE else None
    if k == "sealed":
        return v.get("footprintPct")
    if k == "wells":
        return v.get("sipaPerKm2")
    if k == "coast":
        return -min(v["coastKm"], 5)


def parts_matrix(vill):
    """n x len(KEYS) matrix of percentiles; NaN where the village lacks the signal."""
    n = len(vill)
    P = np.full((n, len(KEYS)), np.nan)
    for j, k in enumerate(KEYS):
        vals = [raw(v, k) for v in vill]
        srt = np.sort([x for x in vals if x is not None])
        if len(srt) < 2:
            continue
        for i, x in enumerate(vals):
            if x is None:
                continue
            first = np.searchsorted(srt, x, side="left")
            last = np.searchsorted(srt, x, side="right") - 1
            P[i, j] = (first + last) / 2 / (len(srt) - 1)
    return P


def scores_matrix(P, W):
    """Scores for many weight vectors at once. P: n x len(KEYS) with NaN; W: draws x len(KEYS). Returns n x draws (NaN = unscored)."""
    have = ~np.isnan(P)
    Pf = np.where(have, P, 0.0)
    num = Pf @ W.T
    den = have.astype(float) @ W.T
    S = np.where(den > 0, 100 * num / np.where(den > 0, den, 1), np.nan)
    S[have.sum(axis=1) < MIN_PARTS, :] = np.nan
    return S


def scores(P, w):
    wv = np.asarray([w[k] for k in KEYS], dtype=float)
    return scores_matrix(P, wv[None, :])[:, 0]


def spearman(a, b):
    def ranks(x):
        x = np.asarray(x, dtype=float)
        order = np.argsort(x, kind="mergesort")
        r = np.empty(len(x))
        sx = x[order]
        i = 0
        while i < len(x):
            j = i
            while j + 1 < len(x) and sx[j + 1] == sx[i]:
                j += 1
            r[order[i:j + 1]] = (i + j) / 2 + 1
            i = j + 1
        return r
    return float(np.corrcoef(ranks(a), ranks(b))[0, 1])


def mann_whitney_greater(x, y):
    """One-sided Mann-Whitney U, H1: x tends to be larger than y. Exact permutation p when the split count is
    small enough to enumerate, else normal approximation with tie correction. Returns (U, p, method)."""
    from itertools import combinations
    from math import comb, erf, sqrt
    x, y = list(map(float, x)), list(map(float, y))
    allv = x + y
    n1, n2 = len(x), len(y)

    # ranks of the pooled sample (ties averaged), U from rank sum
    order = sorted(range(len(allv)), key=lambda i: allv[i])
    r = [0.0] * len(allv); i = 0
    while i < len(order):
        j = i
        while j + 1 < len(order) and allv[order[j + 1]] == allv[order[i]]:
            j += 1
        for k in range(i, j + 1):
            r[order[k]] = (i + j) / 2 + 1
        i = j + 1
    U = sum(r[:n1]) - n1 * (n1 + 1) / 2
    if comb(n1 + n2, n1) <= 300_000:
        idx = range(n1 + n2)
        cnt = tot = 0
        for c in combinations(idx, n1):
            u = sum(r[k] for k in c) - n1 * (n1 + 1) / 2
            cnt += u >= U - 1e-9; tot += 1
        return U, cnt / tot, "exact permutation"
    N = n1 + n2
    ties = {}
    for v in allv:
        ties[v] = ties.get(v, 0) + 1
    var = n1 * n2 / 12 * ((N + 1) - sum(t ** 3 - t for t in ties.values()) / (N * (N - 1)))
    z = (U - n1 * n2 / 2 - 0.5) / sqrt(var) if var > 0 else 0.0
    return U, 0.5 * (1 - erf(z / sqrt(2))), "normal approximation, tie-corrected"


def outside_check(path, kind, vill, S, bands, scored):
    """O1 / O2 from a CSV. Columns: `desa` (village name, as in rows.json) or `index` (village id i), and `value`.
    O1 (kind podes): value = share of households on tanker, bottled or piped water. One row per desa.
    O2 (kind wells): value = electrical conductivity of one well. Several rows per desa allowed.
    Rows whose village is not scored, or whose name matches no village or several, are reported and skipped."""
    by_i = {v["i"]: k for k, v in enumerate(vill)}
    by_name = {}
    for k, v in enumerate(vill):
        by_name.setdefault(v["desa"].strip().lower(), []).append(k)
    rows, skipped = [], []
    with open(path, newline="") as f:
        for row in csv.DictReader(f):
            key = (row.get("index") or "").strip() or (row.get("desa") or "").strip()
            val = (row.get("value") or "").strip()
            if not val:
                skipped.append({"row": key, "why": "no value (missing stays missing)"}); continue
            if (row.get("index") or "").strip():
                k = by_i.get(int(row["index"]))
                hits = [k] if k is not None else []
            else:
                hits = by_name.get(key.lower(), [])
            if len(hits) != 1:
                skipped.append({"row": key, "why": "no village" if not hits else "name matches several villages; use index"}); continue
            if not scored[hits[0]]:
                skipped.append({"row": key, "why": "village not scored"}); continue
            rows.append((hits[0], float(val)))
    res = {"file": path, "rowsUsed": len(rows), "skipped": skipped}
    if len(rows) < 3:
        return {**res, "status": f"NOT RUNNABLE (only {len(rows)} usable rows in {path})", "pass": None}
    rho = spearman([S[k] for k, _ in rows], [x for _, x in rows])
    res["spearmanVsScore"] = round(rho, 3)
    if kind == "podes":
        return {**res, "status": f"RUN on {len(rows)} desa", "pass": rho >= 0.4}
    crit = [x for k, x in rows if bands[k] == "critical"]
    low = [x for k, x in rows if bands[k] == "low"]
    high = [x for k, x in rows if bands[k] == "high"]
    res.update({"nCritical": len(crit), "nHigh": len(high), "nLow": len(low),
                "medianCritical": float(np.median(crit)) if crit else None, "medianLow": float(np.median(low)) if low else None})
    if crit + high and low:
        U2, p2, m2 = mann_whitney_greater(crit + high, low)
        res["protocolCriticalPlusHighVsLow"] = {"U": U2, "p": round(p2, 4), "method": m2, "note": "the O2 protocol's grouping; descriptive"}
    if not crit or not low:
        return {**res, "status": "NOT RUNNABLE (need wells in both Critical and Low villages)", "pass": None}
    U, p, m = mann_whitney_greater(crit, low)
    res["criticalVsLow"] = {"U": U, "p": round(p, 4), "method": m}
    return {**res, "status": f"RUN on {len(rows)} wells", "pass": bool(p < 0.05 and np.median(crit) > np.median(low))}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ts-scores")
    ap.add_argument("--v2-scores", help="previous-version dump for A1 (old name; same as --prev-scores)")
    ap.add_argument("--prev-scores")
    ap.add_argument("--outside", help="CSV with columns desa or index, and value (see outside_check)")
    ap.add_argument("--outside-kind", choices=["podes", "wells"], default="podes")
    ap.add_argument("--draws", type=int, default=10_000)
    ap.add_argument("--seed", type=int, default=20261109)
    args = ap.parse_args()

    vill, cov = load()
    n = len(vill)
    names = [v["desa"] for v in vill]
    P = parts_matrix(vill)
    S = scores(P, DEFAULT_WEIGHTS)
    scored = ~np.isnan(S)
    order = np.argsort(-np.where(scored, S, -np.inf), kind="mergesort")
    rank = np.full(n, -1, dtype=int)
    rank[order[: scored.sum()]] = np.arange(1, scored.sum() + 1)
    bands = [band(s) if not np.isnan(s) else None for s in S]
    critical = {i for i in range(n) if scored[i] and S[i] >= 75}
    out = {"generated": date.today().isoformat(), "version": VERSION, "n": n, "nScored": int(scored.sum()), "weights": DEFAULT_WEIGHTS}

    # E0 equivalence with the TypeScript app
    if args.ts_scores:
        ts = json.load(open(args.ts_scores))
        by_id = {t["id"]: t for t in ts}
        idx = {v["i"]: i for i, v in enumerate(vill)}
        diffs = [abs(by_id[v["i"]]["score"] - S[i]) for i, v in enumerate(vill) if v["i"] in by_id]
        score_at_ts_rank = {t["rank"]: t["score"] for t in ts}
        swaps = [t for t in ts if int(rank[idx[t["id"]]]) != t["rank"]]
        tie_only = all(abs(t["score"] - score_at_ts_rank[int(rank[idx[t["id"]]])]) < 1e-9 for t in swaps)
        out["E0"] = {"nTs": len(ts), "maxAbsDiff": max(diffs), "rankSwaps": len(swaps), "swapsOnlyWithinExactTies": tie_only,
                     "pass": len(ts) == int(scored.sum()) and max(diffs) < 1e-6 and tie_only}
    else:
        out["E0"] = {"pass": None, "note": "NOT RUN: no --ts-scores dump given"}

    # N1 missing-value handling
    have = ~np.isnan(P)
    counts = {str(k): int((have.sum(axis=1) == k).sum()) for k in range(len(KEYS) + 1)}
    no_market = sum(1 for v in vill if v.get("listingsKm2") is None)
    low_cov = sum(1 for v in vill if (v.get("coverage") is None) or v["coverage"] < MIN_COVERAGE)
    out["N1_missing"] = {
        "villagesBySignalCount": counts, "scoredOnFewerThanMin": int((scored & (have.sum(axis=1) < MIN_PARTS)).sum()),
        "nullTourism": int((~have[:, 0]).sum()), "villagesWithoutMarket": no_market,
        "nullGrowth": int((~have[:, 1]).sum()), "villagesBelowCoverage": low_cov,
        "nullSealed": int((~have[:, 2]).sum()), "nullWells": int((~have[:, 3]).sum()),
        "villagesWithZeroPermits": sum(1 for v in vill if v.get("sipaCount") == 0),
        "pass": int((scored & (have.sum(axis=1) < MIN_PARTS)).sum()) == 0 and int((~have[:, 0]).sum()) == no_market and int((~have[:, 1]).sum()) == low_cov,
    }
    # J1 join sanity for the permit points
    fm = load.artesis_meta["files"].get("sipa", {})
    unmatched_share = fm.get("unmatchedPoints", 0) / max(fm.get("afterDedupe", 1), 1)
    out["J1_permitJoin"] = {"points": fm.get("points"), "afterDedupe": fm.get("afterDedupe"), "unmatched": fm.get("unmatchedPoints"), "unmatchedShare": round(unmatched_share, 4), "pass": unmatched_share < 0.05}
    dry = [v["rainDry"] for v in vill]
    out["M4_dryness"] = {"distinctValues": len(set(dry)), "note": "ERA5 25 km cell; not in the score since v4, context on the village page only"}
    out["M5_listingDensity"] = {"note": "listingsKm2 carried at 1 decimal in this run (shapely unavailable to re-spread); villages.py now writes 3 decimals"}

    # C1 v2: hand-coded inputs and single-signal dominance
    K = len(critical)
    dom = {}
    for j, k in enumerate(KEYS):
        col = np.where(np.isnan(P[:, j]), -np.inf, P[:, j])
        topK = set(np.argsort(-col, kind="mergesort")[:K].tolist()) if K else set()
        dom[k] = round(len(critical & topK) / K, 3) if K else None
    out["C1_handCoded"] = {"handCodedInputsInScore": len(HAND_CODED_INPUTS), "K": K, "criticalNames": sorted(names[i] for i in critical),
                           "shareOfCriticalReproducedBySingleSignal": dom, "pass": len(HAND_CODED_INPUTS) == 0}

    # S1 / S2 weight stability for the top ten
    rng = np.random.default_rng(args.seed)
    top10 = order[:10]
    w0 = np.array([DEFAULT_WEIGHTS[k] for k in KEYS], dtype=float)

    def stability(W):
        W = W / W.sum(axis=1, keepdims=True)
        SS = scores_matrix(P, W)
        res = {}
        for i in top10:
            s = SS[i]
            keep = np.mean([band(x) == bands[i] for x in s])
            in_top10 = np.mean((np.nan_to_num(SS, nan=-1) >= s).sum(axis=0) <= 10)
            res[names[i]] = {"defaultScore": round(float(S[i]), 2), "band": bands[i], "signals": int(have[i].sum()),
                             "keepsBand": round(float(keep), 3), "staysInTop10": round(float(in_top10), 3)}
        return res

    r1 = stability(w0 * rng.uniform(0.5, 1.5, size=(args.draws, len(KEYS))))
    out["S1_perturbation"] = {"draws": args.draws, "topTen": r1, "pass": all(x["keepsBand"] >= 0.8 for x in r1.values())}
    out["S2_simplex"] = {"draws": args.draws, "topTen": stability(rng.dirichlet(np.ones(len(KEYS)), size=args.draws)), "verdict": "descriptive"}

    # L1 leave-one-out
    l1 = {}
    for k in KEYS:
        w = dict(DEFAULT_WEIGHTS); w[k] = 0
        Sk = scores(P, w)
        ok = ~np.isnan(Sk) & scored
        ck = {i for i in range(n) if not np.isnan(Sk[i]) and Sk[i] >= 75}
        l1[k] = {"spearmanVsDefault": round(spearman(S[ok], Sk[ok]), 3), "leaveCritical": sorted(names[i] for i in critical - ck), "enterCritical": sorted(names[i] for i in ck - critical)}
    out["L1_leaveOneOut"] = l1

    # O3 / O4 descriptive: outside points known before the run
    sipa = {"Badung": 1134, "Kota Denpasar": 381, "Gianyar": 278, "Tabanan": 123}  # Mongabay 2020 citing Disnaker ESDM Bali, the five years before July 2020
    kabs = {}
    for kab, permits in sipa.items():
        idx_k = [i for i, v in enumerate(vill) if v["kab"] == kab and scored[i]]
        kabs[kab] = {"sipaPermits": permits, "scoredVillages": len(idx_k), "meanScore": round(float(np.mean(S[idx_k])), 1) if idx_k else None}
    out["O3_sipaByKabupaten"] = {"verdict": "descriptive (4 points)", "byKab": kabs}
    pts = {}
    for nm, src in [("Kerobokan Kelod", "Sukearsana, Sila Dharma, Nuarsa 2015, Ecotrophic 9(2): 78.44 ha intruded at Petitenget/Batubelig, 14 of 60 wells degraded"),
                    ("Sumerta Kaja", "Badan Geologi: groundwater-decline zone in CAT Denpasar-Tabanan (reported, snippet)"),
                    ("Sading", "Badan Geologi: groundwater-decline zone in CAT Denpasar-Tabanan (reported, snippet)")]:
        hit = [i for i, v in enumerate(vill) if v["desa"] == nm and scored[i]]
        pts[nm] = {"source": src, **({"score": round(float(S[hit[0]]), 1), "band": bands[hit[0]], "rank": int(rank[hit[0]])} if hit else {"scored": False})}
    out["O4_intrusionPoints"] = {"verdict": "descriptive (3 points)", "points": pts}
    # A1 agreement with the previous version (descriptive)
    prev_path = args.prev_scores or args.v2_scores
    if prev_path:
        prev = {t["id"]: t for t in json.load(open(prev_path))}
        idx = {v["i"]: i for i, v in enumerate(vill)}
        both = [i for vi, i in idx.items() if vi in prev and scored[i]]
        a = np.array([S[i] for i in both]); b = np.array([prev[vill[i]["i"]]["score"] for i in both])
        cp = {names[i] for i in both if prev[vill[i]["i"]]["score"] >= 75}
        prev_top10 = [t["name"] for t in sorted(prev.values(), key=lambda t: t["rank"])[:10]]
        out["A1_vsPrevious"] = {"previousVersion": VERSION - 1, "file": os.path.relpath(prev_path, ROOT), "n": len(both), "spearman": round(spearman(a, b), 3),
                                "criticalPrevious": len(cp), "criticalNow": K, "enterCritical": sorted({names[i] for i in critical} - cp),
                                "leaveCritical": sorted(cp - {names[i] for i in critical}), "topTenPrevious": prev_top10,
                                "topTenNow": [names[i] for i in order[:10]], "verdict": "descriptive"}

    # Signals per village, for the page's hatch and the table column (descriptive)
    out["signalCounts"] = {"fewerThanAll": int((scored & (have.sum(axis=1) < len(KEYS))).sum()),
                           "byKabupaten": {kab: {str(k): sum(1 for i, v in enumerate(vill) if v["kab"] == kab and scored[i] and have[i].sum() == k) for k in range(MIN_PARTS, len(KEYS) + 1)}
                                           for kab in sorted({v["kab"] for v in vill})},
                           "criticalOnFewerThanAll": sorted(names[i] for i in critical if have[i].sum() < len(KEYS))}

    # O1 / O2 outside checks
    o1 = {"passRule": "Spearman rho >= 0.4 between score and the desa share of households on tanker, bottled or piped water"}
    o2 = {"passRule": "Critical median conductivity > Low, Mann-Whitney one-sided p < 0.05"}
    if args.outside:
        res = outside_check(args.outside, args.outside_kind, vill, S, bands, scored)
        (o1 if args.outside_kind == "podes" else o2).update(res)
    if "status" not in o1:
        o1["status"] = ("NOT RUNNABLE at desa level (no --outside podes CSV; bali.bps.go.id and silastik.bps.go.id answer 403; "
                        "kabupaten tables from the 2024/2025 publications are descriptive only)")
    if "status" not in o2:
        o2["status"] = "NOT RUNNABLE (field work; no --outside wells CSV)"
    out["O1_podes"], out["O2_blindWells"] = o1, o2

    e0 = out["E0"]["pass"]
    internal = out["C1_handCoded"]["pass"] and out["S1_perturbation"]["pass"] and out["N1_missing"]["pass"] and out["J1_permitJoin"]["pass"]
    ran = [o for o in (o1, o2) if o.get("pass") is not None]
    if e0 is False:
        out["verdict"] = "VOID (E0 failed)"
    elif not internal or any(o["pass"] is False for o in ran):
        out["verdict"] = "FAIL"
    elif ran:
        out["verdict"] = "PASS"
    else:
        out["verdict"] = "PARTIAL"
    out["verdictNote"] = "Outside check run: " + ", ".join(o["status"] for o in ran) if ran else "Outside checks O1 and O2 not runnable, so PASS is not reachable from here."
    json.dump(out, open(OUT, "w"), indent=1)
    print(json.dumps({k: out[k] for k in ["E0", "N1_missing", "J1_permitJoin", "C1_handCoded", "verdict"]}, indent=1))
    print("S1 pass:", out["S1_perturbation"]["pass"]); print("wrote", OUT)


if __name__ == "__main__":
    main()
