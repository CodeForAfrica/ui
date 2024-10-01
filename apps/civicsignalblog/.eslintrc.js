module.exports = {
  root: true,
  extends: ["eslint-config-commons-ui/next"],
  settings: {
    "import/resolver": {
      webpack: {
        config: "./eslint.webpack.config.js",
      },
      "eslint-import-resolver-custom-alias": {
        alias: {
          "#civicsignalblog": "./src",
        },
        extensions: [".js"],
      },
      typescript: {
        alwaysTryTypes: false,
        project: "./tsconfig.json",
      },
    },
  },
};
