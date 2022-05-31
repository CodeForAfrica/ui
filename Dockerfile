FROM node:16-alpine as base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

ARG PNPM_VERSION=7.1.1 \
    APP \
    # Next.js collects completely anonymous telemetry data about general usage.
    # Learn more here: https://nextjs.org/telemetry
    NEXT_TELEMETRY_DISABLED=1

ENV APP=${APP} \
    NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

WORKDIR /workspace

RUN corepack enable
RUN corepack prepare pnpm@${PNPM_VERSION} --activate

COPY pnpm-lock.yaml .
RUN pnpm fetch

FROM base as dev

COPY . .

RUN pnpm --filter "${APP}" install --frozen-lockfile
RUN pnpm --filter "${APP}" build

WORKDIR /workspace/apps/${APP}

FROM node:16-alpine as runner
ARG APP=${APP}

ENV NODE_ENV production \
    NEXT_TELEMETRY_DISABLED=1 \
    APP

WORKDIR /app

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

ENTRYPOINT ["node", "apps/codeforafrica/server.js"]
