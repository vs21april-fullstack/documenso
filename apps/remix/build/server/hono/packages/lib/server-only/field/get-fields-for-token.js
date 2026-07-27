import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { RecipientRole, EnvelopeType, SigningStatus, FieldType } from '@prisma/client';

// Note: You many need to filter this on a per envelope item ID basis.
const getFieldsForToken = async ({
  token
}) => {
  if (!token) {
    throw new Error('Missing token');
  }
  const recipient = await prismaWithReplicas.recipient.findFirst({
    where: {
      token
    }
  });
  if (!recipient) {
    return [];
  }
  if (recipient.role === RecipientRole.ASSISTANT) {
    return await prismaWithReplicas.field.findMany({
      where: {
        OR: [{
          type: {
            not: FieldType.SIGNATURE
          },
          recipient: {
            signingStatus: {
              not: SigningStatus.SIGNED
            },
            signingOrder: {
              gte: recipient.signingOrder ?? 0
            },
            envelopeId: recipient.envelopeId
          },
          envelope: {
            id: recipient.envelopeId,
            type: EnvelopeType.DOCUMENT
          }
        }, {
          recipientId: recipient.id
        }]
      },
      include: {
        signature: true
      }
    });
  }
  return await prismaWithReplicas.field.findMany({
    where: {
      recipientId: recipient.id
    },
    include: {
      signature: true
    }
  });
};

export { getFieldsForToken };
//# sourceMappingURL=get-fields-for-token.js.map
