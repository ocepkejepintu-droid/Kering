// Command-line front for the Managed Agents: runs the web app's own tool code (src/lib/agent.ts on
// score.ts, rain.ts and data.ts), so every number matches what the page shows. Built by
// scripts/build-cli.mjs into ../agents/workspace/kering.mjs; run with Node 18+, no dependencies.
//
//   node kering.mjs village <name>
//   node kering.mjs rank [--by score|tourism|growth|sealed|wells|dryness|coast] [--kab <kabupaten>] [--karst-only] [--limit N]
//   node kering.mjs rain <village> --roof <m2> --lpd <litres per day>
//   node kering.mjs recent_rain <village>
//   node kering.mjs names [--kab <kabupaten>]
//   node kering.mjs weights
//   node kering.mjs cells            (rain cells and their normals, for rain_recent.py)
// Every command takes --weights tourism=25,growth=20,sealed=20,wells=15,dryness=10,coast=10.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { villages } from "../src/lib/data";
import { DEFAULT_WEIGHTS, PARTS, rankAll, unscored, type PartKey, type Weights } from "../src/lib/score";
import { agentTools, recentRainFor, type RecentRain } from "../src/lib/agent";

const HERE = dirname(fileURLToPath(import.meta.url));

function parse(argv: string[]) {
  const pos: string[] = [];
  const opt: Record<string, string | true> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const k = a.slice(2);
      if (k === "karst-only") opt[k] = true;
      else opt[k] = argv[++i] ?? "";
    } else pos.push(a);
  }
  return { pos, opt };
}

function weightsFrom(s: string | true | undefined): Weights {
  const w = { ...DEFAULT_WEIGHTS };
  if (typeof s !== "string" || !s) return w;
  for (const part of s.split(",")) {
    const [k, v] = part.split("=");
    if (!(k in w) || !Number.isFinite(+v)) throw new Error(`Unknown or bad weight "${part}"; use ${Object.keys(w).join(", ")}`);
    w[k as PartKey] = +v;
  }
  return w;
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const { pos, opt } = parse(rest);
  const weights = weightsFrom(opt.weights);
  const ranked = rankAll(weights);
  const tools = agentTools({ ranked, weights, highlight: () => {} });
  const run = (name: string, input: unknown) => tools.find((t) => t.name === name)!.execute(input);
  const name = pos.join(" ");
  let out: unknown;
  switch (cmd) {
    case "village":
      out = await run("get_village", { name });
      break;
    case "rank":
      out = await run("rank_villages", {
        by: typeof opt.by === "string" ? opt.by : "score",
        kabupaten: typeof opt.kab === "string" ? opt.kab : undefined,
        karst_only: opt["karst-only"] === true,
        limit: typeof opt.limit === "string" ? Math.max(1, Math.min(261, +opt.limit || 10)) : 10,
      });
      break;
    case "rain":
      out = await run("rain_catch", { village: name, roof_m2: +(opt.roof as string), litres_per_day: +(opt.lpd as string) });
      break;
    case "recent_rain": {
      const file = typeof opt.file === "string" ? opt.file : join(HERE, "outputs", "rain", "latest.json");
      let data: RecentRain;
      try { data = JSON.parse(readFileSync(file, "utf8")); } catch {
        throw new Error("This year's rain is not available on this machine (no outputs/rain/latest.json). Say it is not available; do not estimate it.");
      }
      const v = villages.find((x) => x.name.toLowerCase() === name.toLowerCase()) ?? villages.find((x) => x.name.toLowerCase().includes(name.toLowerCase()));
      if (!v) throw new Error(`No village named ${name}.`);
      out = recentRainFor(v, data);
      break;
    }
    case "cells": { // rain cells with their 1996-2025 monthly normals and villages: input for rain_recent.py
      const m = new Map<string, { cell: string; clim: number[]; villages: string[] }>();
      for (const v of villages) {
        const c = m.get(v.cell.key) ?? { cell: v.cell.key, clim: v.cell.clim, villages: [] };
        c.villages.push(v.name);
        m.set(v.cell.key, c);
      }
      out = [...m.values()];
      break;
    }
    case "names":
      out = villages.filter((v) => typeof opt.kab !== "string" || v.kab.toLowerCase().includes(opt.kab.toLowerCase()))
        .map((v) => `${v.name} (${v.kec}, ${v.kab})`).sort();
      break;
    case "weights":
      out = { weights, parts: Object.fromEntries(PARTS.map((p) => [p.key, { label: p.label, meaning: p.why, source: p.source }])),
              scored: ranked.length, unscored: unscored(weights).map((v) => v.name) };
      break;
    default:
      throw new Error("Commands: village, rank, rain, recent_rain, names, weights, cells. See the top of this file.");
  }
  process.stdout.write(JSON.stringify(out, null, 1) + "\n");
}

main().catch((e) => {
  process.stdout.write(JSON.stringify({ error: String(e?.message ?? e) }) + "\n");
  process.exit(1);
});
