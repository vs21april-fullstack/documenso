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
import { Row } from '@react-email/row';
import { Section } from '@react-email/section';
import '@react-email/tailwind';
import '@react-email/text';
import { jsx, jsxs } from 'react/jsx-runtime';

const TemplateDocumentImage = ({ assetBaseUrl, className }) => {
  const getAssetUrl = (path) => {
    let base = assetBaseUrl;
    if (!base.endsWith('/')) {
      base = `${base}/`;
    }
    return new URL(path.replace(/^\/+/, ''), base).toString();
  };
  return /*#__PURE__*/ jsx(Section, {
    className: className,
    children: /*#__PURE__*/ jsxs(Row, {
      className: 'table-fixed',
      children: [
        /*#__PURE__*/ jsx(Column, {}),
        /*#__PURE__*/ jsx(Column, {
          children: /*#__PURE__*/ jsx(Img, {
            className: 'mx-auto h-42',
            src: getAssetUrl('/static/document.png'),
            alt: 'Omni Sign',
          }),
        }),
        /*#__PURE__*/ jsx(Column, {}),
      ],
    }),
  });
};

export { TemplateDocumentImage, TemplateDocumentImage as default };
//# sourceMappingURL=template-document-image.js.map
