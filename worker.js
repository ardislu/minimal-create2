import { keccak256 } from '/keccak256.js';

function arrToStr(arr) {
  return [...arr].map(v => v.toString(16).padStart(2, '0')).join('');
}

addEventListener('message', async e => {
  const { factory, hashedBytecode, requirement, saltSab } = e.data;

  // Hardcoded to use the last bytes so that the first bytes may be used for vanity function signatures.
  // BigUint64Array is the largest typed array in JS. Max salt is 2n ** 64n - 1n === 18446744073709551615n.
  const saltIndex = 3;
  const saltArray = new BigUint64Array(saltSab); // Shared buffer
  while (true) {
    const salt = Atomics.add(saltArray, saltIndex, 1n);
    const b64 = saltArray.slice(); // Clones into a new, non-shared buffer
    b64[saltIndex] = salt;
    const newSaltArray = new Uint8Array(b64.buffer); // Uint8Array required for hashing and presentation

    const addrBytes = new Uint8Array([0xff, ...factory, ...newSaltArray, ...hashedBytecode]);
    const addr = `0x${arrToStr(keccak256(addrBytes)).substring(24)}`;
    if (requirement.test(addr)) {
      postMessage({ newSaltArray, addr });
    }
  }
});
