import { generateAvaliableRecipientPlaceholder } from '../../utils/templates.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const deleteTemplateDirectLink = async ({
  templateId,
  userId,
  teamId
}) => {
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'templateId',
      id: templateId
    },
    type: EnvelopeType.TEMPLATE,
    userId,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: envelopeWhereInput,
    include: {
      directLink: true,
      recipients: true
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
    return;
  }
  await prismaWithReplicas.$transaction(async tx => {
    await tx.recipient.update({
      where: {
        envelopeId: envelope.id,
        id: directLink.directTemplateRecipientId
      },
      data: {
        ...generateAvaliableRecipientPlaceholder(envelope.recipients)
      }
    });
    await tx.templateDirectLink.delete({
      where: {
        envelopeId: envelope.id
      }
    });
  });
};

export { deleteTemplateDirectLink };
//# sourceMappingURL=delete-template-direct-link.js.map
