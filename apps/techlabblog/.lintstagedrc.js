const base = require("eslint-config-commons-ui/lintstaged")(__dirname);

module.exports = {
  // mdx is formatted by prettier but not linted by eslint (no mdx eslint plugin)
  "*.{json,md,mdx,yaml,yml}": ["prettier --write"],
  "*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}":
    base["*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"],
};
