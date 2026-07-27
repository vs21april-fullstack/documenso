import { RECIPIENT_ROLES_DESCRIPTION } from '../../lib/constants/recipient-roles.js';
import { useLingui } from '@lingui/react';
import { RecipientRole } from '@prisma/client';
import { Body } from '@react-email/body';
import '@react-email/button';
import '@react-email/column';
import { Container } from '@react-email/container';
import '@react-email/font';
import { Head } from '@react-email/head';
import '@react-email/heading';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import '@react-email/img';
import '@react-email/link';
import { Preview } from '@react-email/preview';
import '@react-email/render';
import '@react-email/row';
import { Section } from '@react-email/section';
import '@react-email/tailwind';
import { Text } from '@react-email/text';
import { TemplateBrandingLogo } from '../template-components/template-branding-logo.js';
import { TemplateCustomMessageBody } from '../template-components/template-custom-message-body.js';
import { TemplateDocumentReminder } from '../template-components/template-document-reminder.js';
import { TemplateFooter } from '../template-components/template-footer.js';
import { jsxs, jsx } from 'react/jsx-runtime';

const DocumentReminderEmailTemplate = ({
  recipientName = 'John Doe',
  documentName = 'Open Source Pledge.pdf',
  signDocumentLink = 'https://documenso.com',
  assetBaseUrl = 'http://localhost:3002',
  customBody,
  role = RecipientRole.SIGNER,
  reportUrl
}) => {
  const {
    _
  } = useLingui();
  const action = _(RECIPIENT_ROLES_DESCRIPTION[role].actionVerb).toLowerCase();
  const previewText =
  /*i18n*/
  {
    id: "g8kAKy",
    values: {
      action: action,
      documentName: documentName
    }
  };
  return /*#__PURE__*/jsxs(Html, {
    children: [/*#__PURE__*/jsx(Head, {}), /*#__PURE__*/jsxs(Body, {
      className: "mx-auto my-auto bg-background font-sans",
      children: [/*#__PURE__*/jsx(Preview, {
        children: _(previewText)
      }), /*#__PURE__*/jsxs(Section, {
        children: [/*#__PURE__*/jsx(Container, {
          className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-4 backdrop-blur-sm",
          children: /*#__PURE__*/jsxs(Section, {
            children: [/*#__PURE__*/jsx(TemplateBrandingLogo, {
              assetBaseUrl: assetBaseUrl,
              className: "mb-4 h-6"
            }), /*#__PURE__*/jsx(TemplateDocumentReminder, {
              recipientName: recipientName,
              documentName: documentName,
              signDocumentLink: signDocumentLink,
              assetBaseUrl: assetBaseUrl,
              role: role
            })]
          })
        }), customBody && /*#__PURE__*/jsx(Container, {
          className: "mx-auto mt-12 max-w-xl",
          children: /*#__PURE__*/jsx(Section, {
            children: /*#__PURE__*/jsx(Text, {
              className: "mt-2 text-base text-muted-foreground",
              children: /*#__PURE__*/jsx(TemplateCustomMessageBody, {
                text: customBody
              })
            })
          })
        }), /*#__PURE__*/jsx(Hr, {
          className: "mx-auto mt-12 max-w-xl"
        }), /*#__PURE__*/jsx(Container, {
          className: "mx-auto max-w-xl",
          children: /*#__PURE__*/jsx(TemplateFooter, {
            reportUrl: reportUrl
          })
        })]
      })]
    })]
  });
};

export { DocumentReminderEmailTemplate, DocumentReminderEmailTemplate as default };
//# sourceMappingURL=document-reminder.js.map
