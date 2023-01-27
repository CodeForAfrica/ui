const path = require("path");

const PROJECT_ROOT = process.env.PROJECT_ROOT?.trim();
const outputFileTracingRoot = PROJECT_ROOT
  ? path.resolve(__dirname, PROJECT_ROOT)
  : undefined;

const ghostUrl =
  process.env.GHOST_ADMIN_URL?.trim() || process.env.GHOST_URL?.trim();
const ghostAdminUrl = new URL("/ghost", ghostUrl).toString();

module.exports = {
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",")
      ?.map((d) => d.trim())
      ?.filter((d) => d),
    unoptimized:
      process.env.NEXT_PUBLIC_IMAGE_UNOPTIMIZED?.trim()?.toLowerCase() ===
      "true",
  },
  experimental: {
    outputFileTracingRoot,
  },
  modularizeImports: {
    // NOTE: only transform @mui/material and not any of sub-modules e.g. @mui/material/styles.
    "@mui/material^": {
      transform: "@mui/material/{{member}}",
    },
  },
  output: "standalone",
  pageExtensions: ["page.js"],
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/longform/:path*",
        destination: `${ghostAdminUrl}/:path*`,
        permanent: false,
        basePath: false,
      },
    ];
  },
  transpilePackages: ["@commons-ui/core", "@commons-ui/next"],
  webpack: (config) => {
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
        use: ["@svgr/webpack"],
      },
      {
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
      }
    );
    config.experiments = { ...config.experiments, topLevelAwait: true }; // eslint-disable-line no-param-reassign
    return config;
  },
};
