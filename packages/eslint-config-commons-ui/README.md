# ESLint Configuration for Commons UI

This package provides the shared flat-config ESLint setup for the monorepo.

## Config Variants

- `eslint-config-commons-ui`
  Base config for JavaScript, React, Jest, Testing Library, Playwright, Markdown, and JSON.
- `eslint-config-commons-ui/next`
  Base config plus Next.js rules.
- `eslint-config-commons-ui/typescript`
  Next.js config plus TypeScript rules.

## Repo Layout

- [`eslint.config.js`](../../eslint.config.js)
  Root-level config for repo files outside `apps/` and `packages/`.
- [`apps/eslint.config.js`](../../apps/eslint.config.js)
  Shared ancestor config for JavaScript Next.js apps.
- [`packages/eslint.config.js`](../eslint.config.js)
  Shared ancestor config for packages.
- Workspaces with custom needs, such as TypeScript Next.js apps, can define a local `eslint.config.js` and import the appropriate variant directly.

## Running ESLint

From the repo root:

```sh
pnpm run lint:check
pnpm run lint
```

From an individual workspace:

```sh
pnpm -C apps/<app-name> exec eslint .
pnpm -C packages/<package-name> exec eslint .
```

## Lint-Staged

The shared `lint-staged` config lives in `lintstaged.js` in this package. Workspaces import it through a local `.lintstagedrc.js` stub so `lint-staged` can select the nearest config for staged files while still running commands from the owning workspace directory.
