// @babel/register is only needed in dev
// eslint-disable-next-line import/no-extraneous-dependencies
require("@babel/register")({
  presets: ["next/babel"],
  extensions: [".js", ".jsx"],
  env: {
    development: {
      sourceMaps: "inline",
      retainLines: true,
    },
  },
});

require("../server");
