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
pnpm build:next       # Build only Next.js apps
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

## Architecture

### Monorepo structure

- **`apps/`** — Independent Next.js applications, each with its own `package.json`, Next.js config, and environment files
- **`packages/`** — Shared libraries published to npm or consumed via workspace references

### Apps

| App                   | Description                      |
| --------------------- | -------------------------------- |
| `charterafrica`       | Digital database for communities |
| `civicsignalblog`     | CivicSignal research blog        |
| `climatemappedafrica` | Climate data platform            |
| `codeforafrica`       | Main CFA website                 |
| `pesayetu`            | Government accountability data   |
| `roboshield`          | Bot protection service           |
| `techlabblog`         | TechLab engineering blog         |
| `trustlab`            | CSO/CBO digital threats platform |
| `twoopstracker`       | Social media analysis            |
| `vpnmanager`          | VPN management                   |

### Shared packages

| Package                         | Purpose                            |
| ------------------------------- | ---------------------------------- |
| `commons-ui-core`               | Base React components              |
| `commons-ui-next`               | Next.js-specific helpers           |
| `commons-ui-payload`            | Payload CMS integration helpers    |
| `commons-ui-testing-library`    | Shared test utilities              |
| `eslint-config-commons-ui`      | Shared ESLint flat config          |
| `jest-config-commons-ui`        | Shared Jest config                 |
| `playwright-config-commons-ui`  | Shared Playwright config           |
| `hurumap-core` / `hurumap-next` | Hurumap data visualization library |

### Key technology choices

- **UI stack**:
  - Current: MUI v6 + Emotion for most apps and shared UI packages.
  - Legacy:
    - MUI v5 + `@mui/styles` via the `mui-styles` catalog for `pesayetu` and `twoopstracker`.
- **Framework stack**:
  - Next.js 16 + React 19 (`catalog:next-16`, `catalog:react-19`) for `roboshield` and `trustlab`. Payload v3 doesn't support Next.js 15.5.
  - Next.js 15 + React 18 (`catalog:`) for the other apps.
  - Next.js 16 apps build with `--webpack` because they have custom webpack rules (Next.js 16 defaults to Turbopack). They set `agentRules: false` so that `next dev` doesn't write Next.js agent rules into the app's `AGENTS.md`.
- **CMS stack**:
  - Current:
    - Payload CMS v3.x (`catalog:payload-v3`) for `roboshield`, `trustlab`, `commons-ui-payload`.
    - MDX with remark/rehype pipeline for `techlabblog`.
  - Legacy:
    - Payload CMS v2.x (`catalog:`) for `charterafrica`, `civicsignalblog`, `climatemappedafrica`, `codeforafrica`.
    - WordPress via WPGraphQL for `pesayetu`.
    - Netlify CMS markdown content for `twoopstracker`.
- **Testing**:
  - Jest v30 shared through `jest-config-commons-ui`.
  - Playwright shared through `playwright-config-commons-ui`.

### Toolchain versions (Node.js and pnpm)

The root `package.json` is the **single source of truth**. Nothing else in the repo
may declare a Node.js or pnpm version:

| Field            | Value          | Who reads it                                                                         |
| ---------------- | -------------- | ------------------------------------------------------------------------------------ |
| `engines.node`   | `24.x`         | `actions/setup-node` (`node-version-file: "package.json"`); pnpm, via `engineStrict` |
| `engines.pnpm`   | `11.x`         | Documents the supported pnpm major                                                   |
| `packageManager` | `pnpm@11.27.0` | pnpm itself (self-provisions this exact build); `pnpm/action-setup`                  |

Rules:

- **Workspace manifests carry neither field.** `apps/*` are private, so the root
  `engines` govern them. `packages/*` are published, so they declare only
  `engines.node: ">=24"` — a floor for consumers, not this repo's pin — and never
  `packageManager`, which pnpm ignores outside the root anyway.
- **No `.nvmrc` / `.node-version` / `.tool-versions`.** `engineStrict: true` in
  `pnpm-workspace.yaml` escalates the root `engines.node` check from a warning to a
  hard install failure, which is the same guarantee without a second copy to keep in
  sync. Note it is broader than the toolchain: it also rejects any _dependency_
  declaring a Node range that excludes the runtime. That is deliberate — see the
  comment on the setting for the rationale and the escape hatch.
- **Workflows never hardcode a version.** Use `node-version-file: "package.json"`,
  and pass no `version` to `pnpm/action-setup` — it reads `packageManager`.
- **Docker carries literal pins** (`docker-bake.hcl`, and the pre-bake root
  `Dockerfile`), because bake's HCL has no `file()` function and a Dockerfile
  cannot parse JSON.

