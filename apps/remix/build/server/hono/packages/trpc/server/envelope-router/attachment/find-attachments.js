import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { findAttachmentsByEnvelopeId } from '../../../../lib/server-only/envelope-attachment/find-attachments-by-envelope-id.js';
import { findAttachmentsByToken } from '../../../../lib/server-only/envelope-attachment/find-attachments-by-token.js';
import { maybeAuthenticatedProcedure } from '../../trpc.js';
import { findAttachmentsMeta, ZFindAttachmentsRequestSchema, ZFindAttachmentsResponseSchema } from './find-attachments.types.js';

const findAttachmentsRoute = maybeAuthenticatedProcedure.meta(findAttachmentsMeta).input(ZFindAttachmentsRequestSchema).output(ZFindAttachmentsResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    envelopeId,
    token
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  if (token) {
    const data = await findAttachmentsByToken({
      envelopeId,
      token
    });
    return {
      data
    };
  }
  const {
    teamId
  } = ctx;
  const userId = ctx.user?.id;
  if (!userId || !teamId) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You must be authenticated to access this resource'
    });
  }
  const data = await findAttachmentsByEnvelopeId({
    envelopeId,
    teamId,
    userId
  });
  return {
    data
  };
});

export { findAttachmentsRoute };
//# sourceMappingURL=find-attachments.js.map
