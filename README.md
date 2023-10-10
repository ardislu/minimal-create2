# minimal-create2

This is a minimal web app to mine a specific smart contract address using [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014).

To reproduce the mining manually, see [manual.md](/manual.md).

## Local development

The project must be hosted in a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) for [`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) to work. Use [`local-web-server`](https://www.npmjs.com/package/local-web-server) to set the appropriate headers:

```
ws --cors.opener-policy same-origin --cors.embedder-policy require-corp
```

## Similar projects

- [Seaport (OpenSea)'s CREATE2 Factory](https://github.com/ProjectOpenSea/seaport/blob/main/docs/Deployment.md)
- [deterministic-deployment-proxy](https://github.com/Zoltu/deterministic-deployment-proxy)
