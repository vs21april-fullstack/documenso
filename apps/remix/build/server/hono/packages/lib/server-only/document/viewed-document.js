import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType, ReadStatus, SendStatus, WebhookTriggerEvents } from '@prisma/client';
import { ZWebhookDocumentSchema, mapEnvelopeToWebhookDocumentPayload } from '../../types/webhook-payload.js';
import { triggerWebhook } from '../webhooks/trigger/trigger-webhook.js';

const viewedDocument = async ({
  token,
  recipientAccessAuth,
  requestMetadata
}) => {
  const recipient = await prismaWithReplicas.recipient.findFirst({
    where: {
      token,
      envelope: {
        type: EnvelopeType.DOCUMENT
      }
    }
  });
  if (!recipient) {
    return;
  }
  await prismaWithReplicas.documentAuditLog.create({
    data: createDocumentAuditLogData({
      type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_VIEWED,
      envelopeId: recipient.envelopeId,
      user: {
        name: recipient.name,
        email: recipient.email
      },
      requestMetadata,
      data: {
        recipientEmail: recipient.email,
        recipientId: recipient.id,
        recipientName: recipient.name,
        recipientRole: recipient.role,
        accessAuth: recipientAccessAuth ?? []
      }
    })
  });
  // Early return if already opened.
  if (recipient.readStatus === ReadStatus.OPENED) {
    return;
  }
  await prismaWithReplicas.$transaction(async tx => {
    await tx.recipient.update({
      where: {
        id: recipient.id
      },
      data: {
        // This handles cases where distribution is done manually
        sendStatus: SendStatus.SENT,
        readStatus: ReadStatus.OPENED,
        // Only set sentAt if not already set (email may have been sent before they opened).
        ...(!recipient.sentAt ? {
          sentAt: new Date()
        } : {})
      }
    });
    await tx.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.DOCUMENT_OPENED,
        envelopeId: recipient.envelopeId,
        user: {
          name: recipient.name,
          email: recipient.email
        },
        requestMetadata,
        data: {
          recipientEmail: recipient.email,
          recipientId: recipient.id,
          recipientName: recipient.name,
          recipientRole: recipient.role,
          accessAuth: recipientAccessAuth ?? []
        }
      })
    });
  });
  // Don't schedule reminders for manually distributed documents —
  // there's no email pathway to send them through.
  const envelope = await prismaWithReplicas.envelope.findUniqueOrThrow({
    where: {
      id: recipient.envelopeId
    },
    include: {
      documentMeta: true,
      recipients: true
    }
  });
  await triggerWebhook({
    event: WebhookTriggerEvents.DOCUMENT_OPENED,
    data: ZWebhookDocumentSchema.parse(mapEnvelopeToWebhookDocumentPayload(envelope)),
    userId: envelope.userId,
    teamId: envelope.teamId
  });
};

export { viewedDocument };
//# sourceMappingURL=viewed-document.js.map
