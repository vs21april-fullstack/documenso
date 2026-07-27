import { useLingui, Trans } from '@lingui/react';
import { Body } from '@react-email/body';
import { Button } from '@react-email/button';
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

const OrganisationAccountLinkConfirmationTemplate = ({
  type = 'link',
  confirmationLink = '<CONFIRMATION_LINK>',
  organisationName = '<ORGANISATION_NAME>',
  assetBaseUrl = 'http://localhost:3002'
}) => {
  const {
    _
  } = useLingui();
  const previewText = type === 'create' ?
  /*i18n*/
  {
    id: "Nfq50M"
  } :
  /*i18n*/
  {
    id: "S6+cWk"
  };
  return /*#__PURE__*/jsxs(Html, {
    children: [/*#__PURE__*/jsx(Head, {}), /*#__PURE__*/jsxs(Body, {
      className: "mx-auto my-auto font-sans",
      children: [/*#__PURE__*/jsx(Preview, {
        children: _(previewText)
      }), /*#__PURE__*/jsxs(Section, {
        className: "bg-background",
        children: [/*#__PURE__*/jsxs(Container, {
          className: "mx-auto mt-8 mb-2 max-w-xl rounded-lg border border-border border-solid px-2 pt-2 backdrop-blur-sm",
          children: [/*#__PURE__*/jsx(TemplateBrandingLogo, {
            assetBaseUrl: assetBaseUrl,
            className: "mb-4 h-6 p-2"
          }), /*#__PURE__*/jsx(Section, {
            children: /*#__PURE__*/jsx(TemplateImage, {
              className: "mx-auto h-12 w-12",
              assetBaseUrl: assetBaseUrl,
              staticAsset: "building-2.png"
            })
          }), /*#__PURE__*/jsxs(Section, {
            className: "p-2 text-muted-foreground",
            children: [/*#__PURE__*/jsx(Text, {
              className: "text-center font-medium text-foreground text-lg",
              children: type === 'create' ? /*#__PURE__*/jsx(Trans, {
                id: "UGthSu"
              }) : /*#__PURE__*/jsx(Trans, {
                id: "PXkRmr"
              })
            }), /*#__PURE__*/jsx(Text, {
              className: "text-center text-base",
              children: type === 'create' ? /*#__PURE__*/jsx(Trans, {
                id: "OTI0nD",
                values: {
                  organisationName: organisationName
                },
                components: {
                  0: /*#__PURE__*/jsx("span", {
                    className: "font-bold"
                  })
                }
              }) : /*#__PURE__*/jsx(Trans, {
                id: "iKu+zI",
                values: {
                  organisationName: organisationName
                },
                components: {
                  0: /*#__PURE__*/jsx("span", {
                    className: "font-bold"
                  })
                }
              })
            }), /*#__PURE__*/jsx(Section, {
              className: "mt-8 mb-6 text-center",
              children: /*#__PURE__*/jsx(Button, {
                className: "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline",
                href: confirmationLink,
                children: /*#__PURE__*/jsx(Trans, {
                  id: "u/8lJg"
                })
              })
            })]
          }), /*#__PURE__*/jsx(Text, {
            className: "text-center text-muted-foreground text-xs",
            children: /*#__PURE__*/jsx(Trans, {
              id: "2QnRG4"
            })
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

export { OrganisationAccountLinkConfirmationTemplate };
//# sourceMappingURL=organisation-account-link-confirmation.js.map
