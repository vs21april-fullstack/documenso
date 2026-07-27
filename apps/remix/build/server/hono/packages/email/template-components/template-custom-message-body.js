import React from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

const TemplateCustomMessageBody = ({
  text
}) => {
  if (!text) {
    return null;
  }
  const normalized = text.trim().replace(/\r\n?/g, '\n').replace(/\n\s*\n+/g, '\n\n').replace(/\n{2,}/g, '\n\n');
  const paragraphs = normalized.split('\n\n');
  return paragraphs.map((paragraph, i) => /*#__PURE__*/jsx("p", {
    className: "whitespace-pre-line break-words font-sans text-base text-muted-foreground",
    children: paragraph.split('\n').map((line, j) => /*#__PURE__*/jsxs(React.Fragment, {
      children: [j > 0 && /*#__PURE__*/jsx("br", {}), line]
    }, `line-${i}-${j}`))
  }, `p-${i}`));
};

export { TemplateCustomMessageBody };
//# sourceMappingURL=template-custom-message-body.js.map
