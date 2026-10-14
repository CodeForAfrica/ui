#!/usr/bin/env node
// Fails if a Next.js app bundles more than one copy of a package that must be
// a singleton (React, Next, MUI, Emotion). Duplicates come back silently when
// a shared @commons-ui/* package imports one of these without declaring it as
// a peer (see AGENTS.md); with Emotion or MUI the theme is then lost without
// any error.
//
// Reads the reports ResolvePeersFromAppPlugin (@commons-ui/next/config.js)
// writes to .next/bundle-packages/ when a build runs with
// CHECK_BUNDLE_SINGLETONS=1. pnpm installs every copy of a package, including
// each peer variant, in its own .pnpm directory, so more than one directory
// per package means more than one instance.
//
// Usage: node scripts/check-bundle-singletons.mjs [app-dir ...]
// Without arguments, checks every apps/*/ whose next.config uses the plugin.

import { existsSync, readdirSync, readFileSync, realpathSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const SINGLETONS = [
  "react",
  "react-dom",
  "next",
  "@mui/material",
  "@mui/system",
  "@mui/styled-engine",
  "@emotion/react",
  "@emotion/styled",
  "@emotion/cache",
];

// Merges every compilation's report (client, server, edge): the server and
// the browser must render with the same copy too.
export function findDuplicates(appDir) {
  const reportDir = join(appDir, ".next", "bundle-packages");
  if (!existsSync(reportDir)) return undefined;
  const copies = new Map(SINGLETONS.map((name) => [name, new Set()]));
  for (const file of readdirSync(reportDir)) {
    const report = JSON.parse(readFileSync(join(reportDir, file), "utf8"));
    for (const name of SINGLETONS) {
      for (const dir of report[name] ?? []) copies.get(name).add(dir);
    }
  }
  return [...copies].filter(([, dirs]) => dirs.size > 1);
}

function appsUsingPlugin() {
  return readdirSync("apps", { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join("apps", entry.name))
    .filter((dir) =>
      readdirSync(dir).some(
        (file) =>
          file.startsWith("next.config.") &&
          readFileSync(join(dir, file), "utf8").includes(
            "ResolvePeersFromAppPlugin",
          ),
      ),
    );
}

function main(args) {
  let failed = false;
  for (const dir of args.length ? args : appsUsingPlugin()) {
    const duplicates = findDuplicates(dir);
    if (!duplicates) {
      failed = true;
      console.error(
        `✗ ${dir}: no .next/bundle-packages report; build it with CHECK_BUNDLE_SINGLETONS=1`,
      );
    } else if (duplicates.length) {
      failed = true;
      console.error(`✗ ${dir}: more than one copy of`);
      for (const [name, dirs] of duplicates) {
        console.error(
          `    ${name}:\n      ${[...dirs].sort().join("\n      ")}`,
        );
      }
    } else {
      console.log(`✓ ${dir}`);
    }
  }
  return failed ? 1 : 0;
}

// import.meta.url is the real path, percent-encoded.
if (import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  process.exitCode = main(process.argv.slice(2));
}
