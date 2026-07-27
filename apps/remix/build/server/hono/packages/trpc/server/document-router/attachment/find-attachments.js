import { getEnvelopeById } from '../../../../lib/server-only/envelope/get-envelope-by-id.js';
import { findAttachmentsByEnvelopeId } from '../../../../lib/server-only/envelope-attachment/find-attachments-by-envelope-id.js';
import { EnvelopeType } from '@prisma/client';
import { authenticatedProcedure } from '../../trpc.js';
import { ZFindAttachmentsRequestSchema, ZFindAttachmentsResponseSchema } from './find-attachments.types.js';

const findAttachmentsRoute = authenticatedProcedure.meta({
  openapi: {
    method: 'GET',
    path: '/document/attachment',
    summary: 'Find attachments',
    description: 'Find all attachments for a document',
    tags: ['Document']
  }
}).input(ZFindAttachmentsRequestSchema).output(ZFindAttachmentsResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    documentId
  } = input;
  const {
    teamId
  } = ctx;
  const userId = ctx.user.id;
  ctx.logger.info({
    input: {
      documentId
    }
  });
  const envelope = await getEnvelopeById({
    id: {
      type: 'documentId',
      id: documentId
    },
    userId,
    teamId,
    type: EnvelopeType.DOCUMENT
  });
  const data = await findAttachmentsByEnvelopeId({
    envelopeId: envelope.id,
    teamId,
    userId
  });
  return {
    data
  };
});

export { findAttachmentsRoute };
//# sourceMappingURL=find-attachments.js.map
