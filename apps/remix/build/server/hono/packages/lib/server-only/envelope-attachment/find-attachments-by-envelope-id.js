import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const findAttachmentsByEnvelopeId = async ({
  envelopeId,
  userId,
  teamId
}) => {
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    userId,
    teamId,
    type: null
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput
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

export { findAttachmentsByEnvelopeId };
//# sourceMappingURL=find-attachments-by-envelope-id.js.map
