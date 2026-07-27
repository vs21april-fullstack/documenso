import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetDocumentByTokenRequestSchema, ZGetDocumentByTokenResponseSchema } from './get-document-by-token.types.js';

const getDocumentByTokenRoute = authenticatedProcedure.input(ZGetDocumentByTokenRequestSchema).output(ZGetDocumentByTokenResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    token
  } = input;
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      type: EnvelopeType.DOCUMENT,
      recipients: {
        some: {
          token,
          email: ctx.user.email
        }
      }
    },
    include: {
      envelopeItems: {
        include: {
          documentData: true
        }
      }
    }
  });
  const firstDocumentData = envelope?.envelopeItems[0].documentData;
  if (!envelope || !firstDocumentData) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Document not found'
    });
  }
  if (envelope.envelopeItems.length !== 1) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'This endpoint does not support multiple items'
    });
  }
  ctx.logger.info({
    documentId: envelope.id
  });
  return {
    documentData: firstDocumentData
  };
});

export { getDocumentByTokenRoute };
//# sourceMappingURL=get-document-by-token.js.map
