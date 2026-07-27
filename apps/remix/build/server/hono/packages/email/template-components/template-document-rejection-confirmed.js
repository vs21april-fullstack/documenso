import { Trans } from '@lingui/react';
import '@react-email/body';
import '@react-email/button';
import '@react-email/column';
import { Container } from '@react-email/container';
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
import { Section } from '@react-email/section';
import '@react-email/tailwind';
import { Text } from '@react-email/text';
import { jsx, jsxs } from 'react/jsx-runtime';

function TemplateDocumentRejectionConfirmed({
  recipientName,
  documentName,
  documentOwnerName,
  reason
}) {
  return /*#__PURE__*/jsx(Container, {
    children: /*#__PURE__*/jsxs(Section, {
      children: [/*#__PURE__*/jsx(Heading, {
        className: "font-semibold text-2xl",
        children: /*#__PURE__*/jsx(Trans, {
          id: "j4Qqya"
        })
      }), /*#__PURE__*/jsx(Text, {
        className: "text-base text-foreground",
        children: /*#__PURE__*/jsx(Trans, {
          id: "RzMPvz",
          values: {
            documentName: documentName,
            documentOwnerName: documentOwnerName
          },
          components: {
            0: /*#__PURE__*/jsx("strong", {
              className: "font-bold"
            })
          }
        })
      }), reason && /*#__PURE__*/jsx(Text, {
        className: "font-medium text-base text-muted-foreground",
        children: /*#__PURE__*/jsx(Trans, {
          id: "Vb19fD",
          values: {
            reason: reason
          }
        })
      }), /*#__PURE__*/jsx(Text, {
        className: "text-base",
        children: /*#__PURE__*/jsx(Trans, {
          id: "jOxq1z"
        })
      })]
    })
  });
}

export { TemplateDocumentRejectionConfirmed };
//# sourceMappingURL=template-document-rejection-confirmed.js.map
