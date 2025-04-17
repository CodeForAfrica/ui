const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@/hurumap/next": path.resolve(__dirname, "src/"),
    },
    extensions: [".js"],
  },
};
