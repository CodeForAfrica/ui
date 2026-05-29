# @commons-ui/payload

Depends on `@commons-ui/next` and `payload`

## Exports

The root export (`@commons-ui/payload`) includes React components (`RichText`, `LexicalRichText`) intended for browser/webpack use.

Payload CMS config files run in Node.js via the Payload CLI and must not pull in the React component chain (which imports SVGs and other browser-only dependencies that Node.js cannot handle). Use the subpath exports instead:

```js
/* eslint-disable */
import { image, richText, slug } from "@commons-ui/payload/fields";
import { appendPathname } from "@commons-ui/payload/hooks";
import { findAndFormatPagePath } from "@commons-ui/payload/utils";
```

| Subpath                      | Contents                                                            |
| ---------------------------- | ------------------------------------------------------------------- |
| `@commons-ui/payload`        | fields + hooks + utils + React components (browser/webpack only)    |
| `@commons-ui/payload/fields` | Field configs (`image`, `richText`, `slug`, `link`, `linkGroup`, …) |
| `@commons-ui/payload/hooks`  | Collection hooks (`appendPathname`, `appendPathnameToCollection`)   |
| `@commons-ui/payload/utils`  | Utilities (`findAndFormatPagePath`, `nestCollectionUnderPage`, …)   |

## Note on bundling

This package currently ships source files directly (no build step). If a bundler is added in future, the SVG and browser-only asset imports in the React component chain will be handled at build time, removing the hard requirement for subpath imports in Node.js contexts. The subpath split should still be kept: even with a clean bundle, importing the root export in a Payload CLI context loads React, MUI, and Emotion unnecessarily. The subpath exports keep `generate:types` and `generate:importmap` lean regardless of whether the package is bundled.
