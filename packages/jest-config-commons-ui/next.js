const defaultConfig = require(".");

const { moduleNameMapper, testPathIgnorePatterns } = defaultConfig;

module.exports = {
  ...defaultConfig,
  moduleNameMapper: {
    ...moduleNameMapper,

    // Handle @next/font
    "@next/font/(.*)": `<rootDir>/__mocks__/nextFontMock.js`,
    // Handle next/font
    "next/font/(.*)": `<rootDir>/__mocks__/nextFontMock.js`,
    // Disable server-only
    "server-only": `<rootDir>/__mocks__/empty.js`,
  },
  testPathIgnorePatterns: [...testPathIgnorePatterns, "<rootDir>/.next/"],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: ["next/babel"],
        plugins: ["@babel/plugin-transform-private-methods"],
      },
    ],
  },
};
