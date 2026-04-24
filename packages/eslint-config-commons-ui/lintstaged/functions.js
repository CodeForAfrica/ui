const path = require("path");

function createCommandBuilder(configDir) {
  const quotedFiles = (filenames) =>
    filenames
      .map((filename) => JSON.stringify(path.relative(configDir, filename)))
      .join(" ");

  return (bin, args, filenames) =>
    `pnpm -C ${JSON.stringify(configDir)} exec ${bin} ${args} ${quotedFiles(filenames)}`;
}

module.exports = {
  createCommandBuilder,
};
