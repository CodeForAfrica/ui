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
