import path from "path";

const PROJECT_ROOT = process.env.PROJECT_ROOT?.trim();
const outputFileTracingRoot = PROJECT_ROOT
  ? path.resolve(__dirname, PROJECT_ROOT)
  : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@commons-ui/core", "@commons-ui/next"],
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    outputFileTracingRoot,
  },
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
    );
    config.experiments = { ...config.experiments, topLevelAwait: true }; // eslint-disable-line no-param-reassign
    return config;
  },
};

export default nextConfig;
