const fs = require("fs");

const babel = require("../.babelrc.json");

if (babel.plugins[1][1].alias["@commons-ui/core"]) {
  delete babel.plugins[1][1].alias["@commons-ui/core"];
}

fs.writeFileSync("./.babelrc.json", JSON.stringify(babel, null, 2));
