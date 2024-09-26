import fs from "fs";
import { resolve } from "path";

/**
 * Resolve tsconfig.json paths to Webpack aliases
 * @param  {string} tsConfigPath           - Path to tsconfig
 * @param  {string} webpackConfigBasePath  - Path from tsconfig to Webpack config to create absolute aliases
 * @return {object}                        - Webpack alias config
 */
export default function resolveTsconfigPathsToAlias({
  tsConfigPath = "tsconfig.json",
  webpackConfigBasePath = __dirname,
} = {}) {
  const rawTsConfig = fs
    .readFileSync(tsConfigPath, "utf-8")
    .replace(/,\s*]/g, "]")
    .replace(/,\s*}/g, "}");

  const tsConfig = JSON.parse(rawTsConfig);

  const { paths } = tsConfig.compilerOptions;

  const aliases = {};

  Object.keys(paths).forEach((item) => {
    const key = item.replace("/*", "");
    aliases[key] = resolve(
      webpackConfigBasePath,
      paths[item][0].replace("/*", "").replace("*", ""),
    );
  });

  return aliases;
}
