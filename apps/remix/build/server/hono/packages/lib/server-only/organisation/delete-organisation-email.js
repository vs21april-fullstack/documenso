import { mailer } from '../../../email/mailer.js';
import { OrganisationDeleteEmailTemplate } from '../../../email/templates/organisation-delete.js';
import { createElement } from 'react';
import { getI18nInstance } from '../../client-only/providers/i18n-server.js';
import { NEXT_PUBLIC_WEBAPP_URL } from '../../constants/app.js';
import { DOCUMENSO_INTERNAL_EMAIL } from '../../constants/email.js';
import { renderEmailWithI18N } from '../../utils/render-email-with-i18n.js';

/**
 * Sends an "organisation deleted" notification email.
 */
const sendOrganisationDeleteEmail = async ({
  email,
  organisationName,
  deletedByAdmin = false,
  emailContext
}) => {
  const template = /*#__PURE__*/createElement(OrganisationDeleteEmailTemplate, {
    assetBaseUrl: NEXT_PUBLIC_WEBAPP_URL(),
    organisationName,
    deletedByAdmin
  });
  const {
    branding,
    emailLanguage
  } = emailContext;
  const [html, text] = await Promise.all([renderEmailWithI18N(template, {
    lang: emailLanguage,
    branding
  }), renderEmailWithI18N(template, {
    lang: emailLanguage,
    branding,
    plainText: true
  })]);
  const i18n = await getI18nInstance(emailLanguage);
  // This is sent through the global Documenso mailer (the org's transport is
  // intentionally not used during deletion), so use the Documenso sender to keep
  // the From-address aligned with the sending infrastructure (SPF/DKIM). Note the
  // org's `senderEmail` on `emailContext` could be a custom transport address.
  await mailer.sendMail({
    to: email,
    from: DOCUMENSO_INTERNAL_EMAIL,
    subject: i18n._(
    /*i18n*/
    {
      id: "pZKLN4",
      values: {
        organisationName: organisationName
      }
    }),
    html,
    text
  });
};

export { sendOrganisationDeleteEmail };
//# sourceMappingURL=delete-organisation-email.js.map
