import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { villages, villageByName, waterSources, wells, wellsMeta } from "./data";
import { builtIn, SPOTS } from "./spots";
import { buildingsFor, cameAfter, captureText, describe as describeBuilding, grownBy, isNew, sharpStepDates, stateAt, type RawSharp } from "./buildings";
import { capturesFor } from "./wayback";
import { BANDS, DEFAULT_WEIGHTS, MIN_COVERAGE, MIN_PARTS, PARTS, rankAll, bandOf, scoreOf, parts } from "./score";
import { plan, simulate, trend } from "./rain";
import { agentTools, recentRainFor } from "./agent";
import { waterSummary, rainRead, chirpsDir, eraDir, surfaceRead, basinRead } from "./water-summary";

describe("data", () => {
  it("has the 261 scored villages with 30 years of monthly rain", () => {
    expect(villages).toHaveLength(261);
    for (const v of villages) expect(v.cell.months).toHaveLength(360);
  });
  it("ships Pecatu built in, with valid frames, and names a scored village for every area", () => {
    expect(builtIn.id).toBe("pecatu");
    for (const f of builtIn.frames) expect(f.greenPct).toBeGreaterThan(0);
    for (const s of SPOTS) expect(villageByName(s.village)?.name).toBe(s.village);
  });
  it("decodes every Pecatu building outline", () => {
    if (typeof Path2D === "undefined") (globalThis as any).Path2D = class { moveTo() {} lineTo() {} closePath() {} };
    const set = buildingsFor(builtIn);
    expect(set.total).toBe(builtIn.buildings.n);
    expect(grownBy(set, "9999")).toBe(set.grown);
    expect(grownBy(set, "0000")).toBe(0);
  });
});

describe("licensed wells layer", () => {
  it("carries every deduplicated permit point inside the Bali box, depth null where not stated", () => {
    expect(wells).toHaveLength(wellsMeta.rows);
    expect(wells.length).toBe(3548);
    for (const [lon, lat, d] of wells) {
      expect(lon).toBeGreaterThan(114.3); expect(lon).toBeLessThan(115.9);
      expect(lat).toBeGreaterThan(-9.0); expect(lat).toBeLessThan(-7.9);
      if (d != null) expect(d).toBeGreaterThan(0);
    }
    expect(wells.filter(([, , d]) => d == null).length).toBe(9);
  });
});

describe("Second opinions", () => {
  it("attaches water and building data to every scored village, matched by index", () => {
    for (const v of villages) expect(v.water).not.toBeNull();
    const j = villageByName("Jimbaran")!;
    expect(j.water!.surface!.lostHa).toBe(31.41);
    expect(j.water!.buildings!.count).toBe(32021);
    expect(waterSources.rain.verdict).toBe("FAIL");
    expect(waterSources.surface.verdict).toBe("PASS");
  });
  it("keeps missing values as null, never zero", () => {
    const nulls = villages.filter((v) => v.water!.surface!.meanChange === null);
    expect(nulls.length).toBeGreaterThan(0);
  });
  it("leaves the score unchanged: get_village adds second opinions beside it", () => {
    const ranked = rankAll(DEFAULT_WEIGHTS);
    const tools = agentTools({ ranked, weights: DEFAULT_WEIGHTS, highlight: () => {} });
    const out = tools.find((t) => t.name === "get_village")!.execute({ name: "Jimbaran" }) as any;
    expect(out.score).toBe(+ranked.find((s) => s.v.name === "Jimbaran")!.score.toFixed(1));
    expect(out.second_opinions.surface_water_jrc.lostHa).toBe(31.41);
    expect(out.second_opinions.notes.rain).toContain("Verdict FAIL");
  });
});

