import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageDirectory = path.resolve(testDirectory, "..");

test("ships a pinned NPX XYPDF without an embedded SDK bundle", () => {
  const manifest = JSON.parse(readFileSync(path.join(packageDirectory, "xyops.json"), "utf8"));
  const plugin = manifest.items.find((item) => item.type === "plugin").data;

  assert.equal(manifest.type, "xypdf");
  assert.equal(manifest.version, "1.0");
  assert.equal(manifest.xyops, "1.0.92");
  assert.equal(plugin.command, "npx -y git+ssh://git@github.com/weedooit/xyplug-infisical-sdk.git#v0.1.0");
  assert.equal(plugin.script, "");
});
