const createJestConfig = require("jest-config-commons-ui/next/app");

module.exports = createJestConfig({
  moduleNameMapper: {
    "^@/codeforafrica/(.*)$": "<rootDir>/src/$1",
    "^@/commons-ui/core/(.*)$":
      "<rootDir>/../../packages/commons-ui-core/src/$1",
    "^@/commons-ui/next/(.*)$":
      "<rootDir>/../../packages/commons-ui-next/src/$1",
  },
  payload: true,
  transpilePackages: ["camelcase-keys"],
});
