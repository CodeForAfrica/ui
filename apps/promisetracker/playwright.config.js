/* eslint-disable import/no-extraneous-dependencies */
const defaultConfig = require("playwright-config-commons-ui");

const { webServer } = defaultConfig;

const config = {
  ...defaultConfig,
  webServer: {
    ...webServer,
    port: 3001,
  },
};

module.exports = config;