describe("plain water summary", () => {
  it("reads Pecatu: rain not falling, surface water fell, cause on the ground", () => {
    const s = waterSummary(villageByName("Pecatu")!);
    expect(s.headline).toBe("Rain is not falling. Surface water fell. The cause is on the ground, not in the sky.");
    expect(s.rows.map((r) => r.label)).toEqual(["Rain", "Surface water", "Roofs", "Basin"]);
    expect(s.rows[3].value).toBe("water already over-used");
  });
  it("applies the fixed rules", () => {
    expect(eraDir(55)).toBe("up"); expect(eraDir(5)).toBe("flat"); expect(eraDir(-20)).toBe("down");
    expect(chirpsDir(71, 0.16)).toBe("flat"); expect(chirpsDir(-40, 0.01)).toBe("down"); expect(chirpsDir(null, null)).toBeNull();
    expect(rainRead("down", "down")).toBe("falling"); expect(rainRead("up", "down")).toBe("unclear"); expect(rainRead("flat", null)).toBe("not falling");
    expect(surfaceRead(33, 2)).toBe("fell"); expect(surfaceRead(1, 1.5)).toBe("about the same"); expect(surfaceRead(null, 3)).toBeNull();
    expect(basinRead("Low - Medium (10-20%)")).toBe("water not over-used"); expect(basinRead("Arid and Low Water Use")).toBeNull();
  });
  it("gives every scored village a headline without missing words", () => {
    for (const v of villages) {
      const s = waterSummary(v);
      expect(s.headline.length).toBeGreaterThan(10);
      for (const r of s.rows) expect(r.value).not.toMatch(/undefined|null|NaN/);
    }
  });
});

