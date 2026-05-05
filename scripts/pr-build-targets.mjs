#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { appendFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Policy:
// - Turbo owns workspace impact detection, including package-to-app dependents.
// - Only workspaces under apps/ can become PR build targets.
// - Only Docker-migrated apps are buildable by this workflow today.
// - Non-workspace build inputs are handled explicitly because Turbo cannot map
//   them through the workspace graph.
export const BUILD_TARGET_CONFIG = {
  techlabblog: {
    directBuildInputPaths: [
      ".github/workflows/techlabblog.yml",
      "docker/apps/techlabblog/",
    ],
  },
  trustlab: {
    directBuildInputPaths: [
      ".github/workflows/trustlab.yml",
      "docker/apps/trustlab/",
      "scripts/revalidate.mjs",
    ],
  },
};

const GLOBAL_BUILD_FILES = new Set([
  ".github/workflows/_bake-and-push.yml",
  ".github/workflows/_build-techlabblog.yml",
  ".github/workflows/_build-trustlab.yml",
  ".github/workflows/pr-build.yml",
  "scripts/pr-build-targets.mjs",
  "docker-bake.hcl",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "turbo.json",
]);

function parseArgs(argv) {
  const args = {
    base: "origin/main",
    githubOutput: false,
    head: "HEAD",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--base") {
      args.base = readOptionValue(argv, ++i, arg);
    } else if (arg === "--github-output") {
      args.githubOutput = true;
    } else if (arg === "--head") {
      args.head = readOptionValue(argv, ++i, arg);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function readOptionValue(argv, index, option) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${option}`);
  }
  return value;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });

  if (result.status !== 0) {
    throw new Error(
      [`Command failed: ${command} ${args.join(" ")}`, result.stderr.trim()]
        .filter(Boolean)
        .join("\n"),
    );
  }
  return result.stdout;
}

function writeGitHubOutputs(outputs, outputFile) {
  if (!outputFile) {
    throw new Error("GITHUB_OUTPUT is required when using --github-output");
  }

  const output = Object.entries(outputs)
    .map(([key, value]) => {
      const normalizedValue = Array.isArray(value)
        ? JSON.stringify(value)
        : String(value);
      return `${key}=${normalizedValue}`;
    })
    .join("\n");
  appendFileSync(outputFile, `${output}\n`);
}

export function changedFilesFromGit(base, head) {
  // Triple-dot matches PR semantics: files changed on head since the merge base.
  return run("git", ["diff", "--name-only", `${base}...${head}`])
    .split("\n")
    .map((file) => file.trim())
    .filter(Boolean);
}

export function hasGlobalBuildChange(changedFiles) {
  return changedFiles.some((file) => GLOBAL_BUILD_FILES.has(file));
}

export function directBuildTargets(changedFiles) {
  return changedFiles.flatMap((file) => {
    return Object.entries(BUILD_TARGET_CONFIG)
      .filter(([, config]) =>
        config.directBuildInputPaths.some((path) => matchesPath(file, path)),
      )
      .map(([app]) => app);
  });
}

function matchesPath(file, path) {
  // Paths ending in "/" match all children.
  return path.endsWith("/") ? file.startsWith(path) : file === path;
}

export function parseTurboBuildTargets(turboOutput) {
  const lines = turboOutput.split("\n");
  const jsonLineIndex = lines.findIndex((line) =>
    line.trimStart().startsWith("{"),
  );
  if (jsonLineIndex === -1) {
    throw new Error("Turbo output did not include JSON");
  }

  const data = JSON.parse(lines.slice(jsonLineIndex).join("\n"));
  const packages = data.packages?.items ?? [];
  return packages
    .filter(
      (pkg) =>
        pkg.path?.startsWith("apps/") &&
        Object.hasOwn(BUILD_TARGET_CONFIG, pkg.name),
    )
    .map((pkg) => pkg.name);
}

export function turboBuildTargets(base, head) {
  const turboOutput = run(
    "pnpm",
    ["exec", "turbo", "ls", "--affected", "--output=json"],
    {
      env: {
        ...process.env,
        TURBO_SCM_BASE: base,
        TURBO_SCM_HEAD: head,
      },
    },
  );
  return parseTurboBuildTargets(turboOutput);
}

export function buildTargets({ base, head }) {
  const changedFiles = changedFilesFromGit(base, head);
  if (hasGlobalBuildChange(changedFiles)) {
    return Object.keys(BUILD_TARGET_CONFIG).sort();
  }
  return [
    ...new Set([
      ...directBuildTargets(changedFiles),
      ...turboBuildTargets(base, head),
    ]),
  ].sort();
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const targets = buildTargets(args);
  const outputs = { targets };

  if (args.githubOutput) {
    writeGitHubOutputs(outputs, process.env.GITHUB_OUTPUT);
  }
  process.stdout.write(`${JSON.stringify(outputs)}\n`);
}

const invokedPath =
  process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (invokedPath) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
