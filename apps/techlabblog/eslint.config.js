const eslintConfig = require("eslint-config-commons-ui/typescript");
const mdx = require("eslint-plugin-mdx");

module.exports = [...eslintConfig, mdx.flat];
