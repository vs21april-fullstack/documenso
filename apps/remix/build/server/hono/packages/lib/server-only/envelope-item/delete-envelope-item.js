import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const UNSAFE_deleteEnvelopeItem = async ({
  envelopeId,
  envelopeItemId,
  user,
  apiRequestMetadata
}) => {
  const result = await prismaWithReplicas.$transaction(async tx => {
    const deletedEnvelopeItem = await tx.envelopeItem.delete({
      where: {
        id: envelopeItemId,
        envelopeId
      },
      select: {
        id: true,
        title: true,
        documentData: {
          select: {
            id: true
          }
        }
      }
    });
    await tx.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.ENVELOPE_ITEM_DELETED,
        envelopeId,
        data: {
          envelopeItemId: deletedEnvelopeItem.id,
          envelopeItemTitle: deletedEnvelopeItem.title
        },
        user: {
          name: user.name,
          email: user.email
        },
        requestMetadata: apiRequestMetadata.requestMetadata
      })
    });
    return deletedEnvelopeItem;
  });
  await prismaWithReplicas.documentData.delete({
    where: {
      id: result.documentData.id,
      envelopeItem: {
        is: null
      }
    }
  });
};

export { UNSAFE_deleteEnvelopeItem };
//# sourceMappingURL=delete-envelope-item.js.map
