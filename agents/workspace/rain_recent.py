#!/usr/bin/env python3
"""Fetch recent rain for Kering's 18 rain cells and compare it with the 1996-2025 normal.

Same source and method as scripts/villages.py: Open-Meteo archive (ERA5), daily
precipitation summed to months, Asia/Makassar time. Only complete months are compared. The archive
lags about five days, so the current month is reported as partial and never scored.

    python3 rain_recent.py [--from 2026-01-01] [--to YYYY-MM-DD]

Writes outputs/rain/recent-<to>.json and outputs/rain/latest.json (what the web page reads), and prints a summary. Network: archive-api.open-meteo.com only.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import pathlib
import time
import urllib.request

import subprocess

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE / "outputs" / "rain"
API = "https://archive-api.open-meteo.com/v1/archive"


def fetch(cells, start, end):
    out = {}
    for k0 in range(0, len(cells), 8):
        chunk = cells[k0:k0 + 8]
        url = (f"{API}?latitude=" + ",".join(c.split(",")[0] for c in chunk) +
               "&longitude=" + ",".join(c.split(",")[1] for c in chunk) +
               f"&start_date={start}&end_date={end}&daily=precipitation_sum&timezone=Asia%2FMakassar")
        for attempt in range(4):
            try:
                data = json.load(urllib.request.urlopen(url, timeout=120))
                break
            except Exception as e:  # rate limit or network: back off, then give up loudly
                if attempt == 3:
                    raise SystemExit(f"Open-Meteo failed: {e}")
                time.sleep(20 * (attempt + 1))
        data = data if isinstance(data, list) else [data]
        for key, d in zip(chunk, data):
            mon, days, last = {}, {}, None
            for t, v in zip(d["daily"]["time"], d["daily"]["precipitation_sum"]):
                if v is None:
                    continue
                ym = t[:7]
                mon[ym] = mon.get(ym, 0) + v
                days[ym] = days.get(ym, 0) + 1
                last = t
            out[key] = (mon, days, last)
        time.sleep(3)
    return out


def main():
    today = dt.date.today()
    ap = argparse.ArgumentParser()
    ap.add_argument("--from", dest="start", default=f"{today.year}-01-01")
    ap.add_argument("--to", dest="end", default=str(today - dt.timedelta(days=6)))
    a = ap.parse_args()

    # Rain cells, their 1996-2025 monthly normals and villages, from the app's own data via kering.mjs.
    listing = json.loads(subprocess.run(["node", str(HERE / "kering.mjs"), "cells"], check=True,
                                        capture_output=True, text=True).stdout)
    cells = {c["cell"]: {"cell": {"clim": c["clim"]}, "villages": c["villages"]} for c in listing}
    raw = fetch(list(cells), a.start, a.end)
    lasts = [r[2] for r in raw.values()]
    if not lasts or any(x is None for x in lasts):
        raise SystemExit("Open-Meteo returned no rain for at least one cell; nothing written.")
    through = min(lasts)  # the last day every cell has data for; nothing after it is claimed

    result = {"source": "Open-Meteo archive (ERA5 reanalysis), daily precipitation summed to months",
              "normal": "1996-2025 mean per calendar month (Kering monthly.json)",
              "from": a.start, "to": a.end, "data_through": through,
              "generated_at": dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
              "limits": "ERA5 cells are about 25 km: an area figure, not a village gauge. Only complete months are "
                        "compared with normal; the last month is partial when the data stops mid-month.",
              "cells": []}
    for key, c in cells.items():
        mon, days, _ = raw[key]
        months = []
        for ym in sorted(mon):
            y, m = int(ym[:4]), int(ym[5:])
            n_days = (dt.date(y + (m == 12), m % 12 + 1, 1) - dt.date(y, m, 1)).days
            normal = c["cell"]["clim"][m - 1]
            complete = days[ym] == n_days
            months.append({"month": ym, "mm": round(mon[ym], 1), "normal_mm": normal, "complete": complete,
                           "pct_of_normal": round(100 * mon[ym] / normal) if complete and normal else None})
        done = [x for x in months if x["complete"]]
        dry = [x for x in done if 6 <= int(x["month"][5:]) <= 10]
        dry_mm, dry_norm = sum(x["mm"] for x in dry), sum(x["normal_mm"] for x in dry)
        result["cells"].append({
            "cell": key, "villages": sorted(c["villages"]), "months": months,
            "dry_season_so_far": {"months": [x["month"] for x in dry], "mm": round(dry_mm, 1),
                                  "normal_mm": round(dry_norm, 1),
                                  "pct_of_normal": round(100 * dry_mm / dry_norm) if dry_norm else None},
        })
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"recent-{a.end}.json"
    path.write_text(json.dumps(result, ensure_ascii=False, indent=1))
    tmp = OUT / ".latest.json.tmp"  # latest.json is what the web page reads; replace it atomically
    tmp.write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")))
    tmp.replace(OUT / "latest.json")
    print(f"wrote {path.relative_to(HERE)} and outputs/rain/latest.json")
    for c in sorted(result["cells"], key=lambda c: c["dry_season_so_far"]["pct_of_normal"] or 999):
        d = c["dry_season_so_far"]
        print(f"{c['cell']:>12}  dry season {d['pct_of_normal']}% of normal ({d['mm']} of {d['normal_mm']} mm)  "
              f"{len(c['villages'])} villages, e.g. {', '.join(c['villages'][:3])}")


if __name__ == "__main__":
    main()
