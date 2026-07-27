import { deleteDocument } from '../../../lib/server-only/document/delete-document.js';
import { getMultipleEnvelopeWhereInput } from '../../../lib/server-only/envelope/get-envelopes-by-ids.js';
import { deleteTemplate } from '../../../lib/server-only/template/delete-template.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import pMap from 'p-map';
import { authenticatedProcedure } from '../trpc.js';
import { ZBulkDeleteEnvelopesRequestSchema, ZBulkDeleteEnvelopesResponseSchema } from './bulk-delete-envelopes.types.js';

const bulkDeleteEnvelopesRoute = authenticatedProcedure
// .meta(bulkDeleteEnvelopesMeta) // Keeping this as a private API for a little while until we're sure it's stable and the request/response schemas are finalized.
.input(ZBulkDeleteEnvelopesRequestSchema).output(ZBulkDeleteEnvelopesResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    envelopeIds
  } = input;
  ctx.logger.info({
    input: {
      envelopeIds
    }
  });
  const {
    envelopeWhereInput
  } = await getMultipleEnvelopeWhereInput({
    ids: {
      type: 'envelopeId',
      ids: envelopeIds
    },
    userId: user.id,
    teamId,
    type: null
  });
  const envelopes = await prismaWithReplicas.envelope.findMany({
    where: envelopeWhereInput,
    select: {
      id: true,
      type: true
    }
  });
  const results = await pMap(envelopes, async envelope => {
    const {
      id: envelopeId,
      type: envelopeType
    } = envelope;
    try {
      if (envelopeType === EnvelopeType.DOCUMENT) {
        await deleteDocument({
          id: {
            type: 'envelopeId',
            id: envelopeId
          },
          userId: user.id,
          teamId,
          requestMetadata: ctx.metadata
        });
      } else if (envelopeType === EnvelopeType.TEMPLATE) {
        await deleteTemplate({
          id: {
            type: 'envelopeId',
            id: envelopeId
          },
          userId: user.id,
          teamId
        });
      }
      return {
        success: true,
        envelopeId
      };
    } catch (err) {
      ctx.logger.warn({
        envelopeId,
        error: err
      }, 'Failed to delete envelope during bulk delete');
      return {
        success: false,
        envelopeId
      };
    }
  }, {
    concurrency: 10,
    stopOnError: false
  });
  const deletedCount = results.filter(r => r.success).length;
  const failedIds = results.filter(r => !r.success).map(r => r.envelopeId);
  // Include envelope IDs that were not attempted (unauthorized/not found)
  const attemptedIds = new Set(envelopes.map(e => e.id));
  const unattemptedIds = envelopeIds.filter(id => !attemptedIds.has(id));
  return {
    deletedCount,
    failedIds: [...failedIds, ...unattemptedIds]
  };
});

export { bulkDeleteEnvelopesRoute };
//# sourceMappingURL=bulk-delete-envelopes.js.map
