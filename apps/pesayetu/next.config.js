const withTM = require("next-transpile-modules")([
  "ui",
  "@commons-ui/core",
  "@commons-ui/next",
]);

module.exports = withTM({
  reactStrictMode: true,
});
