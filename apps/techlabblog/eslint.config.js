const eslintConfig = require("eslint-config-commons-ui/next");

module.exports = [
  {
    ignores: [
      "**/node_modules",
      "**/.pnp",
      "**/.pnp.js",
      "**/.pnpm-debug.log",
      "**/dist/",
      "**/coverage",
      "**/.next/",
      "**/out/",
      "**/build/",
      "**/.DS_Store",
      "**/*.pem",
      "**/npm-debug.log*",
      "**/yarn-debug.log*",
      "**/yarn-error.log*",
      "**/.vercel",
      "**/.now",
      "**/.turbo",
      "**/test-results/",
      "**/playwright-report/",
    ],
  },
  ...eslintConfig.map((config) => {
    return {
      ...config,
      settings: {
        ...config.settings,
        "import/resolver": {
          typescript: {
            alwaysTryTypes: false,
            project: "./tsconfig.json",
          },
        },
      },
    };
  }),
];
