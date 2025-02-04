const path = require("path");

const { withSentryConfig } = require("@sentry/nextjs");

const PROJECT_ROOT = process.env.PROJECT_ROOT?.trim();
const outputFileTracingRoot = PROJECT_ROOT
  ? path.resolve(__dirname, PROJECT_ROOT)
  : undefined;

const moduleExports = {
  experimental: outputFileTracingRoot && {
    outputFileTracingRoot,
  },
  i18n: {
    locales: process.env.NEXT_PUBLIC_I18N_LOCALES?.split(",")
      ?.map((d) => d.trim())
      ?.filter((d) => d) || ["en"],
    defaultLocale: process.env.NEXT_PUBLIC_I18N_DEFAULT_LOCALE?.trim() || "en",
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
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/about/project",
        permanent: true,
      },
    ];
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
  hideSourceMaps: true,
  org: process.env.SENTRY_ORG,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  project: process.env.SENTRY_PROJECT,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
