#!/usr/bin/env bash
# Install (or update) Ask Kering's Claude relay on the VPS. Read it before running. Run as root from this folder:
#
#   sudo bash setup.sh            # first time: user, Node check, service, nginx snippet; asks for the API key and event code
#   sudo bash setup.sh --update   # later: replace kering-relay.mjs and restart; keeps the key
#
# The relay holds an Anthropic API key, so it runs as its own user (kering-relay) and the key sits in a
# root-only file. The agents' worker (user kering-agent) cannot read it. Use a key made for this relay
# in the Kering workspace, and set a monthly spend limit on that workspace in the Console.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
[ "$(id -u)" = 0 ] || { echo "Run as root (sudo)." >&2; exit 1; }
[ -f "$HERE/dist/kering-relay.mjs" ] || { echo "Missing $HERE/dist/kering-relay.mjs" >&2; exit 1; }

if ! command -v node >/dev/null || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 18 ]; then
  echo "Installing Node.js from Ubuntu's packages"; apt-get update -qq && apt-get install -y -qq nodejs
fi
[ "$(node -p 'process.versions.node.split(".")[0]')" -ge 18 ] || { echo "Node 18 or newer is required." >&2; exit 1; }
[ -x /usr/bin/node ] || ln -sf "$(command -v node)" /usr/bin/node

id kering-relay >/dev/null 2>&1 || useradd --system --no-create-home --shell /usr/sbin/nologin kering-relay
install -d -o root -g root -m 755 /opt/kering-relay
install -o root -g root -m 644 "$HERE/dist/kering-relay.mjs" /opt/kering-relay/kering-relay.mjs

# Agent IDs (not secrets) for Ask Kering's Managed Agent path, from agent.env next to this script.
apply_agent_ids() {
  [ -f "$HERE/agent.env" ] || return 0
  for k in AGENT_ID ENVIRONMENT_ID; do
    v=$(sed -n "s/^$k=//p" "$HERE/agent.env" | tr -d '\r')
    [ -n "$v" ] || continue
    if grep -q "^$k=" /etc/kering-relay/relay.env; then sed -i "s#^$k=.*#$k=$v#" /etc/kering-relay/relay.env
    else printf '%s=%s\n' "$k" "$v" >> /etc/kering-relay/relay.env; fi
  done
}

if [ "${1:-}" = "--update" ]; then
  apply_agent_ids
  install -m 644 "$HERE/nginx-kering-api.conf" /etc/nginx/snippets/kering-api.conf && nginx -t && systemctl reload nginx
  systemctl restart kering-relay; sleep 2; systemctl --no-pager --lines=5 status kering-relay; exit 0
fi

install -d -m 700 /etc/kering-relay
if [ ! -s /etc/kering-relay/relay.env ]; then
  echo "Paste the key, then press Enter. Nothing shows while you paste (right-click or Ctrl+Shift+V in most terminals)."
  read -rsp "Anthropic API key for the Kering workspace (sk-ant-usr-... or sk-ant-api03-...): " KEY; echo
  KEY=$(printf '%s' "$KEY" | tr -d '\r\n\t ')   # pastes from Windows often carry a carriage return or spaces
  case "$KEY" in
    sk-ant-api*|sk-ant-usr*) echo "Key received: ${#KEY} characters, starts with ${KEY:0:11}" ;;
    "") echo "Nothing was received. Paste again, then press Enter." >&2; exit 1 ;;
    sk-ant-admin*) echo "That is an Admin API key. Use a normal API key from the Kering workspace." >&2; exit 1 ;;
    sk-ant-oat*) echo "That is an environment key (for the agents' worker). Use an API key from the Kering workspace's API keys page." >&2; exit 1 ;;
    *) echo "Received ${#KEY} characters starting with '${KEY:0:10}', not an API key. Copy the whole key again." >&2; exit 1 ;;
  esac
  read -rp "Event code visitors type to use Ask Kering (letters/digits, no spaces): " CODE
  CODE=$(printf '%s' "$CODE" | tr -d '\r\n\t ')
  case "$CODE" in ""|*[!A-Za-z0-9_-]*) echo "Use letters, digits, - or _ only." >&2; exit 1 ;; esac
  umask 077
  printf 'ANTHROPIC_API_KEY=%s\nEVENT_CODE=%s\nMODEL=claude-sonnet-5-5\n' "$KEY" "$CODE" > /etc/kering-relay/relay.env
  unset KEY
  chmod 600 /etc/kering-relay/relay.env
fi

apply_agent_ids
install -m 644 "$HERE/kering-relay.service" /etc/systemd/system/kering-relay.service
systemctl daemon-reload
systemctl enable --now kering-relay
sleep 2
systemctl --no-pager --lines=5 status kering-relay
code=$(sed -n 's/^EVENT_CODE=//p' /etc/kering-relay/relay.env)
echo; echo "Local check (should print ok and the model):"
curl -fsS -H "x-event-code: $code" http://127.0.0.1:8787/api/health && echo

install -m 644 "$HERE/nginx-kering-api.conf" /etc/nginx/snippets/kering-api.conf
echo
echo "Last step, nginx: add this line inside the server { } block that serves /bali/ (often /etc/nginx/sites-enabled/default):"
echo "    include snippets/kering-api.conf;"
echo "then run: sudo nginx -t && sudo systemctl reload nginx"
echo "Check from anywhere: curl -s -H 'x-event-code: <code>' http://43.163.0.197/bali/kering/api/health"
