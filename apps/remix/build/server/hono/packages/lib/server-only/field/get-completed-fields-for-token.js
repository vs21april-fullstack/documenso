import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { SigningStatus, EnvelopeType } from '@prisma/client';

// Note: You many need to filter this on a per envelope item ID basis.
const getCompletedFieldsForToken = async ({
  token
}) => {
  return await prismaWithReplicas.field.findMany({
    where: {
      envelope: {
        type: EnvelopeType.DOCUMENT,
        recipients: {
          some: {
            token
          }
        }
      },
      recipient: {
        signingStatus: SigningStatus.SIGNED
      },
      inserted: true
    },
    include: {
      signature: true,
      recipient: {
        select: {
          name: true,
          email: true,
          signingStatus: true
        }
      }
    }
  });
};

export { getCompletedFieldsForToken };
//# sourceMappingURL=get-completed-fields-for-token.js.map
