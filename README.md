# Infisical Package Load (GitHub npx)

This public GitHub xyOps Event Plugin verifies that the Infisical JavaScript SDK can
load in the xySat Node.js runtime. It accepts either a minimal xyOps Event
input or no input for the direct `npx` smoke-test path, creates the SDK client
surface, and returns compact xyOps Wire Protocol JSON.

It does not authenticate, read secrets, write secrets, or send network
requests.

## Runtime requirements

- Node.js 20 or later
- `npx`
- `git`
- Public GitHub read access

## xyOps portable definition

`xyops.json` is a small XYPDF definition. Its Plugin command is pinned to the
`v0.1.3` Git tag and its `script` field is intentionally empty:

```text
npx -y github:weedooit/xyplug-infisical-sdk#v0.1.3
```

The SDK and its dependencies are installed by `npx` when a Job runs. They are
not embedded in the XYPDF.

## Local verification

```text
npm install --ignore-scripts --no-package-lock
npm test
```

The tests cover both a synthetic xyOps Event input and an empty standard input.
They do not contact Infisical.
