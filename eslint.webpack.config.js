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
      "@/charterafrica": path.resolve(__dirname, "apps/charterafrica/src/"),
      "@/civicsignalblog": path.resolve(__dirname, "apps/civicsignalblog/src/"),
      "#civicsignalblog": path.resolve(__dirname, "apps/civicsignalblog/src/"),
      "@/codeforafrica": path.resolve(__dirname, "apps/codeforafrica/src/"),
      "@/commons-ui": path.resolve(__dirname, "packages/commons-ui/src/"),
      "@/hurumap/core/*": path.resolve(
        __dirname,
        "packages/hurumap-core/src/*",
      ),
      content: path.resolve(__dirname, "content/"),
      "@/promisetracker": path.resolve(__dirname, "apps/promisetracker/src/"),
      "@/vpnmanager": path.resolve(__dirname, "apps/vpnmanager/src/"),
      "@/uibook": path.resolve(__dirname, "apps/uibook/src/"),
      "@/techlabblog": path.resolve(__dirname, "apps/techlabblog/src/"),
      "@/roboshield": path.resolve(__dirname, "apps/roboshield/src/"),
    },
    extensions: [".js"],
  },
};
