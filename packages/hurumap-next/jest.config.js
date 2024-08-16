const defaultConfig = require("jest-config-commons-ui/next");

const { moduleNameMapper } = defaultConfig;

module.exports = {
  ...defaultConfig,
  moduleNameMapper: {
    ...moduleNameMapper,
    // Handle module aliases
    "^@/hurumap/next/(.*)$": "<rootDir>/src/$1",
    "^@/commons-ui/next/(.*)$": "<rootDir>/../commons-ui-next/src/$1",
  },
};
