const fs = require("fs");
const path = require("path");
const { exec } = require("@actions/exec");
const { argv } = require("process");

const versionFilePath = argv[2];
const dockerFilePath = argv[3];

(async () => {
  await exec("pnpm changeset", ["version"]);
  const newVersion = `${require(`../${versionFilePath}`).version}`;
  const currentImageVersion = fs.readFileSync(dockerFilePath, "utf8");
  const updatedImageVersion = currentImageVersion.replace(
    /:[^\s]+/g,
    `:${newVersion}`
  );
  fs.writeFileSync(dockerFilePath, updatedImageVersion);
  await exec("pnpm format");
})();
