import { Trans } from '@lingui/react';
import '@react-email/body';
import '@react-email/button';
import { Column } from '@react-email/column';
import '@react-email/container';
import '@react-email/font';
import '@react-email/head';
import '@react-email/heading';
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
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { TemplateDocumentImage } from './template-document-image.js';

const TemplateDocumentRecipientSigned = ({ documentName, recipientName, recipientEmail, assetBaseUrl }) => {
  const getAssetUrl = (path) => {
    let base = assetBaseUrl;
    if (!base.endsWith('/')) {
      base = `${base}/`;
    }
    return new URL(path.replace(/^\/+/, ''), base).toString();
  };
  const recipientReference = recipientName || recipientEmail;
  return /*#__PURE__*/ jsxs(Fragment, {
    children: [
      /*#__PURE__*/ jsx(TemplateDocumentImage, {
        className: 'mt-6',
        assetBaseUrl: assetBaseUrl,
      }),
      /*#__PURE__*/ jsxs(Section, {
        children: [
          /*#__PURE__*/ jsx(Section, {
            className: 'mb-4',
            children: /*#__PURE__*/ jsx(Column, {
              align: 'center',
              children: /*#__PURE__*/ jsxs(Text, {
                className: 'font-semibold text-base text-foreground',
                children: [
                  /*#__PURE__*/ jsx(Img, {
                    src: getAssetUrl('/static/completed.png'),
                    className: '-mt-0.5 mr-2 inline h-7 w-7 align-middle',
                    alt: '',
                  }),
                  /*#__PURE__*/ jsx(Trans, {
                    id: 'qqWcBV',
                  }),
                ],
              }),
            }),
          }),
          /*#__PURE__*/ jsx(Text, {
            className: 'mb-0 text-center font-semibold text-foreground text-lg',
            children: /*#__PURE__*/ jsx(Trans, {
              id: '/f/1hG',
              values: {
                recipientReference: recipientReference,
                documentName: documentName,
              },
            }),
          }),
          /*#__PURE__*/ jsx(Text, {
            className: 'mx-auto mt-1 mb-6 max-w-[80%] text-center text-base text-muted-foreground',
            children: /*#__PURE__*/ jsx(Trans, {
              id: 'wxK4xF',
              values: {
                recipientReference: recipientReference,
              },
            }),
          }),
        ],
      }),
    ],
  });
};

export { TemplateDocumentRecipientSigned };
//# sourceMappingURL=template-document-recipient-signed.js.map
