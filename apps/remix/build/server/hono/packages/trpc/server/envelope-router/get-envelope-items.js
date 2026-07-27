import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getEnvelopeWhereInput } from '../../../lib/server-only/envelope/get-envelope-by-id.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetEnvelopeItemsRequestSchema, ZGetEnvelopeItemsResponseSchema } from './get-envelope-items.types.js';

// Not intended for V2 API usage.
const getEnvelopeItemsRoute = authenticatedProcedure.input(ZGetEnvelopeItemsRequestSchema).output(ZGetEnvelopeItemsResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    envelopeId
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    type: null,
    userId: user.id,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: envelopeWhereInput,
    include: {
      envelopeItems: {
        include: {
          documentData: true
        }
      }
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope could not be found'
    });
  }
  return {
    data: envelope.envelopeItems
  };
});

export { getEnvelopeItemsRoute };
//# sourceMappingURL=get-envelope-items.js.map