describe("score", () => {
  const ranked = rankAll(DEFAULT_WEIGHTS);
  it("scores every village on at least 3 of the 5 signals, within 0-100", () => {
    expect(ranked).toHaveLength(villages.length);
    for (const s of ranked) {
      expect(s.signals).toBeGreaterThanOrEqual(MIN_PARTS);
      expect(s.score).toBeGreaterThanOrEqual(0);
      expect(s.score).toBeLessThanOrEqual(100);
    }
  });
  it("keeps a missing input missing: no AirROI market means a null tourism part, never zero", () => {
    const none = ranked.filter((s) => (s.v.listingsKm2 ?? s.v.tourismPct) == null);
    expect(none.length).toBeGreaterThan(0);
    for (const s of none) expect(s.parts.tourism).toBeNull();
    for (const s of ranked.filter((r) => (r.v.listingsKm2 ?? r.v.tourismPct) != null)) expect(s.parts.tourism).not.toBeNull();
  });
  it("drops new-build where the satellite window covers under 90% of the village", () => {
    const partial = ranked.filter((s) => (s.v.coverage ?? 0) < MIN_COVERAGE);
    expect(partial.length).toBeGreaterThan(0);
    for (const s of partial) expect(s.parts.growth).toBeNull();
  });
  it("leaves a missing signal's weight out: changing it does not move the village", () => {
    const s = ranked.find((r) => r.parts.tourism == null)!;
    expect(scoreOf(s.parts, { ...DEFAULT_WEIGHTS, tourism: 0 })).toBeCloseTo(s.score);
    expect(scoreOf(s.parts, { ...DEFAULT_WEIGHTS, tourism: 40 })).toBeCloseTo(s.score);
  });
  it("uses no hand-typed input: the limestone flag is not a score part", () => {
    expect(PARTS.map((p) => p.key)).not.toContain("karst");
    expect(PARTS).toHaveLength(5);
  });
  it("v4: dry-season rain (ERA5, ~25 km cell) is context, not a score part; weights sum to 100", () => {
    expect(PARTS.map((p) => p.key)).not.toContain("dryness");
    expect(Object.values(DEFAULT_WEIGHTS).reduce((a, b) => a + b, 0)).toBe(100);
    expect(DEFAULT_WEIGHTS).toEqual({ growth: 25, sealed: 25, wells: 25, tourism: 15, coast: 10 });
    expect(PARTS.find((p) => p.key === "tourism")!.label).toBe("AirROI market listing density");
  });
  it("counts signals per village so the page can mark villages scored on fewer", () => {
    const few = ranked.filter((s) => s.signals < PARTS.length);
    expect(few.length).toBeGreaterThan(0);
    for (const s of few) expect(PARTS.filter((p) => s.parts[p.key] == null)).toHaveLength(PARTS.length - s.signals);
  });
  it("shows no hand-typed limestone flag (docs/modules/karst.md)", () => {
    for (const v of villages) expect(v).not.toHaveProperty("karst");
    const rows = JSON.parse(readFileSync(resolve(__dirname, "../../../out/rows.json"), "utf8")) as Record<string, unknown>[];
    for (const r of rows) expect(r).not.toHaveProperty("karst");
  });
  it("counts licensed wells as a real number: zero permits is a low percentile, not a missing value", () => {
    const none = ranked.filter((s) => s.v.sipaCount === 0);
    expect(none.length).toBeGreaterThan(0);
    for (const s of none) { expect(s.parts.wells).not.toBeNull(); expect(s.parts.wells!).toBeLessThan(0.5); }
    const seminyak = ranked.find((s) => s.v.name === "Seminyak")!;
    expect(seminyak.v.sipaCount).toBe(162);
    expect(seminyak.parts.wells!).toBeGreaterThan(0.95);
  });
  it("bands at 75 / 60 / 40", () => {
    expect([bandOf(80).id, bandOf(60).id, bandOf(40).id, bandOf(39.9).id]).toEqual(["critical", "high", "watch", "low"]);
    expect([bandOf(80).label, bandOf(60).label, bandOf(40).label, bandOf(39.9).label]).toEqual(["Top band", "Upper", "Middle", "Lower"]);
  });
  it("labels every band with relative wording, never an absolute alarm word", () => {
    for (const b of BANDS) expect(b.label).not.toMatch(/\b(critical|high|watch|low|danger|severe|failing)\b/i);
  });
  it("follows the weights: all weight on one part gives that part's percentile", () => {
    const pe = villageByName("Pecatu")!;
    const only = { tourism: 0, growth: 0, sealed: 1, wells: 0, coast: 0 };
    expect(scoreOf(parts.get(pe.id)!, only)).toBeCloseTo(100 * parts.get(pe.id)!.sealed!);
  });
  it("returns null, not a number, when too few signals or no weight remain", () => {
    expect(scoreOf({ tourism: null, growth: null, sealed: 0.5, wells: null, coast: 0.5 }, DEFAULT_WEIGHTS)).toBeNull();
    expect(scoreOf(parts.get(villageByName("Pecatu")!.id)!, { tourism: 0, growth: 0, sealed: 0, wells: 0, coast: 0 })).toBeNull();
  });
});

describe("rain", () => {
  const pe = villageByName("Pecatu")!;
  it("finds no decline in Pecatu dry-season rain", () => {
    expect(trend(pe.cell.drySeries).perDecade).toBeGreaterThan(0);
  });
  it("covers more with a bigger tank and never more than all of the use", () => {
    let last = -1;
    for (const t of [1, 5, 20, 100]) {
      const r = simulate(pe.cell, 220, 0.75, 1800, t);
      expect(r.cover).toBeGreaterThanOrEqual(last);
      expect(r.cover).toBeLessThanOrEqual(1);
      last = r.cover;
    }
  });
  it("conserves water: used plus spilled never exceeds caught plus the starting half tank", () => {
    const r = simulate(pe.cell, 220, 0.75, 1800, 50);
    expect(r.usedM3 + r.spillM3).toBeLessThanOrEqual(r.caughtM3 + 25 / 30 + 1e-9);
  });
  it("matches the planner numbers quoted in the brief", () => {
    const { pick } = plan(pe.cell, 220, 0.75, 1800);
    expect(pick.tankM3).toBe(50);
    expect(Math.round(pick.cover * 100)).toBe(35);
  });
});

