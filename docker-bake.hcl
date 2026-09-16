variable "REGISTRY" {
  default = "codeforafrica/"
}

variable "TAG" {
  default = "local"
}

variable "BASE_TAG" {
  default = ""
}

variable "GIT_REVISION" {
  default = ""
}

variable "BUILD_DATE" {
  default = ""
}

# TOOLCHAIN PINS
#
# Bake's HCL dialect has no `file()` function, so it cannot read the root
# package.json. These are therefore literal pins, not derived values — and
# scripts/toolchain-contract.test.mjs (run by `pnpm test:scripts` in CI) fails
# the build if any of them drifts from the single source of truth:
#
#   NODE_VERSION  must satisfy package.json#engines.node
#   PNPM_VERSION  must equal   package.json#packageManager
#   TURBO_VERSION must satisfy pnpm-workspace.yaml#catalog.turbo
#
# Bump them here; the contract test tells you what else has to move with them.
variable "NODE_VERSION" {
  default = "24.21.0"
}

# Image index digest for node:${NODE_VERSION}-alpine. Optional today: when empty,
# NODE_IMAGE_REF below falls back to the bare tag. Setting it makes base image
# builds reproducible, because a Docker tag is a mutable pointer — the
# docker-library team repoints version tags on Alpine CVE rebuilds, so the same
# NODE_VERSION can resolve to different content over time. (This is unlike
# pnpm/turbo, which npm publishes immutably, so a version there already pins
# content.)
#
# Must be the index digest (not a platform-specific one) or multi-arch CI builds
# resolve incorrectly. Format: "sha256:<hash>" — no leading "@", HCL composes the
# full reference. Note it is per-tag-index, not purely content-derived:
# node:24-alpine and node:24.21.0-alpine hold identical content yet differ here,
# which is why it has to be recorded rather than computed.
#
#   docker buildx imagetools inspect node:24.21.0-alpine    # read "Digest:"
#
# If you set it, set it in the same commit as NODE_VERSION. Docker checks only
# that a digest exists in library/node, never that it matches the tag beside it
# (asked for since 2018: moby/moby#37866, still open), so a stale digest silently
# builds the old Node while the logs show the new version. build-base-images.yml
# verifies the pairing against the registry whenever a digest is present.
#
# TODO: make this mandatory — pinned by default, with a bake `validation` block
# rejecting an empty value and a Renovate custom manager bumping it alongside
# NODE_VERSION. Deliberately left out of the toolchain-standardisation change:
# it is supply-chain hardening, and it deserves its own review.
variable "NODE_DIGEST" {
  default = ""
}

# Full image reference passed to Dockerfile. When NODE_DIGEST is set, produces
# "node:<version>-alpine@sha256:<hash>" for reproducible builds. When unset,
# falls back to "node:<version>-alpine" (local dev default).
variable "NODE_IMAGE_REF" {
  default = NODE_DIGEST != "" ? "node:${NODE_VERSION}-alpine@${NODE_DIGEST}" : "node:${NODE_VERSION}-alpine"
}

variable "PNPM_VERSION" {
  default = "11.27.0"
}

# The globally-installed turbo that runs `turbo prune` in the builder image.
# Must equal the turbo pnpm-lock.yaml resolves for the workspace, not the
# catalog's caret floor — a global turbo older than the workspace's can prune
# against a turbo.json schema it does not understand.
variable "TURBO_VERSION" {
  default = "2.9.6"
}

# Telemetry is disabled repo-wide. These are set here as the single source of
# truth rather than hardcoded per Dockerfile stage.
variable "NEXT_TELEMETRY_DISABLED" {
  default = "1"
}

variable "TURBO_TELEMETRY_DISABLED" {
  default = "1"
}

# Project root = Next.js project root (the folder containing next.config.js)
# Monorepo root = The root of the monorepo. In this repo, it's two levels up from
#                 the Next.js project root.
# Tracing root = The folder from which Next.js will trace files for standalone output.
#                Should include monorepo root since pnpm install some dependencies at
#                the <monorepo root>/node_modules.
variable "TRACING_ROOT" {
  default = "../.."
}

group "base" {
  targets = ["ui-builder-base", "ui-runner-base"]
}

group "apps" {
  targets = ["charterafrica", "climatemappedafrica", "codeforafrica", "pesayetu", "roboshield", "techlabblog", "trustlab"]
}

# Prefer explicit targets/groups for predictability.
# e.g. docker buildx bake --file docker-bake.hcl techlabblog

target "_labels" {
  labels = {
    "org.opencontainers.image.version"  = "${TAG}"
    "org.opencontainers.image.revision" = "${GIT_REVISION}"
    "org.opencontainers.image.created"  = "${BUILD_DATE}"
  }
}

