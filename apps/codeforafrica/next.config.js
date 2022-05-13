const withTM = require("next-transpile-modules")([
  "@commons-ui/core",
  "@commons-ui/next",
]);

module.exports = withTM({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        "@svgr/webpack",
        {
          loader: "svg-url-loader",
          options: {},
        },
      ],
    });
    return config;
  },
});
