/**
 * @jest-environment node
 */
// The peer-resolution rule is implemented twice: for webpack in
// @commons-ui/next/config.js and for Jest in jest-config-commons-ui/resolver.
// Both must agree, so every case runs against both.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import jestResolver from "jest-config-commons-ui/resolver";

import { createPeerResolver } from "../config";

function writePackage(dir, manifest) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(manifest));
}

function install(dir, name, version) {
  writePackage(path.join(dir, "node_modules", name), { name, version });
}

// it.each tables are built when tests are collected, so create the fixture
// tree up front rather than in beforeAll.
const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "peers-")));
fs.writeFileSync(
  path.join(root, "pnpm-workspace.yaml"),
  [
    "catalog:",
    '  "@mui/material": ^6.4.0',
    "catalogs:",
    "  payload-v3:",
    "    payload: ^3.90.2",
    "  shared-peers:",
    "    next: ^15.5.0 || ^16.0.0",
    "    react: ^18.3.0 || ^19.0.0",
  ].join("\n"),
);
const app = path.join(root, "apps", "app");
writePackage(app, { name: "app" });
install(app, "react", "19.3.0");
install(app, "@mui/material", "6.5.0");
install(app, "payload", "2.32.3");
install(app, "clsx", "2.1.1");
install(app, "@testing-library/react", "16.3.2");
install(app, "@emotion/react", "11.14.0");
install(app, "react-dom", "19.3.0");
fs.mkdirSync(path.join(app, "src"));

const appWithOldReact = path.join(root, "apps", "old");
writePackage(appWithOldReact, { name: "old" });
install(appWithOldReact, "react", "17.0.2");

const shared = path.join(root, "packages", "shared");
writePackage(shared, {
  name: "@test/shared",
  peerDependencies: {
    "@emotion/react": "catalog:",
    "@mui/material": "catalog:",
    "@test/other": "workspace:*",
    next: "catalog:shared-peers",
    payload: "catalog:payload-v3",
    react: "catalog:shared-peers",
    "react-dom": "^18.3.0 || ^19.0.0",
  },
});
// A marker manifest without a name must not hide the package's peers.
writePackage(path.join(shared, "src"), { type: "module" });
const source = path.join(shared, "src", "Component");
fs.mkdirSync(source);

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

// [description, request, context, appDir, resolves from app?, only for]
const cases = [
  ["catalog peer in range", "react", source, app, true],
  ["peer subpath", "react/jsx-runtime", source, app, true],
  ["default catalog peer in range", "@mui/material/styles", source, app, true],
  ["catalog peer out of range", "payload/shared", source, app, false],
  ["peer missing from its catalog", "@emotion/react", source, app, false],
  ["explicit range peer", "react-dom", source, app, true],
  ["peer the app lacks", "next/link", source, app, false],
  ["not a peer", "clsx", source, app, false],
  ["workspace peer", "@test/other", source, app, false],
  ["relative import", "./Local", source, app, false],
  ["node built-in", "node:fs", source, app, false],
  ["import from the app", "react", path.join(app, "src"), app, false],
  [
    "import from node_modules",
    "react",
    path.join(shared, "node_modules", "x"),
    app,
    false,
  ],
  ["app version out of range", "react", source, appWithOldReact, false],
  [
    "inline-loader resource",
    "__barrel_optimize__?names=Box!=!@mui/material",
    source,
    app,
    true,
    "webpack",
  ],
  ["resource query", "react?query", source, app, true, "webpack"],
  [
    "testing-library renderer",
    "@testing-library/react",
    source,
    app,
    false,
    "webpack",
  ],
  [
    "testing-library renderer",
    "@testing-library/react",
    source,
    app,
    true,
    "jest",
  ],
];

describe("createPeerResolver (webpack)", () => {
  it.each(cases.filter((c) => c[5] !== "jest"))(
    "%s: %s",
    (_, request, context, appDir, expected) => {
      const shouldResolveFromApp = createPeerResolver({ appDir });
      expect(shouldResolveFromApp(request, context)).toBe(expected);
    },
  );
});

describe("jest-config-commons-ui resolver", () => {
  it.each(cases.filter((c) => c[5] !== "webpack"))(
    "%s: %s",
    (_, request, context, appDir, expected) => {
      const resolvedFrom = jestResolver(request, {
        basedir: context,
        rootDir: appDir,
        defaultResolver: (_request, options) => options.basedir,
      });
      expect(resolvedFrom).toBe(expected ? appDir : context);
    },
  );
});
