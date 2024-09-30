module.exports = {
  root: true,
  extends: ["eslint-config-commons-ui/next"],
  rules: {
    "react/jsx-filename-extension": [
      "warn",
      { extensions: [".js", ".jsx", "ts", ".tsx"] },
    ],
  },
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
};
