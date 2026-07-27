import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const getRecipientsForDocument = async ({
  documentId,
  userId,
  teamId
}) => {
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'documentId',
      id: documentId
    },
    type: EnvelopeType.DOCUMENT,
    userId,
    teamId
  });
  const recipients = await prismaWithReplicas.recipient.findMany({
    where: {
      envelope: envelopeWhereInput
    },
    orderBy: {
      id: 'asc'
    }
  });
  return recipients;
};

export { getRecipientsForDocument };
//# sourceMappingURL=get-recipients-for-document.js.map
