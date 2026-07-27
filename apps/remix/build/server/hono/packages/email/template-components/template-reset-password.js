import { env } from '../../lib/utils/env.js';
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
import '@react-email/link';
import '@react-email/preview';
import '@react-email/render';
import '@react-email/row';
import { Section } from '@react-email/section';
import '@react-email/tailwind';
import { Text } from '@react-email/text';
import { TemplateDocumentImage } from './template-document-image.js';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';

const TemplateResetPassword = ({
  assetBaseUrl
}) => {
  const NEXT_PUBLIC_WEBAPP_URL = env('NEXT_PUBLIC_WEBAPP_URL');
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(TemplateDocumentImage, {
      className: "mt-6",
      assetBaseUrl: assetBaseUrl
    }), /*#__PURE__*/jsxs(Section, {
      className: "flex-row items-center justify-center",
      children: [/*#__PURE__*/jsx(Text, {
        className: "mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg",
        children: /*#__PURE__*/jsx(Trans, {
          id: "DKeVgZ"
        })
      }), /*#__PURE__*/jsx(Text, {
        className: "my-1 text-center text-base text-muted-foreground",
        children: /*#__PURE__*/jsx(Trans, {
          id: "dBUm7w"
        })
      }), /*#__PURE__*/jsx(Section, {
        className: "mt-8 mb-6 text-center",
        children: /*#__PURE__*/jsx(Button, {
          className: "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline",
          href: `${NEXT_PUBLIC_WEBAPP_URL ?? 'http://localhost:3000'}/signin`,
          children: /*#__PURE__*/jsx(Trans, {
            id: "n1ekoW"
          })
        })
      })]
    })]
  });
};

export { TemplateResetPassword };
//# sourceMappingURL=template-reset-password.js.map
