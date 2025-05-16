#!/bin/bash

# APP="$1"
# ENV_FILE="./apps/$APP/.env.local"

# # Prepare build args array
# BUILD_ARGS=()
# while IFS='=' read -r key value; do
#   # Skip empty lines and comments
#   [[ -z "$key" || "$key" =~ ^# ]] && continue
#   # Remove possible quotes around the value
#   value="${value%\"}"
#   value="${value#\"}"
#   BUILD_ARGS+=(--build-arg "$key=$value")
# done < <(grep -Ev '^\s*($|#)' "$ENV_FILE")

# echo "BUILD_ARGS=${BUILD_ARGS[@]}"
# BUILDKIT_PROGRESS=plain docker compose build "${BUILD_ARGS[@]}" "$APP"
APP="$1"
set -a
source "./apps/$APP/.env.local"  # Load the environment variables from the .env.local file
set +a

BUILDKIT_PROGRESS=plain docker compose up "$APP" --build
