import '@node-rs/bcrypt';
import crypto from 'crypto';
import '../../constants/auth.js';

const hashString = input => {
  return crypto.createHash('sha512').update(input).digest('hex');
};

export { hashString };
//# sourceMappingURL=hash.js.map
