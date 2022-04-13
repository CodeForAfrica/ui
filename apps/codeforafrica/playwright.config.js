/* eslint-disable import/no-extraneous-dependencies */
const defaultConfig = require("playwright-config-commons-ui");

const { webServer } = defaultConfig;

const config = {
  ...defaultConfig,
  webServer: {
    ...webServer,
    port: 3002,
  },
};

module.exports = config;
