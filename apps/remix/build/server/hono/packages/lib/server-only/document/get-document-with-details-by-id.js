import { EnvelopeType } from '@prisma/client';
import { mapSecondaryIdToDocumentId } from '../../utils/envelope.js';
import { getEnvelopeById } from '../envelope/get-envelope-by-id.js';

const getDocumentWithDetailsById = async ({
  id,
  userId,
  teamId
}) => {
  const envelope = await getEnvelopeById({
    id,
    type: EnvelopeType.DOCUMENT,
    userId,
    teamId
  });
  const legacyDocumentId = mapSecondaryIdToDocumentId(envelope.secondaryId);
  const firstDocumentData = envelope.envelopeItems[0].documentData;
  if (!firstDocumentData) {
    throw new Error('Document data not found');
  }
  return {
    ...envelope,
    envelopeId: envelope.id,
    internalVersion: envelope.internalVersion,
    documentData: {
      ...firstDocumentData,
      envelopeItemId: envelope.envelopeItems[0].id
    },
    id: legacyDocumentId,
    fields: envelope.fields.map(field => ({
      ...field,
      documentId: legacyDocumentId,
      templateId: null
    })),
    user: {
      id: envelope.userId,
      name: envelope.user.name,
      email: envelope.user.email
    },
    team: {
      id: envelope.teamId,
      url: envelope.team.url
    },
    recipients: envelope.recipients.map(recipient => ({
      ...recipient,
      documentId: legacyDocumentId,
      templateId: null
    })),
    documentDataId: firstDocumentData.id,
    documentMeta: {
      ...envelope.documentMeta,
      documentId: legacyDocumentId,
      password: null
    },
    envelopeItems: envelope.envelopeItems.map(envelopeItem => ({
      ...envelopeItem
    }))
  };
};

export { getDocumentWithDetailsById };
//# sourceMappingURL=get-document-with-details-by-id.js.map
