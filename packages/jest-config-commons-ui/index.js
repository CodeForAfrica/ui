const { createTransformIgnorePatterns } = require("./shared");

module.exports = {
  collectCoverage: false,
  coverageProvider: "v8",
  moduleNameMapper: {
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
  snapshotResolver: "jest-config-commons-ui/snapshotResolver",
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost/",
  },
  workerIdleMemoryLimit: "512MB",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  transformIgnorePatterns: createTransformIgnorePatterns(),
};
