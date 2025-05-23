#!/bin/bash

APP="$1"
APP_ENV_FILE="./apps/${APP}/.env.local"
REPO_SHA=$(git log --pretty=format:'%h' --max-count=1)
set -a
source "${APP_ENV_FILE}"  # Load the environment variables from the .env.local file
set +a

# Don't override IMAGE_TAG, BUILDKIT_PROGRESS, etc. if already set
IMAGE_TAG=${IMAGE_TAG-${REPO_SHA}} \
BUILDKIT_PROGRESS=${BUILDKIT_PROGRESS-plain} \
docker compose --env-file "${APP_ENV_FILE}" \
  up "${APP}" --build
