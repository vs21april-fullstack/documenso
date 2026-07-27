import { PDF_SIZE_A4_72PPI } from '../../../lib/constants/pdf.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { generateAuditLogPdf } from '../../../lib/server-only/pdf/generate-audit-log-pdf.js';
import { unsafeBuildEnvelopeIdQuery } from '../../../lib/utils/envelope.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { adminProcedure } from '../trpc.js';
import { ZAdminDownloadDocumentAuditLogsRequestSchema, ZAdminDownloadDocumentAuditLogsResponseSchema } from './download-document-audit-logs.types.js';

const downloadDocumentAuditLogsRoute = adminProcedure.input(ZAdminDownloadDocumentAuditLogsRequestSchema).output(ZAdminDownloadDocumentAuditLogsResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    envelopeId
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: unsafeBuildEnvelopeIdQuery({
      type: 'envelopeId',
      id: envelopeId
    }, EnvelopeType.DOCUMENT),
    include: {
      documentMeta: true,
      envelopeItems: true,
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
      fields: true
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  const auditLogPdf = await generateAuditLogPdf({
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
  const result = await auditLogPdf.save();
  const base64 = Buffer.from(result).toString('base64');
  return {
    data: base64,
    envelopeTitle: envelope.title
  };
});

export { downloadDocumentAuditLogsRoute };
//# sourceMappingURL=download-document-audit-logs.js.map
