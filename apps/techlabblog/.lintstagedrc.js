const createLintStagedConfig = require("eslint-config-commons-ui/lintstaged");
const {
  createCommandBuilder,
} = require("eslint-config-commons-ui/lintstaged/functions");

const base = createLintStagedConfig(__dirname);
const buildCommand = createCommandBuilder(__dirname);

module.exports = {
  ...base,
  "*.{mdx}": [
    (filenames) => buildCommand("eslint", "--fix --no-warn-ignored", filenames),
    (filenames) =>
      buildCommand(
        "oxfmt",
        "--write --no-error-on-unmatched-pattern",
        filenames,
      ),
  ],
};
