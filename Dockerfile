FROM node:16-alpine as base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

ARG PNPM_VERSION=7.1.1 \
    APP

ENV APP=${APP}

WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY pnpm-lock.yaml .
RUN pnpm fetch

FROM base as dev

COPY *.yaml *.json ./
COPY packages ./packages
COPY apps/${APP} ./apps/${APP}

RUN pnpm --filter "${APP}" install --frozen-lockfile
RUN pnpm --filter "${APP}" build

FROM node:16-alpine as runner
    # Next.js collects completely anonymous telemetry data about general usage.
    # Learn more here: https://nextjs.org/telemetry
ARG NEXT_TELEMETRY_DISABLED=1 \
    APP

ENV NEXT_TELEMETRY_DISABLED=1 \
    APP=${APP} \
    APP_HOST=.

WORKDIR /workspace

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=dev /workspace/apps/${APP}/next.config.js ./
COPY --from=dev /workspace/apps/${APP}/public ./public
COPY --from=dev /workspace/apps/${APP}/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=dev --chown=nextjs:nodejs /workspace/apps/${APP}/.next/standalone ./
COPY --from=dev --chown=nextjs:nodejs /workspace/apps/${APP}/.next/static ./.next/static

EXPOSE 3000

FROM runner as prod

ENV NODE_ENV=production

WORKDIR /workspace/apps/${APP}

ENTRYPOINT [ "node", "server.js" ]
