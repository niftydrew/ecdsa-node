const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require('ethereum-cryptography/keccak');

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);

function getAddress(publicKey) {
  return keccak256(publicKey.slice(1)).slice(-20);
}

console.log("Private key:", toHex(privateKey));
console.log("Public key:", toHex(publicKey));