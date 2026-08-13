import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const appsDirectory = `${repositoryRoot}/apps`;

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function isNextApp(app) {
  return ["js", "mjs", "ts"].some((extension) =>
    existsSync(`${appsDirectory}/${app}/next.config.${extension}`),
  );
}

describe("build task contract", () => {
  it("routes the root Next.js build through the namespaced Turbo task", () => {
    const rootPackage = readJson(`${repositoryRoot}/package.json`);

    assert.equal(rootPackage.scripts["build:next"], "turbo run build:next");
  });

  it("gives every Next.js app a runnable, schedulable build:next task", () => {
    const nextApps = readdirSync(appsDirectory).filter(isNextApp).sort();

    assert.deepEqual(nextApps, [
      "charterafrica",
      "civicsignalblog",
      "climatemappedafrica",
      "codeforafrica",
      "pesayetu",
      "roboshield",
      "techlabblog",
      "trustlab",
      "twoopstracker",
      "vpnmanager",
    ]);

    for (const app of nextApps) {
      const appDirectory = `${appsDirectory}/${app}`;
      const appPackage = readJson(`${appDirectory}/package.json`);
      const turboConfig = readJson(`${appDirectory}/turbo.json`);

      assert.ok(
        appPackage.scripts?.["build:next"],
        `${app} must expose a build:next script`,
      );
      assert.ok(
        turboConfig.tasks?.["build:next"],
        `${app} must configure the build:next Turbo task`,
      );

      if (appPackage.scripts?.build?.includes("build:next")) {
        assert.deepEqual(
          turboConfig.tasks.build.env ?? [],
          turboConfig.tasks["build:next"].env ?? [],
          `${app} build and build:next tasks must declare the same environment`,
        );
      }
    }
  });
});
