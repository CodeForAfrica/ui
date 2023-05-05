const path = require("path");

module.exports = {
  module: {
    rules: [
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
    ],
  },
  resolve: {
    alias: {
      "@/codeforafrica": path.resolve(__dirname, "src/"),
      content: path.resolve(__dirname, "content/"),
    },
    extensions: [".js"],
  },
};
