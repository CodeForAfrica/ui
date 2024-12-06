const eslintConfig = require("eslint-config-commons-ui/next");

module.exports = [
  {
    settings: {
      "import/resolver": {
        webpack: {
          config: "./eslint.webpack.config.js",
        },
      },
    },
  },
  ...eslintConfig,
];
