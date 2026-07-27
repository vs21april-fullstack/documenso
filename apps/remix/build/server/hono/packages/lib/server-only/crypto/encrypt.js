import { DOCUMENSO_ENCRYPTION_SECONDARY_KEY } from '../../constants/crypto.js';
import { symmetricEncrypt } from '../../universal/crypto.js';
import { z } from 'zod';

const ZEncryptedDataSchema = z.object({
  data: z.string(),
  expiresAt: z.number().optional()
});
/**
 * Encrypt the passed in data. This uses the secondary encrypt key for miscellaneous data.
 *
 * @returns The encrypted data.
 */
const encryptSecondaryData = ({
  data,
  expiresAt
}) => {
  if (!DOCUMENSO_ENCRYPTION_SECONDARY_KEY) {
    throw new Error('Missing encryption key');
  }
  const dataToEncrypt = {
    data,
    expiresAt
  };
  return symmetricEncrypt({
    key: DOCUMENSO_ENCRYPTION_SECONDARY_KEY,
    data: JSON.stringify(dataToEncrypt)
  });
};

export { ZEncryptedDataSchema, encryptSecondaryData };
//# sourceMappingURL=encrypt.js.map
