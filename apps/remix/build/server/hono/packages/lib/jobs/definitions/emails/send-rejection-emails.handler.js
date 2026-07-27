import { mailer } from '../../../../email/mailer.js';
import { DocumentRejectedEmail } from '../../../../email/templates/document-rejected.js';
import { DocumentRejectionConfirmedEmail } from '../../../../email/templates/document-rejection-confirmed.js';
import { isRecipientEmailValidForSending } from '../../../utils/recipients.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { EnvelopeType, SigningStatus, SendStatus } from '@prisma/client';
import { createElement } from 'react';
import { getI18nInstance } from '../../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../../constants/app.js';
import { DOCUMENSO_INTERNAL_EMAIL } from '../../../constants/email.js';
import { getEmailContext } from '../../../server-only/email/get-email-context.js';
import { extractDerivedDocumentEmailSettings } from '../../../types/document-email.js';
import { unsafeBuildEnvelopeIdQuery } from '../../../utils/envelope.js';
import { renderEmailWithI18N } from '../../../utils/render-email-with-i18n.js';
import { formatDocumentsPath } from '../../../utils/teams.js';

const run = async ({
  payload,
  io
}) => {
  const {
    documentId,
    recipientId
  } = payload;
  const [envelope, recipient] = await Promise.all([prismaWithReplicas.envelope.findFirstOrThrow({
    where: unsafeBuildEnvelopeIdQuery({
      type: 'documentId',
      id: documentId
    }, EnvelopeType.DOCUMENT),
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      },
      documentMeta: true,
      team: {
        select: {
          teamEmail: true,
          name: true,
          url: true
        }
      }
    }
  }), prismaWithReplicas.recipient.findFirstOrThrow({
    where: {
      id: recipientId,
      signingStatus: SigningStatus.REJECTED
    }
  })]);
  const {
    user: documentOwner
  } = envelope;
  const isEmailEnabled = extractDerivedDocumentEmailSettings(envelope.documentMeta).recipientSigningRequest;
  if (!isEmailEnabled) {
    return;
  }
  const {
    branding,
    emailLanguage,
    senderEmail,
    replyToEmail,
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
  const i18n = await getI18nInstance(emailLanguage);
  // Send confirmation email to the recipient who rejected.
  // Skipped when the organisation has email sending disabled, since this is sent on its behalf.
  // The owner notification below intentionally uses the internal Documenso email, so it still sends.
  if (!emailsDisabled && isRecipientEmailValidForSending(recipient)) {
    await io.runTask('send-rejection-confirmation-email', async () => {
      const recipientTemplate = /*#__PURE__*/createElement(DocumentRejectionConfirmedEmail, {
        recipientName: recipient.name,
        documentName: envelope.title,
        documentOwnerName: envelope.user.name || envelope.user.email,
        reason: recipient.rejectionReason || '',
        assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL()
      });
      const [html, text] = await Promise.all([renderEmailWithI18N(recipientTemplate, {
        lang: emailLanguage,
        branding
      }), renderEmailWithI18N(recipientTemplate, {
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
        subject: i18n._(
        /*i18n*/
        {
          id: "vTQuO6",
          values: {
            0: envelope.title
          }
        }),
        html,
        text
      });
    });
  }
  // Send notification email to document owner
  await io.runTask('send-owner-notification-email', async () => {
    const ownerTemplate = /*#__PURE__*/createElement(DocumentRejectedEmail, {
      recipientName: recipient.name,
      documentName: envelope.title,
      documentUrl: `${NEXT_PUBLIC_WEBAPP_URL()}${formatDocumentsPath(envelope.team?.url)}/${envelope.id}`,
      rejectionReason: recipient.rejectionReason || '',
      assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL()
    });
    const [html, text] = await Promise.all([renderEmailWithI18N(ownerTemplate, {
      lang: emailLanguage,
      branding
    }), renderEmailWithI18N(ownerTemplate, {
      lang: emailLanguage,
      branding,
      plainText: true
    })]);
    await mailer.sendMail({
      to: {
        name: documentOwner.name || '',
        address: documentOwner.email
      },
      from: DOCUMENSO_INTERNAL_EMAIL,
      // Purposefully using internal email here.
      subject: i18n._(
      /*i18n*/
      {
        id: "BVlCwe",
        values: {
          0: envelope.title,
          1: recipient.name
        }
      }),
      html,
      text
    });
  });
  await io.runTask('update-recipient', async () => {
    await prismaWithReplicas.recipient.update({
      where: {
        id: recipient.id
      },
      data: {
        sendStatus: SendStatus.SENT
      }
    });
  });
};

export { run };
//# sourceMappingURL=send-rejection-emails.handler.js.map
