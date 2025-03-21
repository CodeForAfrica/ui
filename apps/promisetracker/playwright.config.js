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
    command: `PORT=${PORT} node .next/standalone/apps/promisetracker/server.js`,
    port: PORT,
  },
};

module.exports = config;
