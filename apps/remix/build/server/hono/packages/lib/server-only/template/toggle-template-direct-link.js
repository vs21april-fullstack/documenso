import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { mapSecondaryIdToTemplateId } from '../../utils/envelope.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const toggleTemplateDirectLink = async ({
  templateId,
  userId,
  teamId,
  enabled
}) => {
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    type: EnvelopeType.TEMPLATE,
    id: {
      type: 'templateId',
      id: templateId
    },
    userId,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput,
    include: {
      recipients: true,
      directLink: true
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Template not found'
    });
  }
  const {
    directLink
  } = envelope;
  if (!directLink) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Direct template link not found'
    });
  }
  const updatedDirectLink = await prismaWithReplicas.templateDirectLink.update({
    where: {
      id: directLink.id
    },
    data: {
      envelopeId: envelope.id,
      enabled
    }
  });
  return {
    id: updatedDirectLink.id,
    token: updatedDirectLink.token,
    createdAt: updatedDirectLink.createdAt,
    enabled: updatedDirectLink.enabled,
    directTemplateRecipientId: updatedDirectLink.directTemplateRecipientId,
    templateId: mapSecondaryIdToTemplateId(envelope.secondaryId),
    envelopeId: envelope.id
  };
};

export { toggleTemplateDirectLink };
//# sourceMappingURL=toggle-template-direct-link.js.map
