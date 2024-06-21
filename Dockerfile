# ============================================================================
#  Node
# ============================================================================

ARG \
  # Must match packageManager in package.json
  PNPM_VERSION=9.1.4 \
  # Next.js / Payload (build time)
  PORT=3000 \
  # Next.js (runtime)
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  NEXT_PUBLIC_SENTRY_DSN="" \
  NEXT_PUBLIC_SEO_DISABLED="true" \
  NEXT_PUBLIC_GOOGLE_ANALYTICS="" \
  # Sentry (build time)
  SENTRY_AUTH_TOKEN \
  SENTRY_ENV="" \
  SENTRY_ORG \
  SENTRY_PROJECT


FROM node:20.14-alpine as node

# Always install security updated e.g. https://pythonspeed.com/articles/security-updates-in-docker/
# Update local cache so that other stages don't need to update cache
RUN apk update \
  && apk upgrade

# ============================================================================
# Base
# ============================================================================

#
# base: starting image to be used in all other stages
# ---------------------------------------------------

FROM node as base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /workspace

#
# pnpm-base: starting image with pnpm activated (should be used in all
#            "build" stages.
# --------------------------------------------------------------------

FROM base as pnpm-base

ARG PNPM_VERSION

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

#
# base-desp: image with the common packages package.json copied
# -------------------------------------------------------------

FROM pnpm-base as base-deps

COPY pnpm-lock.yaml .

RUN pnpm fetch

COPY *.yaml *.json ./
COPY packages/commons-ui-core/package.json ./packages/commons-ui-core/package.json
COPY packages/commons-ui-next/package.json ./packages/commons-ui-next/package.json
# Next.js lints when doing production build
COPY packages/eslint-config-commons-ui/package.json ./packages/eslint-config-commons-ui/package.json

#
# base-builder: base image that will be used by application-specific builders
# ---------------------------------------------------------------------------

FROM pnpm-base as base-builder

# Next.js lints when doing production build hence ensure eslintrc is present
COPY packages/eslint-config-commons-ui ./packages/eslint-config-commons-ui

#
# base-runner: base for final deployable image
# --------------------------------------------

FROM base as base-runner

ARG NEXT_TELEMETRY_DISABLED \
  NEXT_PUBLIC_APP_NAME \
  NEXT_PUBLIC_APP_URL \
  NEXT_PUBLIC_SENTRY_DSN \
  NEXT_PUBLIC_SEO_DISABLED \
  NEXT_PUBLIC_GOOGLE_ANALYTICS \
  PORT \
  SENTRY_ENV

ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED} \
  NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME} \
  NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
  NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN} \
  NEXT_PUBLIC_SEO_DISABLED=${NEXT_PUBLIC_SEO_DISABLED} \
  NEXT_PUBLIC_GOOGLE_ANALYTICS=${NEXT_PUBLIC_GOOGLE_ANALYTICS} \
  PORT=${PORT} \
  SENTRY_ENV=${SENTRY_ENV} \
  # set hostname to localhost
  HOSTNAME="0.0.0.0"

