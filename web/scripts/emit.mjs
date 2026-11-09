// Turns dist/index.html into the files each host needs:
//   ../kering.html                 offline file and staging mirror (no relay; Claude off unless KERING_PROXY is set)
//   ../worker/public/index.html    Cloudflare Worker copy, relay at /api/claude
//   <artifact path>                claude.ai Artifact page (no doctype/html/head/body: the host wraps it)
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const dist = readFileSync(resolve(here, "../dist/index.html"), "utf8");
const META = '<meta name="kering-proxy" content="" />';
if (!dist.includes(META)) throw new Error("kering-proxy meta tag not found in dist/index.html");
const withProxy = (url) => dist.replace(META, `<meta name="kering-proxy" content="${url}" />`);
const write = (p, s) => { mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, s); console.log(p, (s.length / 1e6).toFixed(2), "MB"); };

const targets = process.argv.slice(2);
const want = (t) => targets.length === 0 || targets.includes(t);

// Areas other than the built-in one load from spots/<id>.json next to the page.
const spotsDir = resolve(here, "../../out/spots");
const copySpots = (to) => {
  mkdirSync(to, { recursive: true });
  const files = readdirSync(spotsDir).filter((f) => f.endsWith(".json"));
  for (const f of files) copyFileSync(resolve(spotsDir, f), resolve(to, f));
  console.log(to, files.length, "area files");
};
if (want("offline")) write(resolve(here, "../../kering.html"), withProxy(process.env.KERING_PROXY ?? ""));
if (want("worker")) { write(resolve(here, "../../worker/public/index.html"), withProxy("/api/claude")); copySpots(resolve(here, "../../worker/public/spots")); }
if (want("site")) { write(resolve(here, "../../site/index.html"), withProxy("")); copySpots(resolve(here, "../../site/spots")); }
if (targets.some((t) => t.startsWith("artifact="))) {
  const out = targets.find((t) => t.startsWith("artifact=")).slice("artifact=".length);
  const head = dist.match(/<head>([\s\S]*?)<\/head>/)[1]
    .replace(/<meta charset="[^"]*"\s*\/?>/i, "")
    .replace(/<meta name="viewport"[^>]*>/i, "");
  const body = dist.match(/<body>([\s\S]*?)<\/body>/)[1];
  // title and styles first (the host scans the first 8 KB for <title>), then the app
  const title = head.match(/<title>[\s\S]*?<\/title>/)[0];
  write(resolve(out), title + head.replace(title, "") + body);
}
