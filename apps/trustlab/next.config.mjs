import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";

const PROJECT_ROOT = process.env.PROJECT_ROOT?.trim();
const outputFileTracingRoot = PROJECT_ROOT
  ? path.resolve(__dirname, PROJECT_ROOT)
  : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",")
      ?.map((d) => d.trim())
      ?.filter((d) => d),
    unoptimized:
      process.env.NEXT_PUBLIC_IMAGE_UNOPTIMIZED?.trim()?.toLowerCase() ===
      "true",
  },
  output: "standalone",
  outputFileTracingRoot,
  // TODO(kilemensi): There is an upstream bug on this @ https://github.com/vercel/next.js/issues/51478
  //                  `js`, `ts`, `tsx` are just to make sure there is more than one item;
  //                  we SHOULDN'T use them in pages router!
  pageExtensions: ["page.js", "js", "ts", "tsx"],
  reactStrictMode: true,
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
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  transpilePackages: ["@commons-ui/core", "@commons-ui/next"],
};

export default withPayload(nextConfig);
