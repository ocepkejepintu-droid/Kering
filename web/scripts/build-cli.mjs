// Bundles scripts/kering-cli.ts (the app's own tool code + data) into ../agents/workspace/kering.mjs for the
// Managed Agents' VPS sandbox. Run after any change to src/lib or out/: `node scripts/build-cli.mjs`.
import { build } from "esbuild";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
await build({
  entryPoints: [resolve(here, "kering-cli.ts")],
  outfile: resolve(here, "../../agents/workspace/kering.mjs"),
  bundle: true, platform: "node", target: "node18", format: "esm", logLevel: "warning",
  alias: { "@": resolve(here, "../src"), "@data": resolve(here, "../../out"), "@kering": resolve(here, "../..") },
  external: ["*.css"],
  banner: { js: "// Built from web/scripts/kering-cli.ts with the app's own src/lib and out/ data. Do not edit; rebuild with `node web/scripts/build-cli.mjs`." },
});
console.log("wrote agents/workspace/kering.mjs");
