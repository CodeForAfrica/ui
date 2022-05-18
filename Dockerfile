FROM node:16-alpine as deps

ARG PACKAGE_PATH="codeforafrica" \
    # Next.js collects completely anonymous telemetry data about general usage.
    # Learn more here: https://nextjs.org/telemetry
    NEXT_TELEMETRY_DISABLED=1

ENV PACKAGE_PATH=${PACKAGE_PATH} \
    NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

RUN npm install -g pnpm@6.14.3

WORKDIR /root/cfa_ui

COPY pnpm-lock.yaml .
RUN pnpm fetch

COPY . .

RUN pnpm --filter "${PACKAGE_PATH}" install --frozen-lockfile --unsafe-perm
RUN pnpm --filter "${PACKAGE_PATH}" build


WORKDIR /root/cfa_ui/apps/${PACKAGE_PATH}

ENTRYPOINT ["pnpm", "start"]