target "_ui-base" {
  inherits   = ["_labels"]
  context    = "."
  dockerfile = "docker/base.Dockerfile"
  args = {
    NODE_IMAGE_REF          = "${NODE_IMAGE_REF}"
    NEXT_TELEMETRY_DISABLED = "${NEXT_TELEMETRY_DISABLED}"
  }
  labels = {
    "org.codeforafrica.node.version" = "${NODE_VERSION}"
  }
}

target "ui-builder-base" {
  inherits = ["_ui-base"]
  target   = "ui-builder-base"
  tags     = ["${REGISTRY}ui-builder-base:${TAG}"]
  args = {
    PNPM_VERSION             = "${PNPM_VERSION}"
    TURBO_VERSION            = "${TURBO_VERSION}"
    TURBO_TELEMETRY_DISABLED = "${TURBO_TELEMETRY_DISABLED}"
  }
  labels = {
    "org.codeforafrica.pnpm.version"  = "${PNPM_VERSION}"
    "org.codeforafrica.turbo.version" = "${TURBO_VERSION}"
  }
}

target "ui-runner-base" {
  inherits = ["_ui-base"]
  target   = "ui-runner-base"
  tags     = ["${REGISTRY}ui-runner-base:${TAG}"]
}

# Shared config for all app targets.
# When BASE_TAG is set, pulls pre-built base images from the registry (CI).
# When BASE_TAG is unset, builds base images inline (local dev).
target "_app" {
  inherits = ["_labels"]
  contexts = {
    ui_builder_base = BASE_TAG != "" ? "docker-image://${REGISTRY}ui-builder-base:${BASE_TAG}" : "target:ui-builder-base"
  }
  args = {
    TRACING_ROOT = "${TRACING_ROOT}"
  }
  # SECURE: Use secrets for sensitive data!
  secret = [
    "type=env,id=sentry_auth_token,env=SENTRY_AUTH_TOKEN",
    "type=env,id=sentry_org,env=SENTRY_ORG",
    "type=env,id=sentry_project,env=SENTRY_PROJECT",
  ]
  labels = {
    "org.codeforafrica.base.version" = BASE_TAG != "" ? "${BASE_TAG}" : "${TAG}"
  }
}

# Shared config for app runner targets, which additionally need ui-runner-base.
target "_app-runner" {
  inherits = ["_app"]
  context    = "."
  target     = "runner"
  contexts = {
    ui_runner_base = BASE_TAG != "" ? "docker-image://${REGISTRY}ui-runner-base:${BASE_TAG}" : "target:ui-runner-base"
  }
}

# Shared config for payload apps.
target "_payload-app-runner" {
  inherits   = ["_app-runner"]
  secret = [
    "type=env,id=database_url,env=DATABASE_URL",
    "type=env,id=payload_secret,env=PAYLOAD_SECRET",
  ]
}

target "charterafrica" {
  inherits   = ["_app-runner"]
  dockerfile = "docker/apps/charterafrica/Dockerfile"
  tags       = ["${REGISTRY}charterafrica:${TAG}"]
  args = {
    NEXT_PUBLIC_APP_URL = "${NEXT_PUBLIC_APP_URL}"
    SENTRY_ENVIRONMENT  = "${SENTRY_ENVIRONMENT}"
  }
  # sentry_auth_token/org/project are inherited from _app. database_url,
  # payload_secret_key, and next_public_sentry_dsn are charterafrica-specific
  # — it reads PAYLOAD_SECRET_KEY (not PAYLOAD_SECRET like _payload-app-runner
  # provides), so this declares its own secret list rather than inheriting it.
  secret = [
    "type=env,id=database_url,env=DATABASE_URL",
    "type=env,id=payload_secret_key,env=PAYLOAD_SECRET_KEY",
    "type=env,id=next_public_sentry_dsn,env=NEXT_PUBLIC_SENTRY_DSN",
  ]
}

target "climatemappedafrica" {
  inherits   = ["_payload-app-runner"]
  dockerfile = "docker/apps/climatemappedafrica/Dockerfile"
  tags       = ["${REGISTRY}climatemappedafrica:${TAG}"]
  args = {
    PROJECT_ROOT        = "${TRACING_ROOT}"
    NEXT_PUBLIC_APP_URL = "${NEXT_PUBLIC_APP_URL}"
  }
  # database_url/payload_secret/sentry_auth_token/org/project are all
  # inherited from _payload-app-runner/_app — sentry_auth_token/org/project
  # are unused (no @sentry/nextjs dependency; Payload's own sentry plugin
  # reads NEXT_PUBLIC_SENTRY_DSN, and only at runtime), but harmless no-op
  # mounts, matching pesayetu's approach.
}

