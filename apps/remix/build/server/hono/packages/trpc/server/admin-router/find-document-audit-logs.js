import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { parseDocumentAuditLogData } from '../../../lib/utils/document-audit-logs.js';
import { unsafeBuildEnvelopeIdQuery } from '../../../lib/utils/envelope.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { adminProcedure } from '../trpc.js';
import { ZFindDocumentAuditLogsRequestSchema, ZFindDocumentAuditLogsResponseSchema } from './find-document-audit-logs.types.js';

const findDocumentAuditLogsRoute = adminProcedure.input(ZFindDocumentAuditLogsRequestSchema).output(ZFindDocumentAuditLogsResponseSchema).query(async ({
  input
}) => {
  const {
    envelopeId,
    page = 1,
    perPage = 50,
    orderByColumn = 'createdAt',
    orderByDirection = 'desc'
  } = input;
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: unsafeBuildEnvelopeIdQuery({
      type: 'envelopeId',
      id: envelopeId
    }, EnvelopeType.DOCUMENT)
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  const [data, count] = await Promise.all([prismaWithReplicas.documentAuditLog.findMany({
    where: {
      envelopeId: envelope.id
    },
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      [orderByColumn]: orderByDirection
    }
  }), prismaWithReplicas.documentAuditLog.count({
    where: {
      envelopeId: envelope.id
    }
  })]);
  const parsedData = data.map(auditLog => parseDocumentAuditLogData(auditLog));
  return {
    data: parsedData,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
});

export { findDocumentAuditLogsRoute };
//# sourceMappingURL=find-document-audit-logs.js.map
