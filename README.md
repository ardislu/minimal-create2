# minimal-create2

> [!NOTE]<br>
> In practice, you should use a deterministic deployment ([example](https://github.com/Arachnid/deterministic-deployment-proxy)) to create the `CREATE2` factory. This way you can deploy the same factory address across networks.

This is a minimal web app to mine a specific smart contract address using [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014).

To reproduce the mining manually, see [manual.md](/manual.md).

## Local development

The project must be hosted in a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) for [`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) to work. Use [`local-web-server`](https://www.npmjs.com/package/local-web-server) to set the appropriate headers:

```
ws --cors.opener-policy same-origin --cors.embedder-policy require-corp
```

## Similar projects

- [Seaport (OpenSea)'s CREATE2 Factory](https://github.com/ProjectOpenSea/seaport/blob/main/docs/Deployment.md)
- [Zoltu's deterministic-deployment-proxy](https://github.com/Zoltu/deterministic-deployment-proxy)
- [Arachnid's deterministic-deployment-proxy](https://github.com/Arachnid/deterministic-deployment-proxy)
- [create2deployer](https://github.com/pcaversaccio/create2deployer)
  - This smart contract (with minor modifications) is a [predeploy](https://specs.optimism.io/protocol/predeploys.html#create2deployer) at `0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2` on [OP Stack](https://docs.optimism.io/) blockchains as of the [Canyon hardfork](https://blog.oplabs.co/canyon-hardfork/) (November 2023).
- [CreateX](https://github.com/pcaversaccio/createx)
