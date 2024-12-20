module.exports = {
  root: true,
  extends: ["eslint-config-commons-ui/next"],
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
