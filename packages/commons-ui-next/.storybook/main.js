import * as path from "path";

import defaultConfig from "storybook-config-commons-ui/main";

const { staticDirs, webpackFinal } = defaultConfig;
const config = {
  ...defaultConfig,
  staticDirs: [...staticDirs, "../../../apps/codeforafrica/public"],
  stories: ["../src/**/*.stories.js"],
  webpackFinal: async (config) => {
    config = await webpackFinal(config);
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/commons-ui/next": path.resolve(__dirname, "../src"),
    };
    return config;
  },
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
export default config;
