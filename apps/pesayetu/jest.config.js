const defaultConfig = require("jest-config-commons-ui/next");

const { moduleNameMapper } = defaultConfig;

module.exports = {
  ...defaultConfig,
  moduleNameMapper: {
    ...moduleNameMapper,
    "^@/pesayetu/(.*)$": "<rootDir>/src/$1",
    "^@/commons-ui/core/(.*)$":
      "<rootDir>/../../packages/commons-ui-core/src/$1",
    "^@/commons-ui/next/(.*)$":
      "<rootDir>/../../packages/commons-ui-next/src/$1",
    "^@/hurumap/core/(.*)$": "<rootDir>/../../packages/hurumap-core/src/$1",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!camelcase-keys)"],
};
