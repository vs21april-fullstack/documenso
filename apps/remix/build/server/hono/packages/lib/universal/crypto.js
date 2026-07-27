import { xchacha20poly1305 } from '@noble/ciphers/chacha';
import { hexToBytes, utf8ToBytes, bytesToHex } from '@noble/ciphers/utils';
import { managedNonce } from '@noble/ciphers/webcrypto';
import { sha256 } from '@noble/hashes/sha2';
export { sha256 } from '@noble/hashes/sha2';

const symmetricEncrypt = ({
  key,
  data
}) => {
  const keyAsBytes = sha256(key);
  const dataAsBytes = utf8ToBytes(data);
  const chacha = managedNonce(xchacha20poly1305)(keyAsBytes); // manages nonces for you
  return bytesToHex(chacha.encrypt(dataAsBytes));
};
const symmetricDecrypt = ({
  key,
  data
}) => {
  const keyAsBytes = sha256(key);
  const dataAsBytes = hexToBytes(data);
  const chacha = managedNonce(xchacha20poly1305)(keyAsBytes); // manages nonces for you
  return chacha.decrypt(dataAsBytes);
};

export { symmetricDecrypt, symmetricEncrypt };
//# sourceMappingURL=crypto.js.map
