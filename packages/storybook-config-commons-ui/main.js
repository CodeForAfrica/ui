module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../**/*.stories.js"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  staticDirs: ["../public"],
  previewHead: (head) => `
    ${head}
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
  `,
  features: {
    emotionAlias: false,
  },
  webpackFinal: async (config) => {
    // Need to remove default svg-url-loader first
    // See: https://github.com/webpack/webpack/issues/595
    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module.rules.map((data) => {
      const regex = data.test && data.test.toString();
      if (/svg\|/.test(regex)) {
        // eslint-disable-next-line no-param-reassign
        data.test =
          /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;
      }

      return data;
    });
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
