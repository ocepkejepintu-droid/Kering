// End-to-end: page served by `wrangler dev`, Claude replaced by test/mock-anthropic.mjs.
const { chromium } = require("playwright");
const base = process.argv[2] || "http://127.0.0.1:8787";
const out = process.argv[3];
const text = (p, sel) => p.locator(sel).first().innerText();
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(base + "/#staff"); // the code entry is only shown to the team
  await p.goto(base + "/#map");
  await p.getByText("Claude needs the event code").first().waitFor({ timeout: 15000 });
  await p.getByRole("button", { name: /Ask Kering/ }).click();
  await p.getByLabel("Event code").fill("wrong");
  await p.getByRole("button", { name: "Turn on Claude" }).click();
  await p.getByText("That code is not right.").waitFor({ timeout: 10000 });
  await p.getByLabel("Event code").fill("bukit2026");
  await p.getByRole("button", { name: "Turn on Claude" }).click();
  await p.getByText("Claude on, via event code").first().waitFor({ timeout: 10000 });
  await p.getByRole("button", { name: "Which Bukit villages should start rain capture first, and why?" }).click();
  await p.getByText("Start with these").waitFor({ timeout: 30000 });
  const reply = await text(p, 'aside[aria-label="Ask Kering"]');
  const chip = await p.getByText(/Kering highlighted \d+/).first().innerText();
  if (out) await p.screenshot({ path: out });
  await p.reload();
  await p.getByText("Claude on, via event code").first().waitFor({ timeout: 10000 });
  console.log(JSON.stringify({ steps: reply.split("\n").filter((l) => /Ranking|Highlighting/.test(l)), scores: reply.match(/score [\d.]+/g), chip, rememberedCode: true, errs }, null, 1));
  await b.close();
})().catch((e) => { console.error("E2E FAIL", e.message); process.exit(1); });
