const { fixupConfigRules } = require("@eslint/compat");
const { FlatCompat } = require("@eslint/eslintrc");

const commonConfig = require("./index");

const flatCompat = new FlatCompat();

module.exports = [
  ...fixupConfigRules(flatCompat.extends("plugin:@next/next/core-web-vitals")),
  ...commonConfig,
];
