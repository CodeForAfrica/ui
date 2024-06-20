const path = require("path");
const uiLintStaged = require("eslint-config-commons-ui/.lintstagedrc");

const { "*.js": js, ...commonLintStaged } = uiLintStaged;

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  ...commonLintStaged,
  "*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}": [buildEslintCommand],
};
