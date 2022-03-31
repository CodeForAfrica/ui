const withTM = require("next-transpile-modules")([
  "@commons-ui/core",
  "@commons-ui/next",
]);

module.exports = withTM({
  reactStrictMode: true,
});
