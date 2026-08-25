#!/usr/bin/env node

import process from "node:process";

function writeWire(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

function readStandardInput() {
  return new Promise((resolve, reject) => {
    let input = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      input += chunk;
    });
    process.stdin.on("end", () => resolve(input));
    process.stdin.on("error", reject);
  });
}

function validateEvent(input) {
  const event = JSON.parse(input);
  if (
    event?.xy !== 1
    || event.type !== "event"
    || event.input?.data === null
    || typeof event.input?.data !== "object"
    || Array.isArray(event.input.data)
  ) {
    throw new Error("invalid event");
  }
}

async function run() {
  try {
    validateEvent(await readStandardInput());
  } catch {
    writeWire({ xy: 1, code: "VALIDATION_FAILED", description: "Input validation failed" });
    process.exitCode = 1;
    return;
  }

  try {
    const { InfisicalSDK } = await import("@infisical/sdk");
    const client = new InfisicalSDK();

    if (typeof client.secrets !== "function" || !client.secrets()) {
      throw new Error("SDK client surface is unavailable");
    }

    writeWire({ xy: 1, data: { sdk: "infisical", client_ready: true } });
    writeWire({ xy: 1, code: 0 });
  } catch {
    writeWire({ xy: 1, code: "SDK_LOAD_FAILED", description: "Third-party SDK could not load" });
    process.exitCode = 1;
  }
}

void run();
