const eslintConfig = require("eslint-config-commons-ui/next");

module.exports = [
  ...eslintConfig,
  {
    settings: {
      "import/resolver": {
        webpack: {
          config: "./eslint.webpack.config.js",
        },
      },
    },
  },
];
