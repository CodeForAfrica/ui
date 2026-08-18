# syntax=docker/dockerfile:1

# ui_builder_base / ui_runner_base: Docker named context references use underscores
# because hyphens are invalid in context names. The bake targets are still named
# ui-builder-base and ui-runner-base — only the FROM reference uses underscores.
FROM ui_builder_base AS pruned

COPY . .

# turbo is pre-installed in ui-builder-base — no network call needed here.
RUN turbo prune --docker --out-dir /workspace/out roboshield

FROM ui_builder_base AS deps

COPY --from=pruned /workspace/out/json/ ./
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=shared \
  pnpm install --frozen-lockfile

FROM ui_builder_base AS builder

ARG TRACING_ROOT \
  NEXT_PUBLIC_APP_URL \
  SENTRY_ENVIRONMENT

ENV TRACING_ROOT=${TRACING_ROOT} \
  NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
  SENTRY_ENVIRONMENT=${SENTRY_ENVIRONMENT}

COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/apps/roboshield/node_modules ./apps/roboshield/node_modules
# turbo WARNs when lockfile is missing during build
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruned /workspace/out/full/ ./

# Payload's admin panel needs a serverURL at build time; the real value is
# supplied at runtime via Dokku config, not baked into the image.
ENV PAYLOAD_PUBLIC_APP_URL=http://localhost:3000

RUN --mount=type=secret,id=database_url,env=DATABASE_URL \
  --mount=type=secret,id=payload_secret,env=PAYLOAD_SECRET \
  --mount=type=secret,id=sentry_auth_token,env=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=sentry_org,env=SENTRY_ORG \
  --mount=type=secret,id=sentry_project,env=SENTRY_PROJECT \
  pnpm --filter './apps/roboshield' build:next

FROM ui_runner_base AS runner

ARG SENTRY_ENVIRONMENT

ENV SENTRY_ENVIRONMENT=${SENTRY_ENVIRONMENT}

RUN set -ex \
  && mkdir -p ./apps/roboshield/.next \
  && chown nextjs:nodejs ./apps/roboshield/.next

COPY --from=builder --chown=nextjs:nodejs /workspace/apps/roboshield/public ./apps/roboshield/public
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/roboshield/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/roboshield/.next/static ./apps/roboshield/.next/static
COPY --from=pruned --chown=nextjs:nodejs /workspace/docker/apps/roboshield/app.json ./app.json

USER nextjs

CMD ["node", "apps/roboshield/server.js"]
