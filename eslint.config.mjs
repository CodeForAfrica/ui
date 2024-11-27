const eslintConfig = require("eslint-config-commons-ui/next");

export default [
  {
    settings: {
      next: {
        rootDir: "apps/*/",
      },
    },
  },
  ...eslintConfig,
];
