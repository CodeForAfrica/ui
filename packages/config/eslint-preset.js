module.exports = {
  root: true,
  extends: [
    "prettier",
    "plugin:markdown/recommended",
    "plugin:json/recommended",
    "plugin:import/warnings",
    "plugin:import/errors",
    "airbnb",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "next/core-web-vitals",
    "next",
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
