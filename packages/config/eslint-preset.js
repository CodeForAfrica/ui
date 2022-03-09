module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  extends: [
    "next",
    "prettier",
    "plugin:markdown/recommended",
    "plugin:json/recommended",
    "plugin:import/warnings",
    "plugin:import/errors",
    "airbnb",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "next/babel",
    "next/core-web-vitals",
  ],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
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
    "module-resolver/use-alias": "error",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js"],
      },
    ],
  },
};
