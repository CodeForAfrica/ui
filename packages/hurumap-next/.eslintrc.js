module.exports = {
  root: true,
  extends: ["eslint-config-commons-ui/next"],
  rules: {
    // @hurumap/next is a reusable package; we don't intend to have pages
    "@next/next/no-html-link-for-pages": "off",
  },
};
