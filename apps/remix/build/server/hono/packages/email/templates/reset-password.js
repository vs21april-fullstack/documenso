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
import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import '@react-email/render';
import '@react-email/row';
import { Section } from '@react-email/section';
import '@react-email/tailwind';
import { Text } from '@react-email/text';
import { TemplateBrandingLogo } from '../template-components/template-branding-logo.js';
import { TemplateFooter } from '../template-components/template-footer.js';
import { TemplateResetPassword } from '../template-components/template-reset-password.js';
import { jsxs, jsx } from 'react/jsx-runtime';

const ResetPasswordTemplate = ({
  userName = 'Lucas Smith',
  userEmail = 'lucas@documenso.com',
  assetBaseUrl = 'http://localhost:3002'
}) => {
  const {
    _
  } = useLingui();
  const previewText =
  /*i18n*/
  {
    id: "6cPmk1"
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
            }), /*#__PURE__*/jsx(TemplateResetPassword, {
              userName: userName,
              userEmail: userEmail,
              assetBaseUrl: assetBaseUrl
            })]
          })
        }), /*#__PURE__*/jsx(Container, {
          className: "mx-auto mt-12 max-w-xl",
          children: /*#__PURE__*/jsxs(Section, {
            children: [/*#__PURE__*/jsx(Text, {
              className: "my-4 font-semibold text-base",
              children: /*#__PURE__*/jsx(Trans, {
                id: "neKtDP",
                values: {
                  userName: userName,
                  userEmail: userEmail
                },
                components: {
                  0: /*#__PURE__*/jsx(Link, {
                    className: "font-normal text-muted-foreground",
                    href: `mailto:${userEmail}`
                  })
                }
              })
            }), /*#__PURE__*/jsx(Text, {
              className: "mt-2 text-base text-muted-foreground",
              children: /*#__PURE__*/jsx(Trans, {
                id: "6yoqQD"
              })
            }), /*#__PURE__*/jsx(Text, {
              className: "mt-2 text-base text-muted-foreground",
              children: /*#__PURE__*/jsx(Trans, {
                id: "7wRHVd",
                components: {
                  0: /*#__PURE__*/jsx(Link, {
                    className: "font-normal text-primary",
                    href: "mailto:hi@documenso.com"
                  })
                }
              })
            })]
          })
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

export { ResetPasswordTemplate };
//# sourceMappingURL=reset-password.js.map
