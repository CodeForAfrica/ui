const fs = require("fs");
const path = require("path");
const { exec } = require("@actions/exec");

function getFiles(dir=".changeset") {
  return fs.readdirSync(dir).flatMap((item) => {
    const path = `${dir}/${item}`;
    return item !== "README.md" && item != "config.json" ? path: [];
  });
}

(async () => {
  await exec("changeset", ["version"]);
  const file = getFiles()[0];
  let appContent = fs.readFileSync(file, "utf8");
  appContent = appContent.split(":")[0].trim()
                          .replace(/---/g, '')
                          .replace(/\s/g, '')
                          .replace(/"/g, '');
  const releaseLine = `${require(`./apps/${appContent}/package.json`).version}`;
  const dockerFilePath = path.join(__dirname, `apps/${appContent}`, "contrib/dokku/Dockerfile");
  const content = fs.readFileSync(dockerFilePath, "utf8");
  const updatedContent = content.replace(
    /:[^\s]+/g,
    `:${releaseLine}`
  );
  fs.writeFileSync(dockerFilePath, updatedContent);
})();
