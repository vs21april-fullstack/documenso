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

const OrganisationInviteEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://documenso.com',
  senderName = 'John Doe',
  organisationName = 'Organisation Name',
  token = ''
}) => {
  const {
    _
  } = useLingui();
  const previewText =
  /*i18n*/
  {
    id: "YnhFGj"
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
              staticAsset: "add-user.png"
            })
          }), /*#__PURE__*/jsxs(Section, {
            className: "p-2 text-muted-foreground",
            children: [/*#__PURE__*/jsx(Text, {
              className: "text-center font-medium text-foreground text-lg",
              children: /*#__PURE__*/jsx(Trans, {
                id: "u7CW2P",
                values: {
                  organisationName: organisationName
                }
              })
            }), /*#__PURE__*/jsx(Text, {
              className: "my-1 text-center text-base",
              children: /*#__PURE__*/jsx(Trans, {
                id: "txW6hN"
              })
            }), /*#__PURE__*/jsx("div", {
              className: "mx-auto my-2 w-fit rounded-lg bg-muted px-4 py-2 font-medium text-base text-muted-foreground",
              children: organisationName
            }), /*#__PURE__*/jsx(Text, {
              className: "my-1 text-center text-base",
              children: /*#__PURE__*/jsx(Trans, {
                id: "8mPyGj",
                values: {
                  senderName: senderName
                },
                components: {
                  0: /*#__PURE__*/jsx("span", {
                    className: "text-foreground"
                  })
                }
              })
            }), /*#__PURE__*/jsxs(Section, {
              className: "mt-6 mb-6 text-center",
              children: [/*#__PURE__*/jsx(Button, {
                className: "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline",
                href: `${baseUrl}/organisation/invite/${token}`,
                children: /*#__PURE__*/jsx(Trans, {
                  id: "g3UF2V"
                })
              }), /*#__PURE__*/jsx(Button, {
                className: "ml-4 inline-flex items-center justify-center rounded-lg bg-muted px-6 py-3 text-center font-medium text-muted-foreground text-sm no-underline",
                href: `${baseUrl}/organisation/decline/${token}`,
                children: /*#__PURE__*/jsx(Trans, {
                  id: "jbq7j2"
                })
              })]
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

export { OrganisationInviteEmailTemplate };
//# sourceMappingURL=organisation-invite.js.map
