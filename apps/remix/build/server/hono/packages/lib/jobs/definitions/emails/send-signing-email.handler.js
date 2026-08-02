import { DocumentInviteEmailTemplate } from '../../../../email/templates/document-invite.js';
import { isRecipientEmailValidForSending } from '../../../utils/recipients.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { DocumentStatus, EnvelopeType, RecipientRole, DocumentSource, OrganisationType, SendStatus } from '@prisma/client';
import { createElement } from 'react';
import { getI18nInstance } from '../../../client-only/providers/i18n-server.js';
import { EMAIL_ASSET_BASE_URL, PUBLISHED_APP_URL } from '../../../constants/app.js';
import { RECIPIENT_ROLE_TO_EMAIL_TYPE, RECIPIENT_ROLES_DESCRIPTION } from '../../../constants/recipient-roles.js';
import { buildEnvelopeEmailHeaders } from '../../../server-only/email/build-envelope-email-headers.js';
import { getEmailContext } from '../../../server-only/email/get-email-context.js';
import { assertOrganisationRatesAndLimits } from '../../../server-only/rate-limit/assert-organisation-rates-and-limits.js';
import { updateRecipientNextReminder } from '../../../server-only/recipient/update-recipient-next-reminder.js';
import { DOCUMENT_AUDIT_LOG_TYPE } from '../../../types/document-audit-logs.js';
import { extractDerivedDocumentEmailSettings } from '../../../types/document-email.js';
import { createDocumentAuditLogData } from '../../../utils/document-audit-logs.js';
import { unsafeBuildEnvelopeIdQuery } from '../../../utils/envelope.js';
import { renderCustomEmailTemplate } from '../../../utils/render-custom-email-template.js';
import { renderEmailWithI18N } from '../../../utils/render-email-with-i18n.js';

