import { DocumentCompletedEmailTemplate } from '../../../../email/templates/document-completed.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { EnvelopeType, DocumentSource, RecipientRole } from '@prisma/client';
import { createElement } from 'react';
import { getI18nInstance } from '../../../client-only/providers/i18n-server.js';
import { EMAIL_ASSET_BASE_URL, PUBLISHED_APP_URL } from '../../../constants/app.js';
import { getEmailContext } from '../../../server-only/email/get-email-context.js';
import { assertOrganisationRatesAndLimits } from '../../../server-only/rate-limit/assert-organisation-rates-and-limits.js';
import { DOCUMENT_AUDIT_LOG_TYPE } from '../../../types/document-audit-logs.js';
import { extractDerivedDocumentEmailSettings } from '../../../types/document-email.js';
import { getFileServerSide } from '../../../universal/upload/get-file.server.js';
import { createDocumentAuditLogData } from '../../../utils/document-audit-logs.js';
import { unsafeBuildEnvelopeIdQuery } from '../../../utils/envelope.js';
import { isRecipientEmailValidForSending } from '../../../utils/recipients.js';
import { renderCustomEmailTemplate } from '../../../utils/render-custom-email-template.js';
import { renderEmailWithI18N } from '../../../utils/render-email-with-i18n.js';
import { formatDocumentsPath } from '../../../utils/teams.js';

