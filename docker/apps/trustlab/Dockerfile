# syntax=docker/dockerfile:1

# ui_builder_base / ui_runner_base: Docker named context references use underscores
# because hyphens are invalid in context names. The bake targets are still named
# ui-builder-base and ui-runner-base — only the FROM reference uses underscores.
FROM ui_builder_base AS pruned

COPY . .

# turbo is pre-installed in ui-builder-base — no network call needed here.
RUN turbo prune --docker --out-dir /workspace/out trustlab

FROM ui_builder_base AS deps

COPY --from=pruned /workspace/out/json/ ./
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=shared \
  pnpm install --frozen-lockfile

FROM ui_builder_base AS builder

ARG TRACING_ROOT

ENV TRACING_ROOT=${TRACING_ROOT}

COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/apps/trustlab/node_modules ./apps/trustlab/node_modules
# turbo WARNs when lockfile is missing during build
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruned /workspace/out/full/ ./

# NOTE(kilemensi): `pnpm build --filter "..."` doesn't work i.e. secrets are
#                  not visible to `next build`. Could be because the command
#                  runs in a separate process?
RUN --mount=type=secret,id=database_url,env=DATABASE_URL \
  --mount=type=secret,id=payload_secret,env=PAYLOAD_SECRET \
  --mount=type=secret,id=sentry_auth_token,env=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=sentry_org,env=SENTRY_ORG \
  --mount=type=secret,id=sentry_project,env=SENTRY_PROJECT \
  pnpm --filter './apps/trustlab' build

FROM ui_runner_base AS runner

RUN set -ex \
  && mkdir -p ./apps/trustlab/.next ./scripts \
  && chown nextjs:nodejs ./apps/trustlab/.next ./scripts

COPY --from=builder --chown=nextjs:nodejs /workspace/apps/trustlab/public ./apps/trustlab/public
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/trustlab/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/trustlab/.next/static ./apps/trustlab/.next/static
COPY --chown=nextjs:nodejs docker/apps/trustlab/app.json ./app.json
COPY --chown=nextjs:nodejs scripts/revalidate.mjs ./scripts/revalidate.mjs

USER nextjs

CMD ["node", "apps/trustlab/server.js"]
