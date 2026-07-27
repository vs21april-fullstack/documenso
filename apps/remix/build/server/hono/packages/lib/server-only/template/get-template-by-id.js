import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { mapSecondaryIdToTemplateId } from '../../utils/envelope.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const getTemplateById = async ({
  id,
  userId,
  teamId
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
      directLink: true,
      documentMeta: true,
      envelopeItems: {
        select: {
          id: true,
          envelopeId: true,
          documentData: true
        }
      },
      recipients: true,
      fields: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      folder: true
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Template not found'
    });
  }
  const firstTemplateDocumentData = envelope.envelopeItems[0].documentData;
  if (!firstTemplateDocumentData) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Template document data not found'
    });
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  const {
    envelopeItems,
    documentMeta,
    ...rest
  } = envelope;
  const legacyTemplateId = mapSecondaryIdToTemplateId(envelope.secondaryId);
  return {
    ...rest,
    envelopeId: envelope.id,
    type: envelope.templateType,
    templateDocumentDataId: firstTemplateDocumentData.id,
    templateDocumentData: {
      ...firstTemplateDocumentData,
      envelopeItemId: envelope.envelopeItems[0].id
    },
    templateMeta: {
      ...envelope.documentMeta,
      templateId: legacyTemplateId
    },
    fields: envelope.fields.map(field => ({
      ...field,
      documentId: null,
      templateId: legacyTemplateId
    })),
    recipients: envelope.recipients.map(recipient => ({
      ...recipient,
      documentId: null,
      templateId: legacyTemplateId
    })),
    directLink: envelope.directLink ? {
      ...envelope.directLink,
      templateId: legacyTemplateId
    } : null,
    id: mapSecondaryIdToTemplateId(envelope.secondaryId),
    envelopeItems: envelope.envelopeItems.map(envelopeItem => ({
      id: envelopeItem.id,
      envelopeId: envelopeItem.envelopeId
    }))
  };
};

export { getTemplateById };
//# sourceMappingURL=get-template-by-id.js.map