const run = async ({
  payload,
  io
}) => {
  const {
    userId,
    documentId,
    recipientId,
    requestMetadata
  } = payload;
  const [user, envelope, recipient] = await Promise.all([prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: userId
    },
    select: {
      id: true,
      email: true,
      name: true
    }
  }), prismaWithReplicas.envelope.findFirstOrThrow({
    where: {
      ...unsafeBuildEnvelopeIdQuery({
        type: 'documentId',
        id: documentId
      }, EnvelopeType.DOCUMENT),
      status: DocumentStatus.PENDING
    },
    include: {
      documentMeta: true,
      user: {
        select: {
          disabled: true
        }
      },
      team: {
        select: {
          teamEmail: true,
          name: true
        }
      }
    }
  }), prismaWithReplicas.recipient.findFirstOrThrow({
    where: {
      id: recipientId
    }
  })]);
  const {
    documentMeta,
    team
  } = envelope;
  if (recipient.role === RecipientRole.CC) {
    return;
  }
  const isRecipientSigningRequestEmailEnabled = extractDerivedDocumentEmailSettings(envelope.documentMeta).recipientSigningRequest;
  if (!isRecipientSigningRequestEmailEnabled) {
    return;
  }
  const {
    branding,
    emailLanguage,
    settings,
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
  // Don't send signing invitations if the organisation has email sending disabled or the owner is disabled (e.g. banned).
  if (envelope.user.disabled || emailsDisabled) {
    return;
  }
  const customEmail = envelope?.documentMeta;
  const isDirectTemplate = envelope.source === DocumentSource.TEMPLATE_DIRECT_LINK;
  const recipientEmailType = RECIPIENT_ROLE_TO_EMAIL_TYPE[recipient.role];
  const {
    email,
    name
  } = recipient;
  const selfSigner = email === user.email;
  const i18n = await getI18nInstance(emailLanguage);
  const recipientActionVerb = i18n._(RECIPIENT_ROLES_DESCRIPTION[recipient.role].actionVerb).toLowerCase();
  let emailMessage = customEmail?.message || '';
  let emailSubject = i18n._(
  /*i18n*/
  {
    id: "gkdan+",
    values: {
      recipientActionVerb: recipientActionVerb
    }
  });
  if (selfSigner) {
    emailMessage = i18n._(
    /*i18n*/
    {
      id: "gypFA5",
      values: {
        0: `"${envelope.title}"`,
        recipientActionVerb: recipientActionVerb
      }
    });
    emailSubject = i18n._(
    /*i18n*/
    {
      id: "F06Znj",
      values: {
        recipientActionVerb: recipientActionVerb
      }
    });
  }
  if (isDirectTemplate) {
    emailMessage = i18n._(
    /*i18n*/
    {
      id: "8G9nE9",
      values: {
        recipientActionVerb: recipientActionVerb
      }
    });
    emailSubject = i18n._(
    /*i18n*/
    {
      id: "ex9NI+",
      values: {
        recipientActionVerb: recipientActionVerb
      }
    });
  }
  if (organisationType === OrganisationType.ORGANISATION) {
    emailSubject = i18n._(
    /*i18n*/
    {
      id: "RkToeZ",
      values: {
        0: team.name,
        recipientActionVerb: recipientActionVerb
      }
    });
    emailMessage = customEmail?.message ?? '';
    if (!emailMessage) {
      const inviterName = user.name || '';
      emailMessage = i18n._(settings.includeSenderDetails ?
      /*i18n*/
      {
        id: "ctjWgj",
        values: {
          0: team.name,
          1: envelope.title,
          inviterName: inviterName,
          recipientActionVerb: recipientActionVerb
        }
      } :
      /*i18n*/
      {
        id: "ZS7Lvr",
        values: {
          0: team.name,
          1: envelope.title,
          recipientActionVerb: recipientActionVerb
        }
      });
    }
  }
  const customEmailTemplate = {
    'signer.name': name,
    'signer.email': email,
    'document.name': envelope.title
  };
  const assetBaseUrl = EMAIL_ASSET_BASE_URL();
  const signDocumentLink = `${PUBLISHED_APP_URL()}sign/${recipient.token}`;
  const reportUrl = `${PUBLISHED_APP_URL()}report/${recipient.token}`;
  const template = /*#__PURE__*/createElement(DocumentInviteEmailTemplate, {
    documentName: envelope.title,
    inviterName: user.name || undefined,
    inviterEmail: organisationType === OrganisationType.ORGANISATION ? team?.teamEmail?.email || user.email : user.email,
    assetBaseUrl,
    signDocumentLink,
    customBody: renderCustomEmailTemplate(emailMessage, customEmailTemplate),
    role: recipient.role,
    selfSigner,
    organisationType,
    teamName: team?.name,
    teamEmail: team?.teamEmail?.email,
    includeSenderDetails: settings.includeSenderDetails,
    reportUrl
  });
  if (isRecipientEmailValidForSending(recipient)) {
    try {
      await assertOrganisationRatesAndLimits({
        organisationId,
        organisationClaim: claims,
        type: 'email',
        count: 1
      });
    } catch (_err) {
      io.logger.warn({
        msg: 'Recipient signing email dropped: org rate limit exceeded',
        organisationId,
        recipientId: recipient.id,
        envelopeId: envelope.id
      });
      // Job is consumed and NOT retried.
      return;
    }
    await io.runTask('send-signing-email', async () => {
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
        subject: renderCustomEmailTemplate(documentMeta?.subject || emailSubject, customEmailTemplate),
        html,
        text,
        headers: buildEnvelopeEmailHeaders({
          userId,
          envelopeId: envelope.id,
          teamId: envelope.teamId
        })
      });
    });
  }
  const sentAt = new Date();
  await io.runTask('update-recipient', async () => {
    await prismaWithReplicas.recipient.update({
      where: {
        id: recipient.id
      },
      data: {
        sendStatus: SendStatus.SENT,
        sentAt
      }
    });
  });
  // Compute the first reminder time based on the envelope's effective settings.
  await updateRecipientNextReminder({
    recipientId: recipient.id,
    envelopeId: envelope.id,
    sentAt,
    lastReminderSentAt: null
  });
  await prismaWithReplicas.documentAuditLog.create({
    data: createDocumentAuditLogData({
      type: DOCUMENT_AUDIT_LOG_TYPE.EMAIL_SENT,
      envelopeId: envelope.id,
      user,
      requestMetadata,
      data: {
        emailType: recipientEmailType,
        recipientId: recipient.id,
        recipientName: recipient.name,
        recipientEmail: recipient.email,
        recipientRole: recipient.role,
        isResending: false
      }
    })
  });
};

export { run };
//# sourceMappingURL=send-signing-email.handler.js.map
