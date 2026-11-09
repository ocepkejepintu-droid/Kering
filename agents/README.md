# Kering agents (Claude Managed Agents)

Three agents in the Kering workspace on platform.claude.com. Their tools run on the Kering VPS
(43.163.0.197), not in Anthropic's cloud: a self-hosted sandbox, served by `kering-agent.service`.
The web app's own Claude features (Ask Kering, briefs, listing grader) are separate and unchanged.

| Agent | Model | What it does | Writes |
|---|---|---|---|
| `kering-analyst` | Sonnet 5.5, medium effort | Answers questions about the 261 villages: rankings, comparisons, rain catch, the JRC/CHIRPS/Aqueduct/Overture second opinions. Answers in the language asked. | Nothing (write and edit off) |
| `kering-banjar-pack` | Opus 5.5, high effort | For one village: the banjar brief in Bahasa Indonesia, English and 简体中文 (230 words, the app's format), a funding proposal in Bahasa and English for rain tanks and recharge wells, and `numbers.json` tracing every number. Build prices are left blank for quotes. | `outputs/banjar/<village>/` |
| `kering-ask` | Sonnet 5.5, low effort | Ask Kering on the public page, through the VPS relay (`relay/agent.ts`): steps and map highlights stream to the page. Bash only, every command approved by the relay against an allowlist (`node kering.mjs …` with plain arguments); `highlight_villages` is a custom tool the relay answers. $0.50 cap per visitor session. | Nothing |
| `kering-rain-refresh` | Opus 5.5, medium effort | Pulls this year's rain from Open-Meteo (ERA5) for the 18 rain cells, compares it with 1996-2025, writes a dry-season alert in Bahasa and English. | `outputs/rain/` |

Web search and web fetch are off on all three; tool calls use the `auto` permission policy.

## Layout

```
agents/
  kering-analyst/agent.md          # frontmatter = agent config, body = system prompt
  kering-banjar-pack/agent.md
  kering-rain-refresh/agent.md
  vps/environment.yaml             # kering-vps, config {type: self_hosted}
  vps/setup.sh                     # one-time worker setup on the VPS (and --update)
  vps/kering-agent.service         # systemd unit: ant beta:worker poll as user kering-agent
  workspace/                       # copied to /srv/kering-agent/workspace on the VPS
    kering.mjs                     # the web app's own tools + data, bundled by web/scripts/build-cli.mjs (do not edit)
    rain_recent.py                 # Open-Meteo fetch for the rain refresh and the weekly kering-rain.timer
../claude-lock.json                # IDs of the resources above; commit it with any change
```

IDs (from `claude-lock.json`): environment `env_0182MPqjJZkKFQeSTBrpDFUi`; agents
`agent_01DjRgC3wCvXs2LFppzZQcCn` (analyst), `agent_01CNeGKAuYhXams68q8TQ7DS` (banjar pack),
`agent_01Ri9aZdNknPzBQNNqboLev6` (rain refresh).

## Set up the VPS worker (once)

1. Console → Managed Agents → Environments → `kering-vps` → **Generate environment key**.
2. On the VPS, in a checkout of this repo: `sudo bash agents/vps/setup.sh`. It asks for the
   environment ID and key (type the key at the prompt; it goes to `/etc/kering-agent/worker.env`, mode 600),
   creates the `kering-agent` user, copies `workspace/`, installs `ant`, and starts the service.
3. Check it: `journalctl -u kering-agent -f` on the VPS, and from anywhere with the API key:
   `ant beta:environments:work stats --environment-id env_0182MPqjJZkKFQeSTBrpDFUi` (`workers_polling` should be 1).

Never put an Anthropic API key on the VPS: the agent's bash runs there. The service limits writes to
`/srv/kering-agent`; code and data are root-owned and read-only for the agent; network egress is not limited.

## Start a session

From a machine with the Kering API key (not the VPS), in the repo root:

```sh
ENV_ID=$(jq -r '.resources["./agents/vps/environment.yaml"].id' claude-lock.json)
AGENT_ID=$(jq -r '.resources["./agents/kering-analyst/agent.md"].id' claude-lock.json)
SID=$(ant beta:sessions create --agent "$AGENT_ID" --environment-id "$ENV_ID" --title "Ask Kering" --transform id -r)
ant beta:sessions:events send --session-id "$SID" \
  --event '{type: user.message, content: [{type: text, text: "Which Bukit villages should start rain capture first?"}]}'
ant beta:sessions connect "$SID"      # watch and reply in a terminal; or open the session in the Console
```

Same for the others, e.g. "Buat paket banjar untuk Pecatu" (banjar pack) or "Run the rain refresh" (rain
refresh). Self-hosted sessions take no `resources`: everything the agents read is already on the VPS. Their
files land in `/srv/kering-agent/workspace/outputs/` on the VPS.

## Update

- **An agent's prompt, model or tools:** edit its `agent.md`, then in the repo root:
  `ant apply --dry-run -v <files>` → `ant apply <files>` (name the files; don't walk `agents/`, since this
  README sits directly in it and would be read as an agent), and commit `claude-lock.json`. The agent gets a new
  version; new sessions use it.
- **Code or data:** after any change to `web/src/lib` or `out/`, run `node web/scripts/build-cli.mjs` (the web tests include
  `cli-parity.test.ts`, which fails until you do), commit `kering.mjs`, and run
  `sudo bash agents/vps/setup.sh --update` on the VPS. Outputs are kept.
