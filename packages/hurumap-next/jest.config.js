const defaultConfig = require("jest-config-commons-ui/next");

const { moduleNameMapper } = defaultConfig;

module.exports = {
  ...defaultConfig,
  moduleNameMapper: {
    ...moduleNameMapper,
    // Handle module aliases
    "^@/commons-ui/core/(.*)$": "<rootDir>/../commons-ui-core/src/$1",
    "^@/commons-ui/next/(.*)$": "<rootDir>/../commons-ui-next/src/$1",
    "^@/commons-ui/payload/(.*)$": "<rootDir>/../commons-ui-payload/src/$1",
    "^@/hurumap/core/(.*)$": "<rootDir>/../hurumap-core/src/$1",
    "^@/hurumap/next/(.*)$": "<rootDir>/src/$1",
  },
};
