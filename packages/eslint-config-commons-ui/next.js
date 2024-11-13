const commonConfig = require("./index");
const { FlatCompat } = require("@eslint/eslintrc");
const { fixupConfigRules } = require("@eslint/compat");

const flatCompat = new FlatCompat();

module.exports = [
  ...fixupConfigRules(flatCompat.extends("plugin:@next/next/core-web-vitals")),
  ...commonConfig,
];
