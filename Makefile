# Makefile

COMPOSE=docker compose
COMPOSE_BUILD_ENV=BUILDKIT_PROGRESS=plain

.PHONY: charterafrica civicsignalblog climatemappedafrica codeforafrica down mongodb mongodb-keyfile pesayetu roboshield techlabblog trustlab twoopstracker vpnmanager

charterafrica:
	./scripts/bake-up.sh charterafrica

civicsignalblog:
	./scripts/dc.sh civicsignalblog

climatemappedafrica:
	./scripts/bake-up.sh climatemappedafrica

codeforafrica:
	./scripts/bake-up.sh codeforafrica

down:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) down --volumes

mongodb:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/charterafrica/.env --env-file apps/charterafrica/.env.local up --wait mongodb

mongodb-keyfile:
	openssl rand -base64 741 > ./mongo-keyfile
	chmod 600 ./mongo-keyfile

pesayetu:
	./scripts/bake-up.sh pesayetu

roboshield:
	./scripts/bake-up.sh roboshield

techlabblog:
	./scripts/bake-up.sh techlabblog

trustlab:
	./scripts/bake-up.sh trustlab

twoopstracker:
	./scripts/dc.sh twoopstracker

vpnmanager:
	./scripts/dc.sh vpnmanager
