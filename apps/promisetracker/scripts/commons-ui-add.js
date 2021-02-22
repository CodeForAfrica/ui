const fs = require("fs");

const mainPackage = require("../package.json");
const commonsuiPackage = require("../COMMONS-UI/package.json");
const babel = require("../.babelrc.json");

// Merge dependencies for install. Merging to prevent more than one version dependency errors
Object.assign(mainPackage.devDependencies, commonsuiPackage.devDependencies);
Object.assign(mainPackage.devDependencies, mainPackage.dependencies);
mainPackage.dependencies = {};

// add alias to babel config file
Object.assign(babel.plugins[1][1].alias, {
  "@commons-ui/core": "./COMMONS-UI/packages/core/src",
});

// create new files with the update changes above
fs.writeFileSync("./package.json", JSON.stringify(mainPackage, null, 2));
fs.writeFileSync("./.babelrc.json", JSON.stringify(babel, null, 2));
