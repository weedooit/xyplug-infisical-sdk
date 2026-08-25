import { readFile } from "node:fs/promises";

const forbiddenMarkers = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/i,
  /\b(?:ghp|gho|github_pat)_[A-Za-z0-9_]{20,}\b/,
  /\b(?:sk|xoxb|xoxp)_[A-Za-z0-9-]{16,}\b/,
];

function fail() {
  process.stderr.write("XYPDF validation failed\n");
  process.exitCode = 1;
}

const artifactPath = process.argv[2];

if (!artifactPath) {
  fail();
} else {
  try {
    const raw = await readFile(artifactPath, "utf8");
    const artifact = JSON.parse(raw);
    const plugins = artifact.items?.filter((item) => item.type === "plugin") ?? [];

    if (
      artifact.type !== "xypdf"
      || artifact.version !== "1.0"
      || plugins.length !== 1
      || plugins[0].data?.script !== ""
      || !plugins[0].data?.command?.startsWith("npx -y ")
      || forbiddenMarkers.some((pattern) => pattern.test(raw))
    ) {
      fail();
    } else {
      process.stdout.write(`${JSON.stringify({ status: "ready", plugin_count: plugins.length })}\n`);
    }
  } catch {
    fail();
  }
}
