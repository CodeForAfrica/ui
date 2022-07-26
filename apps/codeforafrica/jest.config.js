const defaultConfig = require("jest-config-commons-ui/next");

const { moduleNameMapper } = defaultConfig;

module.exports = {
  ...defaultConfig,
  moduleNameMapper: {
    ...moduleNameMapper,
    // Handle module aliases
    "^@/codeforafrica/(.*)$": "<rootDir>/src/$1",
    globals: {
      "babel-jest": {
        isolatedModules: true,
      },
    },
  },
};
