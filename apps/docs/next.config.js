const withTM = require("next-transpile-modules")(["ui", "commons-ui-core"]);

module.exports = withTM({
  reactStrictMode: true,
});
