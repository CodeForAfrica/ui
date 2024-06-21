# Makefile

COMPOSE=docker compose
COMPOSE_BUILD_ENV=BUILDKIT_PROGRESS=plain

.PHONY: charterafrica codeforafrica mongodb mongodb-keyfile vpnmanager pesayetu roboshield down

charterafrica:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/charterafrica/.env.local up charterafrica --build

codeforafrica:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/codeforafrica/.env.local up codeforafrica --build

vpnmanager:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/vpnmanager/.env.local up vpnmanager --build

mongodb:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/charterafrica/.env.local up --wait mongodb

mongodb-keyfile:
	openssl rand -base64 741 > ./mongo-keyfile
	chmod 600 ./mongo-keyfile

pesayetu:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/pesayetu/.env.local up pesayetu --build

roboshield:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/roboshield/.env.local up roboshield --build

down:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) down --volumes
