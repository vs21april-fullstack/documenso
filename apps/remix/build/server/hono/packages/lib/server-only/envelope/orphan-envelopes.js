import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { DocumentStatus, EnvelopeType } from '@prisma/client';
import { deletedAccountServiceAccount } from '../user/service-accounts/deleted-account.js';

const orphanEnvelopes = async ({
  teamId
}) => {
  const serviceAccount = await deletedAccountServiceAccount();
  // Transfer all inflight and completed envelopes to the service account.
  await prismaWithReplicas.envelope.updateMany({
    where: {
      teamId,
      type: EnvelopeType.DOCUMENT,
      status: {
        in: [DocumentStatus.PENDING, DocumentStatus.REJECTED, DocumentStatus.COMPLETED]
      },
      deletedAt: null
    },
    data: {
      userId: serviceAccount.id,
      teamId: serviceAccount.ownedOrganisations[0].teams[0].id,
      deletedAt: new Date()
    }
  });
  // Transfer any remaining deleted envelopes to the service account.
  await prismaWithReplicas.envelope.updateMany({
    where: {
      teamId,
      type: EnvelopeType.DOCUMENT,
      status: {
        in: [DocumentStatus.PENDING, DocumentStatus.REJECTED, DocumentStatus.COMPLETED]
      }
    },
    data: {
      userId: serviceAccount.id,
      teamId: serviceAccount.ownedOrganisations[0].teams[0].id
    }
  });
  // Then delete anything remaining across documents and templates.
  await prismaWithReplicas.envelope.deleteMany({
    where: {
      teamId
    }
  });
};

export { orphanEnvelopes };
//# sourceMappingURL=orphan-envelopes.js.map
