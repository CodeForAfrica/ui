FROM node:20.14-alpine as node-alpine

# Always install security updated e.g. https://pythonspeed.com/articles/security-updates-in-docker/
# Update local cache so that other stages don't need to update cache
RUN apk update \
    && apk upgrade


FROM node-alpine as base

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
COPY apps/roboshield ./apps/roboshield

# Use virtual store: https://pnpm.io/cli/fetch#usage-scenario
RUN pnpm install --recursive --offline --frozen-lockfile

ARG PORT=3000 \
    MONGODB_URL \
    PAYLOAD_SECRET \
    NEXT_PUBLIC_APP_URL=http://localhost:3000 \
    NEXT_PUBLIC_SENTRY_DSN="" \
    NEXT_PUBLIC_SEO_DISABLED="true" \
    # Needed by Next.js and server.ts at build time
    PORT=3000 \
    # Sentry config for source maps upload (needed at build time only)
    SENTRY_AUTH_TOKEN="" \
    SENTRY_ENVIRONMENT="" \
    SENTRY_ORG="" \
    SENTRY_PROJECT=""

RUN pnpm build-next --filter=roboshield --no-cache

ARG PAYLOAD_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

RUN pnpm build-payload --filter=roboshield

FROM builder as runner

RUN rm -rf /var/cache/apk/*

ARG NEXT_PUBLIC_APP_NAME \
    NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_GA_MEASUREMENT_ID \
    NEXT_PUBLIC_SEO_DISABLED \
    PAYLOAD_CONFIG_PATH="dist/payload.config.js" \
    PAYLOAD_PUBLIC_APP_URL \
    NEXT_PUBLIC_APP_LOGO_URL \
    NEXT_PUBLIC_SENTRY_DSN \
    PORT \
    SENTRY_ENV

ENV NODE_ENV=production \
    PAYLOAD_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
    PAYLOAD_CONFIG_PATH=${PAYLOAD_CONFIG_PATH} \
    PAYLOAD_SECRET=${PAYLOAD_SECRET} \
    MONGODB_URL=${MONGODB_URL} \
    NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME} \
    NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
    NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN} \
    PORT=${PORT} \
    SENTRY_ENVIRONMENT=${SENTRY_ENVIRONMENT}

WORKDIR /workspace/apps/roboshield

EXPOSE ${PORT}

CMD [ "node", "dist/server.js" ]
