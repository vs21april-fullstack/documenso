import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const findAttachmentsByToken = async ({
  envelopeId,
  token
}) => {
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      id: envelopeId,
      recipients: {
        some: {
          token
        }
      }
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  return await prismaWithReplicas.envelopeAttachment.findMany({
    where: {
      envelopeId
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
};

export { findAttachmentsByToken };
//# sourceMappingURL=find-attachments-by-token.js.map
