const fs = require("graceful-fs");
const packageOne = require("./package.json");
const packageTwo = require("./src/commons-ui/package.json");

Object.assign(packageOne.devDependencies, packageTwo.devDependencies);

fs.writeFileSync("./commonsPackage.json", JSON.stringify(packageOne, null, 2));