target "codeforafrica" {
  inherits   = ["_payload-app-runner"]
  dockerfile = "docker/apps/codeforafrica/Dockerfile"
  # "-ui" suffix matches the pre-bake DockerHub repository name
  # (codeforafrica/codeforafrica-ui) that the live Dokku apps already pull by.
  tags = ["${REGISTRY}codeforafrica-ui:${TAG}"]
  args = {
    NEXT_PUBLIC_APP_URL = "${NEXT_PUBLIC_APP_URL}"
    SENTRY_ENVIRONMENT  = "${SENTRY_ENVIRONMENT}"
  }
  # database_url/payload_secret/sentry_auth_token/org/project are all
  # inherited from _payload-app-runner/_app. NEXT_PUBLIC_APP_NAME and
  # NEXT_PUBLIC_APP_LOGO_URL are set via --set overrides at the workflow
  # level (see _build-codeforafrica.yml), since they're sourced from
  # GitHub Secrets rather than Variables — matching the legacy pipeline,
  # which never wired NEXT_PUBLIC_IMAGE_DOMAINS/NEXT_PUBLIC_IMAGE_UNOPTIMIZED
  # as build args either, despite next.config.js reading them.
}

# pesayetu fetches content from WordPress (WPGraphQL) during static generation,
# so these are real build args, not just runtime config. They default to empty
# so the image still builds without them; pages that depend on WordPress data
# just fail to prerender, matching the pre-migration Dockerfile's behavior.
variable "WORDPRESS_URL" {
  default = ""
}

variable "WORDPRESS_MULTISITE_PREFIX" {
  default = "/pesayetu"
}

variable "HURUMAP_API_URL" {
  default = ""
}

# Public config (not a secret) — inlined into the client bundle at build time,
# so it must be set here rather than left to Dokku runtime config:set.
variable "NEXT_PUBLIC_APP_URL" {
  default = ""
}

# Sentry environment tag baked into the app. Defaults to "local" (rather than
# "") for a sane out-of-the-box `make <app>` build; CI overrides it per target.
variable "SENTRY_ENVIRONMENT" {
  default = "local"
}

target "pesayetu" {
  inherits   = ["_app-runner"]
  dockerfile = "docker/apps/pesayetu/Dockerfile"
  tags       = ["${REGISTRY}pesayetu:${TAG}"]
  args = {
    WORDPRESS_URL              = "${WORDPRESS_URL}"
    WORDPRESS_MULTISITE_PREFIX = "${WORDPRESS_MULTISITE_PREFIX}"
    HURUMAP_API_URL            = "${HURUMAP_API_URL}"
    NEXT_PUBLIC_APP_URL        = "${NEXT_PUBLIC_APP_URL}"
  }
  # sentry_auth_token/org/project are inherited from _app but intentionally
  # unused here — pesayetu has no @sentry/nextjs dependency, so there's
  # nothing to upload source maps for. Harmless no-op mounts, not wired below.
  secret = [
    "type=env,id=jwt_secret_key,env=JWT_SECRET_KEY",
    "type=env,id=wordpress_application_username,env=WORDPRESS_APPLICATION_USERNAME",
    "type=env,id=wordpress_application_password,env=WORDPRESS_APPLICATION_PASSWORD",
    "type=env,id=wordpress_preview_secret,env=WORDPRESS_PREVIEW_SECRET",
  ]
}

target "roboshield" {
  inherits   = ["_payload-app-runner"]
  dockerfile = "docker/apps/roboshield/Dockerfile"
  tags       = ["${REGISTRY}roboshield:${TAG}"]
  # roboshield builds a URL from NEXT_PUBLIC_APP_URL at module-eval time
  # (src/pages/api/draft.ts) — unlike pesayetu, which degrades gracefully,
  # an empty value throws during `next build`'s page-data collection, so
  # both args must resolve to a real value even for local `make` builds.
  args = {
    NEXT_PUBLIC_APP_URL = "${NEXT_PUBLIC_APP_URL}"
    SENTRY_ENVIRONMENT  = "${SENTRY_ENVIRONMENT}"
  }
  # database_url/payload_secret/sentry_auth_token/org/project are all
  # inherited from _payload-app-runner/_app — no roboshield-specific
  # secrets needed.
}

target "techlabblog" {
  inherits   = ["_app-runner"]
  dockerfile = "docker/apps/techlabblog/Dockerfile"
  tags       = ["${REGISTRY}techlabblog:${TAG}"]
}

target "trustlab" {
  inherits   = ["_payload-app-runner"]
  dockerfile = "docker/apps/trustlab/Dockerfile"
  tags       = ["${REGISTRY}trustlab:${TAG}"]
}
