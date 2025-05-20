#!/bin/bash

APP="$1"
APP_ENV_FILE="./apps/$APP/.env.local"
set -a
source "$APP_ENV_FILE"  # Load the environment variables from the .env.local file
set +a

BUILDKIT_PROGRESS=plain docker compose --env-file "$APP_ENV_FILE" up "$APP" --build
