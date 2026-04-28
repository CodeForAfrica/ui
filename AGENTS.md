# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Overview

This is a **pnpm monorepo** for Code for Africa's civic tech applications. It contains multiple Next.js apps and shared packages, orchestrated by Turbo. Apps are deployed as Docker containers to Dokku.

## Commands

### Development

```bash
pnpm install          # Install all dependencies
pnpm dev              # Run all apps in parallel with hot reload
pnpm dev --filter=<app>   # Run a single app (e.g., --filter=techlabblog)
```

### Build

```bash
pnpm build            # Build all apps and packages (respects dependency order)
pnpm build --filter=<app>   # Build a single app
pnpm build-next       # Build only Next.js apps
pnpm build-payload    # Build Payload CMS
```

### Testing

Before first run, install Playwright browsers:

```bash
npx playwright install
```

```bash
pnpm test             # Run Jest + Playwright in parallel (requires build first)
pnpm jest             # Unit tests only
pnpm jest --filter=<app>    # Unit tests for a single app
pnpm playwright       # E2E tests only (requires build)
```

### Linting & Formatting

```bash
pnpm lint:check       # Check linting without fixing
pnpm lint             # Lint and auto-fix
pnpm format:check     # Check Oxfmt formatting
pnpm format           # Format supported source and config files with Oxfmt
```

### Docker (deployment image testing only)

```bash
make <app>                        # Build image and run via docker compose (e.g., make techlabblog)
make down                         # Stop all containers
docker buildx bake --file docker-bake.hcl <app>   # Build image manually
docker compose up <app>           # Run locally after bake
```

### Versioning

```bash
pnpm changeset        # Create a changeset for a package
pnpm release          # Version packages (changeset version + pnpm install)
pnpm bump             # Bump versions via scripts/bump.js
```

## Architecture

### Monorepo structure

- **`apps/`** — Independent Next.js applications, each with its own `package.json`, Next.js config, and environment files
- **`packages/`** — Shared libraries published to npm or consumed via workspace references

### Apps

| App                   | Description                                                                    |
| --------------------- | ------------------------------------------------------------------------------ |
| `charterafrica`       | Digital database for communities (Payload CMS v2)                              |
| `civicsignalblog`     | CivicSignal research blog                                                      |
| `climatemappedafrica` | Climate data platform                                                          |
| `codeforafrica`       | Main CFA website (Payload CMS v2)                                              |
| `pesayetu`            | Government accountability data (MUI v5 + `mui-styles` catalog)                 |
| `roboshield`          | Bot protection service                                                         |
| `techlabblog`         | TechLab engineering blog (MDX-based, first app migrated to per-app Dockerfile) |
| `trustlab`            | CSO/CBO digital threats platform (Payload CMS v3)                              |
| `twoopstracker`       | Social media analysis                                                          |
| `vpnmanager`          | VPN management                                                                 |

### Shared packages

| Package                         | Purpose                                                           |
| ------------------------------- | ----------------------------------------------------------------- |
| `commons-ui-core`               | Base React components (MUI + Emotion)                             |
| `commons-ui-next`               | Next.js-specific helpers                                          |
| `commons-ui-payload`            | Payload CMS integration helpers                                   |
| `commons-ui-testing-library`    | Shared test utilities                                             |
| `eslint-config-commons-ui`      | Shared ESLint flat config: base, Next.js, and TypeScript variants |
| `jest-config-commons-ui`        | Shared Jest config                                                |
| `playwright-config-commons-ui`  | Shared Playwright config                                          |
| `hurumap-core` / `hurumap-next` | Hurumap data visualization library                                |

### Key technology choices

- **MUI v6** for most apps; `pesayetu` and `twoopstracker` use the `mui-styles` pnpm catalog (MUI v5 + `@mui/styles`)
- **Payload CMS 2.x** (catalog `payload`) for `charterafrica`, `codeforafrica`; **Payload CMS 3.x** (catalog `payload-v3`) for `trustlab`
- **Apollo Client** for GraphQL; **SWR** for REST data fetching
- **MDX** with remark/rehype pipeline for `techlabblog`
- **SVGR** for SVG imports as React components

### Dependency management

All package versions are pinned in `pnpm-workspace.yaml` using catalogs:

- `catalog:` — default catalog for most packages
- `mui-styles:` — MUI v5 for legacy apps
- `payload-v3:` — Payload CMS 3.x
- `react-19:` — React 19 (opt-in)

Reference catalog versions in `package.json` as `"some-pkg": "catalog:"` or `"some-pkg": "catalog:payload-v3"`.

### Docker architecture

Docker is for **deployment image validation only** — use `pnpm dev` for development.

- **`docker/base.Dockerfile`** — shared Node 24 Alpine base images (`ui-builder-base`, `ui-runner-base`) with independent `BASE_TAG` versioning
- **`docker/apps/<app>.Dockerfile`** — per-app multi-stage builds (pruned → deps → builder → runner)
- **`docker-bake.hcl`** — orchestrates all build targets; app targets inherit from `_app-runner`
- **`docker-compose.yml`** — local dev services; for migrated apps uses `image:` (not `build:`)

Only `techlabblog` has been migrated to the per-app Dockerfile pattern. Other apps still use the root `Dockerfile`. See `docker/README.md` for the migration pattern.

### CI/CD

GitHub Actions workflows in `.github/workflows/`:

- `ci.yml` — lint, test, build on every push/PR
- `build-base-images.yml` — triggered manually when base Docker tooling changes
- `bake-and-push.yml` — builds and pushes app images
- Per-app deploy workflows (e.g., `techlabblog.yml`) deploy to Dokku

### Environment variables

- `NEXT_PUBLIC_*` — client-side env vars (baked at build time)
- `MONGO_URL` / `MONGODB_URL` — database connection (required for Payload CMS apps)
- `PAYLOAD_SECRET` / `PAYLOAD_SECRET_KEY` — CMS authentication
- `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` — error tracking
- Build-time args must be exported in shell for local Docker builds; runtime vars are loaded from `apps/<app>/.env` and `apps/<app>/.env.local` by `docker compose`
