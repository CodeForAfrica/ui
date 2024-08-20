module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "plugin:prettier/recommended"
  ],
  settings: {
    "import/resolver": {
      webpack: {
        config: "./eslint.webpack.config.js",
      },
    },
  },
};
