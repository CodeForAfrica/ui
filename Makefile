# Makefile

COMPOSE=docker compose
COMPOSE_BUILD_ENV=BUILDKIT_PROGRESS=plain

.PHONY: charterafrica codeforafrica down mongodb mongodb-keyfile pesayetu roboshield vpnmanager

charterafrica:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/charterafrica/.env.local up charterafrica --build

civicsignalblog:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/civicsignalblog/.env.local up civicsignalblog --build

codeforafrica:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/codeforafrica/.env.local up codeforafrica --build

climatemappedafrica:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/climatemappedafrica/.env.local up climatemappedafrica --build

down:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) down --volumes

mongodb:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/charterafrica/.env.local up --wait mongodb

mongodb-keyfile:
	openssl rand -base64 741 > ./mongo-keyfile
	chmod 600 ./mongo-keyfile

pesayetu:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/pesayetu/.env.local up pesayetu --build

roboshield:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/roboshield/.env.local up roboshield --build

vpnmanager:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/vpnmanager/.env.local up vpnmanager --build
