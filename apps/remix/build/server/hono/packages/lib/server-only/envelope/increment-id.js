import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { mapDocumentIdToSecondaryId, mapTemplateIdToSecondaryId } from '../../utils/envelope.js';

const incrementDocumentId = async () => {
  const documentIdCounter = await prismaWithReplicas.counter.update({
    where: {
      id: 'document'
    },
    data: {
      value: {
        increment: 1
      }
    }
  });
  return {
    documentId: documentIdCounter.value,
    formattedDocumentId: mapDocumentIdToSecondaryId(documentIdCounter.value)
  };
};
const incrementTemplateId = async () => {
  const templateIdCounter = await prismaWithReplicas.counter.update({
    where: {
      id: 'template'
    },
    data: {
      value: {
        increment: 1
      }
    }
  });
  return {
    templateId: templateIdCounter.value,
    formattedTemplateId: mapTemplateIdToSecondaryId(templateIdCounter.value)
  };
};

export { incrementDocumentId, incrementTemplateId };
//# sourceMappingURL=increment-id.js.map
