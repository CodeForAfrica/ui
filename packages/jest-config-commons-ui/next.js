const defaultConfig = require(".");

const { testPathIgnorePatterns } = defaultConfig;

module.exports = {
  ...defaultConfig,
  testPathIgnorePatterns: [...testPathIgnorePatterns, "<rootDir>/.next/"],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: ["next/babel"],
        plugins: ["@babel/plugin-proposal-private-methods"],
      },
    ],
  },
};
