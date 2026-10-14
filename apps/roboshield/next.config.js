import path from "path";
import { fileURLToPath } from "url";

import { ResolvePeersFromAppPlugin } from "@commons-ui/next/config.js";
import { withPayload } from "@payloadcms/next/withPayload";
import { withSentryConfig } from "@sentry/nextjs/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = process.env.PROJECT_ROOT?.trim();
const outputFileTracingRoot = PROJECT_ROOT
  ? path.resolve(__dirname, PROJECT_ROOT)
  : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't let `next dev` write Next.js agent rules into AGENTS.md; the repo
  // maintains its own agent instructions.
  agentRules: false,
  transpilePackages: ["@commons-ui/core", "@commons-ui/next"],
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingRoot,
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: "asset",
        include: /node_modules/, // Handle all SVGs from node_modules as assets
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        exclude: /node_modules/, // Handle project SVGs as React components
        use: ["@svgr/webpack"],
      },
    );
    // Resolve shared packages' peers (React, Next, MUI, ...) from this app so
    // there's a single copy of each; see @commons-ui/next/config.js.
    config.plugins.push(new ResolvePeersFromAppPlugin({ appDir: __dirname }));
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    // No protocol, so both http and https stay allowed, as with `domains`.
    remotePatterns:
      process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",")
        .map((d) => d.trim())
        .filter(Boolean)
        .map((hostname) => ({ hostname })) ?? [],
    unoptimized:
      process.env.NEXT_PUBLIC_IMAGE_UNOPTIMIZED?.trim()?.toLowerCase() ===
      "true",
  },
};

export default withPayload(
  withSentryConfig(nextConfig, {
    silent: !process.env.CI,
    org: process.env.SENTRY_ORG,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    project: process.env.SENTRY_PROJECT,
  }),
);
