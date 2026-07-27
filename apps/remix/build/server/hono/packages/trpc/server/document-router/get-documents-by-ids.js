import { getMultipleEnvelopeWhereInput } from '../../../lib/server-only/envelope/get-envelopes-by-ids.js';
import { mapEnvelopesToDocumentMany } from '../../../lib/utils/document.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { getDocumentsByIdsMeta, ZGetDocumentsByIdsRequestSchema, ZGetDocumentsByIdsResponseSchema } from './get-documents-by-ids.types.js';

const getDocumentsByIdsRoute = authenticatedProcedure.meta(getDocumentsByIdsMeta).input(ZGetDocumentsByIdsRequestSchema).output(ZGetDocumentsByIdsResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    documentIds
  } = input;
  ctx.logger.info({
    input: {
      documentIds
    }
  });
  const {
    envelopeWhereInput
  } = await getMultipleEnvelopeWhereInput({
    ids: {
      type: 'documentId',
      ids: documentIds
    },
    userId: user.id,
    teamId,
    type: EnvelopeType.DOCUMENT
  });
  const envelopes = await prismaWithReplicas.envelope.findMany({
    where: envelopeWhereInput,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      recipients: {
        orderBy: {
          id: 'asc'
        }
      },
      team: {
        select: {
          id: true,
          url: true
        }
      }
    }
  });
  return {
    data: envelopes.map(envelope => mapEnvelopesToDocumentMany(envelope))
  };
});

export { getDocumentsByIdsRoute };
//# sourceMappingURL=get-documents-by-ids.js.map
