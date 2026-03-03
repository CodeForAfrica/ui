#!/usr/bin/env bash
set -euo pipefail

APP="${1:?usage: $0 <app>}"

# Change to monorepo root directory regardless of where the script is run from.
cd "$(dirname "${BASH_SOURCE[0]}")/.."

APP_ENV="apps/${APP}/.env"
APP_ENV_LOCAL="apps/${APP}/.env.local"

[[ -f "$APP_ENV" ]] || {
  echo "error: missing $APP_ENV" >&2
  exit 1
}

BUILDKIT_PROGRESS="${BUILDKIT_PROGRESS:-plain}"

# --file docker-bake.hcl is explicit so bake doesn't auto-discover docker-compose.yml.
GIT_REVISION="$(git rev-parse --short HEAD)" \
BUILD_DATE="$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
BUILDKIT_PROGRESS="${BUILDKIT_PROGRESS}" \
  docker buildx bake --file docker-bake.hcl "$APP"

COMPOSE_OPTS=(--env-file "$APP_ENV")
# $APP_ENV_LOCAL is optional, only include if it exists.
[[ -f "$APP_ENV_LOCAL" ]] && COMPOSE_OPTS+=(--env-file "$APP_ENV_LOCAL")
docker compose "${COMPOSE_OPTS[@]}" up "$APP"
