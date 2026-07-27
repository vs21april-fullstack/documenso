import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { DateTime } from 'luxon';

const BATCH_SIZE = 10_000;
const run = async ({
  io
}) => {
  const cutoff = DateTime.now().minus({
    hours: 24
  }).toJSDate();
  let totalDeleted = 0;
  let deleted = 0;
  do {
    // Prisma doesn't support DELETE with LIMIT, so use MySQL raw SQL for batching.
    deleted = await prismaWithReplicas.$executeRaw`
      DELETE FROM RateLimit
      WHERE createdAt < ${cutoff}
      LIMIT ${BATCH_SIZE}
    `;
    totalDeleted += deleted;
  } while (deleted >= BATCH_SIZE);
  if (totalDeleted > 0) {
    io.logger.info(`Cleaned up ${totalDeleted} expired rate limit entries`);
  } else {
    io.logger.info('No expired rate limit entries to clean up');
  }
};

export { run };
//# sourceMappingURL=cleanup-rate-limits.handler.js.map
