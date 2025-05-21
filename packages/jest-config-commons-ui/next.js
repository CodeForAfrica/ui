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
  transformIgnorePatterns: [
    ...defaultConfig.transformIgnorePatterns,
    "<rootDir>/node_modules/@payloadcms/richtext-lexical/react",
  ],
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        sourceType: "unambiguous",
        targets: { node: process.versions.node },
        // Can't use presets: ["next/babel"] here
        // https://github.com/babel/babel/issues/16798#issuecomment-2326220768
        // In short, next/babel is bundling old versions of babel that don't have the
        // import assertions/attributes fix.
        // 🤞🏽 this will be sorted in the next.js release
        presets: [
          "@babel/preset-env",
          // or runtime: 'classic', depending on which one you are using
          ["@babel/preset-react", { development: true, runtime: "automatic" }],
        ],
        plugins: ["@babel/plugin-transform-private-methods"],
      },
    ],
  },
};