describe("agent tools", () => {
  const ranked = rankAll(DEFAULT_WEIGHTS);
  const highlighted: number[][] = [];
  const tools = agentTools({ ranked, weights: DEFAULT_WEIGHTS, highlight: (ids) => highlighted.push(ids) });
  const run = (name: string, input: unknown) => tools.find((t) => t.name === name)!.execute(input) as any;
  it("rank_villages by score returns real scores (regression: they were undefined)", () => {
    const r = run("rank_villages", { by: "score", limit: 3 });
    expect(r.map((x: any) => x.village)).toEqual(ranked.slice(0, 3).map((s) => s.v.name));
    for (const x of r) expect(typeof x.score).toBe("number");
  });
  it("rank_villages by a part adds that part's reading", () => {
    const r = run("rank_villages", { by: "tourism", limit: 1 });
    expect(r[0].tourism).toMatch(/per km²/);
  });
  it("get_village refuses unknown names", () => {
    expect(() => run("get_village", { name: "Atlantis" })).toThrow(/No village/);
  });
  it("highlight_villages resolves names to ids", () => {
    expect(run("highlight_villages", { names: ["Pecatu", "Ungasan"] })).toEqual({ highlighted: 2 });
    expect(highlighted.at(-1)).toHaveLength(2);
  });
});

describe("areas", () => {
  for (const s of SPOTS) {
    it(`${s.id}: file is complete and its outlines decode`, () => {
      const raw = JSON.parse(readFileSync(resolve(__dirname, `../../../out/spots/${s.id}.json`), "utf8"));
      expect(raw.id).toBe(s.id);
      expect(raw.frames.length).toBeGreaterThanOrEqual(8);
      expect(raw.frames[0].year).toBe(2018);
      expect(raw.frames.at(-1).year).toBe(2026);
      if (typeof Path2D === "undefined") (globalThis as any).Path2D = class { moveTo() {} lineTo() {} closePath() {} };
      const set = buildingsFor({ ...raw, villageName: raw.village });
      expect(set.total).toBe(raw.buildings.n);
      expect(Object.keys(raw.buildings.dryRain).length).toBeGreaterThanOrEqual(8);
      const sh = raw.buildings.sharp;
      if (sh) {
        // sharp dates, when merged, cover every outline in order
        for (const k of ["first", "before", "earliest", "meta"]) expect(Buffer.from(sh[k], "base64").length).toBe(raw.buildings.n);
        expect(set.list.some((b) => b.source === "sharp")).toBe(true);
      } else expect(set.list.every((b) => b.source !== "sharp")).toBe(true);
    });
  }
});

describe("recent_rain", () => {
  const pe = villageByName("Pecatu")!;
  const file = (through: string, cell = pe.cell.key) => ({
    source: "test", normal: "1996-2025", data_through: through, generated_at: "", limits: "area figure",
    cells: [{
      cell: cell.replace(/,115$/, ",115.0"), villages: ["Pecatu"],
      months: [
        { month: "2026-10", mm: 40, normal_mm: 62.2, complete: true, pct_of_normal: 64 },
        { month: "2026-11", mm: 6, normal_mm: 118.8, complete: false, pct_of_normal: null },
      ],
      dry_season_so_far: { months: ["2026-10"], mm: 40, normal_mm: 62.2, pct_of_normal: 64 },
    }],
  });

  it("names the date its data runs to and never scores the partial month", () => {
    const r = recentRainFor(pe, file("2026-11-03"), new Date("2026-11-09T00:00:00Z"));
    expect(r.data_through).toBe("2026-11-03");
    expect(r.days_since_data).toBe(6);
    expect(r.rule).toContain("2026-11-03");
    expect(r.complete_months.map((m) => m.month)).toEqual(["2026-10"]);
    expect(r.partial_month?.month).toBe("2026-11");
    expect("pct_of_normal" in (r.partial_month ?? {})).toBe(false);
    expect("stale" in r).toBe(false);
  });
  it("flags old data as stale instead of presenting it as current", () => {
    const r = recentRainFor(pe, file("2026-09-01"), new Date("2026-11-09T00:00:00Z"));
    expect(r.stale).toMatch(/days old/);
  });
  it("refuses when the village's cell is not in the file", () => {
    expect(() => recentRainFor(pe, file("2026-11-03", "-1,1"))).toThrow(/not available/);
  });
  it("is one of the agent's tools", () => {
    const names = agentTools({ ranked: rankAll(DEFAULT_WEIGHTS), weights: DEFAULT_WEIGHTS, highlight: () => {} }).map((t) => t.name);
    expect(names).toContain("recent_rain");
  });
});

