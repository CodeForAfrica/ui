const defaultConfig = require("jest-config-commons-ui");

const { moduleNameMapper } = defaultConfig;

module.exports = {
  ...defaultConfig,
  moduleNameMapper: {
    ...moduleNameMapper,
    // Handle module aliases
    "^@/commons-ui/core/(.*)$": "<rootDir>/../commons-ui-core/src/$1",
    "^@/commons-ui/next/(.*)$": "<rootDir>/../commons-ui-next/src/$1",
    "^@/hurumap/core/(.*)$": "<rootDir>/src/$1",
    "^@/hurumap/next/(.*)$": "<rootDir>/../hurumap-next/src/$1",
  },
};
