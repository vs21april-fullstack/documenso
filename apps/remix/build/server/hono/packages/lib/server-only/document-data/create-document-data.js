import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const createDocumentData = async ({
  type,
  data,
  initialData
}) => {
  return await prismaWithReplicas.documentData.create({
    data: {
      type,
      data,
      initialData: initialData || data
    }
  });
};

export { createDocumentData };
//# sourceMappingURL=create-document-data.js.map
