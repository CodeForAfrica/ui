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

variable "NODE_VERSION" {
  default = "24.14.0"
}

# Image index digest for node:${NODE_VERSION}-alpine. Must be the index digest
# (not a platform-specific digest) so multi-arch CI builds resolve correctly.
# Format: "sha256:<hash>" — no leading "@", HCL composes the full image reference.
# To get the index digest: docker buildx imagetools inspect node:24.14.0-alpine
# Renovate/Dependabot can keep this in sync with NODE_VERSION automatically.
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
  default = "10.30.3"
}

variable "TURBO_VERSION" {
  default = "2.8.12"
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
  targets = ["techlabblog", "trustlab"]
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
