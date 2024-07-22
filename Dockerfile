# ============================================================================
#  Node
# ============================================================================

ARG \
  # Must match packageManager in package.json
  PNPM_VERSION=9.4.0 \
  # Next.js / Payload (build time)
  PORT=3000 \
  # Next.js (runtime)
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  NEXT_PUBLIC_SENTRY_DSN="" \
  NEXT_PUBLIC_SEO_DISABLED="true" \
  # Sentry (build time)
  SENTRY_AUTH_TOKEN \
  SENTRY_ENVIRONMENT="local" \
  SENTRY_ORG="code-for-africa" \
  SENTRY_PROJECT=""


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
# TODO(kilemensi): Figure out why this is needed (charterafrica, codeforafrica)
COPY packages/commons-ui-testing-library/package.json ./packages/commons-ui-testing-library/package.json

RUN pnpm --filter "./packages/**" install --offline --frozen-lockfile

#
# base-builder: base image that will be used by application-specific builders
# ---------------------------------------------------------------------------

FROM pnpm-base as base-builder

COPY --from=base-deps /workspace/packages/ ./packages

# TODO(kilemensi): Investigate why we need @commons-ui sources (charterafrica,
#                  codeforafrica) when building final app
COPY packages ./packages

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
  NEXT_PUBLIC_SEO_DISABLED=${NEXT_PUBLIC_SEO_DISABLED} \
  PORT=${PORT} \
  SENTRY_ENVIRONMENT=${SENTRY_ENVIRONMENT} \
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
# charterAFRICA
# ============================================================================

#
# charterafrica-desp: image with all charterafrica dependencies
# -------------------------------------------------------------

FROM base-deps as charterafrica-deps

COPY apps/charterafrica/package.json ./apps/charterafrica/package.json

RUN pnpm --filter "./apps/charterafrica/" install --offline --frozen-lockfile

#
# charterafrica-builder: image that uses deps to build shippable output
# ---------------------------------------------------------------------

FROM base-builder as charterafrica-builder

ARG NEXT_TELEMETRY_DISABLED \
  # Next.js / Payload (build time)
  PORT \
  # Next.js (runtime)
  NEXT_PUBLIC_APP_NAME="charterAFRICA" \
  NEXT_PUBLIC_APP_URL \
  NEXT_PUBLIC_SENTRY_DSN \
  # Payload (runtime)
  MONGO_URL \
  # TODO(koech): Standadise naming of Payload Secret. Our options:
  #              - PAYLOAD_SECRET (codeforafrica)
  #              - PAYLOAD_SECRET_KEY (charterafrica)
  PAYLOAD_SECRET_KEY \
  # Sentry (build time)
  SENTRY_AUTH_TOKEN \
  SENTRY_ENVIRONMENT \
  SENTRY_ORG \
  SENTRY_PROJECT

# This is in app-builder instead of base-builder just incase app-deps adds deps
COPY --from=charterafrica-deps /workspace/node_modules ./node_modules

COPY --from=charterafrica-deps /workspace/apps/charterafrica/node_modules ./apps/charterafrica/node_modules

COPY apps/charterafrica ./apps/charterafrica/

# When building Next.js app, Next.js needs to connect to local Payload
ENV PAYLOAD_PUBLIC_APP_URL=http://localhost:3000
RUN pnpm --filter "./apps/charterafrica/" build-next

# When building Payload app, Payload needs to have final app URL
ENV PAYLOAD_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
RUN pnpm --filter "./apps/charterafrica/" build-payload

#
# charterafrica-runner: final deployable image
# --------------------------------------------

FROM base-runner as charterafrica-runner

ARG PAYLOAD_CONFIG_PATH="dist/payload.config.js" \
  PAYLOAD_PUBLIC_APP_URL

# DO NOT initialise ENV vars using ARG for secrets!!!!
# These include:
#                i. Mongo DB URL
#                ii. Payload Secret
# ENV are persisted in the image & may lead to security issues
ENV PAYLOAD_PUBLIC_APP_URL=${PAYLOAD_PUBLIC_APP_URL} \
  PAYLOAD_CONFIG_PATH=${PAYLOAD_CONFIG_PATH}

