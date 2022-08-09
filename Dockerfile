FROM node:16-alpine as node-alpine

# Always install security updated e.g. https://pythonspeed.com/articles/security-updates-in-docker/
# Update local cache so that other stages don't need to update cache
RUN apk update \
    && apk upgrade


FROM node-alpine as base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add libc6-compat

ARG PNPM_VERSION=7.4.0

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /workspace

COPY pnpm-lock.yaml .

RUN pnpm fetch


FROM base as builder

ARG NEXT_TELEMETRY_DISABLED=1 \
    PROJECT_ROOT="../../" \
    #Ghost CMS API Key
    GHOST_API_KEY="" \
    # Since some pages are completely rendered during build, we need
    # GOOGLE_MAPS_API_KEY, IMAGE_DOMAINS defined in builder
    GOOGLE_MAPS_API_KEY="" \
    # APP is build time arg only. Shouldn't be used in the image.
    APP

WORKDIR /workspace

COPY *.yaml *.json ./
COPY packages ./packages
COPY apps/${APP} ./apps/${APP}

# Use virtual store: https://pnpm.io/cli/fetch#usage-scenario
RUN pnpm install --recursive --offline --frozen-lockfile

ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED} \
    PROJECT_ROOT=${PROJECT_ROOT} \
    GHOST_API_KEY=${GHOST_API_KEY}

RUN pnpm --filter "${APP}" build


FROM node-alpine as runner

# Remember to remove local cache from runner
RUN rm -rf /var/cache/apk/*

ARG PROJECT_ROOT \
    APP

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PROJECT_ROOT=${PROJECT_ROOT}

WORKDIR /workspace

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


# All workspace apps must have outputStandalone enabled in next.config.js
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/${APP}/.next/standalone ./

# Because of PROJECT_ROOT in builder, standalone output of ${APP} will be in
# in /workspace/apps/${APP} after the above COPY.
WORKDIR /workspace/apps/${APP}

COPY --from=builder /workspace/apps/${APP}/next.config.js /workspace/apps/${APP}/package.json ./
COPY --from=builder /workspace/apps/${APP}/public ./public
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/${APP}/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT [ "node", "server.js" ]
