# syntax=docker/dockerfile:1

# ui_builder_base / ui_runner_base: Docker named context references use underscores
# because hyphens are invalid in context names. The bake targets are still named
# ui-builder-base and ui-runner-base — only the FROM reference uses underscores.
FROM ui_builder_base AS pruned

COPY . .

# turbo is pre-installed in ui-builder-base — no network call needed here.
RUN turbo prune --docker --out-dir /workspace/out codeforafrica

FROM ui_builder_base AS deps

COPY --from=pruned /workspace/out/json/ ./
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=shared \
  pnpm install --frozen-lockfile

FROM ui_builder_base AS builder

ARG NEXT_PUBLIC_APP_URL \
  NEXT_PUBLIC_APP_NAME="Code for Africa" \
  NEXT_PUBLIC_APP_LOGO_URL \
  SENTRY_ENVIRONMENT

ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
  NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME} \
  NEXT_PUBLIC_APP_LOGO_URL=${NEXT_PUBLIC_APP_LOGO_URL} \
  SENTRY_ENVIRONMENT=${SENTRY_ENVIRONMENT}

COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/apps/codeforafrica/node_modules ./apps/codeforafrica/node_modules
# turbo WARNs when lockfile is missing during build
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruned /workspace/out/full/ ./

# Payload's admin panel needs a serverURL at build time; the real value is
# supplied at runtime via Dokku config, not baked into the image.
ENV PAYLOAD_PUBLIC_APP_URL=http://localhost:3000

# The custom server (server.ts) connects to MongoDB via payload.init() before
# spawning `next build`, so — like climatemappedafrica — this build genuinely
# needs a reachable database, not just a well-formed URL.
RUN --mount=type=secret,id=database_url,env=DATABASE_URL \
  --mount=type=secret,id=payload_secret,env=PAYLOAD_SECRET \
  --mount=type=secret,id=sentry_auth_token,env=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=sentry_org,env=SENTRY_ORG \
  --mount=type=secret,id=sentry_project,env=SENTRY_PROJECT \
  pnpm --filter './apps/codeforafrica' build:next

ENV PAYLOAD_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
RUN pnpm --filter './apps/codeforafrica' build-payload

FROM ui_runner_base AS runner

ARG NEXT_PUBLIC_APP_LOGO_URL \
  PAYLOAD_CONFIG_PATH="dist/payload.config.js"

ENV NEXT_PUBLIC_APP_LOGO_URL=${NEXT_PUBLIC_APP_LOGO_URL} \
  PAYLOAD_CONFIG_PATH=${PAYLOAD_CONFIG_PATH}

RUN set -ex \
  && mkdir -p ./apps/codeforafrica/.next \
  && chown nextjs:nodejs ./apps/codeforafrica/.next

# codeforafrica doesn't use output: "standalone", so the full node_modules
# and .next folder (not just the standalone bundle) are needed at runtime.
COPY --from=builder --chown=nextjs:nodejs /workspace/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/node_modules ./apps/codeforafrica/node_modules
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/next.config.js ./apps/codeforafrica/next.config.js
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/.env ./apps/codeforafrica/.env
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/migrations ./apps/codeforafrica/migrations
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/public ./apps/codeforafrica/public
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/.next ./apps/codeforafrica/.next
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/dist ./apps/codeforafrica/dist
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/codeforafrica/build ./apps/codeforafrica/build

WORKDIR /workspace/apps/codeforafrica

USER nextjs

# Custom server to run Payload and Next.js in the same app
CMD ["node", "dist/server.js"]