RUN set -ex \
  # Create nextjs cache dir w/ correct permissions
  && mkdir -p ./apps/charterafrica//.next \
  && chown nextjs:nodejs ./apps/charterafrica/.next

# PNPM
# symlink some dependencies
COPY --from=charterafrica-builder --chown=nextjs:nodejs /workspace/node_modules ./node_modules

# Since we can't use output: "standalone", copy all app's dependencies
COPY --from=charterafrica-builder --chown=nextjs:nodejs /workspace/apps/charterafrica/node_modules ./apps/charterafrica/node_modules
COPY --from=charterafrica-builder --chown=nextjs:nodejs /workspace/apps/charterafrica/next.config.js ./apps/charterafrica/next.config.js
COPY --from=charterafrica-builder --chown=nextjs:nodejs /workspace/apps/charterafrica/.env ./apps/charterafrica/.env
COPY --from=charterafrica-builder --chown=nextjs:nodejs /workspace/apps/charterafrica/migrations ./apps/charterafrica/migrations
COPY --from=charterafrica-builder --chown=nextjs:nodejs /workspace/apps/charterafrica/app.json ./apps/charterafrica/app.json
COPY --from=charterafrica-builder --chown=nextjs:nodejs /workspace/apps/charterafrica/scripts ./apps/charterafrica/scripts
# Next.js
# Public assets
COPY --from=charterafrica-builder --chown=nextjs:nodejs /workspace/apps/charterafrica/public ./apps/charterafrica/public

# Since we can't use output: "standalone", copy the whole app's .next folder
# TODO(kilemensi): Figure out which files in .next folder are not needed
COPY --from=charterafrica-builder --chown=nextjs:nodejs /workspace/apps/charterafrica/.next ./apps/charterafrica/.next

# Payload
COPY --from=charterafrica-builder /workspace/apps/charterafrica/dist ./apps/charterafrica/dist
COPY --from=charterafrica-builder /workspace/apps/charterafrica/build ./apps/charterafrica/build

# Since we can't use output: "standalone", switch to specific app's folder
WORKDIR /workspace/apps/charterafrica

USER nextjs

# Custom server to run Payload and Next.js in the same app
CMD ["node", "dist/server.js"]

# ============================================================================
# Code for Africa
# ============================================================================

#
# codeforafrica-desp: image with all codeforafrica dependencies
# -------------------------------------------------------------

FROM base-deps as codeforafrica-deps

# TODO(kilemensi): Figure out why this is needed
COPY packages/commons-ui-testing-library/package.json ./packages/commons-ui-testing-library/package.json

COPY apps/codeforafrica/package.json ./apps/codeforafrica/package.json

RUN pnpm --filter "./apps/codeforafrica/" install --offline --frozen-lockfile

#
# codeforafrica-builder: image that uses deps to build shippable output
# ---------------------------------------------------------------------

FROM base-builder as codeforafrica-builder

ARG NEXT_TELEMETRY_DISABLED \
  # Next.js / Payload (build time)
  PORT \
  # Next.js (runtime)
  NEXT_PUBLIC_APP_NAME="Code for Africa" \
  NEXT_PUBLIC_APP_URL \
  NEXT_PUBLIC_SENTRY_DSN \
  # Payload (runtime)
  # TODO(koech): Standadise naming of Mongo DB URL. Our options:
  #              - MONGODB_URL (codeforafrica)
  #              - MONGO_URL (charterafrica, roboshield)
  MONGODB_URL \
  PAYLOAD_SECRET \
  # Sentry (build time)
  SENTRY_AUTH_TOKEN \
  SENTRY_ENVIRONMENT \
  SENTRY_ORG \
  SENTRY_PROJECT

# This is in app-builder instead of base-builder just incase app-deps adds deps
COPY --from=codeforafrica-deps /workspace/node_modules ./node_modules

COPY --from=codeforafrica-deps /workspace/apps/codeforafrica/node_modules ./apps/codeforafrica/node_modules

COPY apps/codeforafrica ./apps/codeforafrica/

# When building Next.js app, Next.js needs to connect to local Payload
ENV PAYLOAD_PUBLIC_APP_URL=http://localhost:3000
RUN pnpm --filter "./apps/codeforafrica/" build-next

