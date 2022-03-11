module.exports = {
  transform: {
    ".(js|jsx)$": "babel-jest", // jest's default
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  moduleFileExtensions: [ "js", "jsx", "json", "node"],
  projects: [
    "<rootDir>/packages/*",
    "<rootDir>/apps/*",
  ],
  coverageDirectory: "<rootDir>/coverage/",
  collectCoverageFrom: ["<rootDir>/packages/*/src/**/*.{js,jsx}"],
  testURL: "http://localhost/",
  moduleNameMapper: {
    ".json$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules"],
};
