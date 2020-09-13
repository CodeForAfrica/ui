const withImages = require("next-images");

module.exports = withImages({
  cssLoaderOptions: {
    url: false,
  },
});
