#!/bin/bash

docker-compose --env-file apps/charterafrica/.env.local up charterafrica --build -d

sleep 5

docker exec mongodb_container /scripts/db-init.sh

