import { useLingui, Trans } from '@lingui/react';
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
import { TemplateFooter } from '../template-components/template-footer.js';
import { TemplateImage } from '../template-components/template-image.js';
import { jsxs, jsx } from 'react/jsx-runtime';

const OrganisationLeaveEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://documenso.com',
  memberName = 'John Doe',
  memberEmail = 'johndoe@documenso.com',
  organisationName = 'Organisation Name',
  organisationUrl = 'demo'
}) => {
  const {
    _
  } = useLingui();
  const previewText =
  /*i18n*/
  {
    id: "Z1ZGh6"
  };
  return /*#__PURE__*/jsxs(Html, {
    children: [/*#__PURE__*/jsx(Head, {}), /*#__PURE__*/jsxs(Body, {
      className: "mx-auto my-auto font-sans",
      children: [/*#__PURE__*/jsx(Preview, {
        children: _(previewText)
      }), /*#__PURE__*/jsxs(Section, {
        className: "bg-background text-muted-foreground",
        children: [/*#__PURE__*/jsxs(Container, {
          className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid p-2 backdrop-blur-sm",
          children: [/*#__PURE__*/jsx(TemplateBrandingLogo, {
            assetBaseUrl: assetBaseUrl,
            className: "mb-4 h-6 p-2"
          }), /*#__PURE__*/jsx(Section, {
            children: /*#__PURE__*/jsx(TemplateImage, {
              className: "mx-auto",
              assetBaseUrl: assetBaseUrl,
              staticAsset: "delete-user.png"
            })
          }), /*#__PURE__*/jsxs(Section, {
            className: "p-2 text-muted-foreground",
            children: [/*#__PURE__*/jsx(Text, {
              className: "text-center font-medium text-foreground text-lg",
              children: /*#__PURE__*/jsx(Trans, {
                id: "mrz6cs",
                values: {
                  organisationName: organisationName
                }
              })
            }), /*#__PURE__*/jsx("div", {
              className: "mx-auto my-2 w-fit rounded-lg bg-muted px-4 py-2 font-medium text-base text-muted-foreground",
              children: memberName || memberEmail
            })]
          })]
        }), /*#__PURE__*/jsx(Hr, {
          className: "mx-auto mt-12 max-w-xl"
        }), /*#__PURE__*/jsx(Container, {
          className: "mx-auto max-w-xl",
          children: /*#__PURE__*/jsx(TemplateFooter, {
            isDocument: false
          })
        })]
      })]
    })]
  });
};

export { OrganisationLeaveEmailTemplate, OrganisationLeaveEmailTemplate as default };
//# sourceMappingURL=organisation-leave.js.map
