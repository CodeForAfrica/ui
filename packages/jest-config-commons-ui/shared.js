const path = require("node:path");

const DEFAULT_TRANSPILED_PACKAGES = [
  "@commons-ui/core",
  "@commons-ui/next",
  "@commons-ui/payload",
  "@hurumap/core",
  "@hurumap/next",
  "@payloadcms",
  "payload",
];

function escapeRegExp(value) {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

function toPnpmPackagePattern(packageName) {
  if (packageName.startsWith("@") && !packageName.includes("/")) {
    return `${escapeRegExp(packageName)}\\+[^@]+`;
  }
  return escapeRegExp(packageName).replaceAll("/", "\\+");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function createTransformIgnorePatterns(transpiledPackages = []) {
  const packages = unique([
    ...DEFAULT_TRANSPILED_PACKAGES,
    ...transpiledPackages,
  ]);
  const nodeModulesPattern = `(?:${packages.map(escapeRegExp).join("|")})`;
  const pnpmPattern = packages.map(toPnpmPackagePattern).join("|");
  const repoRoot = path.join(__dirname, "../..").replace(/\\/g, "/");

  return [
    `<rootDir>/node_modules/.pnpm/(?!(${pnpmPattern})@)`,
    `${repoRoot}/node_modules/.pnpm/(?!(${pnpmPattern})@)`,
    `node_modules/(?!\\.pnpm|${nodeModulesPattern}(?:/|$))`,
    "^.+\\.module\\.(css|sass|scss)$",
  ];
}

module.exports = {
  DEFAULT_TRANSPILED_PACKAGES,
  createTransformIgnorePatterns,
};
