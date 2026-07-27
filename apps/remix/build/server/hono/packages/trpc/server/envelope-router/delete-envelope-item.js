import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getEnvelopeWhereInput } from '../../../lib/server-only/envelope/get-envelope-by-id.js';
import { UNSAFE_deleteEnvelopeItem } from '../../../lib/server-only/envelope-item/delete-envelope-item.js';
import { getEnvelopeItemPermissions } from '../../../lib/utils/envelope.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { ZGenericSuccessResponse } from '../schema.js';
import { authenticatedProcedure } from '../trpc.js';
import { deleteEnvelopeItemMeta, ZDeleteEnvelopeItemRequestSchema, ZDeleteEnvelopeItemResponseSchema } from './delete-envelope-item.types.js';

const deleteEnvelopeItemRoute = authenticatedProcedure.meta(deleteEnvelopeItemMeta).input(ZDeleteEnvelopeItemRequestSchema).output(ZDeleteEnvelopeItemResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    user,
    teamId,
    metadata
  } = ctx;
  const {
    envelopeId,
    envelopeItemId
  } = input;
  ctx.logger.info({
    input: {
      envelopeId,
      envelopeItemId
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
      recipients: true
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  const {
    canFileBeChanged
  } = getEnvelopeItemPermissions(envelope, envelope.recipients);
  if (!canFileBeChanged) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Envelope item is not editable'
    });
  }
  await UNSAFE_deleteEnvelopeItem({
    envelopeId,
    envelopeItemId,
    user,
    apiRequestMetadata: metadata
  });
  return ZGenericSuccessResponse;
});

export { deleteEnvelopeItemRoute };
//# sourceMappingURL=delete-envelope-item.js.map
