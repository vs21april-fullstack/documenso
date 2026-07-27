import { useLingui, Trans } from '@lingui/react';
import { Body } from '@react-email/body';
import '@react-email/button';
import '@react-email/column';
import { Container } from '@react-email/container';
import '@react-email/font';
import { Head } from '@react-email/head';
import '@react-email/heading';
import '@react-email/hr';
import { Html } from '@react-email/html';
import '@react-email/img';
import '@react-email/link';
import { Preview } from '@react-email/preview';
import '@react-email/render';
import '@react-email/row';
import { Section } from '@react-email/section';
import '@react-email/tailwind';
import { Text } from '@react-email/text';
import { TemplateFooter } from '../template-components/template-footer.js';
import { jsxs, jsx } from 'react/jsx-runtime';

const BulkSendCompleteEmail = ({
  userName,
  templateName,
  totalProcessed,
  successCount,
  failedCount,
  errors
}) => {
  const {
    _
  } = useLingui();
  const previewText =
  /*i18n*/
  {
    id: "MSFlwc",
    values: {
      templateName: templateName
    }
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
            children: [/*#__PURE__*/jsx(Text, {
              className: "text-sm",
              children: /*#__PURE__*/jsx(Trans, {
                id: "Wu9nw4",
                values: {
                  userName: userName
                }
              })
            }), /*#__PURE__*/jsx(Text, {
              className: "text-sm",
              children: /*#__PURE__*/jsx(Trans, {
                id: "Gq2nhO",
                values: {
                  templateName: templateName
                }
              })
            }), /*#__PURE__*/jsx(Text, {
              className: "font-semibold text-lg",
              children: /*#__PURE__*/jsx(Trans, {
                id: "ug4N1t"
              })
            }), /*#__PURE__*/jsxs("ul", {
              className: "my-2 ml-4 list-inside list-disc",
              children: [/*#__PURE__*/jsx("li", {
                children: /*#__PURE__*/jsx(Trans, {
                  id: "5cDbgy",
                  values: {
                    totalProcessed: totalProcessed
                  }
                })
              }), /*#__PURE__*/jsx("li", {
                className: "mt-1",
                children: /*#__PURE__*/jsx(Trans, {
                  id: "L06obu",
                  values: {
                    successCount: successCount
                  }
                })
              }), /*#__PURE__*/jsx("li", {
                className: "mt-1",
                children: /*#__PURE__*/jsx(Trans, {
                  id: "yekj0I",
                  values: {
                    failedCount: failedCount
                  }
                })
              })]
            }), errors && errors.length > 0 && /*#__PURE__*/jsxs(Section, {
              className: "mt-4",
              children: [/*#__PURE__*/jsx(Text, {
                className: "font-semibold text-lg",
                children: /*#__PURE__*/jsx(Trans, {
                  id: "2+LtVY"
                })
              }), /*#__PURE__*/jsx("ul", {
                className: "my-2 ml-4 list-inside list-disc",
                children: errors.map((error, index) => /*#__PURE__*/jsx("li", {
                  className: "mt-1 text-destructive text-sm",
                  children: error
                }, index))
              })]
            }), /*#__PURE__*/jsx(Text, {
              className: "text-sm",
              children: /*#__PURE__*/jsx(Trans, {
                id: "Eg+VGn"
              })
            })]
          })
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

export { BulkSendCompleteEmail };
//# sourceMappingURL=bulk-send-complete.js.map
