const eslintConfig = require("eslint-config-commons-ui/next");

module.exports = [
  ...eslintConfig,
  {
    rules: {
      // @hurumap/next is a reusable package; we don't intend to have pages
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];
