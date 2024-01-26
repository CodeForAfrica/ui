# Makefile

.PHONY: charterafrica mongodb

charterafrica:
	docker-compose --env-file apps/charterafrica/.env.local up charterafrica --build -d

mongodb:
	docker-compose --env-file apps/charterafrica/.env.local up --wait mongodb

