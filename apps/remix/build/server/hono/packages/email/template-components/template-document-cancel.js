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

const TemplateDocumentCancel = ({
  inviterName,
  documentName,
  assetBaseUrl,
  cancellationReason
}) => {
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx(TemplateDocumentImage, {
      className: "mt-6",
      assetBaseUrl: assetBaseUrl
    }), /*#__PURE__*/jsxs(Section, {
      children: [/*#__PURE__*/jsx(Text, {
        className: "mx-auto mb-0 max-w-[80%] text-center font-semibold text-foreground text-lg",
        children: /*#__PURE__*/jsx(Trans, {
          id: "l0X6r3",
          values: {
            inviterName: inviterName,
            documentName: documentName
          },
          components: {
            0: /*#__PURE__*/jsx("br", {})
          }
        })
      }), /*#__PURE__*/jsx(Text, {
        className: "my-1 text-center text-base text-muted-foreground",
        children: /*#__PURE__*/jsx(Trans, {
          id: "vStjYt"
        })
      }), /*#__PURE__*/jsx(Text, {
        className: "my-1 text-center text-base text-muted-foreground",
        children: /*#__PURE__*/jsx(Trans, {
          id: "8CzYKa"
        })
      }), cancellationReason && /*#__PURE__*/jsx(Text, {
        className: "mt-4 text-center text-base",
        children: /*#__PURE__*/jsx(Trans, {
          id: "qXSCvM",
          values: {
            cancellationReason: cancellationReason
          }
        })
      })]
    })]
  });
};

export { TemplateDocumentCancel };
//# sourceMappingURL=template-document-cancel.js.map
