const createJestConfig = require("jest-config-commons-ui/next/library");

module.exports = createJestConfig({
  moduleNameMapper: {
    // Handle module aliases
    "^@/commons-ui/core/(.*)$": "<rootDir>/../commons-ui-core/src/$1",
    "^@/commons-ui/next/(.*)$": "<rootDir>/src/$1",
  },
});
