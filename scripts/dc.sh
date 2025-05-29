#!/bin/bash

APP="$1"
REPO_SHA=$(git log --pretty=format:'%h' --max-count=1)

# Don't override IMAGE_TAG and BUILDKIT_PROGRESS if already set.
# `compose` now supports multiple `--env-file` args
# see:
#   https://github.com/docker/compose/releases/tag/v2.17.0-rc.1
# verify via:
#   `docker compose --env-file ./apps/trustlab/.env --env-file ./apps/trustlab/.env.local config --environment`
IMAGE_TAG=${IMAGE_TAG:-${REPO_SHA}} \
  BUILDKIT_PROGRESS=${BUILDKIT_PROGRESS:-plain} \
  docker compose \
  --env-file "./apps/${APP}/.env" \
  --env-file "./apps/${APP}/.env.local" \
  up "${APP}"
