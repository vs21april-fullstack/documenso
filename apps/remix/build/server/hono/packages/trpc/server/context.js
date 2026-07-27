import { getOptionalSession } from '../../auth/server/lib/utils/get-session.js';
import { alphaid } from '../../lib/universal/id.js';
import { logger } from '../../lib/utils/logger.js';
import { z } from 'zod';

const createTrpcContext = async ({
  c,
  requestSource
}) => {
  const {
    session,
    user
  } = await getOptionalSession(c);
  const req = c.req.raw;
  const res = c.res;
  const requestMetadata = c.get('context').requestMetadata;
  const metadata = {
    requestMetadata,
    source: requestSource,
    auth: null
  };
  const rawTeamId = req.headers.get('x-team-id') || undefined;
  const trpcLogger = logger.child({
    ipAddress: requestMetadata.ipAddress,
    userAgent: requestMetadata.userAgent,
    requestId: alphaid()
  });
  const teamId = z.coerce.number().optional().catch(() => undefined).parse(rawTeamId);
  if (!session || !user) {
    return {
      logger: trpcLogger,
      session: null,
      user: null,
      teamId,
      req,
      res,
      metadata
    };
  }
  return {
    logger: trpcLogger,
    session,
    user,
    teamId,
    req,
    res,
    metadata
  };
};

export { createTrpcContext };
//# sourceMappingURL=context.js.map
