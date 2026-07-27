import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { DocumentStatus } from '@prisma/client';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const updateAttachment = async ({
  id,
  teamId,
  userId,
  data
}) => {
  const attachment = await prismaWithReplicas.envelopeAttachment.findFirst({
    where: {
      id
    },
    include: {
      envelope: true
    }
  });
  if (!attachment) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Attachment not found'
    });
  }
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: attachment.envelopeId
    },
    userId,
    teamId,
    type: null
  });
  // Additional validation to check the user has visibility-aware access to the envelope.
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Attachment not found'
    });
  }
  if (attachment.envelope.status === DocumentStatus.COMPLETED || attachment.envelope.status === DocumentStatus.REJECTED) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Attachments can not be modified after the document has been completed or rejected'
    });
  }
  return await prismaWithReplicas.envelopeAttachment.update({
    where: {
      id
    },
    data
  });
};

export { updateAttachment };
//# sourceMappingURL=update-attachment.js.map
