# syntax=docker/dockerfile:1

# ui_builder_base / ui_runner_base: Docker named context references use underscores
# because hyphens are invalid in context names. The bake targets are still named
# ui-builder-base and ui-runner-base — only the FROM reference uses underscores.
FROM ui_builder_base AS pruned

COPY . .

# turbo is pre-installed in ui-builder-base — no network call needed here.
RUN turbo prune --docker --out-dir /workspace/out pesayetu

FROM ui_builder_base AS deps

COPY --from=pruned /workspace/out/json/ ./
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store,sharing=shared \
  pnpm install --frozen-lockfile

FROM ui_builder_base AS builder

ARG TRACING_ROOT \
  NEXT_PUBLIC_APP_NAME=Pesayetu \
  NEXT_PUBLIC_APP_URL \
  NEXT_PUBLIC_SEO_DISABLED \
  NEXT_PUBLIC_IMAGE_DOMAINS="cms.dev.codeforafrica.org,hurumap-v2.s3.amazonaws.com" \
  NEXT_PUBLIC_IMAGE_SCALE_FACTOR=2 \
  NEXT_PUBLIC_OPENAFRICA_DOMAINS="open.africa,openafrica.net,africaopendata.org" \
  NEXT_PUBLIC_SOURCEAFRICA_DOMAINS="dc.sourceafrica.net" \
  WORDPRESS_URL \
  WORDPRESS_MULTISITE_PREFIX="/pesayetu" \
  HURUMAP_API_URL

ENV TRACING_ROOT=${TRACING_ROOT} \
  NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME} \
  NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL} \
  NEXT_PUBLIC_SEO_DISABLED=${NEXT_PUBLIC_SEO_DISABLED} \
  NEXT_PUBLIC_IMAGE_DOMAINS=${NEXT_PUBLIC_IMAGE_DOMAINS} \
  NEXT_PUBLIC_IMAGE_SCALE_FACTOR=${NEXT_PUBLIC_IMAGE_SCALE_FACTOR} \
  NEXT_PUBLIC_OPENAFRICA_DOMAINS=${NEXT_PUBLIC_OPENAFRICA_DOMAINS} \
  NEXT_PUBLIC_SOURCEAFRICA_DOMAINS=${NEXT_PUBLIC_SOURCEAFRICA_DOMAINS} \
  WORDPRESS_URL=${WORDPRESS_URL} \
  WORDPRESS_MULTISITE_PREFIX=${WORDPRESS_MULTISITE_PREFIX} \
  HURUMAP_API_URL=${HURUMAP_API_URL}

COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/apps/pesayetu/node_modules ./apps/pesayetu/node_modules
# commons-ui-next, hurumap-next, and hurumap-core all import directly from
# @commons-ui/core via workspace:*. pesayetu's own package.json pins
# @commons-ui/core to the legacy published package (catalog:), so without
# each package's own local node_modules symlink to the in-monorepo source,
# Next.js's transpilePackages resolution falls back to pesayetu's (wrong)
# instance — silently for exports that exist in both packages, loudly (a
# build warning) for ones that don't, e.g. ImageButton.
COPY --from=deps /workspace/packages/commons-ui-next/node_modules ./packages/commons-ui-next/node_modules
COPY --from=deps /workspace/packages/hurumap-next/node_modules ./packages/hurumap-next/node_modules
COPY --from=deps /workspace/packages/hurumap-core/node_modules ./packages/hurumap-core/node_modules
# turbo WARNs when lockfile is missing during build
COPY --from=pruned /workspace/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruned /workspace/out/full/ ./

# WordPress content (WPGraphQL/JWT auth) is fetched during static generation,
# so these credentials must be available at build time, not just at runtime.
RUN --mount=type=secret,id=jwt_secret_key,env=JWT_SECRET_KEY \
  --mount=type=secret,id=wordpress_application_username,env=WORDPRESS_APPLICATION_USERNAME \
  --mount=type=secret,id=wordpress_application_password,env=WORDPRESS_APPLICATION_PASSWORD \
  --mount=type=secret,id=wordpress_preview_secret,env=WORDPRESS_PREVIEW_SECRET \
  pnpm --filter './apps/pesayetu' build:next

FROM ui_runner_base AS runner

# next.config.js reads these directly (not just the client bundle) whenever the
# standalone server boots, so they must persist as runtime ENV, not just build ARGs.
ARG NEXT_PUBLIC_IMAGE_DOMAINS \
  NEXT_PUBLIC_IMAGE_SCALE_FACTOR \
  NEXT_PUBLIC_OPENAFRICA_DOMAINS \
  NEXT_PUBLIC_SOURCEAFRICA_DOMAINS

ENV NEXT_PUBLIC_IMAGE_DOMAINS=${NEXT_PUBLIC_IMAGE_DOMAINS} \
  NEXT_PUBLIC_IMAGE_SCALE_FACTOR=${NEXT_PUBLIC_IMAGE_SCALE_FACTOR} \
  NEXT_PUBLIC_OPENAFRICA_DOMAINS=${NEXT_PUBLIC_OPENAFRICA_DOMAINS} \
  NEXT_PUBLIC_SOURCEAFRICA_DOMAINS=${NEXT_PUBLIC_SOURCEAFRICA_DOMAINS}

RUN set -ex \
  && mkdir -p ./apps/pesayetu/.next \
  && chown nextjs:nodejs ./apps/pesayetu/.next

COPY --from=builder --chown=nextjs:nodejs /workspace/apps/pesayetu/public ./apps/pesayetu/public
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/pesayetu/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /workspace/apps/pesayetu/.next/static ./apps/pesayetu/.next/static
COPY --from=pruned --chown=nextjs:nodejs /workspace/docker/apps/pesayetu/app.json ./app.json

USER nextjs

CMD ["node", "apps/pesayetu/server.js"]
