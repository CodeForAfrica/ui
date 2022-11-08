const path = require("path");
const defaultConfig = require("storybook-config-commons-ui/main");

const { addons, staticDirs, webpackFinal } = defaultConfig;

module.exports = {
  ...defaultConfig,
  addons: [...addons, "storybook-addon-next-router"],
  staticDirs: [...staticDirs, "../../../apps/codeforafrica/public"],
  webpackFinal: async (config) => {
    config = await webpackFinal(config);
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/commons-ui/next": path.resolve(__dirname, "../src"),
    };

    return config;
  },
};
