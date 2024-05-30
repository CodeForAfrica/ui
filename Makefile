# Makefile

.PHONY: charterafrica mongodb mongodb-keyfile vpnmanager

charterafrica:
	docker compose --env-file apps/charterafrica/.env.local up charterafrica --build -d

vpnmanager:
	docker compose --env-file apps/vpnmanager/.env.local up vpnmanager --build -d

mongodb:
	docker compose --env-file apps/charterafrica/.env.local up --wait mongodb

mongodb-keyfile:
	openssl rand -base64 741 > ./mongo-keyfile
	chmod 600 ./mongo-keyfile

pesayetu:
	BUILDKIT_PROGRESS=plain docker compose --env-file apps/pesayetu/.env.local up pesayetu --build

robots-generator:
	BUILDKIT_PROGRESS=plain docker compose --env-file apps/robots-generator/.env.local up robots-generator --build
