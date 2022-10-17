module.exports = {
  root: true,
  extends: ["eslint-config-commons-ui/next"],
  settings: {
    "import/resolver": {
      webpack: {
        config: "./eslint.webpack.config.js",
      },
    },
  },
};
