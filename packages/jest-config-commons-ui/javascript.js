const baseConfig = require(".");

module.exports = {
  ...baseConfig,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/__mocks__/**",
    "!src/**/*.stories.{js,jsx}",
  ],
  moduleFileExtensions: ["js", "jsx", "mjs", "cjs", "json", "node"],
  testMatch: ["**/?(*.)+(test).js?(x)"],
  transform: {
    "^.+\\.[cm]?jsx?$": [
      "babel-jest",
      {
        presets: [
          require.resolve("@babel/preset-env"),
          require.resolve("@babel/preset-react"),
        ],
      },
    ],
  },
};
