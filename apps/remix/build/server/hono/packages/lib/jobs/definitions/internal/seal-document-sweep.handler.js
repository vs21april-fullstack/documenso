import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { EnvelopeType, DocumentStatus, SigningStatus, RecipientRole } from '@prisma/client';
import { DateTime } from 'luxon';
import { mapSecondaryIdToDocumentId } from '../../../utils/envelope.js';
import { jobs } from '../../client.js';

const run = async ({
  io
}) => {
  const now = DateTime.now();
  const fifteenMinutesAgo = now.minus({
    minutes: 15
  }).toJSDate();
  const sixHoursAgo = now.minus({
    hours: 6
  }).toJSDate();
  // Find all PENDING envelopes that should have been sealed but weren't.
  //
  // A document is ready to seal when either:
  //   1. All recipients are SIGNED or have role CC (normal completion)
  //   2. Any recipient has REJECTED (rejection triggers immediate seal)
  //
  // We only look at documents where the last action was between 15 minutes
  // and 6 hours ago. The lower bound avoids racing with the normal seal-document
  // job that fires on completion. The upper bound stops us from endlessly retrying
  // documents that are stuck due to a deeper issue (e.g. corrupt PDF).
  // Fetch a bounded set and evaluate the recipient predicates in application code.
  // This avoids Kysely emitting PostgreSQL-style nested NOT EXISTS SQL that is not
  // accepted by MariaDB/MySQL.
  const candidates = await prismaWithReplicas.envelope.findMany({
    where: {
      status: DocumentStatus.PENDING,
      type: EnvelopeType.DOCUMENT,
      deletedAt: null,
      recipients: {
        some: {
          signedAt: {
            gt: sixHoursAgo
          }
        }
      }
    },
    select: {
      id: true,
      secondaryId: true,
      recipients: {
        select: {
          role: true,
          signedAt: true,
          signingStatus: true
        }
      }
    },
    take: 500
  });
  const unsealedEnvelopes = candidates.filter(({
    recipients
  }) => {
    const isReadyToSeal = recipients.every(recipient => recipient.signingStatus === SigningStatus.SIGNED || recipient.role === RecipientRole.CC) || recipients.some(recipient => recipient.signingStatus === SigningStatus.REJECTED);
    const hasRecentActivity = recipients.some(recipient => recipient.signedAt !== null && recipient.signedAt > fifteenMinutesAgo);
    return isReadyToSeal && !hasRecentActivity;
  }).slice(0, 100);
  if (unsealedEnvelopes.length === 0) {
    io.logger.info('No unsealed documents found');
    return;
  }
  io.logger.info(`Found ${unsealedEnvelopes.length} unsealed documents`);
  await Promise.allSettled(unsealedEnvelopes.map(async envelope => {
    const documentId = mapSecondaryIdToDocumentId(envelope.secondaryId);
    io.logger.info(`Triggering seal for document ${documentId} (${envelope.id})`);
    await jobs.triggerJob({
      name: 'internal.seal-document',
      payload: {
        documentId,
        isResealing: true
      }
    });
  }));
};

export { run };
//# sourceMappingURL=seal-document-sweep.handler.js.map
