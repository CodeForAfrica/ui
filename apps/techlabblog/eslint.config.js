const eslintConfig = require("eslint-config-commons-ui/next");

module.exports = [
  {
    settings: {
      "import/resolver": {
        webpack: {
          config: "./eslint.webpack.config.js",
        },
        typescript: {
          alwaysTryTypes: false,
          project: "./tsconfig.json",
        },
      },
    },
  },
  ...eslintConfig,
  {
    rules: {
      "react/jsx-filename-extension": [1, { extensions: [".js", ".tsx"] }], // This rule allows JSX syntax in both .js and tsx files
      // Disable requirement for importing file extensions for js and tsx files, without this we cant import custom components in Payload
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          tsx: "never",
        },
      ],
    },
  },
];
