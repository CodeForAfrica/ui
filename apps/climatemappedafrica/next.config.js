const path = require("path");

const PROJECT_ROOT = process.env.PROJECT_ROOT?.trim();
const outputFileTracingRoot = PROJECT_ROOT
  ? path.resolve(__dirname, PROJECT_ROOT)
  : undefined;

module.exports = {
  outputFileTracingRoot,
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",")
      ?.map((d) => d.trim())
      ?.filter((d) => d),
    loader: "custom",
    loaderFile: "./payload.image.loader.js",
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
  reactStrictMode: false,
  staticPageGenerationTimeout: 180,
  transpilePackages: [
    "@commons-ui/core",
    "@commons-ui/next",
    "@commons-ui/payload",
    "@hurumap/core",
    "@hurumap/next",
  ],
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );
    // Since *.svg files are now handled ☝️, we can safely ignore file loader rule.
    fileLoaderRule.exclude = /\.svg$/i;
    config.experiments = { ...config.experiments, topLevelAwait: true }; // eslint-disable-line no-param-reassign
    // eslint-disable-next-line no-param-reassign
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      child_process: false,
    };
    return config;
  },
};