# When building Payload app, Payload needs to have final app URL
ENV PAYLOAD_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
RUN pnpm --filter "./apps/codeforafrica/" build-payload

#
# codeforafrica-runner: final deployable image
# --------------------------------------------

FROM base-runner as codeforafrica-runner

ARG NEXT_PUBLIC_APP_LOGO_URL \
  PAYLOAD_CONFIG_PATH="dist/payload.config.js" \
  PAYLOAD_PUBLIC_APP_URL

# TODO(koech): Standadise naming of GA MEASUREMENT ID. Our options:
#              - GA_MEASUREMENT_ID (charterafrica, codeforafrica, roboshield)
#              - GOOGLE_ANALYTICS (pesayetu, vpnmanager)
#              This is only needed at runtime
ENV NEXT_PUBLIC_APP_LOGO_URL=${NEXT_PUBLIC_APP_LOGO_URL} \
  PAYLOAD_PUBLIC_APP_URL=${PAYLOAD_PUBLIC_APP_URL} \
  PAYLOAD_CONFIG_PATH=${PAYLOAD_CONFIG_PATH}

RUN set -ex \
  # Create nextjs cache dir w/ correct permissions
  && mkdir -p ./apps/codeforafrica//.next \
  && chown nextjs:nodejs ./apps/codeforafrica/.next

# PNPM
# symlink some dependencies
COPY --from=codeforafrica-builder --chown=nextjs:nodejs /workspace/node_modules ./node_modules

# Since we can't use output: "standalone", copy all app's dependencies
COPY --from=codeforafrica-builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/node_modules ./apps/codeforafrica/node_modules
COPY --from=codeforafrica-builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/next.config.js ./apps/codeforafrica/next.config.js
COPY --from=codeforafrica-builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/.env ./apps/codeforafrica/.env
COPY --from=codeforafrica-builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/migrations ./apps/codeforafrica/migrations
# Next.js
# Public assets
COPY --from=codeforafrica-builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/public ./apps/codeforafrica/public

# Since we can't use output: "standalone", copy the whole app's .next folder
# TODO(kilemensi): Figure out which files in .next folder are not needed
COPY --from=codeforafrica-builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/.next ./apps/codeforafrica/.next

# Payload
COPY --from=codeforafrica-builder /workspace/apps/codeforafrica/dist ./apps/codeforafrica/dist
COPY --from=codeforafrica-builder /workspace/apps/codeforafrica/build ./apps/codeforafrica/build

# Since we can't use output: "standalone", switch to specific app's folder
WORKDIR /workspace/apps/codeforafrica

USER nextjs

# Custom server to run Payload and Next.js in the same app
CMD ["node", "dist/server.js"]

# ============================================================================
# Roboshield
# ============================================================================

#
# roboshield-desp: image with all roboshield dependencies
# -------------------------------------------------------

FROM base-deps as roboshield-deps

COPY apps/roboshield/package.json ./apps/roboshield/package.json

RUN pnpm --filter "./apps/roboshield/" install --offline --frozen-lockfile

#
# roboshield-builder: image that uses deps to build shippable output
# ------------------------------------------------------------------

FROM base-builder as roboshield-builder

ARG NEXT_TELEMETRY_DISABLED \
  # Next.js / Payload (build time)
  PORT \
  # Next.js (runtime)
  NEXT_PUBLIC_APP_NAME="RoboShield" \
  NEXT_PUBLIC_APP_URL \
  NEXT_PUBLIC_SENTRY_DSN \
  # Payload (runtime)
  MONGO_URL \
  PAYLOAD_SECRET \
  # Sentry (build time)
  SENTRY_AUTH_TOKEN \
  SENTRY_ENVIRONMENT \
  SENTRY_ORG \
  SENTRY_PROJECT

# This is in app-builder instead of base-builder just incase app-deps adds deps
COPY --from=roboshield-deps /workspace/node_modules ./node_modules

COPY --from=roboshield-deps /workspace/apps/roboshield/node_modules ./apps/roboshield/node_modules

COPY apps/roboshield ./apps/roboshield/

# When building Next.js app, Next.js needs to connect to local Payload
ENV PAYLOAD_PUBLIC_APP_URL=http://localhost:3000
RUN pnpm --filter "./apps/roboshield/" build-next

