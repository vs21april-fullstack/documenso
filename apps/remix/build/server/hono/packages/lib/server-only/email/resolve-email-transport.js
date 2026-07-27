import { buildTransport } from '../../../email/transports/build-transport.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { logger } from '../../utils/logger.js';
import { decryptEmailTransportConfig } from './email-transport-config.js';

/**
 * Loads an EmailTransport row, decrypts its config and builds a nodemailer
 * Transporter. Returns null when the id does not resolve or the stored config
 * cannot be decrypted/built (caller should fall back to the env mailer).
 */
const resolveEmailTransport = async emailTransportId => {
  const row = await prismaWithReplicas.emailTransport.findUnique({
    where: {
      id: emailTransportId
    }
  });
  if (!row) {
    return null;
  }
  try {
    const config = decryptEmailTransportConfig(row.config);
    const transporter = buildTransport(config);
    return {
      row,
      transporter
    };
  } catch (err) {
    // Todo: Logging
    logger.error({
      msg: 'Failed to decrypt or build the configured email transport',
      err,
      emailTransportId
    });
    return null;
  }
};

export { resolveEmailTransport };
//# sourceMappingURL=resolve-email-transport.js.map
