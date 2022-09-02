const defaultConfig = require("jest-config-commons-ui");

const { moduleNameMapper } = defaultConfig;

module.exports = {
  ...defaultConfig,
  moduleNameMapper: {
    ...moduleNameMapper,
    "^@/commons-ui/core/(.*)$":
      "<rootDir>/../../packages/commons-ui-core/src/$1",
    "^@/commons-ui/next/(.*)$":
      "<rootDir>/../../packages/commons-ui-next/src/$1",
    "^@/promisetracker/(.*)$": "<rootDir>/src/$1",
  },
};
