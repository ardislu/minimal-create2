# minimal-create2

> [!IMPORTANT]
> [EIP-7997](https://eips.ethereum.org/EIPS/eip-7997) (scheduled for inclusion in [Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773), targeting [December 2026](https://forkcast.org/schedule/)) will enshrine the [`0x4e59b44847b379578588920cA78FbF26c0B4956C` factory](https://github.com/Arachnid/deterministic-deployment-proxy) into the protocol. Meaning, you can just use `0x4e59b44847b379578588920cA78FbF26c0B4956C` to deploy your contracts instead of making your own factory.

This is a minimal web app to mine a specific smart contract address using [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014).

To reproduce the mining manually, see [manual.md](/manual.md).

Code repository mirrors: [GitHub](https://github.com/ardislu/minimal-create2), [Codeberg](https://codeberg.org/ardislu/minimal-create2), [git.ardis.lu](https://git.ardis.lu/minimal-create2)

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
