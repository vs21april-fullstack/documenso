import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { DocumentStatus, RecipientRole, SendStatus, SigningStatus } from '@prisma/client';
import { jobs } from '../../client.js';

const run = async ({
  io
}) => {
  const now = new Date();
  const recipients = await prismaWithReplicas.recipient.findMany({
    where: {
      nextReminderAt: {
        lte: now
      },
      signingStatus: SigningStatus.NOT_SIGNED,
      sendStatus: SendStatus.SENT,
      role: {
        not: RecipientRole.CC
      },
      // Skip recipients whose signing deadline has passed. `expiresAt`
      // is the source of truth — the expiration sweep asynchronously
      // sets `expirationNotifiedAt`, so filtering on `expiresAt` also
      // covers the window before the expiration sweep runs.
      OR: [{
        expiresAt: null
      }, {
        expiresAt: {
          gt: now
        }
      }],
      envelope: {
        status: DocumentStatus.PENDING,
        deletedAt: null
      }
    },
    select: {
      id: true
    },
    take: 1000
  });
  if (recipients.length === 0) {
    io.logger.info('No recipients need signing reminders');
    return;
  }
  io.logger.info(`Found ${recipients.length} recipients needing signing reminders`);
  await Promise.allSettled(recipients.map(async recipient => {
    await jobs.triggerJob({
      name: 'internal.process-signing-reminder',
      payload: {
        recipientId: recipient.id
      }
    });
  }));
};

export { run };
//# sourceMappingURL=send-signing-reminders-sweep.handler.js.map
