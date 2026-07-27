import { Trans } from '@lingui/react';
import '@react-email/body';
import { Button } from '@react-email/button';
import '@react-email/column';
import '@react-email/container';
import '@react-email/font';
import '@react-email/head';
import '@react-email/heading';
import '@react-email/hr';
import '@react-email/html';
import '@react-email/img';
import { Link } from '@react-email/link';
import '@react-email/preview';
import '@react-email/render';
import '@react-email/row';
import { Section } from '@react-email/section';
import '@react-email/tailwind';
import { Text } from '@react-email/text';
import { TemplateDocumentImage } from './template-document-image.js';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';

const TemplateAdminUserCreated = ({
  resetPasswordLink,
  assetBaseUrl
}) => {
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(TemplateDocumentImage, {
      className: "mt-6",
      assetBaseUrl: assetBaseUrl
    }), /*#__PURE__*/jsxs(Section, {
      className: "flex-row items-center justify-center",
      children: [/*#__PURE__*/jsx(Text, {
        className: "mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg",
        children: /*#__PURE__*/jsx(Trans, {
          id: "AJn4Lp"
        })
      }), /*#__PURE__*/jsx(Text, {
        className: "my-1 text-center text-base text-muted-foreground",
        children: /*#__PURE__*/jsx(Trans, {
          id: "pz9XDv"
        })
      }), /*#__PURE__*/jsx(Text, {
        className: "my-1 text-center text-base text-muted-foreground",
        children: /*#__PURE__*/jsx(Trans, {
          id: "DCVzkq"
        })
      }), /*#__PURE__*/jsxs(Section, {
        className: "mt-8 mb-6 text-center",
        children: [/*#__PURE__*/jsx(Button, {
          className: "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline",
          href: resetPasswordLink,
          children: /*#__PURE__*/jsx(Trans, {
            id: "2gHjVM"
          })
        }), /*#__PURE__*/jsx(Text, {
          className: "mt-8 text-center text-muted-foreground text-sm italic",
          children: /*#__PURE__*/jsx(Trans, {
            id: "AeTf6l",
            values: {
              resetPasswordLink: resetPasswordLink
            }
          })
        })]
      }), /*#__PURE__*/jsx(Section, {
        className: "mt-8",
        children: /*#__PURE__*/jsx(Text, {
          className: "text-center text-muted-foreground text-sm",
          children: /*#__PURE__*/jsx(Trans, {
            id: "oAJIP1",
            components: {
              0: /*#__PURE__*/jsx(Link, {
                href: "mailto:support@documenso.com",
                className: "text-primary"
              })
            }
          })
        })
      })]
    })]
  });
};

export { TemplateAdminUserCreated };
//# sourceMappingURL=template-admin-user-created.js.map
