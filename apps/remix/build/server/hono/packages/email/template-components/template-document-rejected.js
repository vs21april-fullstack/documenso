import { Trans } from '@lingui/react';
import '@react-email/body';
import { Button } from '@react-email/button';
import '@react-email/column';
import '@react-email/container';
import '@react-email/font';
import '@react-email/head';
import { Heading } from '@react-email/heading';
import '@react-email/hr';
import '@react-email/html';
import '@react-email/img';
import '@react-email/link';
import '@react-email/preview';
import '@react-email/render';
import '@react-email/row';
import '@react-email/section';
import '@react-email/tailwind';
import { Text } from '@react-email/text';
import { jsxs, jsx } from 'react/jsx-runtime';

function TemplateDocumentRejected({
  documentName,
  recipientName: signerName,
  rejectionReason,
  documentUrl
}) {
  return /*#__PURE__*/jsxs("div", {
    className: "mt-4",
    children: [/*#__PURE__*/jsx(Heading, {
      className: "mb-4 text-center font-semibold text-2xl text-foreground",
      children: /*#__PURE__*/jsx(Trans, {
        id: "0aBbNe"
      })
    }), /*#__PURE__*/jsx(Text, {
      className: "mb-4 text-base",
      children: /*#__PURE__*/jsx(Trans, {
        id: "A/uN4T",
        values: {
          signerName: signerName,
          documentName: documentName
        }
      })
    }), rejectionReason && /*#__PURE__*/jsx(Text, {
      className: "mb-4 text-base text-muted-foreground",
      children: /*#__PURE__*/jsx(Trans, {
        id: "/ts7bl",
        values: {
          rejectionReason: rejectionReason
        }
      })
    }), /*#__PURE__*/jsx(Text, {
      className: "mb-6 text-base",
      children: /*#__PURE__*/jsx(Trans, {
        id: "Y32cFr"
      })
    }), /*#__PURE__*/jsx(Button, {
      href: documentUrl,
      className: "inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-primary-foreground text-sm no-underline",
      children: /*#__PURE__*/jsx(Trans, {
        id: "SzshGx"
      })
    })]
  });
}

export { TemplateDocumentRejected };
//# sourceMappingURL=template-document-rejected.js.map
