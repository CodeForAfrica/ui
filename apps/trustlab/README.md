TrustLab is a platform to equip frontline human rights defenders with the technical tools + expertise to protect themselves & proactively disrupt online threats to Kenyan citizens.

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Payload CMS

### Generating types and import map

```bash
pnpm generate:types
pnpm generate:importmap
pnpm generate:all   # both
```

Both scripts point at `payload.config.mjs` via `PAYLOAD_CONFIG_PATH`. The `.mjs` extension is intentional: it is always treated as ESM by both Node.js (and tsx, which Payload CLI uses internally) and by Next.js/webpack — no custom webpack loader rules are needed. A plain `.ts` extension would be loaded as CJS by tsx (since the app root has no `"type":"module"`), which breaks `@/trustlab/*` path alias resolution during `generate:types`.

### `src/payload/package.json` and `src/utils/package.json`

These files contain `{"type":"module"}` and must not be removed. They tell Node.js to treat `.js` files in those directories as native ESM so that Node.js's static named-export analyzer (`cjs-module-lexer`) can detect exports in collection and utility files. Without them, `generate:types` fails with `'X' is not exported` errors.

The scope is intentionally limited to `src/payload/` and `src/utils/`. Setting `"type":"module"` at the app root breaks the Next.js build: webpack 5 treats all `.js` files under the root as strict package-ESM, which removes the CJS interop wrapper on `import Document from 'next/document'` in `src/pages/_document.page.js`, causing a `Class extends value #<Object>` runtime error when collecting page data.
