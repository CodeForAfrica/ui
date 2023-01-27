const path = require("path");

const PROJECT_ROOT = process.env.PROJECT_ROOT?.trim();
const outputFileTracingRoot = PROJECT_ROOT
  ? path.resolve(__dirname, PROJECT_ROOT)
  : undefined;

const locales = (
  process.env.NEXT_PUBLIC_LOCALES || process.env.PAYLOAD_PUBLIC_LOCALES
)
  ?.split(",")
  ?.map((l) => l.trim())
  .filter(Boolean);
const defaultLocale =
  (
    process.env.NEXT_PUBLIC_DEFAULT_LOCALE ||
    process.env.PAYLOAD_PUBLIC_DEFAULT_LOCALE
  )?.trim() || locales?.[0];

module.exports = {
  experimental: {
    outputFileTracingRoot,
  },
  ...(locales?.length
    ? {
        i18n: {
          locales,
          defaultLocale,
        },
      }
    : undefined),
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",")
      ?.map((d) => d.trim())
      ?.filter((d) => d),
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
  pageExtensions: ["page.js"],
  reactStrictMode: true,
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
      }
    );

    return config;
  },
};
