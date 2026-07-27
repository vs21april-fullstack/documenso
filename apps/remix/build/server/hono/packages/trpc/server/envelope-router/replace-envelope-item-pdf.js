import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { assertEnvelopeMutable } from '../../../lib/server-only/envelope/assert-envelope-mutable.js';
import { getEnvelopeWhereInput } from '../../../lib/server-only/envelope/get-envelope-by-id.js';
import { UNSAFE_replaceEnvelopeItemPdf } from '../../../lib/server-only/envelope-item/replace-envelope-item-pdf.js';
import { getEnvelopeItemPermissions } from '../../../lib/utils/envelope.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZReplaceEnvelopeItemPdfRequestSchema, ZReplaceEnvelopeItemPdfResponseSchema } from './replace-envelope-item-pdf.types.js';

/**
 * Keep this internal for the envelope editor.
 *
 * If we want to make this public then create a separate one that only allows
 * the PDF to be replaced & doesn't return deleted fields, etc.
 */
const replaceEnvelopeItemPdfRoute = authenticatedProcedure.input(ZReplaceEnvelopeItemPdfRequestSchema).output(ZReplaceEnvelopeItemPdfResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    user,
    teamId,
    metadata
  } = ctx;
  const {
    payload,
    file
  } = input;
  const {
    envelopeId,
    envelopeItemId,
    title
  } = payload;
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
      recipients: true,
      envelopeItems: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  assertEnvelopeMutable(envelope);
  if (envelope.internalVersion !== 2) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'PDF replacement is only supported for version 2 envelopes'
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
  const envelopeItem = envelope.envelopeItems.find(item => item.id === envelopeItemId);
  if (!envelopeItem) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope item not found'
    });
  }
  const {
    updatedItem,
    fields
  } = await UNSAFE_replaceEnvelopeItemPdf({
    envelope,
    recipients: envelope.recipients,
    envelopeItemId,
    oldDocumentDataId: envelopeItem.documentDataId,
    data: {
      file,
      title
    },
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
    apiRequestMetadata: metadata
  });
  return {
    data: updatedItem,
    fields
  };
});

export { replaceEnvelopeItemPdfRoute };
//# sourceMappingURL=replace-envelope-item-pdf.js.map
