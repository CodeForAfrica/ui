import { dirname, join } from "path";

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

/** @type { import('@storybook/nextjs').StorybookConfig } */
const storybookConfig = {
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  staticDirs: ["../public"],
  stories: [
    "../src/components/**/*.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  webpackFinal: async (webpackConfig) => {
    /* eslint  no-param-reassign: "off" */
    webpackConfig.module = webpackConfig.module || {};
    webpackConfig.module.rules = webpackConfig.module.rules || [];

    // Exclude .svg files so that we can use @svgr/webpack below
    const imageRule = webpackConfig.module.rules.find((rule) =>
      rule?.test?.test(".svg"),
    );
    if (imageRule) {
      imageRule.exclude = /\.svg$/;
    }

    // Configure .svg files to be loaded with @svgr/webpack
    webpackConfig.module.rules.push({
      test: /\.svg$/,
      use: [
        "@svgr/webpack",
        {
          loader: "svg-url-loader",
          options: {},
        },
      ],
    });

    return webpackConfig;
  },
};

export default storybookConfig;
