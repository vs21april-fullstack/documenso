import { hashString } from '../auth/hash.js';
import { encryptSecondaryData } from './encrypt.js';

const sign = data => {
  const stringified = JSON.stringify(data);
  const hashed = hashString(stringified);
  const signature = encryptSecondaryData({
    data: hashed
  });
  return signature;
};

export { sign };
//# sourceMappingURL=sign.js.map
