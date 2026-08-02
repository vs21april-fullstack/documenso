import { DocumentReminderEmailTemplate } from '../../../../email/templates/document-reminder.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { DocumentStatus, RecipientRole, SendStatus, SigningStatus, DocumentDistributionMethod, OrganisationType, WebhookTriggerEvents } from '@prisma/client';
import { createElement } from 'react';
import { getI18nInstance } from '../../../client-only/providers/i18n-server.js';
import { EMAIL_ASSET_BASE_URL, PUBLISHED_APP_URL } from '../../../constants/app.js';
import { RECIPIENT_ROLES_DESCRIPTION } from '../../../constants/recipient-roles.js';
import { buildEnvelopeEmailHeaders } from '../../../server-only/email/build-envelope-email-headers.js';
import { getEmailContext } from '../../../server-only/email/get-email-context.js';
import { assertOrganisationRatesAndLimits } from '../../../server-only/rate-limit/assert-organisation-rates-and-limits.js';
import { updateRecipientNextReminder } from '../../../server-only/recipient/update-recipient-next-reminder.js';
import { triggerWebhook } from '../../../server-only/webhooks/trigger/trigger-webhook.js';
import { DOCUMENT_EMAIL_TYPE, DOCUMENT_AUDIT_LOG_TYPE } from '../../../types/document-audit-logs.js';
import { extractDerivedDocumentEmailSettings } from '../../../types/document-email.js';
import { ZWebhookDocumentSchema, mapEnvelopeToWebhookDocumentPayload } from '../../../types/webhook-payload.js';
import { createDocumentAuditLogData } from '../../../utils/document-audit-logs.js';
import { renderCustomEmailTemplate } from '../../../utils/render-custom-email-template.js';
import { renderEmailWithI18N } from '../../../utils/render-email-with-i18n.js';

