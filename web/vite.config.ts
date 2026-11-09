import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";

// Fingerprint of the area files: areas saved in a browser are reused only while this matches,
// so a data rebuild replaces them. Deterministic, so the committed build stays reproducible.
const spotsDir = resolve(__dirname, "../out/spots");
const dataVersion = (() => {
  const h = createHash("sha1");
  for (const f of readdirSync(spotsDir).filter((x) => x.endsWith(".json")).sort()) h.update(f).update(readFileSync(resolve(spotsDir, f)));
  return h.digest("hex").slice(0, 12);
})();

// One self-contained HTML file: the same build runs as a claude.ai Artifact,
// on the Cloudflare Worker, on the staging mirror and offline.
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  define: { __KERING_DATA__: JSON.stringify(dataVersion) },
  resolve: { alias: { "@": resolve(__dirname, "src"), "@data": resolve(__dirname, "../out"), "@kering": resolve(__dirname, "..") } },
  build: { outDir: "dist", assetsInlineLimit: 100_000_000, chunkSizeWarningLimit: 8000 },
  test: { include: ["src/**/*.test.ts"] },
});
