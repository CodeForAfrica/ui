const nextPlugin = require("@next/eslint-plugin-next");

const commonConfig = require("./index");

module.exports = [
  {
    settings: {
      next: {
        rootDir: "./",
      },
    },
  },
  nextPlugin.flatConfig.recommended,
  nextPlugin.flatConfig.coreWebVitals,
  ...commonConfig,
];
