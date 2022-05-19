FROM node:16-alpine as base

ARG PNPM_VERSION=7.1.1 \
    PACKAGE_PATH \
    # Next.js collects completely anonymous telemetry data about general usage.
    # Learn more here: https://nextjs.org/telemetry
    NEXT_TELEMETRY_DISABLED=1

ENV PACKAGE_PATH=${PACKAGE_PATH} \
    NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /workspace/cfa_ui

COPY pnpm-lock.yaml .
RUN pnpm fetch

COPY . .

RUN pnpm --filter "${PACKAGE_PATH}" install --frozen-lockfile --unsafe-perm
RUN pnpm --filter "${PACKAGE_PATH}" build


WORKDIR /workspace/cfa_ui/apps/${PACKAGE_PATH}

EXPOSE 3000

ENTRYPOINT ["pnpm", "start"]
