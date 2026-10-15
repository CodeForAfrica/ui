const path = require("node:path");

const { createTransformIgnorePatterns } = require("./shared");

// `JEST_REACT=19` runs a project's tests against React 19 instead of the
// project's React, so shared packages developed against React 18 are also
// tested on the React 19 that some of their consumers use. React 19 comes from
// this package's devDependencies, so this only works inside the monorepo.
function createReactModuleNameMapper() {
  if (process.env.JEST_REACT !== "19") {
    return {};
  }
  const packageDir = (name) =>
    path.dirname(require.resolve(`${name}/package.json`));
  return {
    "^react$": packageDir("react"),
    "^react/(.*)$": `${packageDir("react")}/$1`,
    "^react-dom$": packageDir("react-dom"),
    "^react-dom/(.*)$": `${packageDir("react-dom")}/$1`,
  };
}

module.exports = {
  collectCoverage: false,
  coverageProvider: "v8",
  moduleNameMapper: {
    ...createReactModuleNameMapper(),

    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "jest-config-commons-ui/__mocks__/styleMock.js",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    // NOTE: Normal image imports and svg?url should return url string
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg\\?url)$":
      "jest-config-commons-ui/__mocks__/fileMock.js",
    //       svg import should return React.element
    "^.+\\.svg$": "jest-config-commons-ui/__mocks__/elementMock.js",
  },
  roots: ["<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  resolver: require.resolve("./resolver"),
  snapshotResolver: "jest-config-commons-ui/snapshotResolver",
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost/",
  },
  workerIdleMemoryLimit: "512MB",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  transformIgnorePatterns: createTransformIgnorePatterns(),
};
