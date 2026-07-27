import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { rejectDocumentOnBehalfOf } from '../../../../lib/server-only/document/reject-document-on-behalf-of.js';
import { getEnvelopeWhereInput } from '../../../../lib/server-only/envelope/get-envelope-by-id.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { authenticatedProcedure } from '../../trpc.js';
import { rejectEnvelopeRecipientOnBehalfOfMeta, ZRejectEnvelopeRecipientOnBehalfOfRequestSchema, ZRejectEnvelopeRecipientOnBehalfOfResponseSchema } from './reject-envelope-recipient-on-behalf-of.types.js';

const rejectEnvelopeRecipientOnBehalfOfRoute = authenticatedProcedure.meta(rejectEnvelopeRecipientOnBehalfOfMeta).input(ZRejectEnvelopeRecipientOnBehalfOfRequestSchema).output(ZRejectEnvelopeRecipientOnBehalfOfResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    envelopeId,
    recipientId,
    reason,
    actAsEmail
  } = input;
  ctx.logger.info({
    input: {
      envelopeId,
      recipientId
    }
  });
  // This is an external-only action: it must only be reachable through the
  // public API, never the internal app TRPC handler.
  if (ctx.metadata.source !== 'apiV2') {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'This route is only accessible via the public API'
    });
  }
  await rejectDocumentOnBehalfOf({
    envelopeId,
    recipientId,
    userId: user.id,
    teamId,
    reason,
    actAsEmail,
    requestMetadata: ctx.metadata
  });
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    type: EnvelopeType.DOCUMENT,
    userId: user.id,
    teamId
  });
  const recipient = await prismaWithReplicas.recipient.findFirstOrThrow({
    where: {
      id: recipientId,
      envelope: envelopeWhereInput
    },
    include: {
      fields: true
    }
  });
  return recipient;
});

export { rejectEnvelopeRecipientOnBehalfOfRoute };
//# sourceMappingURL=reject-envelope-recipient-on-behalf-of.js.map
