module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["eslint-config-commons-ui/next"],
  settings: {
    "import/resolver": {
      webpack: {
        config: "./eslint.webpack.config.js",
      },
      typescript: {
        alwaysTryTypes: false, // we mostly have JS thus we don't need types automatically resolved
        project: "./tsconfig.json",
      },
    },
  },
};
