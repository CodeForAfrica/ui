#!/bin/bash

APP="$1"
set -a
source "./apps/$APP/.env.local"  # Load the environment variables from the .env.local file
set +a

BUILDKIT_PROGRESS=plain docker compose up "$APP" --build
