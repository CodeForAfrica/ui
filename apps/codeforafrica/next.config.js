const withTM = require("next-transpile-modules")(
  ["@commons-ui/core", "@commons-ui/next"],
  {
    debug: /(^|\s)+--inspect(\s|$)+/.test(process.env.NODE_OPTIONS),
  }
);

module.exports = withTM({
  pageExtensions: ["page.js"],
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: [
          "@svgr/webpack",
          {
            loader: "svg-url-loader",
            options: {},
          },
        ],
      }
    );
    return config;
  },
});
