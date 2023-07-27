const path = require("path");

const { withSentryConfig } = require("@sentry/nextjs");

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

const nextConfig = {
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
  async redirects() {
    return [
      {
        source: "/knowledge",
        destination: "/knowledge/explainers",
        permanent: true,
      },
      {
        source: "/opportunities/events",
        destination: "/opportunities#events",
        permanent: true,
      },
      {
        source: "/opportunities/grants-fellowships",
        destination: "/opportunities#grants-fellowships",
        permanent: true,
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
    );

    return config;
  },
  sentry: {
    // See the 'Configure Source Maps' and 'Configure Legacy Browser Support'
    // sections below for information on the following options:
    //   - disableServerWebpackPlugin
    //   - disableClientWebpackPlugin
    //   - hideSourceMaps
    //   - widenClientFileUpload
    //   - transpileClientSDK
    hideSourceMaps: false,
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
