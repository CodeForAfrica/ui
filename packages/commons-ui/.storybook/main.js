const path = require("path");

module.exports = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-material-ui5",
    {
      name: "storybook-addon-turbo-build",
      options: {
        // Please refer below tables for available options
        optimizationLevel: 2,
      },
    },
  ],
  stories: ["../**/*.stories.js"],
  webpackFinal: async (config) => {
    // Need to remove default svg-url-loader first
    // See: https://github.com/webpack/webpack/issues/595
    config.module.rules = config.module.rules.map((data) => {
      const regex = data.test && data.test.toString();
      if (/svg\|/.test(regex)) {
        data.test =
          /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;
      }

      return data;
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        "@svgr/webpack",
        {
          loader: "svg-url-loader",
        },
      ],
    });

    return config;
  },
};
