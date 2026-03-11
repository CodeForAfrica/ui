# syntax=docker/dockerfile:1
# check=skip=InvalidDefaultArgInFrom — NODE_IMAGE_REF has no Dockerfile default
# by design; it is always composed and supplied by docker-bake.hcl.

# NODE_IMAGE_REF must be declared before the first FROM so it can be used in the FROM below.
ARG NODE_IMAGE_REF

# NODE_IMAGE_REF is composed by ../docker-bake.hcl from NODE_VERSION and NODE_DIGEST.
# e.g. "node:24.14.0-alpine@sha256:<index-digest>" (pinned) or "node:24.14.0-alpine" (local dev).
FROM ${NODE_IMAGE_REF} AS node

RUN apk update \
  && apk upgrade --no-cache

FROM node AS ui-builder-base

ARG NEXT_TELEMETRY_DISABLED \
  PNPM_VERSION \
  TURBO_TELEMETRY_DISABLED \
  TURBO_VERSION

# Promote tool versions and telemetry flags to ENV so they are inspectable
# via `docker inspect` and available to any build-time scripts that read them.
# Defaults live in docker-bake.hcl as the single source of truth.
#
# App Dockerfile authors: the same ARG→ENV promotion is required for any var
# your app reads at build time. Two important rules for Next.js:
#   1. NEXT_PUBLIC_* vars are inlined into the JS bundle by the compiler —
#      they MUST be present as ENV during `next build` and cannot be changed
#      by restarting the container. Declare them as ARG+ENV in your builder
#      stage; do not re-declare them in the runner stage.
#   2. Server-side vars (no NEXT_PUBLIC_ prefix) are read at runtime from the
#      process environment, so they can be injected by Dokku/Docker without
#      rebuilding the image.
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED} \
  PNPM_VERSION=${PNPM_VERSION} \
  TURBO_TELEMETRY_DISABLED=${TURBO_TELEMETRY_DISABLED} \
  TURBO_VERSION=${TURBO_VERSION}

RUN apk add --no-cache libc6-compat

WORKDIR /workspace

# PNPM_STORE_DIR is the shared cache location. App Dockerfiles mount it via
# --mount=type=cache,target=/pnpm/store (the literal path — --mount does not
# expand ENV vars) so pnpm reuses downloaded packages across builds without
# baking them into the image layer.
ENV PNPM_STORE_DIR=/pnpm/store

# Install pnpm and turbo as global tools. pnpm is installed via npm rather than
# corepack (corepack is being removed from Node.js). turbo is installed here so
# app stages have it available without a network call at build time. Both are
# workspace-level tools — they belong in the builder base alongside Node.js.
RUN npm install -g pnpm@${PNPM_VERSION} turbo@${TURBO_VERSION} \
  && pnpm config set store-dir ${PNPM_STORE_DIR}

# Minimal production runtime — no build tools, no package manager.
# App runner stages copy only the Next.js standalone output into this image.
FROM node AS ui-runner-base

ARG NEXT_TELEMETRY_DISABLED \
  PORT=3000

ENV HOSTNAME="0.0.0.0" \
  NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED} \
  NODE_ENV=production \
  PORT=${PORT}

WORKDIR /workspace

RUN set -ex \
  && apk add --no-cache libc6-compat \
  && addgroup --system -g 1001 nodejs \
  && adduser --system -u 1001 -g 1001 nextjs

EXPOSE ${PORT}
