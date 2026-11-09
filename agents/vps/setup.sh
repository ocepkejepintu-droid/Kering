#!/usr/bin/env bash
# One-time setup (and later updates) of the Kering agents' self-hosted worker on the VPS.
# Read it before running. Run as root, from this directory, in a checkout of the repo:
#
#   sudo bash setup.sh            # first time: user, folders, ant, service; asks for the environment key
#   sudo bash setup.sh --update   # later: refresh kering.mjs and rain_recent.py; keeps outputs/ and the key
#
# What it does:
#   - creates a system user kering-agent with no login shell;
#   - copies ../workspace to /srv/kering-agent/workspace (outputs/ is never overwritten);
#   - installs the ant CLI to /usr/local/bin if it is missing (release tarball from GitHub, pinned version);
#   - writes /etc/kering-agent/worker.env (root only, 600) with the environment ID and key you type;
#   - installs and starts kering-agent.service, which runs `ant beta:worker poll` as kering-agent;
#   - installs kering-rain.timer: weekly rain_recent.py, published to /srv/kering-public/rain-recent.json.
# It never asks for or stores an Anthropic API key: the worker needs only the environment key.
set -euo pipefail

ANT_VERSION="${ANT_VERSION:-2.7.1}"
HERE="$(cd "$(dirname "$0")" && pwd)"
SRC="$HERE/../workspace"
ROOT=/srv/kering-agent
WS="$ROOT/workspace"

[ "$(id -u)" = 0 ] || { echo "Run as root (sudo)." >&2; exit 1; }
[ -f "$SRC/kering.mjs" ] || { echo "Cannot find $SRC/kering.mjs; run from agents/vps." >&2; exit 1; }
# kering.mjs is the web app's own tool code; it needs Node 18+ (Ubuntu's nodejs package is enough).
if ! command -v node >/dev/null || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 18 ]; then
  apt-get update -qq && apt-get install -y -qq nodejs
fi
[ -x /usr/bin/node ] || ln -sf "$(command -v node)" /usr/bin/node
command -v python3 >/dev/null || { echo "python3 is required (apt install python3)." >&2; exit 1; }
[ -x /bin/bash ] || { echo "/bin/bash is required by the worker." >&2; exit 1; }

copy_workspace() {
  # Code and data belong to root and are read-only for the agent; it writes only to outputs/ and its home.
  install -d -o root -g kering-agent -m 750 "$ROOT" "$WS"
  install -d -o kering-agent -g kering-agent -m 750 "$ROOT/home" "$WS/outputs"
  install -o root -g kering-agent -m 640 "$SRC"/kering.mjs "$SRC"/rain_recent.py "$WS"/
  rm -rf "$WS/kering.py" "$WS/data"   # the old Python port and its data copy, replaced by kering.mjs
  sudo -u kering-agent node "$WS/kering.mjs" village Pecatu >/dev/null && echo "workspace OK: kering.mjs runs as kering-agent"
}

install_rain_timer() {
  # Weekly rain refresh for Ask Kering's recent_rain tool (no Claude call). Publishes to /srv/kering-public.
  install -d -o root -g root -m 755 /srv/kering-public
  install -m 644 "$HERE/kering-rain.service" "$HERE/kering-rain.timer" /etc/systemd/system/
  systemctl daemon-reload
  systemctl enable --now kering-rain.timer
  echo "Running the rain refresh once now..."
  if systemctl start kering-rain.service; then
    python3 -c "import json;d=json.load(open('/srv/kering-public/rain-recent.json'));print('rain data through', d['data_through'])"
  else
    echo "Rain refresh failed (Open-Meteo may be rate-limiting). It retries weekly; see journalctl -u kering-rain" >&2
  fi
}

if [ "${1:-}" = "--update" ]; then
  copy_workspace
  install_rain_timer
  systemctl restart kering-agent
  systemctl --no-pager --lines=5 status kering-agent
  exit 0
fi

id kering-agent >/dev/null 2>&1 || useradd --system --home-dir "$ROOT/home" --shell /usr/sbin/nologin kering-agent
copy_workspace

if [ ! -x /usr/local/bin/ant ]; then
  arch=$(uname -m | sed -e s/x86_64/amd64/ -e s/aarch64/arm64/)
  url="https://github.com/anthropics/anthropic-cli/releases/download/v${ANT_VERSION}/ant_${ANT_VERSION}_linux_${arch}.tar.gz"
  echo "Installing ant ${ANT_VERSION} from $url"
  curl -fsSL "$url" | tar -xz -C /usr/local/bin ant
fi
/usr/local/bin/ant --version

install -d -m 700 /etc/kering-agent
if [ ! -s /etc/kering-agent/worker.env ]; then
  read -rp "Environment ID (env_..., from claude-lock.json): " ENV_ID
  read -rsp "Environment key (sk-ant-oat01-..., generated in the Console on the kering-vps environment page): " ENV_KEY; echo
  case "$ENV_ID" in env_*) ;; *) echo "That is not an environment ID." >&2; exit 1 ;; esac
  case "$ENV_KEY" in sk-ant-oat01-*) ;; *) echo "That is not an environment key." >&2; exit 1 ;; esac
  umask 077
  printf 'ANTHROPIC_ENVIRONMENT_ID=%s\nANTHROPIC_ENVIRONMENT_KEY=%s\n' "$ENV_ID" "$ENV_KEY" > /etc/kering-agent/worker.env
  unset ENV_KEY
  chmod 600 /etc/kering-agent/worker.env
fi

install -m 644 "$HERE/kering-agent.service" /etc/systemd/system/kering-agent.service
systemctl daemon-reload
systemctl enable --now kering-agent
sleep 3
systemctl --no-pager --lines=10 status kering-agent
install_rain_timer
echo "Done. Logs: journalctl -u kering-agent -f (agents), journalctl -u kering-rain (rain refresh)"
