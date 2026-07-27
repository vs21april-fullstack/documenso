import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { DocumentStatus, SigningStatus } from '@prisma/client';
import { jobs } from '../../client.js';

const run = async ({
  io
}) => {
  const now = new Date();
  const expiredRecipients = await prismaWithReplicas.recipient.findMany({
    where: {
      expiresAt: {
        lte: now
      },
      expirationNotifiedAt: null,
      signingStatus: {
        notIn: [SigningStatus.SIGNED, SigningStatus.REJECTED]
      },
      envelope: {
        status: DocumentStatus.PENDING
      }
    },
    select: {
      id: true
    },
    take: 1000 // Limit to 1000 to avoid long-running jobs. Will be picked up in the next run if there are more.
  });
  if (expiredRecipients.length === 0) {
    io.logger.info('No expired recipients found');
    return;
  }
  io.logger.info(`Found ${expiredRecipients.length} expired recipients`);
  await Promise.allSettled(expiredRecipients.map(async recipient => {
    await jobs.triggerJob({
      name: 'internal.process-recipient-expired',
      payload: {
        recipientId: recipient.id
      }
    });
  }));
};

export { run };
//# sourceMappingURL=expire-recipients-sweep.handler.js.map
