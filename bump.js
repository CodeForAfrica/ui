const fs = require("fs");
const path = require("path");
const { exec } = require("@actions/exec");

(async () => {
  await exec("pnpm changeset", ["status", "--output=./.changeset/status.json"]);
  await exec("pnpm changeset", ["version"]);
  const changesetStatus = require("./.changeset/status.json");
  changesetStatus?.releases.map((release) => {
    const { name: appName } = release;
    const newVersion = `${require(`./apps/${appName}/package.json`).version}`;
    const dockerFilePath = path.join(
      __dirname,
      `apps/${appName}`,
      "contrib/dokku/Dockerfile"
    );
    const content = fs.readFileSync(dockerFilePath, "utf8");
    const updatedContent = content.replace(/:[^\s]+/g, `:${newVersion}`);
    fs.writeFileSync(dockerFilePath, updatedContent);  
  });  
})();
