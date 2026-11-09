// The public repo cannot ship AirROI listing counts (paid vendor data). Its rows.json has listings and listingsKm2
// null and carries tourismPct instead: the village's percentile of listingsKm2 among villages with a market.
// A percentile of a percentile keeps the order, so the score must not move. This builds public-shaped rows from
// the real rows.json and checks every village's score and rank against the internal build.
import { describe, expect, it, vi } from "vitest";
import rowsRaw from "@data/rows.json";
import type { Village } from "./data";

type Row = { listings?: number | null; listingsKm2?: number | null; tourismPct?: number | null; [k: string]: unknown };

/** Percentile 0–100 (ties averaged, 1 decimal) of listingsKm2 among the rows that have a market; null where none. */
function toPublic(rows: Row[]): Row[] {
  const sorted = rows.map((r) => r.listingsKm2).filter((x): x is number => x != null).sort((a, b) => a - b);
  const pct = (x: number) => Math.round((1000 * (sorted.indexOf(x) + sorted.lastIndexOf(x)) / 2) / (sorted.length - 1)) / 10;
  return rows.map((r) => ({ ...r, listings: null, listingsKm2: null, tourismPct: r.listingsKm2 != null ? pct(r.listingsKm2) : (r.tourismPct ?? null) }));
}
/** The internal repo has the raw AirROI numbers; the public repo ships only tourismPct, so the comparisons with raw data skip there. */
const RAW = (rowsRaw as unknown as Row[]).some((r) => r.listingsKm2 != null);

const loadPublic = async () => {
  vi.resetModules();
  vi.doMock("@data/rows.json", () => ({ default: toPublic(rowsRaw as unknown as Row[]) }));
  const mods = { data: await import("./data"), score: await import("./score"), agent: await import("./agent"), prompts: await import("./prompts") };
  vi.doUnmock("@data/rows.json");
  vi.resetModules();
  return mods;
};
const loadInternal = async () => ({ data: await import("./data"), score: await import("./score"), agent: await import("./agent"), prompts: await import("./prompts") });

describe("public data shape (tourismPct, no AirROI numbers)", () => {
  it("the public rows carry no listing numbers, and tourismPct only where a market is", async () => {
    const [pub, int] = [await loadPublic(), await loadInternal()];
    expect(pub.data.villages.every((v) => v.listings == null && v.listingsKm2 == null)).toBe(true);
    expect(pub.data.hasListingCounts).toBe(false);
    expect(pub.data.villages.some((v) => v.tourismPct != null)).toBe(true);
    if (!RAW) return;
    expect(int.data.hasListingCounts).toBe(true);
    const intById = new Map(int.data.villages.map((v) => [v.id, v]));
    for (const v of pub.data.villages) expect(v.tourismPct == null).toBe(intById.get(v.id)!.listingsKm2 == null);
    expect(int.data.villages.every((v) => v.tourismPct == null)).toBe(true); // internal rows have no tourismPct today
  });

  it.skipIf(!RAW)("gives every village the same score and rank as the internal data, with any weights", async () => {
    const [pub, int] = [await loadPublic(), await loadInternal()];
    const weights = [int.score.DEFAULT_WEIGHTS, { growth: 0, sealed: 0, wells: 10, tourism: 90, coast: 0 }, { growth: 10, sealed: 20, wells: 30, tourism: 40, coast: 50 }];
    for (const w of weights) {
      const a = int.score.rankAll(w), b = pub.score.rankAll(w);
      expect(b).toHaveLength(a.length);
      expect(a.length).toBe(int.data.villages.length);
      b.forEach((s, k) => {
        expect(s.v.id).toBe(a[k].v.id);
        expect(s.rank).toBe(a[k].rank);
        expect(s.score).toBe(a[k].score);
        expect(s.parts).toEqual(a[k].parts);
      });
    }
  });

  it("reads the tourism part as a rank, never a count, zero or 'no market', where tourismPct is set", async () => {
    const pub = await loadPublic();
    const tourism = pub.score.PARTS.find((p) => p.key === "tourism")!;
    const ranked = pub.score.rankAll(pub.score.DEFAULT_WEIGHTS);
    const tools = pub.agent.agentTools({ ranked, weights: pub.score.DEFAULT_WEIGHTS, highlight: () => {} });
    for (const v of pub.data.villages) {
      const r = tourism.reading(v);
      if (v.tourismPct != null) {
        expect(r).toBe(`More short-stay listings per km² than ${Math.round(v.tourismPct)}% of the other villages with listing data`);
        const p = pub.agent.profile({ ranked, weights: pub.score.DEFAULT_WEIGHTS, highlight: () => {} }, v);
        expect(p.airbnb_listings).toMatch(/count not published/);
        expect(p.airbnb_listings).not.toMatch(/no AirROI market/);
      } else expect(r).toBe("No AirROI market covers this village");
    }
    const top = (await tools.find((t) => t.name === "rank_villages")!.execute({ by: "tourism", limit: 1 })) as { tourism: string }[];
    expect(top[0].tourism).toMatch(/than 100% of the other villages with listing data/);
  });

  it("quotes no listing count in the claims or the example brief", async () => {
    const pub = await loadPublic();
    const ranked = pub.score.rankAll(pub.score.DEFAULT_WEIGHTS);
    const pe = ranked.find((s) => s.v.name === "Pecatu")!;
    const brief = pub.prompts.exampleBrief(pe, ranked);
    expect(brief).not.toMatch(/\d[\d,]* Airbnb listings/);
    expect(brief).toContain(`more Airbnb listings per km² than **${Math.round(pe.v.tourismPct!)}%** of the other villages with listing data`);
    const text = JSON.stringify(pub.prompts.claims(ranked));
    expect(text).toContain("179 of 261 villages have no market");
  });
});

describe.skipIf(!RAW)("tourism reading on the internal data shape", () => {
  it("keeps the raw density text and the no-market text", async () => {
    const { score, data } = await loadInternal();
    const tourism = score.PARTS.find((p) => p.key === "tourism")!;
    const pe = data.villageByName("Pecatu")!;
    expect(tourism.reading(pe)).toMatch(/^[\d,.]+ listings per km²$/);
    const none = data.villages.find((v) => v.listingsKm2 == null)!;
    expect(tourism.reading(none)).toBe("No AirROI market covers this village");
    // Raw numbers win over tourismPct when both are present.
    const both: Village = { ...pe, tourismPct: 12.3 };
    expect(tourism.reading(both)).toBe(tourism.reading(pe));
    expect(tourism.raw(both)).toBe(pe.listingsKm2);
    expect(tourism.raw({ ...none, tourismPct: 12.3 })).toBe(12.3);
  });
});
