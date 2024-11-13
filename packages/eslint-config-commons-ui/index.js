const jestDom = require("eslint-plugin-jest-dom");
const testingLibrary = require("eslint-plugin-testing-library");
const babelParser = require("@babel/eslint-parser");
const react = require("eslint-plugin-react");
const pluginImport = require("eslint-plugin-import");
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");
const { fixupConfigRules } = require("@eslint/compat");

const flatCompat = new FlatCompat();

module.exports = [
  js.configs.recommended,
  pluginImport.flatConfigs.recommended,
  ...fixupConfigRules(flatCompat.extends("plugin:prettier/recommended")),
  {
    plugins: {
      "jest-dom": jestDom,
      "testing-library": testingLibrary,
      react,
    },

    languageOptions: {
      parser: babelParser,
      ecmaVersion: 5,
      sourceType: "module",

      parserOptions: {
        requireConfigFile: false,

        babelOptions: {
          presets: ["@babel/preset-react"],
        },

        allowImportExportEverywhere: true,
      },
    },

    settings: {
      "import/resolver": {
        jsconfig: {
          config: "jsconfig.json",
        },
      },
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
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/require-default-props": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
];
