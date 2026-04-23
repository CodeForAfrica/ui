import { withSentryConfig } from "@sentry/nextjs";
import { withPayload } from "@payloadcms/next/withPayload";
import { fileURLToPath } from "url";
import path from "path";

import { securityHeaders } from "./src/utils/securityHeaders.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRACING_ROOT = process.env.TRACING_ROOT?.trim();
const outputFileTracingRoot = TRACING_ROOT
  ? path.join(__dirname, TRACING_ROOT)
  : undefined;

const imageDomains =
  process.env.IMAGE_DOMAINS?.split(",")
    .map((d) => d.trim())
    .filter(Boolean) ?? [];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: imageDomains.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
    unoptimized:
      process.env.IMAGE_UNOPTIMIZED?.trim()?.toLowerCase() === "true",
  },
  output: "standalone",
  outputFileTracingRoot,
  // TODO(kilemensi): There is an upstream bug on this @ https://github.com/vercel/next.js/issues/51478
  //                  `js`, `ts`, `tsx` are just to make sure there is more than one item;
  //                  we SHOULDN'T use them in pages router!
  pageExtensions: ["page.js", "js", "ts", "tsx"],
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      oneOf: [
        {
          type: "asset",
          include: /node_modules/, // Handle all SVGs from node_modules as assets
        },
        {
          type: "asset",
          resourceQuery: /url/, // *.svg?url
        },
        {
          issuer: /\.[jt]sx?$/,
          exclude: /node_modules/, // Handle project SVGs as React components
          use: ["@svgr/webpack"],
          resourceQuery: { not: [/url/] },
        },
      ],
    });
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  transpilePackages: [
    "@commons-ui/core",
    "@commons-ui/next",
    "@commons-ui/payload",
  ],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/api/media/file/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // Only a single baseline report page exists, so we redirect to the main
        // research page.
        source: "/research/baseline-reports",
        destination: "/research",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/v1/robots",
      },
    ];
  },
};

export default withPayload(
  withSentryConfig(nextConfig, {
    // For all available options, see:
    // https://www.npmjs.com/package/@sentry/webpack-plugin#options

    authToken: process.env.SENTRY_AUTH_TOKEN,

    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,

    // Only print logs for uploading source maps in CI
    silent: !process.env.CI,

    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }),
);