RUN set -ex \
  # Create a non-root user
  && addgroup --system -g 1001 nodejs \
  && adduser --system -u 1001 -g 1001 nextjs \
  # Delete system cached files we don't need anymore
  && rm -rf /var/cache/apk/*

EXPOSE ${PORT}

# ============================================================================
# PesaYetu
# ============================================================================

#
# pesayetu-desp: image with all pesayetu dependencies
# ---------------------------------------------------

FROM base-deps as pesayetu-deps

COPY apps/pesayetu/package.json ./apps/pesayetu/package.json

# Use virtual store: https://pnpm.io/cli/fetch#usage-scenario
RUN pnpm --filter "./apps/pesayetu" install --offline --frozen-lockfile

#
# pesayetu-builder: image that uses deps to build shippable output
# ----------------------------------------------------------------

FROM base-builder as pesayetu-builder

ARG NEXT_TELEMETRY_DISABLED \
  # Next.js / Payload (build time)
  PORT \
  # Next.js (runtime)
  NEXT_PUBLIC_APP_NAME=Pesayetu \
  NEXT_PUBLIC_APP_URL \
  NEXT_PUBLIC_SENTRY_DSN \
  NEXT_PUBLIC_SEO_DISABLED \
  NEXT_PUBLIC_IMAGE_DOMAINS="cms.dev.codeforafrica.org,hurumap-v2.s3.amazonaws.com" \
  NEXT_PUBLIC_IMAGE_SCALE_FACTOR=2 \
  NEXT_PUBLIC_OPENAFRICA_DOMAINS="open.africa,openafrica.net,africaopendata.org" \
  NEXT_PUBLIC_SOURCEAFRICA_DOMAINS="dc.sourceafrica.net" \
  NEXT_PUBLIC_GOOGLE_ANALYTICS \
  # Sentry (build time)
  SENTRY_AUTH_TOKEN \
  SENTRY_ENV \
  SENTRY_ORG \
  SENTRY_PROJECT \
  # Wordpress
  WORDPRESS_URL \
  WORDPRESS_MULTISITE_PREFIX="/pesayetu" \
  WORDPRESS_PREVIEW_SECRET \
  WORDPRESS_APPLICATION_USERNAME \
  WORDPRESS_APPLICATION_PASSWORD \
  JWT_SECRET_KEY \
  # Custom (runtime)
  HURUMAP_API_URL

COPY --from=pesayetu-deps /workspace/node_modules ./node_modules
COPY --from=pesayetu-deps /workspace/packages/commons-ui-core/node_modules ./packages/commons-ui-core/node_modules
COPY --from=pesayetu-deps /workspace/packages/commons-ui-next/node_modules ./packages/commons-ui-next/node_modules
COPY --from=pesayetu-deps /workspace/packages/eslint-config-commons-ui/node_modules ./packages/eslint-config-commons-ui/node_modules
COPY --from=pesayetu-deps /workspace/apps/pesayetu/node_modules ./apps/pesayetu/node_modules

COPY apps/pesayetu ./apps/pesayetu

RUN pnpm --filter "./apps/pesayetu" build

#
# pesayetu-runner: final deployable image
# ---------------------------------------

FROM base-runner as pesayetu-runner

ARG NEXT_PUBLIC_IMAGE_DOMAINS \
  NEXT_PUBLIC_IMAGE_SCALE_FACTOR \
  NEXT_PUBLIC_OPENAFRICA_DOMAINS \
  NEXT_PUBLIC_SOURCEAFRICA_DOMAINS

ENV NEXT_PUBLIC_IMAGE_DOMAINS=${NEXT_PUBLIC_IMAGE_DOMAINS} \
  NEXT_PUBLIC_IMAGE_SCALE_FACTOR=${NEXT_PUBLIC_IMAGE_SCALE_FACTOR} \
  NEXT_PUBLIC_OPENAFRICA_DOMAINS=${NEXT_PUBLIC_OPENAFRICA_DOMAINS} \
  NEXT_PUBLIC_SOURCEAFRICA_DOMAINS=${NEXT_PUBLIC_SOURCEAFRICA_DOMAINS}

RUN set -ex \
  # Create nextjs cache dir w/ correct permissions
  && mkdir -p ./apps/pesayetu/.next \
  && chown nextjs:nodejs ./apps/pesayetu/.next

# PNPM symlink some dependencies
COPY --from=pesayetu-builder --chown=nextjs:nodejs /workspace/node_modules ./node_modules

# Public assets
COPY --from=pesayetu-builder --chown=nextjs:nodejs /workspace/apps/pesayetu/public ./apps/pesayetu/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=pesayetu-builder --chown=nextjs:nodejs /workspace/apps/pesayetu/.next/standalone ./apps/pesayetu
COPY --from=pesayetu-builder --chown=nextjs:nodejs /workspace/apps/pesayetu/.next/static ./apps/pesayetu/.next/static

USER nextjs

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "apps/pesayetu/server.js"]


# ============================================================================
# VPN Manager
# ============================================================================

#
# vpnmanager-desp: image with all pesayetu dependencies
# -----------------------------------------------------

FROM base-deps as vpnmanager-deps

COPY apps/vpnmanager/package.json ./apps/vpnmanager/package.json

# Use virtual store: https://pnpm.io/cli/fetch#usage-scenario
RUN pnpm --filter "./apps/vpnmanager" install --offline --frozen-lockfile

#
# vpnmanager-builder: image that uses deps to build shippable output
# ------------------------------------------------------------------

FROM base-builder as vpnmanager-builder

ARG NEXT_TELEMETRY_DISABLED \
  # Next.js / Payload (build time)
  PORT \
  # Next.js (runtime)
  NEXT_PUBLIC_APP_NAME="VPN Manager" \
  NEXT_PUBLIC_APP_URL \
  NEXT_PUBLIC_SENTRY_DSN \
  NEXT_PUBLIC_SEO_DISABLED \
  NEXT_PUBLIC_GOOGLE_ANALYTICS \
  # Sentry (build time)
  SENTRY_AUTH_TOKEN \
  SENTRY_ENV \
  SENTRY_ORG \
  SENTRY_PROJECT \
  SENTRY_LOG_LEVEL="info"


COPY --from=vpnmanager-deps /workspace/node_modules ./node_modules
COPY --from=vpnmanager-deps /workspace/packages/commons-ui-core/node_modules ./packages/commons-ui-core/node_modules
COPY --from=vpnmanager-deps /workspace/packages/commons-ui-next/node_modules ./packages/commons-ui-next/node_modules
COPY --from=vpnmanager-deps /workspace/packages/eslint-config-commons-ui/node_modules ./packages/eslint-config-commons-ui/node_modules
COPY --from=vpnmanager-deps /workspace/apps/vpnmanager/node_modules ./apps/vpnmanager/node_modules

# TODO(kilemensi): Investigate why we need @commons-ui sources.
#                  Could it be TS related? We don't need this in PesaYetu.
COPY packages ./packages

COPY apps/vpnmanager ./apps/vpnmanager

RUN pnpm --filter "./apps/vpnmanager" build

#
# vpnmanager-runner: final deployable image
# -----------------------------------------

FROM base-runner as vpnmanager-runner

RUN set -ex \
  # Create nextjs cache dir w/ correct permissions
  && mkdir -p ./apps/vpnmanager/.next \
  && chown nextjs:nodejs ./apps/vpnmanager/.next

# PNPM symlink some dependencies
COPY --from=vpnmanager-builder --chown=nextjs:nodejs /workspace/node_modules ./node_modules

# Public assets
COPY --from=vpnmanager-builder --chown=nextjs:nodejs /workspace/apps/vpnmanager/public ./apps/vpnmanager/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=vpnmanager-builder --chown=nextjs:nodejs /workspace/apps/vpnmanager/.next/standalone ./apps/vpnmanager
COPY --from=vpnmanager-builder --chown=nextjs:nodejs /workspace/apps/vpnmanager/.next/static ./apps/vpnmanager/.next/static

USER nextjs

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "apps/vpnmanager/server.js"]
