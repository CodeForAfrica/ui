const withTM = require("next-transpile-modules")(
  ["@commons-ui/core", "@commons-ui/next"],
  {
    debug: /(^|\s)+--inspect(\s|$)+/.test(process.env.NODE_OPTIONS),
  }
);

module.exports = withTM({
  pageExtensions: ["page.js"],
  reactStrictMode: true,
});
