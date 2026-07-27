import { PDF_SIZE_A4_72PPI } from '../../../lib/constants/pdf.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getEnvelopeById } from '../../../lib/server-only/envelope/get-envelope-by-id.js';
import { generateAuditLogPdf } from '../../../lib/server-only/pdf/generate-audit-log-pdf.js';
import { EnvelopeType } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { ZDownloadDocumentAuditLogsRequestSchema, ZDownloadDocumentAuditLogsResponseSchema } from './download-document-audit-logs.types.js';

const downloadDocumentAuditLogsRoute = authenticatedProcedure.input(ZDownloadDocumentAuditLogsRequestSchema).output(ZDownloadDocumentAuditLogsResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    envelopeId
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  const envelope = await getEnvelopeById({
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    type: EnvelopeType.DOCUMENT,
    userId: ctx.user.id,
    teamId
  }).catch(() => null);
  if (!envelope) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You do not have access to this document.'
    });
  }
  const certificatePdf = await generateAuditLogPdf({
    envelope,
    recipients: envelope.recipients,
    fields: envelope.fields,
    language: envelope.documentMeta.language,
    envelopeOwner: {
      email: envelope.user.email,
      name: envelope.user.name || ''
    },
    envelopeItems: envelope.envelopeItems.map(item => item.title),
    pageWidth: PDF_SIZE_A4_72PPI.width,
    pageHeight: PDF_SIZE_A4_72PPI.height
  });
  const result = await certificatePdf.save();
  return {
    data: Buffer.from(result).toString('base64'),
    envelopeTitle: envelope.title
  };
});

export { downloadDocumentAuditLogsRoute };
//# sourceMappingURL=download-document-audit-logs.js.map