// ---- sharp building dates (scripts/merge_sharp.py -> buildings.sharp)

const poly = () => { if (typeof Path2D === "undefined") (globalThis as any).Path2D = class { moveTo() {} lineTo() {} closePath() {} }; };
const i8 = (xs: number[]) => Buffer.from(Int8Array.from(xs).buffer).toString("base64");
const u8 = (xs: number[]) => Buffer.from(Uint8Array.from(xs)).toString("base64");
const CAPS = [
  { date: "2010-06-22", rid: 10, res: 0.5, sensor: "WV02", provider: "DigitalGlobe" },
  { date: "2015-09-15", rid: 31026, res: 0.31, sensor: "WV03_VNIR", provider: "DigitalGlobe" },
  { date: "2019-10-20", rid: 18289, res: 0.31, sensor: "WV03_VNIR", provider: "Maxar" },
  { date: "2023-03-25", rid: 17632, res: 0.31, sensor: "WV03", provider: "Maxar" },
];
const FRAMES = [2018, 2019, 2020, 2021, 2022, 2023].map((y) => ({ year: y, date: `${y}-07-01`, cloudPct: 0, greenPct: 50, img: "" }));
/** n square buildings with the given Sentinel-2 frame indices, optionally with a sharp record */
function fakeSpot(id: string, s2: number[], sharp?: RawSharp) {
  const a: number[] = [];
  s2.forEach((f, k) => a.push(f, 1, 4, k * 40, 0, k * 40 + 20, 0, k * 40 + 20, 20, k * 40, 20));
  const b64 = Buffer.from(Int16Array.from(a).buffer).toString("base64");
  return { id, label: id, region: "", village: "", villageName: "", bbox: [0, 0, 1, 1] as [number, number, number, number], frames: FRAMES,
    buildings: { n: s2.length, scale: 1, b64, dryRain: {}, source: "test", firstSeen: {}, sharp } };
}
const meta = (status: number, small = 0, conf = 1) => status | (small << 3) | (Math.round(conf * 15) << 4);

