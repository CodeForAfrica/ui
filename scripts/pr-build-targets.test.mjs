import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  directBuildTargets,
  hasGlobalBuildChange,
  parseTurboBuildTargets,
} from "./pr-build-targets.mjs";

describe("pr-build-targets", () => {
  it("detects global build inputs that require all build targets", () => {
    assert.equal(hasGlobalBuildChange(["docker-bake.hcl"]), true);
    assert.equal(hasGlobalBuildChange(["scripts/pr-build-targets.mjs"]), true);
    assert.equal(hasGlobalBuildChange(["pnpm-lock.yaml"]), true);
    assert.equal(hasGlobalBuildChange(["turbo.json"]), true);
    assert.equal(
      hasGlobalBuildChange(["packages/commons-ui-core/index.js"]),
      false,
    );
  });

  it("maps direct build input paths to candidate build targets", () => {
    assert.deepEqual(
      directBuildTargets([
        "docker/apps/techlabblog/Dockerfile",
        ".github/workflows/trustlab.yml",
      ]),
      ["techlabblog", "trustlab"],
    );
  });

  it("filters Turbo package output to build targets", () => {
    const turboOutput = `
      {
        "packages": {
          "items": [
            { "name": "techlabblog", "path": "apps/techlabblog" },
            { "name": "commons-ui-core", "path": "packages/commons-ui-core" },
            { "name": "pesayetu", "path": "apps/pesayetu" },
            { "name": "trustlab", "path": "apps/trustlab" }
          ]
        }
      }`;

    assert.deepEqual(parseTurboBuildTargets(turboOutput), [
      "techlabblog",
      "trustlab",
    ]);
  });

  it("ignores Turbo output before and after JSON when on different lines", () => {
    const turboOutput = `warning before json 
      {
        "packages": {
          "items": [
            { "name": "techlabblog", "path": "apps/techlabblog" }
          ]
        }
      }
      status after json`;

    assert.deepEqual(parseTurboBuildTargets(turboOutput), ["techlabblog"]);
  });

  it("ignores Turbo output before and after JSON when on the same line", () => {
    const turboOutput =
      'warning {"packages":{"items":[{"name":"trustlab","path":"apps/trustlab"}]}} status';

    assert.deepEqual(parseTurboBuildTargets(turboOutput), ["trustlab"]);
  });
});
