import { findEnvelopes } from '../../../lib/server-only/envelope/find-envelopes.js';
import { authenticatedProcedure } from '../trpc.js';
import { findEnvelopesMeta, ZFindEnvelopesRequestSchema, ZFindEnvelopesResponseSchema } from './find-envelopes.types.js';

const findEnvelopesRoute = authenticatedProcedure.meta(findEnvelopesMeta).input(ZFindEnvelopesRequestSchema).output(ZFindEnvelopesResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    user,
    teamId
  } = ctx;
  const {
    query,
    type,
    templateId,
    page,
    perPage,
    orderByDirection,
    orderByColumn,
    source,
    status,
    folderId
  } = input;
  ctx.logger.info({
    input: {
      query,
      type,
      templateId,
      source,
      status,
      folderId,
      page,
      perPage
    }
  });
  return await findEnvelopes({
    userId: user.id,
    teamId,
    type,
    templateId,
    query,
    source,
    status,
    page,
    perPage,
    folderId,
    orderBy: orderByColumn ? {
      column: orderByColumn,
      direction: orderByDirection
    } : undefined,
    useWindowedCount: false
  });
});

export { findEnvelopesRoute };
//# sourceMappingURL=find-envelopes.js.map
