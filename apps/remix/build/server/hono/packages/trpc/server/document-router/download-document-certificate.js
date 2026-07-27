import { PDF_SIZE_A4_72PPI } from '../../../lib/constants/pdf.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getEnvelopeWhereInput } from '../../../lib/server-only/envelope/get-envelope-by-id.js';
import { generateCertificatePdf } from '../../../lib/server-only/pdf/generate-certificate-pdf.js';
import { isDocumentCompleted } from '../../../lib/utils/document.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType, DocumentStatus } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { ZDownloadDocumentCertificateRequestSchema, ZDownloadDocumentCertificateResponseSchema } from './download-document-certificate.types.js';

const downloadDocumentCertificateRoute = authenticatedProcedure.input(ZDownloadDocumentCertificateRequestSchema).output(ZDownloadDocumentCertificateResponseSchema).mutation(async ({
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
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    type: EnvelopeType.DOCUMENT,
    userId: ctx.user.id,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput,
    include: {
      recipients: true,
      fields: {
        include: {
          signature: true
        }
      },
      documentMeta: true,
      user: {
        select: {
          email: true,
          name: true
        }
      }
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  // A cancelled document was never sealed/completed, so a signing certificate
  // must not be generated for it. REJECTED and COMPLETED keep their prior behavior.
  if (!isDocumentCompleted(envelope.status) || envelope.status === DocumentStatus.CANCELLED) {
    throw new AppError('DOCUMENT_NOT_COMPLETE');
  }
  const certificatePdf = await generateCertificatePdf({
    envelope,
    recipients: envelope.recipients,
    fields: envelope.fields,
    language: envelope.documentMeta.language,
    envelopeOwner: {
      email: envelope.user.email,
      name: envelope.user.name || ''
    },
    pageWidth: PDF_SIZE_A4_72PPI.width,
    pageHeight: PDF_SIZE_A4_72PPI.height
  });
  const result = await certificatePdf.save();
  return {
    data: Buffer.from(result).toString('base64'),
    envelopeTitle: envelope.title
  };
});

export { downloadDocumentCertificateRoute };
//# sourceMappingURL=download-document-certificate.js.map
