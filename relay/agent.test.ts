// node --experimental-strip-types --no-warnings --test relay/agent.test.ts   (NODE_PATH=worker/node_modules)
import { test } from "node:test";
import assert from "node:assert/strict";
import { allowedCommand, stepLabel, validateAsk, weightsArg } from "./agent.ts";

const P = "cd /srv/kering-agent/workspace && node kering.mjs ";

test("allows only kering.mjs with plain arguments", () => {
  for (const ok of ["village Pecatu", 'village "Tanjung Benoa"', "rank --kab Badung --limit 10", "rank --by wells --karst-only",
    "rain Pecatu --roof 220 --lpd 1800", "recent_rain Pecatu", "names", "weights",
    "rank --weights growth=25,sealed=25,wells=25,tourism=15,coast=10"]) {
    assert.equal(allowedCommand(P + ok), true, ok);
  }
});

test("refuses everything else", () => {
  for (const bad of [
    "cat /etc/passwd", "ls /", "node kering.mjs village Pecatu", // wrong prefix
    P + "village Pecatu; cat /etc/kering-relay/relay.env", P + "village Pecatu && env", P + "village $(id)",
    P + "village `id`", P + "village Pecatu | sh", P + "village Pecatu > x", P + "village Pecatu\nid",
    P + "evil", P + "village 'unbalanced", "cd /tmp && node kering.mjs village Pecatu", P + "village ../../etc",
    P + "village Pecatu & sleep 9", P + "village (x)", P + "village Pecatu\\; id",
  ]) {
    assert.equal(allowedCommand(bad), false, bad);
  }
  assert.equal(allowedCommand(undefined), false);
  assert.equal(allowedCommand(P + "village " + "a".repeat(400)), false);
});

test("step labels", () => {
  assert.equal(stepLabel(P + "village Pecatu"), "Reading Pecatu");
  assert.equal(stepLabel(P + "recent_rain Pecatu"), "Reading this year's rain for Pecatu");
  assert.equal(stepLabel(P + "rank --kab Badung"), "Ranking villages");
  assert.equal(stepLabel(P + "rain Pecatu --roof 220 --lpd 1800"), "Simulating rain catch in Pecatu");
  assert.equal(stepLabel(P + 'village "Tanjung Benoa" --weights growth=25'), "Reading Tanjung Benoa");
});

test("weights: plain part names and 0-100 numbers only", () => {
  assert.equal(weightsArg(undefined), null);
  assert.equal(weightsArg({ growth: 25, sealed: 25, wells: 25, tourism: 15, coast: 10 }), "growth=25,sealed=25,wells=25,tourism=15,coast=10");
  assert.equal(weightsArg({ growth: 12.6 }), "growth=13");
  assert.equal(weightsArg({ growth: "rm -rf" }), null);
  assert.equal(weightsArg({ "a;id": 1 }), null);
  assert.equal(weightsArg({ wells: 1e9 }), null);
});

test("validateAsk", () => {
  assert.equal(typeof validateAsk({ question: "" }), "string");
  assert.equal(typeof validateAsk({ question: "x", sessionId: "../../x" }), "string");
  assert.deepEqual(validateAsk({ question: " Pecatu? ", sessionId: "sesn_01abc" }), { question: "Pecatu?", sessionId: "sesn_01abc", weights: undefined });
});
