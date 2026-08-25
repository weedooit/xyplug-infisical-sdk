import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageDirectory = path.resolve(testDirectory, "..");

test("declares one NPX executable and pins the Infisical SDK", () => {
  const manifest = JSON.parse(readFileSync(path.join(packageDirectory, "package.json"), "utf8"));

  assert.equal(manifest.name, "xyplug-infisical-sdk");
  assert.equal(manifest.version, "0.1.4");
  assert.equal(manifest.private, true);
  assert.equal(manifest.bin["xyplug-infisical-sdk"], "./index.js");
  assert.equal(manifest.dependencies["@infisical/sdk"], "5.0.2");
});
