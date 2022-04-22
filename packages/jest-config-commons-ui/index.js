module.exports = {
  collectCoverageFrom: ["**/*.{js,jsx}", "!**/node_modules/**"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "jest-config-commons-ui/__mocks__/styleMock.js",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": `jest-config-commons-ui/__mocks__/fileMock.js`,
  },
  roots: ["<rootDir>"],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  snapshotResolver: "jest-config-commons-ui/snapshotResolver",
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(test).js?(x)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testURL: "http://localhost/",
  transform: {
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      { presets: ["@babel/preset-env", "@babel/preset-react"] },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
