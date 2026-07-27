import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { mapSecondaryIdToTemplateId, mapSecondaryIdToDocumentId } from '../../utils/envelope.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

/**
 * Get a recipient by ID. This will also return the recipient signing token so
 * be careful when using this.
 */
const getRecipientById = async ({
  recipientId,
  userId,
  teamId,
  type
}) => {
  const recipient = await prismaWithReplicas.recipient.findFirst({
    where: {
      id: recipientId,
      envelope: {
        type,
        team: buildTeamWhereQuery({
          teamId,
          userId
        })
      }
    },
    include: {
      fields: true,
      envelope: {
        select: {
          secondaryId: true
        }
      }
    }
  });
  if (!recipient) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Recipient not found'
    });
  }
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: recipient.envelopeId
    },
    type,
    userId,
    teamId
  });
  // Additional validation to check visibility.
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: envelopeWhereInput
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Recipient not found'
    });
  }
  const legacyId = {
    documentId: type === EnvelopeType.DOCUMENT ? mapSecondaryIdToDocumentId(recipient.envelope.secondaryId) : null,
    templateId: type === EnvelopeType.TEMPLATE ? mapSecondaryIdToTemplateId(recipient.envelope.secondaryId) : null
  };
  // Backwards compatibility mapping.
  return {
    ...recipient,
    ...legacyId,
    // eslint-disable-next-line unused-imports/no-unused-vars
    fields: recipient.fields.map(field => ({
      ...field,
      ...legacyId
    }))
  };
};

export { getRecipientById };
//# sourceMappingURL=get-recipient-by-id.js.map