`scripts/toolchain-contract.test.mjs` enforces all of the above in CI via
`pnpm test:scripts`. It is dependency-free, so it also runs from a bare checkout.
To upgrade Node.js or pnpm: change the root `package.json`, run the test, and fix
whatever it reports.

### Dependency management

All package versions are pinned in `pnpm-workspace.yaml` using catalogs:

- `catalog:` — default catalog for most packages
- `mui-styles:` — MUI v5 for legacy apps
- `payload-v3:` — Payload CMS 3.x
- `next-16:` — Next.js 16 and the Next.js integrations it needs (`@next/*`, Sentry v10, `@mui/material-nextjs` v7)
- `react-19:` — React 19 (opt-in)
- `shared-peers:` — peer ranges of the shared packages: every major that some app uses

Reference catalog versions in `package.json` as `"some-pkg": "catalog:"` or `"some-pkg": "catalog:payload-v3"`.

### Shared packages compiled from source

Apps compile the shared `@commons-ui/*` and `@hurumap/*` packages from source. pnpm installs each shared package's own devDependencies (for example React 18 and Next.js 15) in `packages/*/node_modules`. An app on other majors can then bundle two copies of React, Next.js, MUI and Emotion.

To prevent this, an import from shared-package source resolves from the app when both of these are true:

- The shared package declares the import as a peer dependency.
- The app's installed version satisfies that peer range.

Declare React, Next.js, MUI, Emotion and similar packages as peers of the shared packages that import them.

- Builds: an app that compiles shared source on other majors adds `ResolvePeersFromAppPlugin` from `@commons-ui/next/config.js` to its webpack config.
- Tests: the `jest-config-commons-ui` resolver applies the same rule in every Jest project.
- Type-checks: TypeScript apps on React 19 that type-check shared source map `react` and `react-dom` to their own `@types` in `tsconfig.json` `paths` (`roboshield`, `trustlab`).
- `packages/commons-ui-next/src/peer-resolution.test.js` runs the same cases against both implementations.
- `pnpm jest:react-19` runs the shared packages' tests on React 19 (`JEST_REACT=19`). CI runs it too.
- CI builds the apps with `CHECK_BUNDLE_SINGLETONS=1`. Then `pnpm check:bundle-singletons` fails if an app that uses the plugin bundles more than one copy of React, Next.js, MUI or Emotion.
- The shared packages' React and Next.js peers reference the `shared-peers` catalog, so they accept every major that some app uses. Exceptions: `@hurumap/*` peers React 18 only, and the `payload` and `@payloadcms/richtext-lexical` peers of `commons-ui-payload` are Payload v3 only.

pnpm's injected workspace packages (`dependenciesMeta.<pkg>.injected`) also prevent the second copy. We don't use them: an app then compiles a copy of the shared source, so edits to the shared packages don't hot-reload.

### Docker architecture

Docker is for **deployment image validation only** — use `pnpm dev` for development.

- **`docker/base.Dockerfile`** — shared Node 24 Alpine base images (`ui-builder-base`, `ui-runner-base`) with independent `BASE_TAG` versioning
- **`docker/apps/<app>/Dockerfile`** — per-app multi-stage builds (pruned → deps → builder → runner)
- **`docker-bake.hcl`** — orchestrates all build targets; app targets inherit from `_app-runner`
- **`docker-compose.yml`** — local dev services; for migrated apps uses `image:` (not `build:`)

Migration status is tracked in `docker/README.md`; keep that checklist as the single source of truth when migrating additional apps.

### CI/CD

GitHub Actions workflows in `.github/workflows/`:

- `ci.yml` — lint, test, build on every push/PR
- `build-base-images.yml` — triggered manually when base Docker tooling changes
- `bake-and-push.yml` — builds and pushes app images
- Per-app deploy workflows (e.g., `techlabblog.yml`) deploy to Dokku

After a Next.js or Payload upgrade, check a Payload v3 app on its dev deployment before you bump its version for production. Log in to the Payload admin and check that you can edit and save a document, upload media (S3), use live preview, and use `/preview` draft mode. Automated tests don't cover these flows.

### Environment variables

- `NEXT_PUBLIC_*` — client-side env vars (baked at build time)
- `MONGO_URL` / `MONGODB_URL` — database connection (required for Payload CMS apps)
- `PAYLOAD_SECRET` / `PAYLOAD_SECRET_KEY` — CMS authentication
- `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` — error tracking
- `SENTRY_TRACES_SAMPLE_RATE` — share of server and edge requests that Sentry traces (0-1, read at runtime); defaults to `0.1`. Requests from the browser keep the browser's sampling decision (`tracesSampleRate` in `instrumentation-client`)
- Build-time args must be exported in shell for local Docker builds; runtime vars are loaded from `apps/<app>/.env` and `apps/<app>/.env.local` by `docker compose`
