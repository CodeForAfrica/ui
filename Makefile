# Makefile

.PHONY: charterafrica

charterafrica:
	docker-compose --env-file apps/charterafrica/.env.local up charterafrica --build -d

init-db:
	docker-compose up mongodb_container --build -d
