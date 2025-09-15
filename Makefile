# Makefile

COMPOSE=docker compose
COMPOSE_BUILD_ENV=BUILDKIT_PROGRESS=plain

.PHONY: charterafrica civicsignalblog climatemappedafrica codeforafrica down mongodb mongodb-keyfile pesayetu promisetracker roboshield techlabblog trustlab twoopstracker vpnmanager

charterafrica:
	./scripts/dc.sh charterafrica

civicsignalblog:
	./scripts/dc.sh civicsignalblog

climatemappedafrica:
	./scripts/dc.sh climatemappedafrica

codeforafrica:
	./scripts/dc.sh codeforafrica

down:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) down --volumes

mongodb:
	$(COMPOSE_BUILD_ENV) $(COMPOSE) --env-file apps/charterafrica/.env --env-file apps/charterafrica/.env.local up --wait mongodb

mongodb-keyfile:
	openssl rand -base64 741 > ./mongo-keyfile
	chmod 600 ./mongo-keyfile

pesayetu:
	./scripts/dc.sh pesayetu

promisetracker:
	./scripts/dc.sh promisetracker

roboshield:
	./scripts/dc.sh roboshield

techlabblog:
	./scripts/dc.sh techlabblog

trustlab:
	./scripts/dc.sh trustlab

twoopstracker:
	./scripts/dc.sh twoopstracker

vpnmanager:
	./scripts/dc.sh vpnmanager
