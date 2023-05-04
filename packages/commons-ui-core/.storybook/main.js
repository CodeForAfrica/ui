import * as path from "path";
// const path = require("path");

import defaultConfig from "storybook-config-commons-ui/main";
// const defaultConfig = require("storybook-config-commons-ui/main");

const { webpackFinal } = defaultConfig;
const config = {
  ...defaultConfig,
  docs: {
    autodocs: false,
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  stories: ["../src/**/*.stories.js"],
  webpackFinal: async (config) => {
    config = await webpackFinal(config);
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/commons-ui/core": path.resolve(__dirname, "../src"),
    };
    return config;
  },
};
export default config;
