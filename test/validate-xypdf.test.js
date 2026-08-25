import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageDirectory = path.resolve(testDirectory, "..");
const validatorPath = path.join(packageDirectory, "scripts", "validate-xypdf.mjs");

test("rejects an XYPDF that embeds a private-key marker without echoing it", () => {
  const temporaryDirectory = mkdtempSync(path.join(os.tmpdir(), "xyplug-xypdf-"));
  const artifactPath = path.join(temporaryDirectory, "unsafe.json");

  writeFileSync(artifactPath, JSON.stringify({
    type: "xypdf",
    version: "1.0",
    items: [{ type: "plugin", data: { command: "node", script: "-----BEGIN OPENSSH PRIVATE KEY-----" } }],
  }), "utf8");

  try {
    const result = spawnSync(process.execPath, [validatorPath, artifactPath], { encoding: "utf8" });

    assert.equal(result.status, 1);
    assert.match(result.stderr, /XYPDF validation failed/);
    assert.doesNotMatch(result.stderr, /BEGIN OPENSSH PRIVATE KEY/);
  } finally {
    rmSync(temporaryDirectory, { force: true, recursive: true });
  }
});
