const javascriptConfig = require("jest-config-commons-ui/javascript");

const { moduleNameMapper } = javascriptConfig;

module.exports = {
  ...javascriptConfig,
  moduleNameMapper: {
    ...moduleNameMapper,
    // Handle module aliases
    "^@/commons-ui/core/(.*)$": "<rootDir>/../commons-ui-core/src/$1",
    "^@/commons-ui/next/(.*)$": "<rootDir>/../commons-ui-next/src/$1",
    "^@/commons-ui/payload/(.*)$": "<rootDir>/src/$1",
    // Jest 30's resolver can fail on Payload's package metadata.
    "^payload$": "<rootDir>/node_modules/payload/dist/index.js",
  },
};
