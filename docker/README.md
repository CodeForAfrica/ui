# Docker Build Layout (Incremental Migration)

The root `Dockerfile` remains the reference implementation for apps not yet migrated.

This folder contains the new structure:

- Shared base image: `docker/base.Dockerfile`
- Per-app platform artifacts: `docker/apps/<app>/`
- Build orchestration: `docker-bake.hcl`

Docker-related platform artifacts live under `docker/`, not inside the app
source trees. That includes Dockerfiles, Dokku `app.json`, and any future
container/deploy metadata tied to the image rather than the application code.

## Current migrated app

- `techlabblog`
- `trustlab`

## Workflow

Three tools, four concerns — they do not overlap:

| Concern                          | Tool                                          |
| -------------------------------- | --------------------------------------------- |
| Day-to-day development           | `pnpm dev` (native, hot-reload)               |
| Local production image testing   | `docker buildx bake` + `docker compose`       |
| Infrastructure (databases, etc.) | `docker compose` (`image:` only, no `build:`) |
| CI builds                        | `docker buildx bake`                          |

For daily feature work, use `pnpm dev`. Docker is for validating the production
image, typically when changing a `Dockerfile` or debugging a production-only failure.

## Base vs app image versioning

Base images (`ui-builder-base`, `ui-runner-base`) have an independent version lifecycle
from apps. They only change when Node, pnpm, or Alpine tooling changes. The `BASE_TAG`
variable pins the base image version used by app builds, keeping it decoupled from `TAG`
(the app version).

## Build commands

### Testing a production image locally

The shortest path, the `Makefile` wraps both steps. Using `techlabblog` as an example:

```bash
make techlabblog
```

Or run the steps manually:

```bash
docker buildx bake --file docker-bake.hcl techlabblog
docker compose up techlabblog
```

**Environment variables:** `docker compose` loads `apps/<app>/.env` and
`apps/<app>/.env.local` automatically when invoked via `make <app>` command.
The runtime vars work without any extra setup.
The bake step does not read those files; build-time args
(`NEXT_PUBLIC_*`, Sentry secrets, etc.) must be exported in your shell if
you need them locally. For most testing purposes, omitting them is fine, the
image builds correctly. The third-party integrations are just unconfigured.

### CI

#### base images

Base images are built via the `build-base-images.yml` workflow, which handles
multi-arch builds, GHA caching, and the audit trail. Trigger it manually when
`docker/base.Dockerfile` or tooling versions in `docker-bake.hcl` change.

For example:

```bash
gh workflow run build-base-images.yml --field tag=v3
```

#### app images

Pull pre-built base images from the registry, build only app layers. For example:

```bash
BASE_TAG=v3 TAG=abc123 REGISTRY=docker.io/codeforafrica/ \
  docker buildx bake --file docker-bake.hcl techlabblog
```

Additional variables available for CI labels:

```bash
GIT_REVISION=$(git rev-parse --short HEAD) \
BUILD_DATE=$(date -u +%Y-%m-%dT%H:%M:%SZ) \
BASE_TAG=v3 TAG=abc123 REGISTRY=docker.io/codeforafrica/ \
  docker buildx bake --file docker-bake.hcl techlabblog
```

## Pattern for new apps

1. Add `docker/apps/<app>/Dockerfile` with stages:
   - `pruned` (turbo prune: isolates the app's files from the monorepo)
   - `deps` (pnpm install with cache mount: separated so install layer is cached independently of source changes)
   - `builder` (next build)
   - `runner` (minimal runtime image: must be named `runner`, inherited from `_app-runner`)

2. Add a target in `docker-bake.hcl` inheriting from `_app-runner`:

```hcl
target "<app>" {
  inherits   = ["_app-runner"]
  dockerfile = "docker/apps/<app>/Dockerfile"
  tags       = ["${REGISTRY}<app>:${TAG}"]
}
```

3. Add `<app>` to the `apps` group in `docker-bake.hcl`.

4. Update the `<app>` service in `docker-compose.yml` to use `image:` instead of `build:`:

```yaml
<app>:
  image: codeforafrica/<app>:${TAG:-local}
  env_file:
    - path: ./apps/<app>/.env
    - path: ./apps/<app>/.env.local
      required: false
  ports:
    - 3000:3000
```

5. Add a `<app>` target to the `Makefile`:

```make
<app>:
	./scripts/bake-up.sh <app>
```

6. Copy `.github/workflows/techlabblog.yml` to `.github/workflows/<app>.yml` and update
   the `paths` filter, `target`, `file-name`, image references, and Dokku remote URL.

7. If the app deploys via Dokku, add `docker/apps/<app>/app.json` and copy it into the
   runtime image `WORKDIR`.
