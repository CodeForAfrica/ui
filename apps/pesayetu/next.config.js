const path = require("path");

const { ResolvePeersFromAppPlugin } = require("@commons-ui/next/config");

const TRACING_ROOT = process.env.TRACING_ROOT?.trim();
const outputFileTracingRoot = TRACING_ROOT
  ? path.resolve(__dirname, TRACING_ROOT)
  : undefined;

module.exports = {
  // Don't let `next dev` write Next.js agent rules into AGENTS.md; the repo
  // maintains its own agent instructions.
  agentRules: false,
  outputFileTracingRoot,
  images: {
    // No protocol, so both http and https stay allowed, as with `domains`.
    remotePatterns:
      process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",")
        .map((d) => d.trim())
        .filter(Boolean)
        .map((hostname) => ({ hostname })) ?? [],
    unoptimized:
      process.env.NEXT_PUBLIC_IMAGE_UNOPTIMIZED?.trim()?.toLowerCase() ===
      "true",
  },
  modularizeImports: {
    // NOTE: only transform @mui/material and not any of sub-modules e.g. @mui/material/styles.
    "@mui/material^": {
      transform: "@mui/material/{{member}}",
    },
  },
  output: "standalone",
  reactStrictMode: false,
  transpilePackages: [
    "@commons-ui/core",
    "@commons-ui/next",
    "@commons-ui/payload",
    "@hurumap/core",
    "@hurumap/next",
  ],
  webpack: (config) => {
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
    // Resolve shared packages' peers (React, Next, MUI, ...) from this app so
    // there's a single copy of each; see @commons-ui/next/config.js.
    config.plugins.push(new ResolvePeersFromAppPlugin({ appDir: __dirname }));
    return config;
  },
  async redirects() {
    return [
      {
        source: "/data",
        destination: "/data/documents",
        permanent: true,
      },
      {
        source: "/explore",
        destination: "/explore/ke",
        permanent: true,
      },
      {
        source: "/stories",
        destination: "/stories/news",
        permanent: true,
      },
    ];
  },
};
