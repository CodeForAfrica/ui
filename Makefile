# Makefile

COMPOSE=docker compose
COMPOSE_BUILD_ENV=BUILDKIT_PROGRESS=plain

.PHONY: charterafrica codeforafrica mongodb mongodb-keyfile vpnmanager

charterafrica:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/charterafrica/.env.local up charterafrica --build -d

vpnmanager:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/vpnmanager/.env.local up vpnmanager --build -d

mongodb:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/charterafrica/.env.local up --wait mongodb

mongodb-keyfile:
	openssl rand -base64 741 > ./mongo-keyfile
	chmod 600 ./mongo-keyfile

pesayetu:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/pesayetu/.env.local up pesayetu --build
