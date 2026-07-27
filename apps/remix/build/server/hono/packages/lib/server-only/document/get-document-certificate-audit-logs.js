import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { DOCUMENT_AUDIT_LOG_TYPE, DOCUMENT_EMAIL_TYPE } from '../../types/document-audit-logs.js';
import { parseDocumentAuditLogData } from '../../utils/document-audit-logs.js';

const getDocumentCertificateAuditLogs = async ({
  envelopeId
}) => {
  const rawAuditLogs = await prismaWithReplicas.documentAuditLog.findMany({
    where: {
      envelopeId,
      type: {
        in: [DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_COMPLETED, DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_REJECTED, DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_FIELD_INSERTED, DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_OPENED, DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT, DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_SENT]
      }
    }
  });
  const auditLogs = rawAuditLogs.map(log => parseDocumentAuditLogData(log));
  const groupedAuditLogs = {
    [DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_COMPLETED]: auditLogs.filter(log => log.type === DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_COMPLETED),
    [DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_REJECTED]: auditLogs.filter(log => log.type === DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_RECIPIENT_REJECTED),
    [DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_OPENED]: auditLogs.filter(log => log.type === DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_OPENED),
    [DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_SENT]: auditLogs.filter(log => log.type === DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_SENT),
    [DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_FIELD_INSERTED]: auditLogs.filter(log => log.type === DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_FIELD_INSERTED),
    [DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT]: auditLogs.filter(log => log.type === DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT && log.data.emailType !== DOCUMENT_EMAIL_TYPE.DOCUMENT_COMPLETED)
  };
  return groupedAuditLogs;
};

export { getDocumentCertificateAuditLogs };
//# sourceMappingURL=get-document-certificate-audit-logs.js.map