describe("sharp building dates", () => {
  poly();
  // 0 dated 2019 (open ground 2015), 1 there by 2010, 2 demolished 2023 (no appearance date),
  // 3 not seen sharp -> Sentinel 2021, 4 no date at all, 5 dated 2023 low confidence, 6 small, dated 2015
  const sharp: RawSharp = {
    version: "sharp-3", captures: CAPS,
    first: i8([2, -1, -2, -2, -2, 3, 1]), before: i8([1, -1, -1, -1, -1, 2, 0]), earliest: i8([0, 0, 1, 0, -1, 0, 0]),
    meta: u8([meta(0), meta(2), meta(5), meta(3), meta(4), meta(1, 0, 0.3), meta(0, 1)]), gone: [[2, 3]],
  };
  const set = buildingsFor(fakeSpot("t-sharp", [5, -1, -1, 3, -1, 4, -1], sharp) as never);
  const [dated, there, demol, fallback, none, weak, small] = set.list;

  it("decodes dates, sources and flags", () => {
    expect(dated).toMatchObject({ seen: "2019-10-20", thereBy: false, openGround: "2015-09-15", source: "sharp", low: false, gone: null });
    expect(there).toMatchObject({ seen: "2010-06-22", thereBy: true, openGround: null, source: "sharp" });
    expect(demol).toMatchObject({ seen: null, thereBy: false, gone: "2023-03-25", source: "sharp" });
    expect(fallback).toMatchObject({ seen: "2021-07-01", thereBy: false, source: "sentinel" });
    expect(none).toMatchObject({ seen: null, source: "none" });
    expect(weak.low).toBe(true);
    expect(small.low).toBe(true);
    expect(set.captures).toHaveLength(4);
  });
  it("draws each building by date: new, later, already there, unknown, gone", () => {
    expect(stateAt(dated, "2019-10-19")).toBe("later");
    expect(stateAt(dated, "2019-10-20")).toBe("new"); // appears exactly from the capture where it was first seen
    expect(stateAt(there, "2010-06-22")).toBe("old");
    expect(stateAt(there, "2009-01-01")).toBe("unknown"); // before its earliest capture: no view, and not growth
    expect(stateAt(demol, "2015-09-15")).toBe("unknown"); // when it went up is not known: never "already there"
    expect(stateAt(demol, "2023-03-24")).toBe("unknown");
    expect(stateAt(demol, "2023-03-25")).toBe("gone");
    expect(stateAt(fallback, "2020-07-01")).toBe("later");
    expect(stateAt(fallback, "2021-07-01")).toBe("new");
    expect(stateAt(none, "2030-01-01")).toBe("unknown");
  });
  it("counts only new growth, cumulative by date; there-by and demolished never count", () => {
    expect(set.grown).toBe(4); // dated, fallback, weak, small
    expect(set.thereBy).toBe(1); // demolished excluded
    expect(set.used).toEqual(["2010-06-22", "2023-03-25"]);
    expect(set.list.filter(isNew)).toEqual([dated, fallback, weak, small]);
    expect(grownBy(set, "2010-06-22")).toBe(0);
    expect(grownBy(set, "2015-09-15")).toBe(1);
    expect(grownBy(set, "2019-10-20")).toBe(2);
    expect(grownBy(set, "2021-07-01")).toBe(3);
    expect(grownBy(set, "2023-03-25")).toBe(4);
    expect(cameAfter(set, "2015-09-15")).toBe(3);
    expect(set.span).toEqual([2015, 2022]); // the low-confidence 2023 date falls back to Sentinel-2 (2022)
  });
  it("words the hover card in plain dates", () => {
    expect(describeBuilding(dated, set, "2023-03-25", "Mar 2023")).toEqual({ title: "Built by Oct 2019", body: "Seen in the Maxar 0.31 m capture of 20 Oct 2019, open ground in Sep 2015." });
    expect(describeBuilding(dated, set, "2015-09-15", "Sep 2015").title).toBe("Not built yet in Sep 2015");
    expect(describeBuilding(there, set, "2023-03-25", "now")).toEqual({ title: "Already there in Jun 2010", body: "The earliest clear sharp view of this spot: the Maxar 0.5 m capture of 22 Jun 2010." });
    expect(describeBuilding(weak, set, "2024-01-01", "now")).toEqual({ title: "Built by 2022, uncertain", body: "The sharp captures are not clear enough to date it; Sentinel-2 (10 m) first saw a roof in 2022." });
    expect(describeBuilding(fallback, set, "2024-01-01", "now")).toEqual({ title: "Built by 2021, uncertain", body: "The sharp captures show no clear roof here; Sentinel-2 (10 m) first saw a roof in 2021." });
    expect(describeBuilding(fallback, set, "2015-09-15", "Sep 2015").body).not.toContain("Open ground");
    expect(describeBuilding(demol, set, "2020-01-01", "2020")).toEqual({ title: "Torn down by Mar 2023", body: "A roof shows here in earlier sharp captures; when it went up is not clear. Open ground again in the Maxar 0.31 m capture of 25 Mar 2023." });
    expect(captureText({ ...CAPS[0], provider: "Vantor" })).toContain("the Maxar");
  });
  it("falls back to Sentinel-2 dates when the area has no sharp record", () => {
    const s2 = buildingsFor(fakeSpot("t-s2", [2, -1, 4]) as never);
    expect(s2.captures).toBeNull();
    expect(s2.list.map((b) => b.source)).toEqual(["sentinel", "none", "sentinel"]);
    expect(s2.list.map((b) => b.seen)).toEqual(["2020-07-01", null, "2022-07-01"]);
    expect(grownBy(s2, "2021-07-01")).toBe(1);
    expect(describeBuilding(s2.list[0], s2, "2026-01-01", "2026")).toEqual({ title: "First seen 2020", body: "Its ground turned to roof in the 2020 frame and stayed that way." });
    expect(describeBuilding(s2.list[1], s2, "2019-07-01", "2019", true).title).toBe("Here in 2019, or no date");
  });
  it("dates sharp timeline steps by the newest capture each release carries, never going back", () => {
    expect(sharpStepDates([{ rid: 10, captured: "2010-06-22" }, { rid: 17632, captured: "2023-02-22" }, { rid: 999, captured: "2022-01-01" }], CAPS))
      .toEqual(["2010-06-22", "2023-03-25", "2023-03-25"]);
  });
  it("Pecatu: the merged record matches out/sharp/pecatu.json building by building", () => {
    const src = JSON.parse(readFileSync(resolve(__dirname, "../../../out/sharp/pecatu.json"), "utf8"));
    const pe = buildingsFor(builtIn);
    expect(pe.captures?.map((c) => c.date)).toEqual(src.captures.map((c: { date: string }) => c.date));
    let bad = 0;
    pe.list.forEach((b, j) => {
      const f = src.first[j], st = src.status[j];
      // low-confidence dates (status 1) are not used: they fall back to Sentinel-2
      const want = f >= 0 && st !== 1 ? src.captures[f].date : f === -1 && src.earliest[j] >= 0 ? src.captures[src.earliest[j]].date : undefined;
      if (want !== undefined && (b.seen !== want || b.source !== "sharp")) bad++;
      if (want === undefined && st !== 5 && b.source === "sharp") bad++;
      if (st === 5 && (b.seen !== null || b.thereBy || b.source !== "sharp")) bad++;
      if ((f === -1) !== b.thereBy) bad++;
      if (b.low !== (st === 1 || src.small[j] === 1)) bad++;
      if ((src.gone[j] >= 0) !== (b.gone !== null)) bad++;
    });
    expect(bad).toBe(0);
    // most buildings take a sharp date; the old Sentinel dates are kept only where sharp has none
    expect(pe.list.filter((b) => b.source === "sharp").length).toBeGreaterThan(0.9 * pe.total);
    // the timeline's capture steps line up with the dates
    const caps = capturesFor("pecatu");
    const d = sharpStepDates(caps, pe.captures);
    for (let i = 1; i < d.length; i++) expect(d[i] >= d[i - 1]).toBe(true);
    expect(d[caps.findIndex((c) => c.rid === 17632)]).toBe("2023-03-25");
  });
});

describe("score display", () => {
  it("never shows a rounded number that sits in a different band from the badge", async () => {
    const { scoreText } = await import("./score");
    expect(scoreText(74.8)).toBe("74.8");
    expect(scoreText(74.2)).toBe("74");
    expect(scoreText(39.6)).toBe("39.6");
    expect(scoreText(91.9)).toBe("92");
  });
});

describe("spotsFor (Ask Kering's See on satellite)", () => {
  it("finds an area by its village or a village named in its label, once each", async () => {
    const { spotsFor } = await import("./spots");
    expect(spotsFor(["Pecatu"]).map((s) => s.id)).toEqual(["pecatu"]);
    expect(spotsFor(["Ungasan", "Legian", "Umalas"]).map((s) => s.id)).toEqual(["pecatu", "seminyak", "kerobokan"]);
    expect(spotsFor(["Pecatu", "Ungasan"]).map((s) => s.id)).toEqual(["pecatu"]);
    expect(spotsFor(["Kutuh", ""])).toEqual([]);
  });
});
