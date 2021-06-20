const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  eslint: {
    dirs: ["src"],
  },
  i18n: {
    locales: ["am", "ar", "en", "fr"],
    defaultLocale: "en",
  },
  images: {
    domains: (process.env.IMAGE_DOMAINS || "dashboard.hurumap.org").split(","),
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

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
