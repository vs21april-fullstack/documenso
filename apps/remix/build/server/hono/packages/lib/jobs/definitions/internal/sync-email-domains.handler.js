import { reregisterEmailDomain } from '../../../../ee/server-only/lib/reregister-email-domain.js';
import { verifyEmailDomain } from '../../../../ee/server-only/lib/verify-email-domain.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { DateTime } from 'luxon';

const BATCH_SIZE = 10;
const AUTO_REREGISTER_AFTER_HOURS = 48;
const run = async ({
  io
}) => {
  const pendingDomains = await prismaWithReplicas.emailDomain.findMany({
    where: {
      status: 'PENDING'
    },
    select: {
      id: true,
      domain: true,
      createdAt: true,
      lastVerifiedAt: true
    },
    orderBy: {
      lastVerifiedAt: {
        sort: 'asc',
        nulls: 'first'
      }
    }
  });
  if (pendingDomains.length === 0) {
    io.logger.info('No pending email domains to sync');
    return;
  }
  io.logger.info(`Found ${pendingDomains.length} pending email domains to sync`);
  let verifiedCount = 0;
  let reregisteredCount = 0;
  let errorCount = 0;
  const reregisterCutoff = DateTime.now().minus({
    hours: AUTO_REREGISTER_AFTER_HOURS
  }).toJSDate();
  for (let i = 0; i < pendingDomains.length; i += BATCH_SIZE) {
    const batch = pendingDomains.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(batch.map(async domain => {
      const shouldReregister = domain.createdAt < reregisterCutoff;
      const {
        isVerified
      } = await verifyEmailDomain(domain.id);
      if (isVerified) {
        io.logger.info(`Domain "${domain.domain}" is verified`);
        return 'verified';
      }
      if (shouldReregister) {
        io.logger.info(`Domain "${domain.domain}" has been pending since ${domain.createdAt.toISOString()}, attempting re-registration`);
        await reregisterEmailDomain({
          emailDomainId: domain.id
        });
        return 'reregistered';
      }
      return 'pending';
    }));
    for (const result of results) {
      if (result.status === 'rejected') {
        errorCount++;
        io.logger.error(`Failed to process email domain: ${String(result.reason)}`);
      } else if (result.value === 'verified') {
        verifiedCount++;
      } else if (result.value === 'reregistered') {
        reregisteredCount++;
      }
    }
    // Small delay between batches to respect SES API rate limits.
    if (i + BATCH_SIZE < pendingDomains.length) {
      await new Promise(resolve => {
        setTimeout(resolve, 1000);
      });
    }
  }
  io.logger.info(`Sync complete: ${verifiedCount} verified, ${reregisteredCount} re-registered, ${errorCount} errors out of ${pendingDomains.length} pending domains`);
};

export { run };
//# sourceMappingURL=sync-email-domains.handler.js.map
