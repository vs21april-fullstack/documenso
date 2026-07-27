import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType, DocumentSigningOrder, SigningStatus } from '@prisma/client';

async function getIsRecipientsTurnToSign({
  token
}) {
  const envelope = await prismaWithReplicas.envelope.findFirstOrThrow({
    where: {
      type: EnvelopeType.DOCUMENT,
      recipients: {
        some: {
          token
        }
      }
    },
    include: {
      documentMeta: true,
      recipients: {
        orderBy: {
          signingOrder: 'asc'
        }
      }
    }
  });
  if (envelope.documentMeta?.signingOrder !== DocumentSigningOrder.SEQUENTIAL) {
    return true;
  }
  const {
    recipients
  } = envelope;
  const currentRecipientIndex = recipients.findIndex(r => r.token === token);
  if (currentRecipientIndex === -1) {
    return false;
  }
  for (let i = 0; i < currentRecipientIndex; i++) {
    if (recipients[i].signingStatus !== SigningStatus.SIGNED) {
      return false;
    }
  }
  return true;
}

export { getIsRecipientsTurnToSign };
//# sourceMappingURL=get-is-recipient-turn.js.map
