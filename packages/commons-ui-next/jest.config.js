const defaultConfig = require("jest-config-commons-ui/next");

const { moduleNameMapper } = defaultConfig;

module.exports = {
  ...defaultConfig,
  moduleNameMapper: {
    ...moduleNameMapper,
    // Handle module aliases
    "^@/commons-ui/next/(.*)$": "<rootDir>/src/$1",
  },
};
