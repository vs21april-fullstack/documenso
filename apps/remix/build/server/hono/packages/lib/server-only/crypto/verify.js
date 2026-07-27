import { hashString } from '../auth/hash.js';
import { decryptSecondaryData } from './decrypt.js';

const verify = (data, signature) => {
  const stringified = JSON.stringify(data);
  const hashed = hashString(stringified);
  const decrypted = decryptSecondaryData(signature);
  return decrypted === hashed;
};

export { verify };
//# sourceMappingURL=verify.js.map
