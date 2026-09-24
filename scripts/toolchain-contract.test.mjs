import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

// The repo declares its Node.js and pnpm versions exactly once, in the root
// package.json:
//
//   engines.node    the supported Node.js range   (read by actions/setup-node
//                   via `node-version-file: package.json`, enforced locally by
//                   `engineStrict: true` in pnpm-workspace.yaml)
//   engines.pnpm    the supported pnpm range
//   packageManager  the exact pnpm build           (read by pnpm itself and by
//                   pnpm/action-setup)
//
// Some consumers cannot read that file. Bake's HCL dialect has no `file()`
// function, and a Dockerfile cannot parse JSON, so those carry literal pins.
// This test is the contract that keeps the literals honest: it fails CI the
// moment a pin drifts from the source of truth, and it fails the moment a
// second copy of the versions reappears somewhere it was deleted from.
//
// It deliberately uses no dependencies — only Node built-ins — so it runs from
// a bare checkout, before `pnpm install`, and inside minimal CI images. That
// rules out a real YAML/HCL parser, hence the narrow, anchored regexes below.

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));

function read(path) {
  return readFileSync(`${repositoryRoot}/${path}`, "utf8");
}

function readJson(path) {
  return JSON.parse(read(path));
}

function majorOf(version) {
  return version.split(".")[0];
}

// `variable "NODE_VERSION" { default = "24.21.0" }` — HCL, as written by
// docker-bake.hcl (one `default` per block, always a quoted string).
function bakeVariable(hcl, name) {
  const match = hcl.match(
    new RegExp(`variable\\s+"${name}"\\s*\\{[^}]*default\\s*=\\s*"([^"]*)"`),
  );
  assert.ok(match, `docker-bake.hcl must declare a "${name}" variable`);
  return match[1];
}

// `FOO=1.2.3 \` inside a Dockerfile ARG block.
function dockerfileArg(dockerfile, name) {
  const match = dockerfile.match(new RegExp(`\\b${name}=([^\\s\\\\]+)`));
  assert.ok(match, `Dockerfile must declare an ARG default for ${name}`);
  return match[1];
}

const rootPackage = readJson("package.json");
const workspace = read("pnpm-workspace.yaml");
const bake = read("docker-bake.hcl");

const nodeRange = rootPackage.engines.node;
const pnpmRange = rootPackage.engines.pnpm;
const pnpmVersion = rootPackage.packageManager.replace(/^pnpm@/, "");
const nodeMajor = majorOf(nodeRange);

