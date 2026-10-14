const { withSentryConfig } = require("@sentry/nextjs/config");

const nextConfig = {
  // Don't let `next dev` write Next.js agent rules into AGENTS.md; the repo
  // maintains its own agent instructions.
  agentRules: false,
  output: "standalone",
  images: {
    // No protocol, so both http and https stay allowed, as with `domains`.
    remotePatterns:
      process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",")
        .map((d) => d.trim())
        .filter(Boolean)
        .map((hostname) => ({ hostname })) ?? [],
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
});
