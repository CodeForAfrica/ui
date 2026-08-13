import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));

const migratedApps = ["pesayetu", "techlabblog", "trustlab"];

describe("release tag contract", () => {
  for (const app of migratedApps) {
    it(`keeps ${app}'s SHA tag and appends only its release tags`, () => {
      const workflow = readFileSync(
        `${repositoryRoot}/.github/workflows/${app}.yml`,
        "utf8",
      );
      const appendedTags = workflow.match(new RegExp(`${app}\\.tags\\+=`, "g"));

      assert.match(workflow, /tag: \$\{\{ github\.sha \}\}/);
      assert.equal(appendedTags?.length, 2);
      assert.doesNotMatch(workflow, new RegExp(`${app}\\.tags=(?!=)`));
      assert.match(
        workflow,
        new RegExp(`${app}\\.tags\\+=codeforafrica/${app}:\\{0\\}.*version`),
      );
      assert.match(
        workflow,
        new RegExp(`${app}\\.tags\\+=codeforafrica/${app}:latest`),
      );
    });
  }
});
