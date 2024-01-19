# Makefile

.PHONY: charterafrica init-db

charterafrica:
	docker-compose --env-file apps/charterafrica/.env.local up charterafrica --build

init-db:
	docker-compose up mongodb_container --build -d
	docker exec mongodb_container /scripts/db-init.sh
