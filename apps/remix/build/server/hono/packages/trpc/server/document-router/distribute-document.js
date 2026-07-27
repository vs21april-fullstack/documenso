import { sendDocument } from '../../../lib/server-only/document/send-document.js';
import { updateDocumentMeta } from '../../../lib/server-only/document-meta/upsert-document-meta.js';
import { mapEnvelopeToDocumentLite } from '../../../lib/utils/document.js';
import { authenticatedProcedure } from '../trpc.js';
import { distributeDocumentMeta, ZDistributeDocumentRequestSchema, ZDistributeDocumentResponseSchema } from './distribute-document.types.js';

const distributeDocumentRoute = authenticatedProcedure.meta(distributeDocumentMeta).input(ZDistributeDocumentRequestSchema).output(ZDistributeDocumentResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    documentId,
    meta = {}
  } = input;
  ctx.logger.info({
    input: {
      documentId
    }
  });
  if (Object.values(meta).length > 0) {
    await updateDocumentMeta({
      userId: ctx.user.id,
      teamId,
      id: {
        type: 'documentId',
        id: documentId
      },
      subject: meta.subject,
      message: meta.message,
      dateFormat: meta.dateFormat,
      timezone: meta.timezone,
      redirectUrl: meta.redirectUrl,
      distributionMethod: meta.distributionMethod,
      emailSettings: meta.emailSettings ?? undefined,
      language: meta.language,
      emailId: meta.emailId,
      emailReplyTo: meta.emailReplyTo,
      requestMetadata: ctx.metadata
    });
  }
  const envelope = await sendDocument({
    userId: ctx.user.id,
    id: {
      type: 'documentId',
      id: documentId
    },
    teamId,
    requestMetadata: ctx.metadata
  });
  return mapEnvelopeToDocumentLite(envelope);
});

export { distributeDocumentRoute };
//# sourceMappingURL=distribute-document.js.map
