#!/usr/bin/env bash

# --- 1. Robustness & Safety ---
# -e: Exit on error
# -u: Error on undefined variables
# -o pipefail: Pipeline returns exit code of the last command to fail
set -euo pipefail

APP="${1:-}"
if [[ -z "${APP}" ]]; then
  echo "Usage: ${0} <app-name>" >&2
  exit 1
fi

# Change to project root regardless of where the script is invoked from.
cd "$(dirname "${BASH_SOURCE[0]}")/.."

# --- 2. Configuration & Paths ---
APP_DIR="apps/${APP}"
APP_ENV="${APP_DIR}/.env"
APP_ENV_LOCAL="${APP_DIR}/.env.local"

# Ensure the core configuration exists
if [[ ! -f "${APP_ENV}" ]]; then
  echo "error: missing required config at ${APP_ENV}" >&2
  exit 1
fi

# --- 3. Build Phase (Isolated Environment) ---
# We wrap this in a subshell so that the exported variables for building
# don't linger or interfere with the script's logic later.
(
  set -a
  source "${APP_ENV}"
  [[ -f "${APP_ENV_LOCAL}" ]] && source "${APP_ENV_LOCAL}"
  set +a

  # Default to plain progress for cleaner CI/CD logs, allow override via shell
  export BUILDKIT_PROGRESS="${BUILDKIT_PROGRESS:-plain}"
  export GIT_REVISION="${GIT_REVISION:-$(git rev-parse --short HEAD)}"
  export BUILD_DATE="${BUILD_DATE:-$(date -u +%Y-%m-%dT%H:%M:%SZ)}"

  echo "─── Building artifact: ${APP} ───"

  # Bake will automatically inherit the environment variables from this
  # subshell and map them to its HCL 'variable' blocks.
  docker buildx bake --file docker-bake.hcl --load "${APP}"
)

# --- 4. Execution Phase ---
# Prepare the environment flags for Compose.
# Compose reads these files directly, which is safer than sourcing them into the shell.
COMPOSE_OPTS=(--env-file "${APP_ENV}")
if [[ -f "${APP_ENV_LOCAL}" ]]; then
  COMPOSE_OPTS+=(--env-file "${APP_ENV_LOCAL}")
fi

echo "─── Starting service: ${APP} ───"

# 'exec' replaces the current bash process with the docker-compose process.
# This ensures that OS signals (like SIGINT/Ctrl+C) are handled directly
# by Compose, leading to a much faster and cleaner shutdown of containers.
exec docker compose "${COMPOSE_OPTS[@]}" up "${APP}"
