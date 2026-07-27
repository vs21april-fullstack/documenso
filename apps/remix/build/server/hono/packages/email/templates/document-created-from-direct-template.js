import { RECIPIENT_ROLES_DESCRIPTION } from '../../lib/constants/recipient-roles.js';
import { useLingui, Trans } from '@lingui/react';
import { RecipientRole } from '@prisma/client';
import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
import '@react-email/column';
import { Container } from '@react-email/container';
import '@react-email/font';
import { Head } from '@react-email/head';
import '@react-email/heading';
import '@react-email/hr';
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
import { TemplateDocumentImage } from '../template-components/template-document-image.js';
import { TemplateFooter } from '../template-components/template-footer.js';
import { jsxs, jsx } from 'react/jsx-runtime';

const DocumentCreatedFromDirectTemplateEmailTemplate = ({
  recipientName = 'John Doe',
  recipientRole = RecipientRole.SIGNER,
  documentLink = 'http://localhost:3000',
  documentName = 'Open Source Pledge.pdf',
  assetBaseUrl = 'http://localhost:3002'
}) => {
  const {
    _
  } = useLingui();
  const action = _(RECIPIENT_ROLES_DESCRIPTION[recipientRole].actioned).toLowerCase();
  const previewText =
  /*i18n*/
  {
    id: "XiDxHt"
  };
  return /*#__PURE__*/jsxs(Html, {
    children: [/*#__PURE__*/jsx(Head, {}), /*#__PURE__*/jsxs(Body, {
      className: "mx-auto my-auto font-sans",
      children: [/*#__PURE__*/jsx(Preview, {
        children: _(previewText)
      }), /*#__PURE__*/jsxs(Section, {
        className: "bg-background",
        children: [/*#__PURE__*/jsx(Container, {
          className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-2 backdrop-blur-sm",
          children: /*#__PURE__*/jsxs(Section, {
            className: "p-2",
            children: [/*#__PURE__*/jsx(TemplateBrandingLogo, {
              assetBaseUrl: assetBaseUrl,
              className: "mb-4 h-6"
            }), /*#__PURE__*/jsx(TemplateDocumentImage, {
              className: "mt-6",
              assetBaseUrl: assetBaseUrl
            }), /*#__PURE__*/jsxs(Section, {
              children: [/*#__PURE__*/jsx(Text, {
                className: "mb-0 text-center font-semibold text-foreground text-lg",
                children: /*#__PURE__*/jsx(Trans, {
                  id: "jrBKG+",
                  values: {
                    recipientName: recipientName,
                    action: action
                  }
                })
              }), /*#__PURE__*/jsx("div", {
                className: "mx-auto my-2 w-fit rounded-lg bg-muted px-4 py-2 text-muted-foreground text-sm",
                children: documentName
              }), /*#__PURE__*/jsx(Section, {
                className: "my-6 text-center",
                children: /*#__PURE__*/jsx(Button, {
                  className: "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline",
                  href: documentLink,
                  children: /*#__PURE__*/jsx(Trans, {
                    id: "s+pgPi"
                  })
                })
              })]
            })]
          })
        }), /*#__PURE__*/jsx(Container, {
          className: "mx-auto max-w-xl",
          children: /*#__PURE__*/jsx(TemplateFooter, {})
        })]
      })]
    })]
  });
};

export { DocumentCreatedFromDirectTemplateEmailTemplate };
//# sourceMappingURL=document-created-from-direct-template.js.map
