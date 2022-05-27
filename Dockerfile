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

WORKDIR /workspace/cfa_ui

RUN corepack enable
RUN corepack prepare pnpm@${PNPM_VERSION} --activate

FROM base as dev

COPY pnpm-lock.yaml .
RUN pnpm fetch

COPY . .

RUN pnpm --filter "${APP}" install --frozen-lockfile --unsafe-perm
RUN pnpm --filter "${APP}" build

WORKDIR /workspace/cfa_ui/apps/${APP}

EXPOSE 3000

ENTRYPOINT ["pnpm", "start"]
