#!/usr/bin/env bash
# Rebuild dist/kering-relay.mjs (one file, Anthropic SDK included) after changing server.ts or worker/src/index.ts.
set -euo pipefail
cd "$(dirname "$0")"
(cd ../worker && npm ci --no-audit --no-fund >/dev/null && npm test)
NODE_PATH=../worker/node_modules npx -y esbuild@0.25.10 server.ts --bundle --platform=node --target=node18 --format=esm \
  --outfile=dist/kering-relay.mjs --log-level=warning \
  --banner:js="// Built from relay/server.ts + worker/src/index.ts with esbuild. Do not edit; rebuild with relay/build.sh."
ls -la dist/kering-relay.mjs
