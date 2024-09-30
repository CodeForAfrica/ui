import createMDX from "@next/mdx";

import { rehypePlugins, remarkPlugins } from "./mdx.config.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["mdx", "tsx"],
  reactStrictMode: true,
  transpilePackages: ["@commons-ui/core", "@commons-ui/next"],
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );
    // Since *.svg files are now handled ☝️, we can safely ignore file loader rule.
    fileLoaderRule.exclude = /\.svg$/i;
    config.experiments = { ...config.experiments, topLevelAwait: true }; // eslint-disable-line no-param-reassign
    return config;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
  },
});

export default withMDX(nextConfig);
