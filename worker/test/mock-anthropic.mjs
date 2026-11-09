// Scripted stand-in for the Messages API, for the end-to-end test only.
import http from "node:http";
const port = Number(process.argv[2] || 8790);
const log = [];
http.createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    if (req.url === "/__log") { res.writeHead(200, { "content-type": "application/json" }); return res.end(JSON.stringify(log)); }
    const b = JSON.parse(body || "{}");
    log.push({ model: b.model, effort: b.output_config?.effort, fallbacks: b.fallbacks, tools: (b.tools || []).map((t) => t.name), n: b.messages.length });
    const last = b.messages.at(-1);
    const hasResults = Array.isArray(last.content) && last.content.some((x) => x.type === "tool_result");
    let content, stop_reason = "end_turn";
    if (b.tools && !hasResults) {
      stop_reason = "tool_use";
      content = [
        { type: "thinking", thinking: "", signature: "sig-1" },
        { type: "tool_use", id: "tu_1", name: "rank_villages", input: { by: "score", karst_only: true, limit: 3 } },
        { type: "tool_use", id: "tu_2", name: "highlight_villages", input: { names: ["Pecatu", "Ungasan", "Benoa"], reason: "most stressed limestone villages" } },
      ];
    } else if (hasResults) {
      const ranked = JSON.parse(last.content.find((x) => x.tool_use_id === "tu_1").content);
      content = [{ type: "text", text: "**Start with these:**\n- " + ranked.map((r) => `${r.village}: score ${r.score}`).join("\n- ") }];
    } else {
      content = [{ type: "text", text: '```json\n{"questions":[{"criterion":"AI Integration","question":"Remove Claude. What breaks?"}]}\n```' }];
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ id: "msg_" + log.length, type: "message", role: "assistant", model: b.model, content, stop_reason, stop_sequence: null, usage: { input_tokens: 1, output_tokens: 1 } }));
  });
}).listen(port, "127.0.0.1", () => console.log("mock on", port));
