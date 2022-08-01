module.exports = {
  extends: ["eslint-config-commons-ui/next"],
  settings: {
    "import/resolver": {
      webpack: {
        config: "./eslint.webpack.config.js",
      },
    },
  },
};
