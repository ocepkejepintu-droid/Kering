import type { RainCell } from "./data";

export const DAYS = [31, 28.25, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const TANKS = [1, 2, 3, 5, 7.5, 10, 15, 20, 30, 50, 75, 100];
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function trend(y: number[]) {
  const n = y.length, mx = (n - 1) / 2, my = y.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0;
  y.forEach((v, i) => { sxy += (i - mx) * (v - my); sxx += (i - mx) ** 2; });
  const slope = sxy / sxx;
  return { slope, perDecade: slope * 10, mean: my, at: (i: number) => my + slope * (i - mx) };
}

export interface SimResult { tankM3: number; cover: number; caughtM3: number; usedM3: number; spillM3: number }

/** Month-by-month tank balance over every real month in the record (tank starts half full). */
export function simulate(cell: RainCell, roofM2: number, runoff: number, litresPerDay: number, tankM3: number): SimResult {
  const cap = tankM3 * 1000;
  let store = cap / 2, met = 0, need = 0, caught = 0, spill = 0;
  cell.months.forEach((mm, k) => {
    const inflow = mm * roofM2 * runoff, demand = litresPerDay * DAYS[k % 12];
    caught += inflow; store += inflow;
    if (store > cap) { spill += store - cap; store = cap; }
    const use = Math.min(demand, store);
    store -= use; met += use; need += demand;
  });
  const years = cell.months.length / 12;
  return { tankM3, cover: need ? met / need : 0, caughtM3: caught / years / 1000, usedM3: met / years / 1000, spillM3: spill / years / 1000 };
}

/** Smallest tank that reaches 90% of the benefit of the largest tank considered. */
export function plan(cell: RainCell, roofM2: number, runoff: number, litresPerDay: number) {
  const curve = TANKS.map((t) => simulate(cell, roofM2, runoff, litresPerDay, t));
  const best = curve[curve.length - 1].cover;
  const pick = curve.find((r) => r.cover >= best * 0.9) ?? curve[curve.length - 1];
  return { pick, curve };
}
