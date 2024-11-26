const eslintConfig = require("eslint-config-commons-ui/next");

module.exports = [
  {
    ignores: [
      "**/node_modules",
      "**/.pnp",
      "**/.pnp.js",
      "**/.pnpm-debug.log",
      "**/coverage",
      "**/.next/",
      "**/out/",
      "**/build",
      "**/.DS_Store",
      "**/*.pem",
      "**/npm-debug.log*",
      "**/yarn-debug.log*",
      "**/yarn-error.log*",
      "**/.vercel",
      "**/.now",
      "**/.turbo",
      "**/contrib/",
      "**/dist/",
    ],
  },
  ...eslintConfig.map((config) => {
    return {
      ...config,
      settings: {
        ...config.settings,
        "import/resolver": {
          webpack: {
            config: "./eslint.webpack.config.js",
          },
          typescript: {
            alwaysTryTypes: false,
            project: "./tsconfig.json",
          },
        },
      },
    };
  }),
  {
    rules: {
      "react/jsx-filename-extension": [1, { extensions: [".js", ".tsx"] }], // This rule allows JSX syntax in both .js and tsx files
      // Disable requirement for importing file extensions for js and tsx files, without this we cant import custom components in Payload
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          tsx: "never",
        },
      ],
    },
  },
];
