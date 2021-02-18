const fs = require("fs");

const packageOne = require("./package.json");
const packageTwo = require("./commons-ui/package.json");
const babel = require("./.babelrc.json");

// Merge dependencies for install
Object.assign(packageOne.devDependencies, packageTwo.devDependencies);
Object.assign(packageOne.devDependencies, packageOne.dependencies);
packageOne.dependencies = {};

// add alias to babel config file
Object.assign(babel.plugins[1][1].alias, {
  "@commons-ui/core": "./commons-ui/packages/core/src",
});

// update with changes
fs.writeFileSync("./package.json", JSON.stringify(packageOne, null, 2));
fs.writeFileSync("./.babelrc.json", JSON.stringify(babel, null, 2));
