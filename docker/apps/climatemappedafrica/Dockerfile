# syntax=docker/dockerfile:1

# ui_builder_base / ui_runner_base: Docker named context references use underscores
# because hyphens are invalid in context names. The bake targets are still named
# ui-builder-base and ui-runner-base — only the FROM reference uses underscores.
FROM ui_builder_base AS pruned

COPY . .

# turbo is pre-installed in ui-builder-base — no network call needed here.
RUN turbo prune --docker --out-dir /workspace/out climatemappedafrica

FROM ui_builder_base AS deps

COPY --from=pruned /workspace/out/json/ ./
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=shared \
  pnpm install --frozen-lockfile

FROM ui_builder_base AS builder

# PROJECT_ROOT (not the shared TRACING_ROOT convention) because that's the
# variable name next.config.js already reads.
ARG PROJECT_ROOT \
  NEXT_PUBLIC_APP_URL \
  NEXT_PUBLIC_SENTRY_DSN \
  NEXT_PUBLIC_SEO_DISABLED \
  NEXT_PUBLIC_IMAGE_DOMAINS="cms.dev.codeforafrica.org,hurumap-v2.s3.amazonaws.com" \
  NEXT_PUBLIC_IMAGE_SCALE_FACTOR=2

ENV PROJECT_ROOT=${PROJECT_ROOT} \
  NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
  NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN} \
  NEXT_PUBLIC_SEO_DISABLED=${NEXT_PUBLIC_SEO_DISABLED} \
  NEXT_PUBLIC_IMAGE_DOMAINS=${NEXT_PUBLIC_IMAGE_DOMAINS} \
  NEXT_PUBLIC_IMAGE_SCALE_FACTOR=${NEXT_PUBLIC_IMAGE_SCALE_FACTOR}

COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/apps/climatemappedafrica/node_modules ./apps/climatemappedafrica/node_modules
# turbo WARNs when lockfile is missing during build
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruned /workspace/out/full/ ./

# Payload's admin panel needs a serverURL at build time; the real value is
# supplied at runtime via Dokku config, not baked into the image.
ENV PAYLOAD_PUBLIC_APP_URL=http://localhost:3000

# The custom server (server.ts) connects to MongoDB via payload.init() before
# spawning `next build`, so — unlike the other migrated apps — this build
# genuinely needs a reachable database, not just a well-formed URL.
RUN --mount=type=secret,id=database_url,env=DATABASE_URL \
  --mount=type=secret,id=payload_secret,env=PAYLOAD_SECRET \
  pnpm --filter './apps/climatemappedafrica' build:next

ENV PAYLOAD_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
RUN pnpm --filter './apps/climatemappedafrica' build-payload

FROM ui_runner_base AS runner

ARG NEXT_PUBLIC_IMAGE_DOMAINS \
  NEXT_PUBLIC_IMAGE_SCALE_FACTOR \
  NEXT_PUBLIC_SEO_DISABLED

ENV NEXT_PUBLIC_IMAGE_DOMAINS=${NEXT_PUBLIC_IMAGE_DOMAINS} \
  NEXT_PUBLIC_IMAGE_SCALE_FACTOR=${NEXT_PUBLIC_IMAGE_SCALE_FACTOR} \
  NEXT_PUBLIC_SEO_DISABLED=${NEXT_PUBLIC_SEO_DISABLED}

RUN set -ex \
  && mkdir -p ./apps/climatemappedafrica/.next \
  && chown nextjs:nodejs ./apps/climatemappedafrica/.next

# climatemappedafrica doesn't use output: "standalone", so the full
# node_modules and .next folder (not just the standalone bundle) are needed
# at runtime.
COPY --from=builder --chown=nextjs:nodejs /workspace/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/climatemappedafrica/node_modules ./apps/climatemappedafrica/node_modules
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/climatemappedafrica/next.config.js ./apps/climatemappedafrica/next.config.js
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/climatemappedafrica/.env ./apps/climatemappedafrica/.env
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/climatemappedafrica/public ./apps/climatemappedafrica/public
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/climatemappedafrica/payload.image.loader.js ./apps/climatemappedafrica/payload.image.loader.js
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/climatemappedafrica/.next ./apps/climatemappedafrica/.next
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/climatemappedafrica/dist ./apps/climatemappedafrica/dist
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/climatemappedafrica/build ./apps/climatemappedafrica/build
COPY --from=pruned --chown=nextjs:nodejs /workspace/docker/apps/climatemappedafrica/app.json ./apps/climatemappedafrica/app.json

WORKDIR /workspace/apps/climatemappedafrica

USER nextjs

# Custom server to run Payload and Next.js in the same app
CMD ["node", "dist/server.js"]
