FROM node:20.14-alpine as node-alpine

# Always install security updated e.g. https://pythonspeed.com/articles/security-updates-in-docker/
# Update local cache so that other stages don't need to update cache
RUN apk update \
  && apk upgrade

FROM node-alpine as base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

ARG PNPM_VERSION=9.1.4

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /workspace

COPY pnpm-lock.yaml .

RUN pnpm fetch


FROM base as builder


WORKDIR /workspace

COPY *.yaml *.json ./
COPY packages ./packages
COPY apps/charterafrica ./apps/charterafrica

# Use virtual store: https://pnpm.io/cli/fetch#usage-scenario
RUN pnpm install --recursive --offline --frozen-lockfile

# NOTE: ARG values are only available **after** ARG statement & hence we need
#       to separate NEXT_PUBLIC_APP_URL and PAYLOAD_PUBLIC_APP_URL into
#       multiple ARG statements so that PAYLOAD can use the value defined
#       in NEXT.
ARG NEXT_TELEMETRY_DISABLED=1 \
    # Needed by Next.js at build time
    NEXT_PUBLIC_APP_NAME=charterAFRICA \
    NEXT_PUBLIC_APP_URL=http://localhost:3000 \
    NEXT_PUBLIC_GA_MEASUREMENT_ID="" \
    NEXT_PUBLIC_SENTRY_DSN="" \
    NEXT_PUBLIC_SEO_DISABLED="true" \
    # Needed by Next.js and server.ts at build time
    PORT=3000 \
    # Sentry config for source maps upload (needed at build time only)
    SENTRY_AUTH_TOKEN="" \
    SENTRY_ENV="" \
    SENTRY_ORG="" \
    SENTRY_PROJECT="" \
    # Needed by Payload at Next.js build time (see below for Payload's own
    # build time vars)
    MONGO_URL \
    # When building Next.js, point to the local Payload instance
    PAYLOAD_PUBLIC_APP_URL=http://localhost:3000 \
    PAYLOAD_SECRET_KEY

RUN pnpm build-next --filter=charterafrica

# Needed by Payload at Payload build time
# When building Payload, set its public URL (same as Next.js)
ENV PAYLOAD_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

RUN pnpm build-payload --filter=charterafrica

# TODO(kilemensi): Optimize and improve this default runner
#                    i) Start with node-alpine or base and only copy/install
#                       what's needed in prod
#                   ii) Add user:group for security (nextjs:node)
#                  iii) ?
FROM builder as runner

# Remember to remove local cache from runner
RUN rm -rf /var/cache/apk/*

# We've already set defaults values for most of these ARGs; don't repeat
ARG NEXT_TELEMETRY_DISABLED \
    NEXT_PUBLIC_APP_NAME \
    NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_GA_MEASUREMENT_ID \
    NEXT_PUBLIC_SENTRY_DSN \
    NEXT_PUBLIC_SEO_DISABLED \
    PAYLOAD_CONFIG_PATH="dist/payload.config.js" \
    PAYLOAD_PUBLIC_APP_URL \
    PORT \
    SENTRY_ENV

ENV NODE_ENV=production \
  NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME} \
  NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
  NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID} \
  NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN} \
  NEXT_PUBLIC_SEO_DISABLED=${NEXT_PUBLIC_SEO_DISABLED} \
  NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED} \
  PAYLOAD_CONFIG_PATH=${PAYLOAD_CONFIG_PATH} \
  PAYLOAD_PUBLIC_APP_URL=${PAYLOAD_PUBLIC_APP_URL} \
  PORT=${PORT} \
  SENTRY_ENV=${SENTRY_ENV}

WORKDIR /workspace/apps/charterafrica

EXPOSE ${PORT}

CMD [ "node", "dist/server.js" ]
