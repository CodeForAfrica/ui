const path = require("path");

const withTM = require("next-transpile-modules")(
  ["@commons-ui/core", "@commons-ui/next"],
  {
    debug: /(^|\s)+--inspect(\s|$)+/.test(process.env.NODE_OPTIONS),
  }
);

const PROJECT_ROOT = process.env.PROJECT_ROOT?.trim();
const outputFileTracingRoot = PROJECT_ROOT
  ? path.resolve(__dirname, PROJECT_ROOT)
  : undefined;

module.exports = withTM({
  experimental: {
    outputFileTracingRoot,
  },
  i18n: {
    locales: ["en", "fr", "pt"],
    defaultLocale: "en",
  },
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",")
      ?.map((d) => d.trim())
      ?.filter((d) => d),
    unoptimized:
      process.env.NEXT_PUBLIC_IMAGE_UNOPTIMIZED?.trim()?.toLowerCase() ===
      "true",
  },
  output: "standalone",
  pageExtensions: ["page.js"],
  reactStrictMode: true,
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
});
