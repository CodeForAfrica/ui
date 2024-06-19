FROM node:20.14-alpine as node

# Always install security updated e.g. https://pythonspeed.com/articles/security-updates-in-docker/
# Update local cache so that other stages don't need to update cache
RUN apk update \
    && apk upgrade

# ===================================================
# base: starting image to be used in all other stages
# ===================================================
FROM node as base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /workspace


# ===================================================
# pnpm-base: starting image with pnpm activated.
#            should be used in all "build" stages.
# ===================================================
FROM base as pnpm-base

ARG PNPM_VERSION=9.1.4

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# =========================================================
# desp: image with all dependencies (for the app) installed
# =========================================================
FROM pnpm-base as deps

COPY pnpm-lock.yaml .

RUN pnpm fetch

COPY *.yaml *.json ./
COPY packages/commons-ui-core/package.json ./packages/commons-ui-core/package.json
COPY packages/commons-ui-next/package.json ./packages/commons-ui-next/package.json
# Next.js lints when doing production build
COPY packages/eslint-config-commons-ui/package.json ./packages/eslint-config-commons-ui/package.json
COPY apps/pesayetu/package.json ./apps/pesayetu/package.json

# Use virtual store: https://pnpm.io/cli/fetch#usage-scenario
RUN pnpm --filter "./apps/pesayetu" install --offline --frozen-lockfile


# =======================================================
# builder: image that uses deps to build shippable output
# =======================================================
FROM pnpm-base as builder

ARG NEXT_TELEMETRY_DISABLED=1 \
    # Needed by Next.js at build time
    NEXT_PUBLIC_APP_NAME=Pesayetu \
    NEXT_PUBLIC_APP_URL=http://localhost:3000 \
    NEXT_PUBLIC_SENTRY_DSN="" \
    NEXT_PUBLIC_SEO_DISABLED="true" \
    NEXT_PUBLIC_IMAGE_DOMAINS="cms.dev.codeforafrica.org,hurumap-v2.s3.amazonaws.com" \
    NEXT_PUBLIC_IMAGE_SCALE_FACTOR=2 \
    NEXT_PUBLIC_OPENAFRICA_DOMAINS="open.africa,openafrica.net,africaopendata.org" \
    NEXT_PUBLIC_SOURCEAFRICA_DOMAINS="dc.sourceafrica.net" \
    NEXT_PUBLIC_GOOGLE_ANALYTICS="" \
    # Needed by Next.js and server.ts at build time
    PORT=3000 \
    # Sentry config for source maps upload (needed at build time only)
    SENTRY_AUTH_TOKEN="" \
    SENTRY_ENV="" \
    SENTRY_ORG="" \
    SENTRY_PROJECT="" \
    # Wordpress config
    WORDPRESS_URL \
    WORDPRESS_MULTISITE_PREFIX="/pesayetu" \
    WORDPRESS_PREVIEW_SECRET \
    WORDPRESS_APPLICATION_USERNAME \
    WORDPRESS_APPLICATION_PASSWORD \
    JWT_SECRET_KEY \
    HURUMAP_API_URL

COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/packages/commons-ui-core/node_modules ./packages/commons-ui-core/node_modules
COPY --from=deps /workspace/packages/eslint-config-commons-ui/node_modules ./packages/eslint-config-commons-ui/node_modules
COPY --from=deps /workspace/packages/commons-ui-next/node_modules ./packages/commons-ui-next/node_modules
COPY --from=deps /workspace/apps/pesayetu/node_modules ./apps/pesayetu/node_modules

# Next.js lints when doing production build
COPY packages/eslint-config-commons-ui ./packages/eslint-config-commons-ui
COPY apps/pesayetu ./apps/pesayetu

RUN pnpm --filter "./apps/pesayetu" build


# ==============================
# runner: final deployable image
# ==============================
FROM base as runner

ARG NEXT_TELEMETRY_DISABLED \
    NEXT_PUBLIC_APP_NAME \
    NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_SENTRY_DSN \
    NEXT_PUBLIC_SEO_DISABLED \
    NEXT_PUBLIC_IMAGE_DOMAINS \
    NEXT_PUBLIC_IMAGE_SCALE_FACTOR \
    NEXT_PUBLIC_OPENAFRICA_DOMAINS \
    NEXT_PUBLIC_SOURCEAFRICA_DOMAINS \
    NEXT_PUBLIC_GOOGLE_ANALYTICS \
    PORT \
    SENTRY_ENV

ENV NODE_ENV=production \
    NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME} \
    NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
    NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN} \
    NEXT_PUBLIC_SEO_DISABLED=${NEXT_PUBLIC_SEO_DISABLED} \
    NEXT_PUBLIC_IMAGE_DOMAINS=${NEXT_PUBLIC_IMAGE_DOMAINS} \
    NEXT_PUBLIC_IMAGE_SCALE_FACTOR=${NEXT_PUBLIC_IMAGE_SCALE_FACTOR} \
    NEXT_PUBLIC_OPENAFRICA_DOMAINS=${NEXT_PUBLIC_OPENAFRICA_DOMAINS} \
    NEXT_PUBLIC_SOURCEAFRICA_DOMAINS=${NEXT_PUBLIC_SOURCEAFRICA_DOMAINS} \
    NEXT_PUBLIC_GOOGLE_ANALYTICS=${NEXT_PUBLIC_GOOGLE_ANALYTICS} \
    PORT=${PORT} \
    SENTRY_ENV=${SENTRY_ENV}

RUN set -ex \
    # Create a non-root user
    && addgroup --system -g 1001 nodejs \
    && adduser --system -u 1001 -g 1001 nextjs \
    # Create nextjs cache dir w/ correct permissions
    && mkdir -p ./apps/pesayetu/.next \
    && chown nextjs:nodejs ./apps/pesayetu/.next \
    # Delete system cached files we don't need anymore
    && rm -rf /var/cache/apk/*

# PNPM symlink some dependencies
COPY --from=builder --chown=nextjs:nodejs /workspace/node_modules ./node_modules
# Public assets
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/pesayetu/public ./apps/pesayetu/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/pesayetu/.next/standalone ./apps/pesayetu
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/pesayetu/.next/static ./apps/pesayetu/.next/static

USER nextjs

EXPOSE ${PORT}

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "apps/pesayetu/server.js"]
