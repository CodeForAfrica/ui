const path = require("path");

const withTM = require("next-transpile-modules")(
  ["@commons-ui/core", "@commons-ui/next"],
  {
    debug: /(^|\s)+--inspect(\s|$)+/.test(process.env.NODE_OPTIONS),
  }
);

const PROJECT_ROOT = process.env.PROJECT_ROOT?.trim();
const outputFileTracingRoot = PROJECT_ROOT
  ? path.resolve(__dirname, PROJECT_ROOT)
  : undefined;

// const ghostUrl =
//   process.env.GHOST_ADMIN_URL?.trim() || process.env.GHOST_URL?.trim();
// const ghostAdminUrl = new URL("/ghost", ghostUrl).toString();

module.exports = withTM({
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",")
      ?.map((d) => d.trim())
      ?.filter((d) => d),
  },
  experimental: {
    outputFileTracingRoot,
  },
  output: "standalone",
  pageExtensions: ["page.js"],
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: "/longform/:path*",
  //       destination: `${ghostAdminUrl}/:path*`,
  //       permanent: false,
  //       basePath: false,
  //     },
  //   ];
  // },
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
      }
    );

    return config;
  },
});
