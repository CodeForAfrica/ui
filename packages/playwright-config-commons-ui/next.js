const defaultConfig = require(".");

module.exports = {
  ...defaultConfig,
  testPathIgnorePatterns: ["<rootDir>/.next/"],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
};
