module.exports = {
  root: true,
  extends: ["eslint-config-commons-ui/next"],
  rules: {
    "react/jsx-filename-extension": [
      "warn",
      { extensions: [".jsx", ".tsx", "ts", ".tsx"] },
    ],
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: "./eslint.webpack.config.js",
      },
    },
  },
};
