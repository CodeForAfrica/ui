const { createCommandBuilder } = require("./functions");

/**
 * Factory that returns a lint-staged config scoped to the given directory.
 *
 * Each workspace passes its own __dirname so that:
 *  - file paths are made relative to the workspace
 *  - `pnpm -C <workspace>` runs eslint/oxfmt with the correct config
 *
 * @param {string} configDir - absolute path of the workspace root (pass __dirname)
 */
function createLintStagedConfig(configDir) {
  const buildCommand = createCommandBuilder(configDir);

  const buildEslintCommand = (filenames) =>
    buildCommand("eslint", "--fix --no-warn-ignored", filenames);

  const buildOxfmtCommand = (filenames) =>
    buildCommand("oxfmt", "--write --no-error-on-unmatched-pattern", filenames);

  return {
    "*.{js,mjs,cjs,jsx,json,md,mdx,ts,mts,cts,tsx}": [
      buildEslintCommand,
      buildOxfmtCommand,
    ],
    "*.{css,html,scss,yaml,yml}": [buildOxfmtCommand],
  };
}

module.exports = createLintStagedConfig;
