/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@commons-ui/core", "@commons-ui/next"],
  reactStrictMode: false,
  output: "standalone",
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
    config.experiments = { ...config.experiments, topLevelAwait: true }; // eslint-disable-line no-param-reassign
    return config;
  },
};

export default nextConfig;
