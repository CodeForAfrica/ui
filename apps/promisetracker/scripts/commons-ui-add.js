const fs = require("fs");

const mainPackage = require("./package.json");
const commonsuiPackage = require("./commons-ui/package.json");
const babel = require("./.babelrc.json");

// Merge dependencies for install
Object.assign(mainPackage.devDependencies, commonsuiPackage.devDependencies);
Object.assign(mainPackage.devDependencies, mainPackage.dependencies);
mainPackage.dependencies = {};

// add alias to babel config file
Object.assign(babel.plugins[1][1].alias, {
  "@commons-ui/core": "./commons-ui/packages/core/src",
});

// update with changes
fs.writeFileSync("./package.json", JSON.stringify(mainPackage, null, 2));
fs.writeFileSync("./.babelrc.json", JSON.stringify(babel, null, 2));