const run = async ({
  payload,
  io
}) => {
  const {
    recipientId
  } = payload;
  const now = new Date();
  // Atomically claim this reminder by setting lastReminderSentAt and clearing
  // nextReminderAt so no other sweep picks it up. The expiration filter
  // guards against races where the expiration sweep hasn't yet flagged
  // a recipient whose deadline has already passed.
  const updatedCount = await prismaWithReplicas.recipient.updateMany({
    where: {
      id: recipientId,
      signingStatus: SigningStatus.NOT_SIGNED,
      sendStatus: SendStatus.SENT,
      role: {
        not: RecipientRole.CC
      },
      OR: [{
        expiresAt: null
      }, {
        expiresAt: {
          gt: now
        }
      }],
      envelope: {
        status: DocumentStatus.PENDING,
        deletedAt: null
      }
    },
    data: {
      lastReminderSentAt: now,
      nextReminderAt: null,
      reminderCount: {
        increment: 1
      }
    }
  });
  if (updatedCount.count === 0) {
    io.logger.info(`Recipient ${recipientId} no longer eligible for reminder, skipping`);
    return;
  }
  const recipient = await prismaWithReplicas.recipient.findFirst({
    where: {
      id: recipientId
    },
    include: {
      envelope: {
        include: {
          documentMeta: true,
          user: true,
          recipients: true,
          team: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  if (!recipient) {
    io.logger.warn(`Recipient ${recipientId} not found`);
    return;
  }
  const {
    envelope
  } = recipient;
  if (!envelope.documentMeta) {
    io.logger.warn(`Envelope ${envelope.id} missing documentMeta`);
    return;
  }
  // Skip if distribution method is NONE (manual link sharing, no emails).
  if (envelope.documentMeta.distributionMethod === DocumentDistributionMethod.NONE) {
    io.logger.info(`Envelope ${envelope.id} uses manual distribution, skipping email reminder`);
    return;
  }
  if (!extractDerivedDocumentEmailSettings(envelope.documentMeta).recipientSigningRequest) {
    io.logger.info(`Envelope ${envelope.id} has email signing requests disabled, skipping`);
    return;
  }
  const {
    branding,
    emailLanguage,
    organisationType,
    senderEmail,
    replyToEmail,
    organisationId,
    claims,
    emailsDisabled,
    emailTransport
  } = await getEmailContext({
    emailType: 'RECIPIENT',
    source: {
      type: 'team',
      teamId: envelope.teamId
    },
    meta: envelope.documentMeta
  });
  // Don't send reminders if the owner is disabled (e.g. banned) or the organisation
  // has email sending disabled.
  if (envelope.user.disabled || emailsDisabled) {
    io.logger.info(`Envelope ${envelope.id} skipping reminder: owner disabled or organisation emails disabled`);
    return;
  }
  const i18n = await getI18nInstance(emailLanguage);
  const recipientActionVerb = i18n._(RECIPIENT_ROLES_DESCRIPTION[recipient.role].actionVerb).toLowerCase();
  let emailSubject = i18n._(
  /*i18n*/
  {
    id: "WCVG8o",
    values: {
      0: envelope.title,
      recipientActionVerb: recipientActionVerb
    }
  });
  if (organisationType === OrganisationType.ORGANISATION) {
    emailSubject = i18n._(
    /*i18n*/
    {
      id: "k/b/L+",
      values: {
        0: envelope.team.name,
        recipientActionVerb: recipientActionVerb
      }
    });
  }
  const customEmailTemplate = {
    'signer.name': recipient.name,
    'signer.email': recipient.email,
    'document.name': envelope.title
  };
  if (envelope.documentMeta.subject) {
    emailSubject = renderCustomEmailTemplate(i18n._(
    /*i18n*/
    {
      id: "paGeq9",
      values: {
        0: envelope.documentMeta.subject
      }
    }), customEmailTemplate);
  }
  const emailMessage = envelope.documentMeta.message ? renderCustomEmailTemplate(envelope.documentMeta.message, customEmailTemplate) : undefined;
  const assetBaseUrl = EMAIL_ASSET_BASE_URL();
  const signDocumentLink = `${PUBLISHED_APP_URL()}sign/${recipient.token}`;
  const reportUrl = `${PUBLISHED_APP_URL()}report/${recipient.token}`;
  // Meter reminder emails against the organisation email quota/stats. Reminders
  // are unsolicited (the recipient didn't opt in to them) and can recur, so they
  // must be bounded by the same org limits as other outbound emails.
  const isRateLimited = await assertOrganisationRatesAndLimits({
    organisationId,
    organisationClaim: claims,
    type: 'email',
    count: 1
  }).then(() => false).catch(_err => {
    io.logger.warn({
      msg: 'Signing reminder dropped: org email limit exceeded',
      organisationId,
      recipientId: recipient.id,
      envelopeId: envelope.id
    });
    return true;
  });
  if (!isRateLimited) {
    io.logger.info(`Sending signing reminder for envelope ${envelope.id} to recipient ${recipient.id} (${recipient.email})`);
    const template = /*#__PURE__*/createElement(DocumentReminderEmailTemplate, {
      recipientName: recipient.name,
      documentName: envelope.title,
      assetBaseUrl,
      signDocumentLink,
      customBody: emailMessage,
      role: recipient.role,
      reportUrl
    });
    const [html, text] = await Promise.all([renderEmailWithI18N(template, {
      lang: emailLanguage,
      branding
    }), renderEmailWithI18N(template, {
      lang: emailLanguage,
      branding,
      plainText: true
    })]);
    await emailTransport.sendMail({
      to: {
        name: recipient.name,
        address: recipient.email
      },
      from: senderEmail,
      replyTo: replyToEmail,
      subject: emailSubject,
      html,
      text,
      headers: buildEnvelopeEmailHeaders({
        userId: envelope.userId,
        envelopeId: envelope.id,
        teamId: envelope.teamId
      })
    });
    await prismaWithReplicas.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT,
        envelopeId: envelope.id,
        data: {
          recipientEmail: recipient.email,
          recipientName: recipient.name,
          recipientId: recipient.id,
          recipientRole: recipient.role,
          emailType: DOCUMENT_EMAIL_TYPE.REMINDER,
          isResending: false
        }
      })
    });
    await triggerWebhook({
      event: WebhookTriggerEvents.DOCUMENT_REMINDER_SENT,
      data: ZWebhookDocumentSchema.parse(mapEnvelopeToWebhookDocumentPayload(envelope)),
      userId: envelope.userId,
      teamId: envelope.teamId
    });
  }
  // reminderCount was incremented in the atomic claim above, so the value read
  // here includes the reminder we just sent and gates the next one.
  if (recipient.sentAt) {
    await updateRecipientNextReminder({
      recipientId: recipient.id,
      envelopeId: envelope.id,
      sentAt: recipient.sentAt,
      lastReminderSentAt: now,
      reminderCount: recipient.reminderCount
    });
  }
};

export { run };
//# sourceMappingURL=process-signing-reminder.handler.js.map