describe("toolchain contract", () => {
  describe("source of truth", () => {
    it("pins pnpm to an exact version via packageManager", () => {
      assert.match(
        rootPackage.packageManager,
        /^pnpm@\d+\.\d+\.\d+$/,
        "packageManager must be an exact pnpm version — it is what pnpm self-provisions",
      );
    });

    it("declares Node.js and pnpm ranges that agree with the pins", () => {
      assert.match(
        nodeRange,
        /^\d+\.x$/,
        "engines.node must be a `<major>.x` range",
      );
      assert.match(
        pnpmRange,
        /^\d+\.x$/,
        "engines.pnpm must be a `<major>.x` range",
      );
      assert.equal(
        majorOf(pnpmRange),
        majorOf(pnpmVersion),
        "engines.pnpm and packageManager must agree on the pnpm major",
      );
    });

    it("enforces engines.node on install instead of only documenting it", () => {
      assert.match(
        workspace,
        /^engineStrict: true$/m,
        "pnpm-workspace.yaml must set engineStrict so engines.node is enforced locally",
      );
    });

    it("keeps Node.js version managers out of the repo", () => {
      const strays = readdirSync(repositoryRoot).filter((entry) =>
        [".nvmrc", ".node-version", ".tool-versions"].includes(entry),
      );

      assert.deepEqual(
        strays,
        [],
        "the Node version lives in package.json#engines.node; a version-manager file is a second copy to keep in sync",
      );
    });
  });

  describe("workspace manifests", () => {
    const manifests = ["apps", "packages"].flatMap((directory) =>
      readdirSync(`${repositoryRoot}/${directory}`, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => `${directory}/${entry.name}/package.json`),
    );

    it("finds every workspace manifest", () => {
      assert.ok(
        manifests.length >= 19,
        "expected the full apps/* and packages/* set",
      );
    });

    for (const manifest of manifests) {
      it(`leaves the toolchain contract out of ${manifest}`, () => {
        const pkg = readJson(manifest);

        assert.equal(
          pkg.packageManager,
          undefined,
          "only the root manifest declares packageManager — pnpm ignores the rest, so a copy here can only go stale",
        );

        if (pkg.private) {
          assert.equal(
            pkg.engines,
            undefined,
            "private apps are never published; the root engines govern the workspace",
          );
        } else {
          // Published packages are the one place a second copy is unavoidable:
          // engines ships inside the npm tarball and is real metadata for
          // consumers. It is a floor (">=24"), not the repo's own `24.x` pin —
          // a library must not forbid its consumers from using a newer Node.
          assert.deepEqual(
            pkg.engines,
            { node: `>=${nodeMajor}` },
            "published packages declare engines.node as a floor derived from the root major, and nothing else",
          );
        }
      });
    }
  });

  describe("docker pins", () => {
    it("builds base images on a Node.js release inside engines.node", () => {
      const nodeVersion = bakeVariable(bake, "NODE_VERSION");

      assert.match(
        nodeVersion,
        /^\d+\.\d+\.\d+$/,
        "NODE_VERSION must be an exact release",
      );
      assert.equal(
        majorOf(nodeVersion),
        nodeMajor,
        `docker-bake.hcl NODE_VERSION must satisfy engines.node (${nodeRange})`,
      );
    });

    it("keeps NODE_DIGEST a well-formed index digest when one is set", () => {
      // Optional for now: base images may float on the -alpine tag. Making the
      // digest mandatory is supply-chain hardening and is deliberately left to
      // its own change (see the TODO on the variable in docker-bake.hcl). What
      // is enforced here is that a digest, once set, is at least well formed —
      // a platform-specific or truncated one breaks multi-arch builds. Whether
      // it actually belongs to NODE_VERSION needs the registry, so that check
      // lives in build-base-images.yml rather than this offline test.
      const digest = bakeVariable(bake, "NODE_DIGEST");

      if (digest === "") return;

      assert.match(
        digest,
        /^sha256:[0-9a-f]{64}$/,
        "NODE_DIGEST must be an index digest of the form sha256:<64 hex>",
      );
    });

    it("installs the same pnpm the workspace pins", () => {
      assert.equal(
        bakeVariable(bake, "PNPM_VERSION"),
        pnpmVersion,
        "docker-bake.hcl PNPM_VERSION must equal package.json#packageManager",
      );
    });

    it("installs the same turbo the workspace resolves", () => {
      // Compared against the lockfile rather than the catalog: the catalog
      // entry is a caret range, so `^2.8.12` happily resolves to 2.10.12 and a
      // catalog comparison would call that agreement.
      const resolved = [
        ...new Set(read("pnpm-lock.yaml").match(/^ {2}turbo@[\d.]+:$/gm) ?? []),
      ];

      assert.equal(
        resolved.length,
        1,
        `expected exactly one resolved turbo in pnpm-lock.yaml, got ${resolved.join(", ")}`,
      );
      assert.equal(
        bakeVariable(bake, "TURBO_VERSION"),
        resolved[0].trim().replace(/^turbo@|:$/g, ""),
        "docker-bake.hcl TURBO_VERSION must equal the turbo pnpm-lock.yaml resolves",
      );
    });

    it("keeps the pre-bake Dockerfile on the same toolchain", () => {
      // civicsignalblog, twoopstracker and vpnmanager still build from the root
      // Dockerfile. Drop this block once they move to docker-bake.hcl.
      //
      // Compared against docker-bake.hcl exactly, not merely to the same major.
      // Both files are unavoidable literals, so there is no reason to tolerate
      // two different Node 24 patches building the same monorepo — a major-only
      // check would pass "24", "24.0.0" and "24.21.0" alike.
      const dockerfile = read("Dockerfile");
      const dockerfileNode = dockerfileArg(dockerfile, "NODE_VERSION");

      assert.match(
        dockerfileNode,
        /^\d+\.\d+\.\d+$/,
        "Dockerfile NODE_VERSION must be an exact release",
      );
      assert.equal(
        dockerfileNode,
        bakeVariable(bake, "NODE_VERSION"),
        "Dockerfile NODE_VERSION must equal docker-bake.hcl NODE_VERSION",
      );
      assert.equal(
        dockerfileArg(dockerfile, "PNPM_VERSION"),
        pnpmVersion,
        "Dockerfile PNPM_VERSION must equal package.json#packageManager",
      );
    });
  });

  describe("github actions", () => {
    const workflowsDirectory = `${repositoryRoot}/.github/workflows`;
    const workflows = readdirSync(workflowsDirectory)
      .filter((name) => name.endsWith(".yml"))
      .sort();

    it("finds the workflow set", () => {
      assert.ok(workflows.length > 0);
    });

    // Split a workflow into step blocks so a `with:` key can be attributed to
    // the step that owns it. Asserting over the whole file instead — or over a
    // fixed character window after the `uses:` line — either misses a key or
    // credits it to the wrong step.
    function stepsOf(contents) {
      const blocks = [];
      let current = null;

      for (const line of contents.split("\n")) {
        if (/^\s*-\s+(name|uses|run|id|if):/.test(line)) {
          if (current) blocks.push(current.join("\n"));
          current = [line];
        } else if (current) {
          current.push(line);
        }
      }
      if (current) blocks.push(current.join("\n"));

      return blocks;
    }

    // Steps are scoped per job, so ordering has to be judged per job too — a
    // setup-node in job B says nothing about a `run:` step in job A, even
    // though both live in the same file.
    function jobsOf(contents) {
      const lines = contents.split("\n");
      const start = lines.findIndex((line) => /^jobs:\s*$/.test(line));

      if (start === -1) return [];

      const jobs = [];
      let current = null;

      for (const line of lines.slice(start + 1)) {
        if (/^ {2}[A-Za-z0-9_-]+:\s*$/.test(line)) {
          if (current) jobs.push(current);
          current = { name: line.trim().replace(/:$/, ""), lines: [] };
        } else if (current) {
          current.lines.push(line);
        }
      }
      if (current) jobs.push(current);

      return jobs.map((job) => ({ ...job, body: job.lines.join("\n") }));
    }

    // A `run:` step invoking the JS toolchain. Such a job needs an explicit
    // setup-node *before* it; without one it silently uses whatever Node the
    // runner image ships, which is the drift this contract exists to stop.
    const invokesNode = /(^|[\s|&;(])(node|npm|npx|pnpm)\s/m;

    for (const workflow of workflows) {
      it(`resolves Node.js from package.json in ${workflow}`, () => {
        const contents = readFileSync(
          `${workflowsDirectory}/${workflow}`,
          "utf8",
        );
        const steps = stepsOf(contents);
        const setupNode = steps.filter((step) =>
          /uses:\s*actions\/setup-node@/.test(step),
        );

        for (const step of setupNode) {
          // `node-version:` hardcodes a version; `node-version-file:` reads ours.
          assert.doesNotMatch(
            step,
            /^\s*node-version:/m,
            `${workflow}: use \`node-version-file: "package.json"\` so the version tracks engines.node`,
          );
          assert.match(
            step,
            /^\s*node-version-file:\s*"package\.json"\s*$/m,
            `${workflow}: setup-node must read node-version-file: "package.json"`,
          );
        }

        for (const job of jobsOf(contents)) {
          const jobSteps = stepsOf(job.body);
          const setupAt = jobSteps.findIndex((step) =>
            /uses:\s*actions\/setup-node@/.test(step),
          );
          const runsAt = jobSteps.findIndex(
            (step) => /^\s*-?\s*run:/m.test(step) && invokesNode.test(step),
          );

          if (runsAt === -1) continue;

          assert.notEqual(
            setupAt,
            -1,
            `${workflow} job "${job.name}" runs node/npm/npx/pnpm but has no actions/setup-node step, so it uses the runner's default Node`,
          );
          assert.ok(
            setupAt < runsAt,
            `${workflow} job "${job.name}" runs node/npm/npx/pnpm at step ${runsAt + 1} before actions/setup-node at step ${setupAt + 1} — that step executes on the runner's default Node`,
          );
        }
      });
    }

    it("lets pnpm/action-setup read the version from packageManager", () => {
      for (const workflow of workflows) {
        const contents = readFileSync(
          `${workflowsDirectory}/${workflow}`,
          "utf8",
        );

        for (const step of stepsOf(contents)) {
          if (!/uses:\s*pnpm\/action-setup@/.test(step)) continue;

          assert.doesNotMatch(
            step,
            /^\s*version:/m,
            `${workflow} must not pass a version to pnpm/action-setup — it reads packageManager`,
          );
        }
      }
    });
  });
});
