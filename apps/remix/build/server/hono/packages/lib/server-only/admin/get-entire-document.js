import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { unsafeBuildEnvelopeIdQuery } from '../../utils/envelope.js';

/**
 * An unauthenticated function that returns the whole envelope
 */
const unsafeGetEntireEnvelope = async ({
  id,
  type
}) => {
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: unsafeBuildEnvelopeIdQuery(id, type),
    include: {
      documentMeta: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      recipients: {
        include: {
          fields: {
            include: {
              signature: true
            }
          }
        }
      }
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  return envelope;
};

export { unsafeGetEntireEnvelope };
//# sourceMappingURL=get-entire-document.js.map
