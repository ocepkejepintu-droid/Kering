// The Managed Agents read Kering through agents/workspace/kering.mjs. This checks that the built file gives
// exactly what the page's own tools give, so the agents and the app cannot disagree (rebuild with
// `node scripts/build-cli.mjs` when this fails).
import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { agentTools } from "./agent";
import { DEFAULT_WEIGHTS, rankAll, type Weights } from "./score";

const CLI = resolve(__dirname, "../../../agents/workspace/kering.mjs");
const cli = (...args: string[]) => JSON.parse(execFileSync("node", [CLI, ...args], { encoding: "utf8" }));
const app = async (w: Weights, tool: string, input: unknown) =>
  JSON.parse(JSON.stringify(await agentTools({ ranked: rankAll(w), weights: w, highlight: () => {} }).find((t) => t.name === tool)!.execute(input)));

describe("kering.mjs matches the app's tools", () => {
  it.each(["Pecatu", "Legian", "Ubud", "Lembongan"])("get_village %s", async (name) => {
    expect(cli("village", name)).toEqual(await app(DEFAULT_WEIGHTS, "get_village", { name }));
  });
  it("rank_villages by score and by one part, with a kabupaten filter", async () => {
    expect(cli("rank", "--limit", "25")).toEqual(await app(DEFAULT_WEIGHTS, "rank_villages", { by: "score", limit: 25 }));
    expect(cli("rank", "--by", "wells", "--kab", "Badung", "--limit", "10")) // wells: one of the score parts
      .toEqual(await app(DEFAULT_WEIGHTS, "rank_villages", { by: "wells", kabupaten: "Badung", limit: 10 }));
  });
  it("rain_catch", async () => {
    expect(cli("rain", "Pecatu", "--roof", "220", "--lpd", "1800"))
      .toEqual(await app(DEFAULT_WEIGHTS, "rain_catch", { village: "Pecatu", roof_m2: 220, litres_per_day: 1800 }));
  });
  it("custom weights", async () => {
    const keys = Object.keys(DEFAULT_WEIGHTS) as (keyof Weights)[];
    const w = Object.fromEntries(keys.map((k, i) => [k, i === 0 ? 0 : 10 + 10 * i])) as Weights;
    const s = keys.map((k) => `${k}=${w[k]}`).join(",");
    expect(cli("rank", "--weights", s, "--limit", "10")).toEqual(await app(w, "rank_villages", { by: "score", limit: 10 }));
    expect(cli("village", "Pecatu", "--weights", s)).toEqual(await app(w, "get_village", { name: "Pecatu" }));
  });
});
