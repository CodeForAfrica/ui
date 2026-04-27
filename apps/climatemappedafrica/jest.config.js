const createJestConfig = require("jest-config-commons-ui/next/app");

module.exports = createJestConfig({
  moduleNameMapper: {
    "^@/climatemappedafrica/(.*)$": "<rootDir>/src/$1",
    "^@/commons-ui/core/(.*)$":
      "<rootDir>/../../packages/commons-ui-core/src/$1",
    "^@/commons-ui/next/(.*)$":
      "<rootDir>/../../packages/commons-ui-next/src/$1",
    "^@/commons-ui/payload/(.*)$":
      "<rootDir>/../../packages/commons-ui-payload/src/$1",
    "^@/hurumap/core/(.*)$": "<rootDir>/../../packages/hurumap-core/src/$1",
    "^@/hurumap/next/(.*)$": "<rootDir>/../../packages/hurumap-next/src/$1",
  },
  payload: true,
  transpilePackages: ["camelcase-keys", "d3-format"],
});
