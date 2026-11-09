# Deploying Kering

Kering builds to one HTML file. The map, villages table, satellite record and rain planner run anywhere. The Claude features (village brief, Ask the map, villa water label) need one of two things: the claude.ai Artifact runtime, or the Kering Worker in `worker/`.

## Pick a route

| Route | URL | Claude features | Who can open it | Cost to you |
|---|---|---|---|---|
| claude.ai Artifact | https://claude.ai/artifact/9Xh6Rn4QpviQXAXUoMeb8N | Yes, on each viewer's own Claude account | Anyone with the link (your current sharing setting). Claude features need a claude.ai sign-in | None |
| Cloudflare Worker | `https://kering.<your-subdomain>.workers.dev` | Yes, on your API key, behind an event code. Until a code is entered the public sees no AI buttons, only a link to the claude.ai version; the team enters the code after `#staff` | Anyone with the link | Your API usage |
| Staging mirror | http://43.163.0.197/bali/kering/ | Yes, through the relay on the same VPS (`relay/`, Sonnet 5.5), behind an event code. Same as the Worker: public visitors see the AI parts as a claude.ai link, the team enters the code after `#staff` | Anyone with the link | Your API usage |
| Offline file | `kering.html`, or the `site/` folder for every area | No. AI buttons are hidden, a quiet line points to the claude.ai version, and the Pecatu example brief is pre-filled | The laptop it is on | None |

What the page shows, by Claude state:

| Claude state | Ask Kering, Write brief, Grade this villa | Footer | Event-code entry |
|---|---|---|---|
| On (claude.ai runtime, or relay with a valid code) | Shown | "Claude on, via ..." | Not needed |
| Needs a code, or off (no relay, relay without a key, relay down), public browser | Hidden; one line "AI briefs run on the claude.ai version of Kering" | "AI extras on claude.ai" link | Hidden |
| Needs a code, or off, after `#staff` on this browser | Shown | Real status ("Claude needs the event code", or why it is off) | In the Ask Kering panel |

For the event: demo from the claude.ai Artifact on your laptop. Put the Worker URL on the last slide so judges and teammates can try it on their phones; to turn Claude on there, open it once with `#staff` and enter the event code in Ask Kering. Keep the offline file open in another tab in case the venue Wi-Fi drops.

## Claude on the staging mirror (VPS relay)

`relay/` runs the Worker's request checks and Messages API call under Node on the VPS, behind nginx at `/bali/kering/api/`. The deploy writes `/bali/kering/api/claude` into the page's `kering-proxy` meta, so the mirror calls it on the same origin (set the `KERING_URL` repository variable only to use a different relay). Model: `claude-sonnet-5-5` for every Claude feature, set in `/etc/kering-relay/relay.env`.

Install once on the VPS (copy `relay/` there first): `sudo bash relay/setup.sh`. It creates the `kering-relay` user and service, asks for an API key and the event code (kept in a root-only file), and puts the nginx snippet in `/etc/nginx/snippets/kering-api.conf`; add `include snippets/kering-api.conf;` to the server block for `/bali/` and reload nginx. After changing `relay/server.ts` or `worker/src/index.ts`, run `relay/build.sh`, commit `relay/dist/kering-relay.mjs`, and run `sudo bash relay/setup.sh --update` on the VPS.

## Cloudflare Worker

The Worker serves `public/index.html` and answers two routes:

- `GET /api/health` checks the event code.
- `POST /api/claude` forwards one Messages API round. The page runs the tool loop, because the tools read map data that lives in the browser.

Guards: event code in the `x-event-code` header, model pinned server-side (`claude-opus-5-5`), 4,096 output tokens per round, effort `low` or `medium` only, the page's four tool names only, 40 messages and 300 KB per request, about 30 requests a minute per IP, CORS only for origins listed in `ALLOWED_ORIGINS`. Refused requests fall back to another model automatically (server-side `fallbacks: "default"`).

The rate limit is per Worker instance, so it is not a hard cap. **Create the API key in a separate workspace and set a spend limit on it** in the Claude Console. That is the real ceiling.

### First deploy from your laptop

```bash
cd worker
npm ci
npx wrangler login
npm run deploy                          # builds public/index.html, uploads page + Worker
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put EVENT_CODE      # e.g. a short word you write on the whiteboard
```

Wrangler prints the URL. Open it with `#staff` on the end (the code entry is hidden from the public), click Ask Kering, type the event code, and ask the map a question.

To use a cheaper model for the event, change `MODEL` in `wrangler.toml` (for example `claude-sonnet-5-5`) and deploy again.

### Deploys from GitHub

There is no automatic Cloudflare deploy: the project does not use Cloudflare, so `deploy-kering.yml` was removed. Staging gets Kering from the Land Scout deploy (`/bali/kering/`). To deploy the Worker, run `npx wrangler deploy` by hand as above.

### Test locally without spending tokens

```bash
cd worker
npm test                                             # Worker unit tests
printf 'ANTHROPIC_API_KEY=dummy\nEVENT_CODE=bukit2026\nANTHROPIC_BASE_URL=http://127.0.0.1:8790\n' > .dev.vars
node test/mock-anthropic.mjs 8790 &                  # scripted stand-in for the Messages API
npm run dev                                          # page + Worker on http://127.0.0.1:8787
node test/e2e.cjs http://127.0.0.1:8787 shot.png     # types the code, asks the agent, checks the map
```

## Staging mirror

A deploy workflow (not part of this repository) copies `kering.html` and `site/spots/` to the staging server under `/bali/kering/`. The mirror is plain HTTP on an IP address, so prefer the Worker URL for anything you hand out.

## After changing the app

```bash
cd web
npm run build                                          # kering.html, worker/public (+ spots/), site/ (+ spots/)
node scripts/emit.mjs artifact=/path/to/artifact.html  # the claude.ai Artifact page
```

Commit `kering.html`, then republish the claude.ai Artifact from the emitted file. Areas other than Pecatu are separate files: publish them with the Artifact as `spots/<id>.json` (from `out/spots/`), so the page can load them on demand. The Worker and the staging mirror copy them automatically.

## Areas

The Satellite view covers the areas in `scripts/spots.json`. Pecatu is built into the page; the rest load from `spots/<id>.json` beside it, 1 to 2 MB each. `kering.html` opened on its own therefore shows Pecatu only. For every area offline, serve the built `site/` folder: `npx serve site`.

## Internal views

The Pitch view (rubric, three-minute script) is for the team, not the public. It is hidden from the navigation and the `#pitch` hash falls back to the map. To show it on one browser, open the page with `#staff` once (for example `http://43.163.0.197/bali/kering/#staff`); that remembers the unlock in that browser's local storage and opens the Pitch view. Open `#public` to hide it again. The content is still inside the HTML file for anyone who reads the source, so this is a curtain, not a lock.

The same unlock shows the Claude buttons and the event-code entry on copies where Claude is not on yet (the Worker, the staging mirror, the offline file). Without it, those copies hide Ask Kering, Write brief and Grade this villa and show a single line pointing to the claude.ai version, so the public never meets a code prompt.
