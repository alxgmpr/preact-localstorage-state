# Using LocalStorage for state in Preact

Experimental Preact component bundle that uses LocalStorage to manage state. Bundles to ~4.5kB.

Shows tracking a counter state via LocalStorage.

## Why is this useful?

1. Preact is smaller and lighter weight than React
2. Context requires rendering under common root and sharing same provider and can't always be used
3. Synchronous across tabs with no polling
4. Nest JSON compatible pieces of state under one LocalStorage key

## Build

Generate the bundle with:

`npm run build`

## Demo

`open index.html`
