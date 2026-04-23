# Repository Guidelines

## Project Structure & Module Organization

PromiseTracker is the Next.js slice of the ui monorepo. Source lives in `src/`, with routing files in `pages/` using the `.page.js` suffix, feature-driven folders in `components/`, shared helpers in `lib/` and `utils/`, design-system assets in `theme/`, and static media under `assets/` or `public/`. Deployment notes live in `contrib/`, and Sentry instrumentation is handled through the `instrumentation*.js` files.

## Build, Test, and Development Commands

Install workspace dependencies with `pnpm install` (Node 20, pnpm 10). `pnpm dev` starts the inspected dev server on port 3001, while `pnpm build` compiles to `.next`. Use `pnpm start` to serve the production bundle. Run `pnpm lint:check` for a read-only ESLint pass and `pnpm lint` to apply fixes. Execute unit suites with `pnpm exec jest --config jest.config.js`, and launch Playwright coverage after `pnpm build` using `pnpm exec playwright test --config=playwright.config.js`.

## Coding Style & Naming Conventions

Formatting is enforced by `eslint-config-commons-ui` and Prettier, so run `pnpm lint` before opening a PR. Code is formatted with two-space indentation, double quotes, and trailing commas where supported. Name components and folders with PascalCase, hooks with a `use` prefix, and utilities in camelCase. Prefer the `@/promisetracker/...` alias defined in `jsconfig.json` instead of deep relative paths, and keep Next pages confined to `.page.js` files.

## Testing Guidelines

The shared Jest preset looks for `*.test.js` or `*.spec.js`. Co-locate unit tests beside the feature they cover or place them in a sibling `__tests__` directory, and lean on `@commons-ui/testing-library` helpers for rendering and mocks. Playwright relies on the shared config that matches `*.spec.js`; keep specs focused, run against the built standalone server, and prime required env vars through `.env.local` cloned from `env.template`.

## Commit & Pull Request Guidelines

History follows a conventional-commit flavour (`feat:`, `fix:`, `refactor:`). Write imperative, present-tense summaries and keep each commit scoped to one concern, including schema or copy updates. Pull requests should explain the change, link related GitHub issues, and document manual or automated test coverage. Attach before/after screenshots for UI work and call out new environment variables or migrations in the description.

## Environment & Configuration Tips

Store secrets in `.env.local` and never commit them. Required keys are documented in `env.template`; set them before running builds or Playwright specs. When adding integrations, update `next.config.js` and confirm values are mirrored in deployment tooling under `contrib/`. Monitor `turbo.json` if you introduce new tasks so artifacts remain reproducible across CI and local runs.
