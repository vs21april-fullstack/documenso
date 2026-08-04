import { Column } from '@react-email/column';
import { Img } from '@react-email/img';
import { Row } from '@react-email/row';
import { Section } from '@react-email/section';
import { jsx, jsxs } from 'react/jsx-runtime';

const TemplateDocumentImage = ({ assetBaseUrl, className }) => {
  const getAssetUrl = (path) => {
    let base = assetBaseUrl;
    if (!base.endsWith('/')) {
      base = `${base}/`;
    }
    return new URL(path.replace(/^\/+/, ''), base).toString();
  };
  return /* @__PURE__ */ jsx(Section, {
    className,
    children: /* @__PURE__ */ jsxs(Row, {
      className: 'table-fixed',
      children: [
        /* @__PURE__ */ jsx(Column, {}),
        /* @__PURE__ */ jsx(Column, {
          children: /* @__PURE__ */ jsx(Img, {
            className: 'mx-auto h-42',
            src: getAssetUrl('/static/document.png'),
            alt: 'Omni Sign',
          }),
        }),
        /* @__PURE__ */ jsx(Column, {}),
      ],
    }),
  });
};

export { TemplateDocumentImage as T };
