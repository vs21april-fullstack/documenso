import '@react-email/body';
import '@react-email/button';
import '@react-email/column';
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
import '@react-email/section';
import '@react-email/tailwind';
import '@react-email/text';
import { jsx } from 'react/jsx-runtime';

const TemplateImage = ({
  assetBaseUrl,
  className,
  staticAsset
}) => {
  const getAssetUrl = path => {
    return new URL(path, assetBaseUrl).toString();
  };
  return /*#__PURE__*/jsx(Img, {
    className: className,
    src: getAssetUrl(`/static/${staticAsset}`),
    alt: ""
  });
};

export { TemplateImage, TemplateImage as default };
//# sourceMappingURL=template-image.js.map
