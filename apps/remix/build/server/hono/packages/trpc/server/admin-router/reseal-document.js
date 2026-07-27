import { jobs } from '../../../lib/jobs/client.js';
import { unsafeGetEntireEnvelope } from '../../../lib/server-only/admin/get-entire-document.js';
import { isDocumentCompleted } from '../../../lib/utils/document.js';
import { mapSecondaryIdToDocumentId } from '../../../lib/utils/envelope.js';
import { EnvelopeType } from '@prisma/client';
import { adminProcedure } from '../trpc.js';
import { ZResealDocumentRequestSchema, ZResealDocumentResponseSchema } from './reseal-document.types.js';

const resealDocumentRoute = adminProcedure.input(ZResealDocumentRequestSchema).output(ZResealDocumentResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    id
  } = input;
  ctx.logger.info({
    input: {
      id
    }
  });
  const envelope = await unsafeGetEntireEnvelope({
    id: {
      type: 'envelopeId',
      id
    },
    type: EnvelopeType.DOCUMENT
  });
  const isResealing = isDocumentCompleted(envelope.status);
  await jobs.triggerJob({
    name: 'internal.seal-document',
    payload: {
      documentId: mapSecondaryIdToDocumentId(envelope.secondaryId),
      isResealing
    }
  });
});

export { resealDocumentRoute };
//# sourceMappingURL=reseal-document.js.map
