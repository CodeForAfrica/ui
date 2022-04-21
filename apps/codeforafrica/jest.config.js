const defaultConfig = require("jest-config-commons-ui");

const { moduleNameMapper } = defaultConfig;

module.exports = {
  ...defaultConfig,
  moduleNameMapper: {
    ...moduleNameMapper,
    // Handle module aliases
    "^@/codeforafrica/(.*)$": "<rootDir>/src/$1",
  },
};
