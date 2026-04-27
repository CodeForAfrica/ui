const javascriptConfig = require("jest-config-commons-ui/javascript");

const { moduleNameMapper } = javascriptConfig;

module.exports = {
  ...javascriptConfig,
  moduleNameMapper: {
    ...moduleNameMapper,
    // Handle module aliases
    "^@/commons-ui/core/(.*)$": "<rootDir>/src/$1",
  },
};
