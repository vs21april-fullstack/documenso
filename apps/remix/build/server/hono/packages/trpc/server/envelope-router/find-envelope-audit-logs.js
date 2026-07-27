import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getEnvelopeWhereInput } from '../../../lib/server-only/envelope/get-envelope-by-id.js';
import { parseDocumentAuditLogData } from '../../../lib/utils/document-audit-logs.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { findEnvelopeAuditLogsMeta, ZFindEnvelopeAuditLogsRequestSchema, ZFindEnvelopeAuditLogsResponseSchema } from './find-envelope-audit-logs.types.js';

const findEnvelopeAuditLogsRoute = authenticatedProcedure.meta(findEnvelopeAuditLogsMeta).input(ZFindEnvelopeAuditLogsRequestSchema).output(ZFindEnvelopeAuditLogsResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    envelopeId,
    page = 1,
    perPage = 50,
    orderByColumn = 'createdAt',
    orderByDirection = 'desc'
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
    type: null,
    userId: ctx.user.id,
    teamId: ctx.teamId
  });
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: envelopeWhereInput
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  // Only documents have audit logs.
  if (envelope.type !== EnvelopeType.DOCUMENT) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Templates do not have audit logs.'
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

export { findEnvelopeAuditLogsRoute };
//# sourceMappingURL=find-envelope-audit-logs.js.map
