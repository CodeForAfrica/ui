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
  ...eslintConfig,
  {
    rules: {
      // @hurumap/next is a reusable package; we don't intend to have pages
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];
