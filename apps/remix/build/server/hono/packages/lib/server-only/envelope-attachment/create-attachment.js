import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { DocumentStatus } from '@prisma/client';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const createAttachment = async ({
  envelopeId,
  teamId,
  userId,
  data
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
  if (envelope.status === DocumentStatus.COMPLETED || envelope.status === DocumentStatus.REJECTED) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Attachments can not be modified after the document has been completed or rejected'
    });
  }
  return await prismaWithReplicas.envelopeAttachment.create({
    data: {
      envelopeId,
      type: 'link',
      ...data
    }
  });
};

export { createAttachment };
//# sourceMappingURL=create-attachment.js.map
