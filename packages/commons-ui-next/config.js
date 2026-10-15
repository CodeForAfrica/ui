const fs = require("node:fs");
const path = require("node:path");

const yaml = require("js-yaml");
const semver = require("semver");

const PLUGIN_NAME = "ResolvePeersFromAppPlugin";
const NODE_MODULES = `${path.sep}node_modules${path.sep}`;
// `.pnpm/<dir>/node_modules/<name>/`, a package's own pnpm directory.
const PNPM_PACKAGE =
  /[/\\]\.pnpm[/\\]([^/\\]+)[/\\]node_modules[/\\]((?:@[^/\\]+[/\\])?[^/\\]+)[/\\]/;

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

function isInside(dir, parent) {
  return `${dir}${path.sep}`.startsWith(`${parent}${path.sep}`);
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

/**
 * Workspace packages (e.g. @commons-ui/core) are compiled from source, but
 * pnpm installs their devDependencies (React, Next, MUI, ...) into their own
 * node_modules. When an app uses a different major than a shared package is
 * developed against, resolving from the package's directory bundles a second
 * copy of React, Next, MUI, Emotion, etc.
 *
 * This returns a function that decides, for a bare import made from workspace
 * source outside `appDir`, whether to resolve it from the app instead. It does
 * so exactly when a peer dependency would: the importing package declares the
 * import as a peer and the app's installed version satisfies that peer range.
 * Everything else keeps resolving from the package itself.
 *
 * Keep in sync with jest-config-commons-ui/resolver.js.
 */
function createPeerResolver({ appDir }) {
  const app = fs.realpathSync(appDir);
  const ownerByDir = new Map();
  const versionByFile = new Map();
  const catalogsByFile = new Map();

  const owner = (dir) => {
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
  };
  const installedVersion = (dir, name) => {
    const file = path.join(dir, "node_modules", name, "package.json");
    if (!versionByFile.has(file)) {
      versionByFile.set(file, readJson(file)?.version);
    }
    return versionByFile.get(file);
  };

  return function shouldResolveFromApp(rawRequest, context) {
    // Judge inline-loader requests by their resource, e.g. Next's barrel
    // optimisation rewrites `@mui/material` imports into
    // `__barrel_optimize__?names=Box!=!@mui/material`.
    const request = rawRequest?.split("!").pop().split("?")[0];
    if (
      !request ||
      !context ||
      /^[./]|^[a-z]+:/i.test(request) ||
      isInside(context, app) ||
      `${context}${path.sep}`.includes(NODE_MODULES)
    ) {
      return false;
    }
    const pkg = owner(context);
    const name = packageName(request);
    const declared = pkg?.manifest.peerDependencies?.[name];
    if (!declared || declared.startsWith("workspace:")) {
      return false;
    }
    const range = declared.startsWith("catalog:")
      ? catalogRange(declared, name, pkg.dir, catalogsByFile)
      : declared;
    const appVersion = installedVersion(app, name);
    return Boolean(range && appVersion && semver.satisfies(appVersion, range));
  };
}

/**
 * Webpack plugin applying `createPeerResolver` to every module request, e.g.
 * in next.config: `config.plugins.push(new ResolvePeersFromAppPlugin({ appDir: __dirname }))`.
 * It only changes the directory a request is resolved from, so Next's own
 * aliases (e.g. App Router's vendored React) and package `exports` still apply.
 */
class ResolvePeersFromAppPlugin {
  constructor({ appDir }) {
    this.appDir = fs.realpathSync(appDir);
    this.shouldResolveFromApp = createPeerResolver({ appDir });
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(PLUGIN_NAME, (factory) => {
      factory.hooks.beforeResolve.tap(PLUGIN_NAME, (resolveData) => {
        if (
          this.shouldResolveFromApp(resolveData.request, resolveData.context)
        ) {
          resolveData.context = this.appDir;
        }
      });
    });
    if (process.env.CHECK_BUNDLE_SINGLETONS) {
      compiler.hooks.done.tap(PLUGIN_NAME, (stats) =>
        this.reportBundledPackages(compiler, stats),
      );
    }
  }

  // Writes the pnpm package directories each compilation bundled to
  // .next/bundle-packages/, for scripts/check-bundle-singletons.mjs. Bundled
  // module paths only exist in webpack's module graph, not in the output.
  reportBundledPackages(compiler, stats) {
    const packages = {};
    for (const bundled of stats.compilation.modules) {
      // A ConcatenatedModule has no resource; its inner modules do.
      for (const { resource } of bundled.modules ?? [bundled]) {
        const match = PNPM_PACKAGE.exec(resource ?? "");
        if (match) {
          const [, dir, name] = match;
          packages[name] ??= new Set();
          packages[name].add(dir);
        }
      }
    }
    const reportDir = path.join(this.appDir, ".next", "bundle-packages");
    const toJson = (_, value) => (value instanceof Set ? [...value] : value);
    fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(
      path.join(reportDir, `${compiler.name ?? "default"}.json`),
      `${JSON.stringify(packages, toJson, 2)}\n`,
    );
  }
}

module.exports = { ResolvePeersFromAppPlugin, createPeerResolver };
