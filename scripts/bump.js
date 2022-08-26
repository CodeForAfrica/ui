const fs = require("fs");
const path = require("path");
const { exec } = require("@actions/exec");

(async () => {
  await exec("pnpm changeset", ["version"]);
  const apps = fs.readdirSync("apps");
  apps.map((app) => {
    const newVersion = `${require(`../apps/${app}/package.json`).version}`;
    const dockerFilePath = path.join(`apps/${app}/contrib/dokku`, "Dockerfile");
    const currentImageVersion = fs.readFileSync(dockerFilePath, "utf8");
    const updatedImageVersion = currentImageVersion.replace(
      /:[^\s]+/g,
      `:${newVersion}`
    );
    fs.writeFileSync(dockerFilePath, updatedImageVersion);
  });
})();
