const fs = require("fs");
const packageOne = require("./package.json");
const packageTwo = require("./commons-ui/package.json");

Object.assign(packageOne.devDependencies, packageTwo.devDependencies);
Object.assign(packageOne.devDependencies, packageOne.dependencies);
packageOne.dependencies = {};

fs.writeFileSync("./package.json", JSON.stringify(packageOne, null, 2));
