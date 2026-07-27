import { DIRECT_TEMPLATE_RECIPIENT_EMAIL, DIRECT_TEMPLATE_RECIPIENT_NAME } from '../../constants/direct-templates.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { nanoid } from 'nanoid';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { mapSecondaryIdToTemplateId } from '../../utils/envelope.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const createTemplateDirectLink = async ({
  id,
  userId,
  teamId,
  directRecipientId
}) => {
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id,
    type: EnvelopeType.TEMPLATE,
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
  if (envelope.directLink) {
    throw new AppError(AppErrorCode.ALREADY_EXISTS, {
      message: 'Direct template already exists'
    });
  }
  if (directRecipientId && !envelope.recipients.find(recipient => recipient.id === directRecipientId)) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Recipient not found'
    });
  }
  if (!directRecipientId && envelope.recipients.find(recipient => recipient.email.toLowerCase() === DIRECT_TEMPLATE_RECIPIENT_EMAIL)) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'Cannot generate placeholder direct recipient'
    });
  }
  const createdDirectLink = await prismaWithReplicas.$transaction(async tx => {
    let recipient;
    if (directRecipientId) {
      recipient = await tx.recipient.update({
        where: {
          envelopeId: envelope.id,
          id: directRecipientId
        },
        data: {
          name: DIRECT_TEMPLATE_RECIPIENT_NAME,
          email: DIRECT_TEMPLATE_RECIPIENT_EMAIL
        }
      });
    } else {
      recipient = await tx.recipient.create({
        data: {
          envelopeId: envelope.id,
          name: DIRECT_TEMPLATE_RECIPIENT_NAME,
          email: DIRECT_TEMPLATE_RECIPIENT_EMAIL,
          token: nanoid()
        }
      });
    }
    return await tx.templateDirectLink.create({
      data: {
        envelopeId: envelope.id,
        enabled: true,
        token: nanoid(),
        directTemplateRecipientId: recipient.id
      }
    });
  });
  return {
    id: createdDirectLink.id,
    token: createdDirectLink.token,
    createdAt: createdDirectLink.createdAt,
    enabled: createdDirectLink.enabled,
    directTemplateRecipientId: createdDirectLink.directTemplateRecipientId,
    templateId: mapSecondaryIdToTemplateId(envelope.secondaryId),
    envelopeId: envelope.id
  };
};

export { createTemplateDirectLink };
//# sourceMappingURL=create-template-direct-link.js.map
