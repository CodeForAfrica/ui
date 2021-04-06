const withImages = require("next-images");

module.exports = withImages({
  future: {
    webpack5: true,
  },
  i18n: {
    locales: ["am", "ar", "en", "fr"],
    defaultLocale: "en",
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
});
