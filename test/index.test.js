import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const pluginPath = path.resolve(testDirectory, "..", "index.js");

test("loads the Infisical SDK without credentials and finishes with xyOps Wire code", () => {
  const result = spawnSync(process.execPath, [pluginPath], {
    encoding: "utf8",
    input: JSON.stringify({ xy: 1, type: "event", input: { data: {} } }),
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");

  const lines = result.stdout.trimEnd().split("\n").map((line) => JSON.parse(line));
  assert.deepEqual(lines, [
    { xy: 1, data: { sdk: "infisical", client_ready: true } },
    { xy: 1, code: 0 },
  ]);
});

test("loads the Infisical SDK when xyOps supplies no stdin", () => {
  const result = spawnSync(process.execPath, [pluginPath], {
    encoding: "utf8",
    input: "",
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");

  const lines = result.stdout.trimEnd().split("\n").map((line) => JSON.parse(line));
  assert.deepEqual(lines, [
    { xy: 1, data: { sdk: "infisical", client_ready: true } },
    { xy: 1, code: 0 },
  ]);
});

test("loads the Infisical SDK when xyOps supplies non-JSON stdin", () => {
  const result = spawnSync(process.execPath, [pluginPath], {
    encoding: "utf8",
    input: "xyOps runtime envelope",
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");

  const lines = result.stdout.trimEnd().split("\n").map((line) => JSON.parse(line));
  assert.deepEqual(lines, [
    { xy: 1, data: { sdk: "infisical", client_ready: true } },
    { xy: 1, code: 0 },
  ]);
});
