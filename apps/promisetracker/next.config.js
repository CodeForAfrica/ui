const withImages = require("next-images");

module.exports = withImages({
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
