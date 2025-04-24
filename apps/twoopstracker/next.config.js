const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  output: "standalone",
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",")
      ?.filter((d) => d.trim())
      ?.map((d) => d.trim()),
  },
  reactStrictMode: true,
  webpack: function webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: [
          "@svgr/webpack",
          {
            loader: "svg-url-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        // options: { mode: ["html"] },
      },
    );
    return config;
  },
};

module.exports = withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  hideSourceMaps: true,
});
