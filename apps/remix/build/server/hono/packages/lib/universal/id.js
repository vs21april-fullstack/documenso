import { EnvelopeType } from '@prisma/client';
import { customAlphabet } from 'nanoid';
export { nanoid } from 'nanoid';
import { mapSecondaryIdToTemplateId, mapSecondaryIdToDocumentId } from '../utils/envelope.js';

const alphaid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 21);
const fancyId = customAlphabet('abcdefhiklmnorstuvwxyz', 16);
const prefixedId = (prefix, length = 16) => {
  return `${prefix}_${fancyId(length)}`;
};
const generateDatabaseId = prefix => prefixedId(prefix, 16);
const extractLegacyIds = envelope => {
  return {
    documentId: envelope.type === EnvelopeType.DOCUMENT ? mapSecondaryIdToDocumentId(envelope.secondaryId) : null,
    templateId: envelope.type === EnvelopeType.TEMPLATE ? mapSecondaryIdToTemplateId(envelope.secondaryId) : null
  };
};

export { alphaid, extractLegacyIds, fancyId, generateDatabaseId, prefixedId };
//# sourceMappingURL=id.js.map