# When building Payload app, Payload needs to have final app URL
ENV PAYLOAD_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
RUN pnpm --filter "./apps/roboshield/" build-payload

#
# roboshield-runner: final deployable image
# -----------------------------------------
FROM base-runner as roboshield-runner

ARG PAYLOAD_CONFIG_PATH="dist/payload.config.js" \
  PAYLOAD_PUBLIC_APP_URL

ARG PAYLOAD_CONFIG_PATH=${PAYLOAD_CONFIG_PATH} \
  PAYLOAD_PUBLIC_APP_URL=${PAYLOAD_PUBLIC_APP_URL}

RUN set -ex \
  # Create nextjs cache dir w/ correct permissions
  && mkdir -p ./apps/roboshield//.next \
  && chown nextjs:nodejs ./apps/roboshield/.next

# PNPM
# symlink some dependencies
COPY --from=roboshield-builder --chown=nextjs:nodejs /workspace/node_modules ./node_modules
COPY --from=roboshield-builder --chown=nextjs:nodejs /workspace/apps/roboshield/next.config.js ./apps/roboshield/next.config.js
COPY --from=roboshield-builder --chown=nextjs:nodejs /workspace/apps/roboshield/.env ./apps/roboshield/.env
# Since we can't use output: "standalone", copy all app's dependencies
COPY --from=roboshield-builder --chown=nextjs:nodejs /workspace/apps/roboshield/node_modules ./apps/roboshield/node_modules

# Next.js
# Public assets
COPY --from=roboshield-builder --chown=nextjs:nodejs /workspace/apps/roboshield/public ./apps/roboshield/public

# Since we can't use output: "standalone", copy the whole app's .next folder
# TODO(kilemensi): Figure out which files in .next folder are not needed
COPY --from=roboshield-builder --chown=nextjs:nodejs /workspace/apps/roboshield/.next ./apps/roboshield/.next

# Payload
COPY --from=roboshield-builder /workspace/apps/roboshield/dist ./apps/roboshield/dist
COPY --from=roboshield-builder /workspace/apps/roboshield/build ./apps/roboshield/build

# Since we can't use output: "standalone", switch to specific app's folder
WORKDIR /workspace/apps/roboshield

USER nextjs

# Custom server to run Payload and Next.js in the same app
CMD ["node", "dist/server.js"]

# ============================================================================
# PesaYetu
# ============================================================================

#
# pesayetu-desp: image with all pesayetu dependencies
# ---------------------------------------------------

FROM base-deps as pesayetu-deps

COPY packages/hurumap-core/package.json ./packages/hurumap-core/package.json
COPY packages/hurumap-next/package.json ./packages/hurumap-next/package.json
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
  SENTRY_ENVIRONMENT \
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

# This is in app-builder instead of base-builder just incase app-deps adds deps
COPY --from=pesayetu-deps /workspace/node_modules ./node_modules

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

# PNPM
# symlink some dependencies
COPY --from=pesayetu-builder --chown=nextjs:nodejs /workspace/node_modules ./node_modules

# Next.js
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
  SENTRY_ENVIRONMENT \
  SENTRY_ORG \
  SENTRY_PROJECT

# This is in app-builder instead of base-builder just incase app-deps adds deps
COPY --from=vpnmanager-deps /workspace/node_modules ./node_modules

COPY --from=vpnmanager-deps /workspace/apps/vpnmanager/node_modules ./apps/vpnmanager/node_modules

COPY apps/vpnmanager ./apps/vpnmanager

RUN pnpm --filter "./apps/vpnmanager" build

#
# vpnmanager-runner: final deployable image
# -----------------------------------------

FROM base-runner as vpnmanager-runner

ARG API_SECRET_KEY
RUN set -ex \
  # Create nextjs cache dir w/ correct permissions
  && mkdir -p ./apps/vpnmanager/.next \
  && chown nextjs:nodejs ./apps/vpnmanager/.next

# PNPM
# symlink some dependencies
COPY --from=vpnmanager-builder --chown=nextjs:nodejs /workspace/node_modules ./node_modules

