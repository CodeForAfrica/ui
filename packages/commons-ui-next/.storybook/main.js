const path = require("path");
const defaultConfig = require("config/storybook/main");

const { webpackFinal } = defaultConfig;

module.exports = {
  ...defaultConfig,
  webpackFinal: async (config) => {
    config = await webpackFinal(config);
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/commons-ui/core": path.resolve(__dirname, "../../commons-ui-core/src"),
      "@/commons-ui/next": path.resolve(__dirname, "../src"),
    };

    return config;
  },
};
