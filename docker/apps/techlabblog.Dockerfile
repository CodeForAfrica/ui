# syntax=docker/dockerfile:1

# ui_builder_base / ui_runner_base: Docker named context references use underscores
# because hyphens are invalid in context names. The bake targets are still named
# ui-builder-base and ui-runner-base — only the FROM reference uses underscores.
FROM ui_builder_base AS pruned

COPY . .

# turbo warns about "No locally installed turbo" here by design:
# `turbo prune` runs before `pnpm install` to avoid installing the full workspace.
# TURBO_VERSION is pinned in docker-bake.hcl and provided via ui-builder-base.
RUN turbo prune --docker --out-dir /workspace/out techlabblog

FROM ui_builder_base AS deps

COPY --from=pruned /workspace/out/json/ ./
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=shared \
  pnpm install --frozen-lockfile

FROM ui_builder_base AS builder

ARG NEXT_PUBLIC_SENTRY_DSN \
  SENTRY_ENVIRONMENT \
  TRACING_ROOT

ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN} \
  SENTRY_ENVIRONMENT=${SENTRY_ENVIRONMENT} \
  TRACING_ROOT=${TRACING_ROOT}

COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/apps/techlabblog/node_modules ./apps/techlabblog/node_modules
# turbo WARNs when lockfile is missing during build
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./
COPY --from=pruned /workspace/out/full/ ./

RUN --mount=type=secret,id=sentry_auth_token,env=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=sentry_org,env=SENTRY_ORG \
  --mount=type=secret,id=sentry_project,env=SENTRY_PROJECT \
  pnpm build --filter "./apps/techlabblog"

FROM ui_runner_base AS runner

# NEXT_PUBLIC_* vars are already inlined into the JS bundle by the builder stage.
# Re-declaring them here has no effect and misleads operators into thinking they
# can be changed by restarting the container — they cannot.
# Only server-side runtime vars belong here.
ARG SENTRY_ENVIRONMENT

ENV SENTRY_ENVIRONMENT=${SENTRY_ENVIRONMENT}

RUN set -ex \
  && mkdir -p ./apps/techlabblog/.next \
  && chown nextjs:nodejs ./apps/techlabblog/.next

COPY --from=builder --chown=nextjs:nodejs /workspace/apps/techlabblog/public ./apps/techlabblog/public
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/techlabblog/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/techlabblog/.next/static ./apps/techlabblog/.next/static

USER nextjs

CMD ["node", "apps/techlabblog/server.js"]
