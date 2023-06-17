# minimal-create2

This is the minimal amount of code required to mine a smart contract address using `CREATE2`.

## Create the `CREATE2` deployment factory

Create a new smart contract with the minimum amount of code required to call `CREATE2` by pasting this code into DevTools (assuming Metamask is installed):

```javascript
await ethereum.request({
  method: 'eth_sendTransaction',
  params: [{
    from: (await ethereum.request({ method: 'eth_requestAccounts' }))[0], // Your currently active MetaMask address
    data: '0x6d365f5f375f516020360360205ff55f52600e6012f3' // create2-deployment.evm, compiled
  }]
});
```

`create2-deployment.evm` contains bytecode that deploys `create2.evm`. `create2.evm` is a minimal smart contract written in EVM assembly which expects a 32-byte salt and arbitrary bytecode in its calldata and deploys the bytecode using the `CREATE2` opcode.

**Important**: If you want the same `CREATE2` contract address *across chains*, you should use a fresh EOA with no prior transactions to create this deployment factory. Otherwise, the deployment factories will have different addresses and will output different `CREATE2` addresses.

## Mine the desired `CREATE2` address

Simple example of predicting the `CREATE2` address:

```javascript
const ethers = await import('https://cdn.jsdelivr.net/npm/ethers@6.6.0/+esm');

// The smart contract you deployed in "Create the CREATE2 deployment factory"
const factory = '0x8137a81A74E2a9d510898B2e3E307e7C33eBad8A';

// Salt must be hex and exactly 32 bytes
const salt = '0x0000000000000000000000000000000000000000000000000000000000000123';

// Must be the entire creation bytecode, including constructor arguments
const bytecode = '0x385f818153f3'; // minimal-contract-deployment.evm, compiled

ethers.getCreate2Address(factory, salt, ethers.keccak256(bytecode));
// 0xD7ada5e4De61a3c14994046d349d90F7ae693433
```

Example of mining a specific smart contract address by testing different `salt` values:

```javascript
const ethers = await import('https://cdn.jsdelivr.net/npm/ethers@6.6.0/+esm');

// The smart contract you deployed in "Create the CREATE2 deployment factory"
const factory = '0x8137a81A74E2a9d510898B2e3E307e7C33eBad8A';

// Must be the entire creation bytecode, including constructor arguments
const bytecode = '0x385f818153f3'; // minimal-contract-deployment.evm, compiled

const requirement = /^0xbeef/;

let salt = 1;
while (true) {
  const paddedSalt = `0x${salt.toString(16).padStart(64, '0')}`;
  const addr = ethers.getCreate2Address(factory, paddedSalt, ethers.keccak256(bytecode));
  if (requirement.test(addr)) {
    console.log({factory, paddedSalt, bytecode, addr});
    break;
  }
  salt++;
}
// {factory: '0x8137a81A74E2a9d510898B2e3E307e7C33eBad8A', paddedSalt: '0x000000000000000000000000000000000000000000000000000000000005c342', bytecode: '0x385f818153f3', addr: '0xbeef7906063D950306868AF5af36955015110f84'}
```

## Using the mined `salt`

Once a desired `CREATE2` address has been mined, you can deploy it by sending the mined `salt` parameter to the smart contract deployed in "Create the `CREATE2` deployment factory".

```javascript
// Same parameters from "Mine the desired CREATE2 address"
const factory = '8137a81A74E2a9d510898B2e3E307e7C33eBad8A'; // Drop "0x" prefix
const salt = '000000000000000000000000000000000000000000000000000000000005c342'; // Drop "0x" prefix
const bytecode = '385f818153f3'; // Drop "0x" prefix

await ethereum.request({
  method: 'eth_sendTransaction',
  params: [{
    from: (await ethereum.request({ method: 'eth_requestAccounts' }))[0], // Your currently active MetaMask address
    to: `0x${factory}`,
    data: `0x${salt}${bytecode}`
  }]
});
// Smart contract is deployed as 0xbeef7906063D950306868AF5af36955015110f84, as predicted
```
