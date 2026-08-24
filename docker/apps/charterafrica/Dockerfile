# syntax=docker/dockerfile:1

# ui_builder_base / ui_runner_base: Docker named context references use underscores
# because hyphens are invalid in context names. The bake targets are still named
# ui-builder-base and ui-runner-base — only the FROM reference uses underscores.
FROM ui_builder_base AS pruned

COPY . .

# turbo is pre-installed in ui-builder-base — no network call needed here.
RUN turbo prune --docker --out-dir /workspace/out charterafrica

FROM ui_builder_base AS deps

COPY --from=pruned /workspace/out/json/ ./
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=shared \
  pnpm install --frozen-lockfile

FROM ui_builder_base AS builder

ARG NEXT_PUBLIC_APP_URL \
  NEXT_PUBLIC_SEO_DISABLED="true" \
  SENTRY_ENVIRONMENT

ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
  NEXT_PUBLIC_SEO_DISABLED=${NEXT_PUBLIC_SEO_DISABLED} \
  SENTRY_ENVIRONMENT=${SENTRY_ENVIRONMENT}

COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/apps/charterafrica/node_modules ./apps/charterafrica/node_modules
# turbo WARNs when lockfile is missing during build
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruned /workspace/out/full/ ./

# Payload's admin panel needs a serverURL at build time; the real value is
# supplied at runtime via Dokku config, not baked into the image.
ENV PAYLOAD_PUBLIC_APP_URL=http://localhost:3000

# NEXT_PUBLIC_SENTRY_DSN is inlined into the client bundle by webpack, but
# mounted as a BuildKit secret (rather than a plain ARG/GitHub Variable) so
# it stays unlogged without needing a GitHub Variable migration — it's
# stored as a GitHub Secret today even though DSNs aren't actually sensitive.
RUN --mount=type=secret,id=database_url,env=DATABASE_URL \
  --mount=type=secret,id=payload_secret_key,env=PAYLOAD_SECRET_KEY \
  --mount=type=secret,id=next_public_sentry_dsn,env=NEXT_PUBLIC_SENTRY_DSN \
  --mount=type=secret,id=sentry_auth_token,env=SENTRY_AUTH_TOKEN \
  --mount=type=secret,id=sentry_org,env=SENTRY_ORG \
  --mount=type=secret,id=sentry_project,env=SENTRY_PROJECT \
  pnpm --filter './apps/charterafrica' build:next

ENV PAYLOAD_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
RUN pnpm --filter './apps/charterafrica' build-payload

FROM ui_runner_base AS runner

ARG NEXT_PUBLIC_SEO_DISABLED

ENV NEXT_PUBLIC_SEO_DISABLED=${NEXT_PUBLIC_SEO_DISABLED}

RUN set -ex \
  && mkdir -p ./apps/charterafrica/.next \
  && chown nextjs:nodejs ./apps/charterafrica/.next

# charterafrica doesn't use output: "standalone", so the full node_modules
# and .next folder (not just the standalone bundle) are needed at runtime.
COPY --from=builder --chown=nextjs:nodejs /workspace/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/charterafrica/node_modules ./apps/charterafrica/node_modules
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/charterafrica/next.config.js ./apps/charterafrica/next.config.js
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/charterafrica/.env ./apps/charterafrica/.env
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/charterafrica/migrations ./apps/charterafrica/migrations
# app.json's `cron` config runs scripts/ecosystem.mjs via Dokku's cron plugin
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/charterafrica/app.json ./apps/charterafrica/app.json
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/charterafrica/scripts ./apps/charterafrica/scripts
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/charterafrica/public ./apps/charterafrica/public
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/charterafrica/.next ./apps/charterafrica/.next
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/charterafrica/dist ./apps/charterafrica/dist
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/charterafrica/build ./apps/charterafrica/build

WORKDIR /workspace/apps/charterafrica

USER nextjs

# Custom server to run Payload and Next.js in the same app
CMD ["node", "dist/server.js"]
