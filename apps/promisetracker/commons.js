const fs = require("fs");
const packageOne = require("./package.json");
const packageTwo = require("./src/commons-ui/package.json");

Object.assign(packageOne.devDependencies, packageTwo.devDependencies);

fs.writeFileSync("./package.json", JSON.stringify(packageOne, null, 2));
