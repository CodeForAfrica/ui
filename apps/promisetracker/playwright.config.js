/* eslint-disable import/no-extraneous-dependencies */
const defaultConfig = require("playwright-config-commons-ui");

const { use, webServer } = defaultConfig;
const PORT = 3001;
const config = {
  ...defaultConfig,
  use: {
    ...use,
    baseURL: `http://localhost:${PORT}/`,
  },
  webServer: {
    ...webServer,
    command: `npm run start -- --port ${PORT}`,
    port: PORT,
  },
};

module.exports = config;
