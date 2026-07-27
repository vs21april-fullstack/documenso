import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const UNSAFE_updateEnvelopeItems = async ({
  envelopeId,
  envelopeType,
  existingEnvelopeItems,
  data,
  user,
  apiRequestMetadata
}) => {
  const updatedEnvelopeItems = await Promise.all(data.map(async ({
    envelopeItemId,
    order,
    title
  }) => prismaWithReplicas.envelopeItem.update({
    where: {
      envelopeId,
      id: envelopeItemId
    },
    data: {
      order,
      title
    },
    select: {
      id: true,
      order: true,
      title: true,
      envelopeId: true
    }
  })));
  // Write audit logs for DOCUMENT type envelopes when changes are detected.
  if (envelopeType === 'DOCUMENT') {
    const auditLogs = data.flatMap(item => {
      const existing = existingEnvelopeItems.find(e => e.id === item.envelopeItemId);
      if (!existing) {
        return [];
      }
      const changes = [];
      if (item.title !== undefined && item.title !== existing.title) {
        changes.push({
          field: 'title',
          from: existing.title,
          to: item.title
        });
      }
      if (changes.length === 0) {
        return [];
      }
      return [createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.ENVELOPE_ITEM_UPDATED,
        envelopeId,
        data: {
          envelopeItemId: item.envelopeItemId,
          changes
        },
        user: {
          name: user.name,
          email: user.email
        },
        requestMetadata: apiRequestMetadata.requestMetadata
      })];
    });
    if (auditLogs.length > 0) {
      await prismaWithReplicas.documentAuditLog.createMany({
        data: auditLogs
      });
    }
  }
  return updatedEnvelopeItems;
};

export { UNSAFE_updateEnvelopeItems };
//# sourceMappingURL=update-envelope-items.js.map
