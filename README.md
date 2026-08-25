# Infisical SDK Smoke Plugin

This private xyOps Event Plugin verifies that the Infisical JavaScript SDK can
load in the xySat Node.js runtime. It validates a minimal xyOps Event input,
creates the SDK client surface, and returns compact xyOps Wire Protocol JSON.

It does not authenticate, read secrets, write secrets, or send network
requests.

## Runtime requirements

- Node.js 20 or later
- `npx`
- `git`
- Read-only GitHub SSH access to this private repository

The runtime deploy key is infrastructure configuration. It is never stored in
this repository or in `xyops.json`.

## xyOps portable definition

`xyops.json` is a small XYPDF definition. Its Plugin command is pinned to the
`v0.1.0` Git tag and its `script` field is intentionally empty:

```text
npx -y git+ssh://git@github.com/weedooit/xyplug-infisical-sdk.git#v0.1.0
```

The SDK and its dependencies are installed by `npx` when a Job runs. They are
not embedded in the XYPDF.

## Local verification

```text
npm install --ignore-scripts --no-package-lock
npm test
```

The tests use a synthetic xyOps Event input and do not contact Infisical.
