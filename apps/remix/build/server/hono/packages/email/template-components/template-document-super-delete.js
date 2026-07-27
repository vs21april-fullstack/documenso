import { Trans } from '@lingui/react';
import '@react-email/body';
import '@react-email/button';
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

const TemplateDocumentDelete = ({
  reason,
  documentName,
  assetBaseUrl
}) => {
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(TemplateDocumentImage, {
      className: "mt-6",
      assetBaseUrl: assetBaseUrl
    }), /*#__PURE__*/jsxs(Section, {
      children: [/*#__PURE__*/jsx(Text, {
        className: "mt-6 mb-0 text-left font-semibold text-foreground text-lg",
        children: /*#__PURE__*/jsx(Trans, {
          id: "8Uszcn"
        })
      }), /*#__PURE__*/jsx(Text, {
        className: "mx-auto mt-1 mb-6 text-left text-base text-muted-foreground",
        children: /*#__PURE__*/jsx(Trans, {
          id: "5P8syf",
          values: {
            documentName: documentName
          }
        })
      }), /*#__PURE__*/jsx(Text, {
        className: "mx-auto mt-1 mb-6 text-left text-base text-muted-foreground",
        children: /*#__PURE__*/jsx(Trans, {
          id: "bn4FIC"
        })
      }), /*#__PURE__*/jsx(Text, {
        className: "mx-auto mt-1 text-left text-base text-muted-foreground",
        children: /*#__PURE__*/jsx(Trans, {
          id: "hRGXhr"
        })
      }), /*#__PURE__*/jsx(Text, {
        className: "mx-auto mt-1 mb-6 text-left text-base text-muted-foreground italic",
        children: reason
      })]
    })]
  });
};

export { TemplateDocumentDelete };
//# sourceMappingURL=template-document-super-delete.js.map
