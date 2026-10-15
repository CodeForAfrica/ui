const fs = require("node:fs");
const path = require("node:path");

const yaml = require("js-yaml");
const semver = require("semver");

const NODE_MODULES = `${path.sep}node_modules${path.sep}`;

// @commons-ui/testing-library depends on (rather than peers) its renderer,
// which must still render with the project's React.
const ALWAYS_FROM_PROJECT = new Set(["@testing-library/react"]);

const ownerByDir = new Map();
const versionByFile = new Map();
const catalogsByFile = new Map();

function packageName(request) {
  const [scopeOrName, name] = request.split("/");
  return scopeOrName.startsWith("@") ? `${scopeOrName}/${name}` : scopeOrName;
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return undefined;
  }
}

function owner(dir) {
  if (!ownerByDir.has(dir)) {
    const manifest = readJson(path.join(dir, "package.json"));
    const parent = path.dirname(dir);
    let result;
    // Skip marker manifests such as `{ "type": "module" }` in src/.
    if (manifest?.name) {
      result = { dir, manifest };
    } else if (parent !== dir) {
      result = owner(parent);
    }
    ownerByDir.set(dir, result);
  }
  return ownerByDir.get(dir);
}

// Source manifests reference pnpm catalogs (`catalog:`, `catalog:<name>`),
// which pnpm defines in pnpm-workspace.yaml. Published manifests contain the
// resolved ranges instead.
function catalogRange(spec, name, fromDir, catalogsByFile) {
  let dir = fromDir;
  while (!fs.existsSync(path.join(dir, "pnpm-workspace.yaml"))) {
    const parent = path.dirname(dir);
    if (parent === dir) {
      return undefined;
    }
    dir = parent;
  }
  const file = path.join(dir, "pnpm-workspace.yaml");
  if (!catalogsByFile.has(file)) {
    const workspace = yaml.load(fs.readFileSync(file, "utf8")) ?? {};
    catalogsByFile.set(file, {
      default: workspace.catalog ?? {},
      ...workspace.catalogs,
    });
  }
  const catalog = spec.slice("catalog:".length) || "default";
  return catalogsByFile.get(file)[catalog]?.[name];
}

function installedVersion(dir, name) {
  const file = path.join(dir, "node_modules", name, "package.json");
  if (!versionByFile.has(file)) {
    versionByFile.set(file, readJson(file)?.version);
  }
  return versionByFile.get(file);
}

// Workspace packages (e.g. @commons-ui/core) are consumed as source, but pnpm
// installs their devDependencies into their own node_modules. When a project
// uses a different React/Next major than a shared package is developed
// against, resolving from the package's directory loads a second copy of
// React, MUI, Emotion, etc. So, like a peer dependency, an import from
// workspace source outside the project resolves from the project when the
// importing package declares it as a peer and the project's version satisfies
// that range.
//
// Keep in sync with @commons-ui/next/config.js, which does the same for builds.
function shouldResolveFromProject(request, basedir, rootDir) {
  if (
    !rootDir ||
    /^[./]|^[a-z]+:/i.test(request) ||
    path.isAbsolute(request) ||
    `${basedir}${path.sep}`.startsWith(`${rootDir}${path.sep}`) ||
    `${basedir}${path.sep}`.includes(NODE_MODULES)
  ) {
    return false;
  }
  const name = packageName(request);
  const projectVersion = installedVersion(rootDir, name);
  if (!projectVersion) {
    return false;
  }
  if (ALWAYS_FROM_PROJECT.has(name)) {
    return true;
  }
  const pkg = owner(basedir);
  const declared = pkg?.manifest.peerDependencies?.[name];
  if (!declared || declared.startsWith("workspace:")) {
    return false;
  }
  const range = declared.startsWith("catalog:")
    ? catalogRange(declared, name, pkg.dir, catalogsByFile)
    : declared;
  return Boolean(range && semver.satisfies(projectVersion, range));
}

module.exports = (request, options) => {
  const { basedir, defaultResolver, rootDir } = options;
  if (shouldResolveFromProject(request, basedir, rootDir)) {
    return defaultResolver(request, { ...options, basedir: rootDir });
  }
  return defaultResolver(request, options);
};
