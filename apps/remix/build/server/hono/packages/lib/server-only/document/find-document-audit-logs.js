import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { parseDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';

const findDocumentAuditLogs = async ({
  userId,
  teamId,
  documentId,
  page = 1,
  perPage = 30,
  orderBy,
  cursor,
  filterForRecentActivity
}) => {
  const orderByColumn = orderBy?.column ?? 'createdAt';
  const orderByDirection = orderBy?.direction ?? 'desc';
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'documentId',
      id: documentId
    },
    type: EnvelopeType.DOCUMENT,
    userId,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: envelopeWhereInput
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  const whereClause = {
    envelopeId: envelope.id
  };
  // Filter events down to what we consider recent activity.
  if (filterForRecentActivity) {
    whereClause.OR = [{
      type: {
        in: [DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_COMPLETED, DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_CREATED, DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_DELETED, DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_OPENED, DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_COMPLETED, DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_REJECTED, DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_SENT, DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_MOVED_TO_TEAM]
      }
    }, {
      type: DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT,
      data: {
        path: '$.isResending',
        equals: true
      }
    }];
  }
  const [data, count] = await Promise.all([prismaWithReplicas.documentAuditLog.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage + 1,
    orderBy: {
      [orderByColumn]: orderByDirection
    },
    cursor: cursor ? {
      id: cursor
    } : undefined
  }), prismaWithReplicas.documentAuditLog.count({
    where: whereClause
  })]);
  let nextCursor;
  const parsedData = data.map(auditLog => parseDocumentAuditLogData(auditLog));
  if (parsedData.length > perPage) {
    const nextItem = parsedData.pop();
    nextCursor = nextItem.id;
  }
  return {
    data: parsedData,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage),
    nextCursor
  };
};

export { findDocumentAuditLogs };
//# sourceMappingURL=find-document-audit-logs.js.map
