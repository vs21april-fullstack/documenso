import { Trans } from '@lingui/react';
import '@react-email/body';
import '@react-email/button';
import '@react-email/column';
import '@react-email/container';
import '@react-email/font';
import '@react-email/head';
import { Heading } from '@react-email/heading';
import '@react-email/hr';
import '@react-email/html';
import { Img } from '@react-email/img';
import '@react-email/link';
import '@react-email/preview';
import '@react-email/render';
import '@react-email/row';
import { Section } from '@react-email/section';
import '@react-email/tailwind';
import { Text } from '@react-email/text';
import { jsx, jsxs } from 'react/jsx-runtime';

const TemplateAccessAuth2FA = ({
  documentTitle,
  code,
  userName,
  expiresInMinutes,
  assetBaseUrl = 'http://localhost:3002',
}) => {
  const getAssetUrl = (path) => {
    let base = assetBaseUrl;
    if (!base.endsWith('/')) {
      base = `${base}/`;
    }
    return new URL(path.replace(/^\/+/, ''), base).toString();
  };
  return /*#__PURE__*/ jsxs('div', {
    children: [
      /*#__PURE__*/ jsx(Img, {
        src: getAssetUrl('/static/document.png'),
        alt: 'Document',
        className: 'mx-auto h-12 w-12',
      }),
      /*#__PURE__*/ jsxs(Section, {
        className: 'mt-8',
        children: [
          /*#__PURE__*/ jsx(Heading, {
            className: 'text-center font-semibold text-foreground text-lg',
            children: /*#__PURE__*/ jsx(Trans, {
              id: 'DmCsRf',
            }),
          }),
          /*#__PURE__*/ jsx(Text, {
            className: 'mt-2 text-center text-foreground',
            children: /*#__PURE__*/ jsx(Trans, {
              id: 'dlQ3PR',
              values: {
                userName: userName,
                documentTitle: documentTitle,
              },
            }),
          }),
          /*#__PURE__*/ jsxs(Section, {
            className: 'mt-6 rounded-lg bg-muted p-6 text-center',
            children: [
              /*#__PURE__*/ jsx(Text, {
                className: 'mb-2 font-medium text-muted-foreground text-sm',
                children: /*#__PURE__*/ jsx(Trans, {
                  id: 'iUch+l',
                }),
              }),
              /*#__PURE__*/ jsx(Text, {
                className: 'font-bold text-2xl text-foreground tracking-wider',
                children: code,
              }),
            ],
          }),
          /*#__PURE__*/ jsx(Text, {
            className: 'mt-4 text-center text-muted-foreground text-sm',
            children: /*#__PURE__*/ jsx(Trans, {
              id: 'YuCtab',
              values: {
                expiresInMinutes: expiresInMinutes,
              },
            }),
          }),
          /*#__PURE__*/ jsx(Text, {
            className: 'mt-4 text-center text-muted-foreground text-sm',
            children: /*#__PURE__*/ jsx(Trans, {
              id: 'kAJmpS',
            }),
          }),
        ],
      }),
    ],
  });
};

export { TemplateAccessAuth2FA };
//# sourceMappingURL=template-access-auth-2fa.js.map
