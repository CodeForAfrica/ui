module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:markdown/recommended",
    "plugin:json/recommended",
    "airbnb",
    "airbnb/hooks",
    "plugin:prettier/recommended",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    sourceType: "module",
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
    allowImportExportEverywhere: true,
  },
  rules: {
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
    // https://mui.com/guides/minimizing-bundle-size/#option-1
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@mui/*/*/*", "!@mui/material/test-utils/*"],
      },
    ],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js"],
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: ["**/*.test.js"],
      extends: ["plugin:jest/recommended"],
    },
    {
      files: ["**/*.spec.js"],
      extends: ["plugin:playwright/playwright-test"],
    },
  ],
};
