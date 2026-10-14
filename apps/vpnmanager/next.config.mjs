import path from "path";
import { fileURLToPath } from "url";

import { ResolvePeersFromAppPlugin } from "@commons-ui/next/config.js";
import { withSentryConfig } from "@sentry/nextjs/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't let `next dev` write Next.js agent rules into AGENTS.md; the repo
  // maintains its own agent instructions.
  agentRules: false,
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["@commons-ui/core", "@commons-ui/next"],
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ["@svgr/webpack"],
      },
      {
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
      },
    );
    // Resolve shared packages' peers (React, Next, MUI, ...) from this app so
    // there's a single copy of each; see @commons-ui/next/config.js.
    config.plugins.push(new ResolvePeersFromAppPlugin({ appDir: __dirname }));
    config.experiments = { ...config.experiments, topLevelAwait: true }; // eslint-disable-line no-param-reassign
    return config;
  },
};

export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
  org: process.env.SENTRY_ORG,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  project: process.env.SENTRY_PROJECT,
});
