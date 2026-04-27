const baseConfig = require(".");

module.exports = {
  ...baseConfig,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__mocks__/**",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
  ],
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "mjs",
    "cjs",
    "mts",
    "cts",
    "json",
    "node",
  ],
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
  transform: {
    "^.+\\.[cm]?[jt]sx?$": [
      "babel-jest",
      {
        presets: [
          require.resolve("@babel/preset-env"),
          [
            require.resolve("@babel/preset-react"),
            { development: true, runtime: "automatic" },
          ],
          require.resolve("@babel/preset-typescript"),
        ],
      },
    ],
  },
};
