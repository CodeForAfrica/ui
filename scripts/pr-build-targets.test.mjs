import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  BUILD_TARGETS,
  createOutputs,
  directBuildTargets,
  hasGlobalBuildChange,
  parseTurboTargets,
  resolveBuildTargets,
  uniqueBuildTargets,
} from "./pr-build-targets.mjs";

describe("pr-build-targets", () => {
  it("creates GitHub Actions outputs", () => {
    assert.deepEqual(createOutputs(["techlabblog", "trustlab"]), {
      has_targets: true,
      targets: ["techlabblog", "trustlab"],
      techlabblog: true,
      trustlab: true,
    });
  });

  it("creates empty GitHub Actions outputs", () => {
    assert.deepEqual(createOutputs([]), {
      has_targets: false,
      targets: [],
      techlabblog: false,
      trustlab: false,
    });
  });

  it("detects global build inputs that require all app targets", () => {
    assert.equal(hasGlobalBuildChange(["docker-bake.hcl"]), true);
    assert.equal(hasGlobalBuildChange(["scripts/pr-build-targets.mjs"]), true);
    assert.equal(hasGlobalBuildChange(["pnpm-lock.yaml"]), true);
    assert.equal(hasGlobalBuildChange(["turbo.json"]), true);
    assert.equal(
      hasGlobalBuildChange(["packages/commons-ui-core/index.js"]),
      false,
    );
  });

  it("maps direct Docker and workflow paths to build targets", () => {
    assert.deepEqual(
      directBuildTargets([
        "docker/apps/techlabblog/Dockerfile",
        ".github/workflows/trustlab.yml",
        "scripts/revalidate.mjs",
      ]),
      ["techlabblog", "trustlab"],
    );
  });

  it("filters Turbo package output to migrated apps under apps/", () => {
    const turboOutput = `warning before json
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

    assert.deepEqual(parseTurboTargets(turboOutput), [
      "techlabblog",
      "trustlab",
    ]);
  });

  it("deduplicates and keeps build target ordering", () => {
    assert.deepEqual(
      uniqueBuildTargets(["trustlab", "pesayetu", "techlabblog", "trustlab"]),
      BUILD_TARGETS,
    );
  });

  it("resolves all app targets when global build inputs change", () => {
    assert.deepEqual(
      resolveBuildTargets({
        changedFiles: ["docker-bake.hcl"],
        turboTargets: [],
      }),
      BUILD_TARGETS,
    );
  });

  it("resolves direct path and Turbo targets into a stable deduped target list", () => {
    assert.deepEqual(
      resolveBuildTargets({
        changedFiles: ["docker/apps/trustlab/Dockerfile"],
        turboTargets: ["techlabblog", "trustlab"],
      }),
      BUILD_TARGETS,
    );
  });

  it("resolves an empty target list when no app build targets are affected", () => {
    assert.deepEqual(
      resolveBuildTargets({
        changedFiles: ["docs/readme.md"],
        turboTargets: [],
      }),
      [],
    );
  });
});