# Next.js
# Public assets
COPY --from=vpnmanager-builder --chown=nextjs:nodejs /workspace/apps/vpnmanager/public ./apps/vpnmanager/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=vpnmanager-builder --chown=nextjs:nodejs /workspace/apps/vpnmanager/.next/standalone ./apps/vpnmanager
COPY --from=vpnmanager-builder --chown=nextjs:nodejs /workspace/apps/vpnmanager/.next/static ./apps/vpnmanager/.next/static
COPY --from=vpnmanager-builder --chown=nextjs:nodejs /workspace/apps/vpnmanager/scripts ./apps/vpnmanager/scripts
COPY --from=vpnmanager-builder --chown=nextjs:nodejs /workspace/apps/vpnmanager/app.json ./app.json
USER nextjs

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "apps/vpnmanager/server.js"]



# ============================================================================
# Climate Mapped Africa
# ============================================================================

#
# climatemappedafrica-desp: image with all climatemappedafrica dependencies
# ---------------------------------------------------

  FROM base-deps as climatemappedafrica-deps

  COPY packages/hurumap-core/package.json ./packages/hurumap-core/package.json
  COPY packages/hurumap-next/package.json ./packages/hurumap-next/package.json
  COPY apps/climatemappedafrica/package.json ./apps/climatemappedafrica/package.json

  # Use virtual store: https://pnpm.io/cli/fetch#usage-scenario
  RUN pnpm --filter "./apps/climatemappedafrica" install --offline --frozen-lockfile

  #
  # climatemappedafrica-builder: image that uses deps to build shippable output
  # ----------------------------------------------------------------

  FROM base-builder as climatemappedafrica-builder

  ARG NEXT_TELEMETRY_DISABLED \
    # Next.js / Payload (build time)
    PORT \
    # Next.js (runtime)
    NEXT_PUBLIC_APP_NAME=Climate Mapped Africa \
    NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_SENTRY_DSN \
    NEXT_PUBLIC_SEO_DISABLED \
    NEXT_PUBLIC_IMAGE_DOMAINS="cms.dev.codeforafrica.org,hurumap-v2.s3.amazonaws.com" \
    NEXT_PUBLIC_IMAGE_SCALE_FACTOR=2 \
    NEXT_PUBLIC_GOOGLE_ANALYTICS \
    # Sentry (build time)
    SENTRY_AUTH_TOKEN \
    SENTRY_ENVIRONMENT \
    SENTRY_ORG \
    SENTRY_PROJECT \
    # Custom (runtime)
    HURUMAP_API_URL

  # This is in app-builder instead of base-builder just incase app-deps adds deps
  COPY --from=climatemappedafrica-deps /workspace/node_modules ./node_modules

  COPY --from=climatemappedafrica-deps /workspace/apps/climatemappedafrica/node_modules ./apps/climatemappedafrica/node_modules

  COPY apps/climatemappedafrica ./apps/climatemappedafrica

  RUN pnpm --filter "./apps/climatemappedafrica" build

  #
  # climatemappedafrica-runner: final deployable image
  # ---------------------------------------

  FROM base-runner as climatemappedafrica-runner

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
    && mkdir -p ./apps/climatemappedafrica/.next \
    && chown nextjs:nodejs ./apps/climatemappedafrica/.next

  # PNPM
  # symlink some dependencies
  COPY --from=climatemappedafrica-builder --chown=nextjs:nodejs /workspace/node_modules ./node_modules

  # Next.js
  # Public assets
  COPY --from=climatemappedafrica-builder --chown=nextjs:nodejs /workspace/apps/climatemappedafrica/public ./apps/climatemappedafrica/public

  # Automatically leverage output traces to reduce image size
  # https://nextjs.org/docs/advanced-features/output-file-tracing
  COPY --from=climatemappedafrica-builder --chown=nextjs:nodejs /workspace/apps/climatemappedafrica/.next/standalone ./apps/climatemappedafrica
  COPY --from=climatemappedafrica-builder --chown=nextjs:nodejs /workspace/apps/climatemappedafrica/.next/static ./apps/climatemappedafrica/.next/static

  USER nextjs

  # server.js is created by next build from the standalone output
  # https://nextjs.org/docs/pages/api-reference/next-config-js/output
  CMD ["node", "apps/climatemappedafrica/server.js"]
