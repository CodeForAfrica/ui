const withTM = require("next-transpile-modules")([
  "@commons-ui/core",
  "@commons-ui/next",
]);

module.exports = withTM({
  pageExtensions: ["page.js"],
  reactStrictMode: true,
});
