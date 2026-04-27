const createJestConfig = require("jest-config-commons-ui/next/app");

module.exports = createJestConfig({
  moduleNameMapper: {
    "^@/trustlab/(.*)$": "<rootDir>/src/$1",
    "^@/commons-ui/core/(.*)$":
      "<rootDir>/../../packages/commons-ui-core/src/$1",
    "^@/commons-ui/next/(.*)$":
      "<rootDir>/../../packages/commons-ui-next/src/$1",
    "^@/commons-ui/payload/(.*)$":
      "<rootDir>/../../packages/commons-ui-payload/src/$1",
    "^next/font/google$": "<rootDir>/__mocks__/nextFontMock.js",
  },
  payload: true,
});
