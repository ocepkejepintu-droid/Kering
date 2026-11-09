import { describe, expect, it } from "vitest";
import { wells } from "./data";
import { SPOTS } from "./spots";
import { builtIn } from "./spots";
import { buildingsFor } from "./buildings";
import { countInCircle, countInRect, densityGrid, depthColor, describeWell, estimateSummary, estimateWell, FRAME_H, FRAME_W, hitWell, metresPerPx, projectWells, wellAt, wellEstimates, wellsForSpot } from "./wells-overlay";

const BBOX = [115.0, -8.8, 115.1, -8.7] as const;

describe("wells overlay", () => {
  it("projects lon/lat linearly onto the 480 × 339 frame and drops wells outside it", () => {
    const pts = projectWells([[115.0, -8.7, 10, null], [115.1, -8.8, 50, 2], [115.05, -8.75, null, null], [115.2, -8.75, 30, null], [115.05, -8.9, 30, null]], BBOX);
    expect(pts).toHaveLength(3);
    const byDepth = (d: number | null) => pts.find((p) => p.depth === d)!;
    expect(byDepth(10)).toMatchObject({ x: 0, y: 0 });
    expect(byDepth(50).x).toBeCloseTo(FRAME_W); expect(byDepth(50).y).toBeCloseTo(FRAME_H);
    expect(byDepth(null).x).toBeCloseTo(240); expect(byDepth(null).y).toBeCloseTo(169.5);
    // deepest first, so shallow ones are drawn on top
    expect(pts[0].depth).toBe(50);
  });
  it("finds every area's wells inside its frame and caches them", () => {
    let sum = 0;
    for (const s of SPOTS) {
      const list = wellsForSpot(s);
      expect(wellsForSpot(s)).toBe(list);
      for (const p of list) { expect(p.x).toBeGreaterThanOrEqual(0); expect(p.x).toBeLessThanOrEqual(FRAME_W); expect(p.y).toBeGreaterThanOrEqual(0); expect(p.y).toBeLessThanOrEqual(FRAME_H); }
      sum += list.length;
    }
    expect(sum).toBeGreaterThan(1000);
    expect(sum).toBeLessThanOrEqual(wells.length);
    expect(wellsForSpot(SPOTS.find((s) => s.id === "canggu")!).length).toBeGreaterThan(300);
  });
  it("hit-tests the nearest well within the radius", () => {
    const pts = projectWells([[115.0, -8.7, 10, null], [115.001, -8.7, 20, null]], BBOX); // 4.8 px apart
    const at10 = pts.findIndex((p) => p.depth === 10), at20 = pts.findIndex((p) => p.depth === 20);
    expect(hitWell(pts, 1, 0, 3)).toBe(at10);
    expect(hitWell(pts, 4, 0.5, 3)).toBe(at20);
    expect(hitWell(pts, 2.4, 10, 3)).toBe(-1);
  });
  it("counts wells in a circle and a rectangle", () => {
    const pts = projectWells([[115.0, -8.7, 10, null], [115.05, -8.75, 20, null], [115.1, -8.8, 30, null]], BBOX);
    expect(countInCircle(pts, 240, 169.5, 5)).toBe(1);
    expect(countInCircle(pts, 0, 0, 400)).toBe(2);
    expect(countInRect(pts, 0, 0, FRAME_W, FRAME_H)).toBe(3);
    expect(countInRect(pts, 100, 100, 300, 300)).toBe(1);
  });
  it("builds a density field that peaks on the wells, and plain words for the card", () => {
    const pts = projectWells([[115.05, -8.75, 60, null]], BBOX);
    const g = densityGrid(pts, FRAME_W, FRAME_H, 1, 5);
    expect(g[170 * FRAME_W + 240]).toBeGreaterThan(0.9);
    expect(g[170 * FRAME_W + 270]).toBeLessThan(0.01);
    expect(describeWell(pts[0]).body).toContain("Permitted depth 60 m");
    expect(describeWell({ ...pts[0], depth: null }).body).toContain("not stated");
    expect(depthColor(10)).not.toBe(depthColor(140));
  });

  it("dates a well by the nearest standing building within 50 m", () => {
    const b = (x0: number, y0: number, x1: number, y1: number, seen: string | null, more: Record<string, unknown> = {}) =>
      ({ x0, y0, x1, y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, seen, thereBy: false, gone: null, openGround: null, low: false, source: "sharp" as const, ...more });
    const m = 10; // metres per px
    const near = [b(12, 0, 14, 2, "2019-10-01", { openGround: "2015-09-09" }), b(1, 1, 3, 3, null), b(-4, -4, -2, -2, "2012-01-01", { gone: "2020-01-01" })];
    // nearest standing building has no date (sharp area): no estimate; the demolished one does not count
    expect(estimateWell({ x: 0, y: 0 }, near, m, null)).toMatchObject({ kind: "none", distM: 14 });
    // the same in a Sentinel-2-only area: it never turned bright, so it stood by the first frame
    expect(estimateWell({ x: 0, y: 0 }, near, m, "2019-08-01", false)).toMatchObject({ kind: "old", date: "2019-08-01" });
    expect(estimateWell({ x: -40, y: -40 }, near, m, null)).toMatchObject({ kind: "none", distM: null });
    const e = estimateWell({ x: 10, y: 1 }, near.slice(0, 1), m, null);
    expect(e).toMatchObject({ kind: "new", date: "2019-10-01", openGround: "2015-09-09", distM: 20 });
    // inside a building already there in the earliest view
    expect(estimateWell({ x: 13, y: 1 }, [b(12, 0, 14, 2, "2009-12-12", { thereBy: true })], m, null)).toMatchObject({ kind: "old", distM: 0 });
    // Sentinel-2 only: a building first seen in the first frame was already there
    expect(estimateWell({ x: 13, y: 1 }, [b(12, 0, 14, 2, "2019-08-01", { source: "sentinel" })], m, "2019-08-01").kind).toBe("old");
    // shown from the estimated date on; undated and "already there" wells at every date
    expect(wellAt(e, "2019-09-30")).toBe(false);
    expect(wellAt(e, "2019-10-01")).toBe(true);
    expect(wellAt({ ...e, kind: "none", date: null }, "2000-01-01")).toBe(true);
    const card = describeWell({ x: 10, y: 1, depth: 60, flow: null }, e, "2017-01-01", "Jan 2017");
    expect(card.title).toBe("Not drilled yet in Jan 2017 (estimate)");
    expect(card.body).toContain("Drilled about Oct 2019 (estimate)");
    expect(card.body).toContain("20 m away");
  });
  it("estimates Pecatu's wells from its buildings", () => {
    if (typeof Path2D === "undefined") (globalThis as any).Path2D = class { moveTo() {} lineTo() {} closePath() {} };
    expect(metresPerPx(builtIn.bbox)).toBeGreaterThan(10);
    expect(metresPerPx(builtIn.bbox)).toBeLessThan(13);
    const ests = wellEstimates(builtIn, buildingsFor(builtIn));
    expect(ests).toHaveLength(wellsForSpot(builtIn).length);
    const sum = estimateSummary(ests);
    expect(sum.new + sum.old + sum.none).toBe(ests.length);
    expect(sum.new).toBeGreaterThan(0);
    for (const e of ests) if (e.distM != null) expect(e.distM).toBeLessThanOrEqual(50);
  });
});
