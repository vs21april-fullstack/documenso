import { RecipientRemovedFromDocumentTemplate } from '../../../../email/templates/recipient-removed-from-document.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { createElement } from 'react';
import { getI18nInstance } from '../../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../../constants/app.js';
import { getEmailContext } from '../../../server-only/email/get-email-context.js';
import { assertOrganisationRatesAndLimits } from '../../../server-only/rate-limit/assert-organisation-rates-and-limits.js';
import { extractDerivedDocumentEmailSettings } from '../../../types/document-email.js';
import { isRecipientEmailValidForSending } from '../../../utils/recipients.js';
import { renderEmailWithI18N } from '../../../utils/render-email-with-i18n.js';

const run = async ({
  payload,
  io
}) => {
  const {
    envelopeId,
    recipientEmail,
    recipientName,
    inviterName
  } = payload;
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      id: envelopeId
    },
    include: {
      documentMeta: true
    }
  });
  // The envelope may have been deleted between the recipient removal and this
  // job running. Treat as a no-op so the job doesn't retry forever.
  if (!envelope || !recipientEmail || !isRecipientEmailValidForSending({
    email: recipientEmail
  })) {
    return;
  }
  // Re-checked at send time (not just at enqueue) so the email honors the
  // document's current "recipient removed" setting.
  const isRecipientRemovedEmailEnabled = extractDerivedDocumentEmailSettings(envelope.documentMeta).recipientRemoved;
  if (!isRecipientRemovedEmailEnabled) {
    return;
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
  // Don't send the removal email if the organisation has email sending disabled.
  if (emailsDisabled) {
    return;
  }
  // Meter the removal email against the organisation email quota/stats.
  // Add/remove churn can be used to blast unsolicited removal emails outside
  // the email limits.
  try {
    await assertOrganisationRatesAndLimits({
      organisationId,
      organisationClaim: claims,
      type: 'email',
      count: 1
    });
  } catch (_err) {
    io.logger.warn({
      msg: 'Recipient removed email dropped: org email limit exceeded',
      organisationId,
      envelopeId: envelope.id
    });
    return;
  }
  const assetBaseUrl = NEXT_PUBLIC_WEBAPP_URL() || 'http://localhost:3000';
  const template = /*#__PURE__*/createElement(RecipientRemovedFromDocumentTemplate, {
    documentName: envelope.title,
    inviterName: inviterName || undefined,
    assetBaseUrl
  });
  const i18n = await getI18nInstance(emailLanguage);
  await io.runTask('send-recipient-removed-email', async () => {
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
        address: recipientEmail,
        name: recipientName
      },
      from: senderEmail,
      replyTo: replyToEmail,
      subject: i18n._(
      /*i18n*/
      {
        id: "18SyOd"
      }),
      html,
      text
    });
  });
};

export { run };
//# sourceMappingURL=send-recipient-removed-email.handler.js.map