const run = async ({
  payload,
  io
}) => {
  const {
    envelopeId,
    requestMetadata
  } = payload;
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: unsafeBuildEnvelopeIdQuery({
      type: 'envelopeId',
      id: envelopeId
    }, EnvelopeType.DOCUMENT),
    include: {
      envelopeItems: {
        include: {
          documentData: {
            select: {
              type: true,
              id: true,
              data: true
            }
          }
        }
      },
      documentMeta: true,
      recipients: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          disabled: true
        }
      },
      team: {
        select: {
          id: true,
          url: true
        }
      }
    }
  });
  if (!envelope) {
    throw new Error('Document not found');
  }
  const isDirectTemplate = envelope?.source === DocumentSource.TEMPLATE_DIRECT_LINK;
  if (envelope.recipients.length === 0) {
    throw new Error('Document has no recipients');
  }
  const {
    branding,
    emailLanguage,
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
  // Don't send completion emails if the organisation has email sending disabled or the owner is disabled (e.g. banned).
  if (envelope.user.disabled || emailsDisabled) {
    return;
  }
  const {
    user: owner
  } = envelope;
  const completedDocumentEmailAttachments = await Promise.all(envelope.envelopeItems.map(async envelopeItem => {
    const file = await getFileServerSide(envelopeItem.documentData);
    // Use the envelope title for version 1, and the envelope item title for version 2.
    const fileNameToUse = envelope.internalVersion === 1 ? envelope.title : envelopeItem.title + '.pdf';
    return {
      filename: fileNameToUse.endsWith('.pdf') ? fileNameToUse : fileNameToUse + '.pdf',
      content: Buffer.from(file),
      contentType: 'application/pdf'
    };
  }));
  const assetBaseUrl = EMAIL_ASSET_BASE_URL();
  let documentOwnerDownloadLink = `${PUBLISHED_APP_URL()}${formatDocumentsPath(envelope.team?.url).replace(/^\//, '')}/${envelope.id}`;
  if (envelope.team?.url) {
    documentOwnerDownloadLink = `${PUBLISHED_APP_URL()}t/${envelope.team.url}/documents/${envelope.id}`;
  }
  const emailSettings = extractDerivedDocumentEmailSettings(envelope.documentMeta);
  const isDocumentCompletedEmailEnabled = emailSettings.documentCompleted;
  const isOwnerDocumentCompletedEmailEnabled = emailSettings.ownerDocumentCompleted;
  // Send email to document owner if:
  // 1. Owner document completed emails are enabled AND
  // 2. Either:
  //    - The owner is not a recipient, OR
  //    - Recipient emails are disabled
  if (isOwnerDocumentCompletedEmailEnabled && (!envelope.recipients.find(recipient => recipient.email === owner.email) || !isDocumentCompletedEmailEnabled)) {
    const template = /*#__PURE__*/createElement(DocumentCompletedEmailTemplate, {
      documentName: envelope.title,
      assetBaseUrl,
      downloadLink: documentOwnerDownloadLink
    });
    const [html, text] = await Promise.all([renderEmailWithI18N(template, {
      lang: emailLanguage,
      branding
    }), renderEmailWithI18N(template, {
      lang: emailLanguage,
      branding,
      plainText: true
    })]);
    const i18n = await getI18nInstance(emailLanguage);
    await emailTransport.sendMail({
      to: [{
        name: owner.name || '',
        address: owner.email
      }],
      from: senderEmail,
      replyTo: replyToEmail,
      subject: i18n._(
      /*i18n*/
      {
        id: "vksYri"
      }),
      html,
      text,
      attachments: completedDocumentEmailAttachments
    });
    await prismaWithReplicas.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT,
        envelopeId: envelope.id,
        user: null,
        requestMetadata,
        data: {
          emailType: 'DOCUMENT_COMPLETED',
          recipientEmail: owner.email,
          recipientName: owner.name ?? '',
          recipientId: owner.id,
          recipientRole: 'OWNER',
          isResending: false
        }
      })
    });
  }
  if (!isDocumentCompletedEmailEnabled) {
    return;
  }
  const recipientsToNotify = envelope.recipients.filter(recipient => isRecipientEmailValidForSending(recipient));
  await Promise.all(recipientsToNotify.map(async recipient => {
    // A CC recipient never asked to be part of this document, so their completion
    // email is effectively unsolicited. Meter it against the organisation email
    // quota/stats so it is correctly logged.
    if (recipient.role === RecipientRole.CC) {
      try {
        await assertOrganisationRatesAndLimits({
          organisationId,
          organisationClaim: claims,
          type: 'email',
          count: 1
        });
      } catch (_err) {
        io.logger.warn({
          msg: 'CC completion email dropped: org email limit exceeded',
          organisationId,
          recipientId: recipient.id,
          envelopeId: envelope.id
        });
        // On rate/quota exceeded, early return to allow other recipients to be processed.
        return;
      }
    }
    const customEmailTemplate = {
      'signer.name': recipient.name,
      'signer.email': recipient.email,
      'document.name': envelope.title
    };
    const downloadLink = `${PUBLISHED_APP_URL()}sign/${recipient.token}/complete`;
    const reportUrl = recipient.role === RecipientRole.CC ? `${PUBLISHED_APP_URL()}report/${recipient.token}` : undefined;
    const template = /*#__PURE__*/createElement(DocumentCompletedEmailTemplate, {
      documentName: envelope.title,
      assetBaseUrl,
      downloadLink: recipient.email === owner.email ? documentOwnerDownloadLink : downloadLink,
      customBody: isDirectTemplate && envelope.documentMeta?.message ? renderCustomEmailTemplate(envelope.documentMeta.message, customEmailTemplate) : undefined,
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
    const i18n = await getI18nInstance(emailLanguage);
    await emailTransport.sendMail({
      to: [{
        name: recipient.name,
        address: recipient.email
      }],
      from: senderEmail,
      replyTo: replyToEmail,
      subject: isDirectTemplate && envelope.documentMeta?.subject ? renderCustomEmailTemplate(envelope.documentMeta.subject, customEmailTemplate) : i18n._(
      /*i18n*/
      {
        id: "vksYri"
      }),
      html,
      text,
      attachments: completedDocumentEmailAttachments
    });
    await prismaWithReplicas.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT,
        envelopeId: envelope.id,
        user: null,
        requestMetadata,
        data: {
          emailType: 'DOCUMENT_COMPLETED',
          recipientEmail: recipient.email,
          recipientName: recipient.name,
          recipientId: recipient.id,
          recipientRole: recipient.role,
          isResending: false
        }
      })
    });
  }));
};

export { run };
//# sourceMappingURL=send-document-completed-emails.handler.js.map
