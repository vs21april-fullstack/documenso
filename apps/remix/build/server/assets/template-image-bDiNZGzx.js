import { Img } from '@react-email/img';
import { jsx } from 'react/jsx-runtime';

const TemplateImage = ({ assetBaseUrl, className, staticAsset }) => {
  const getAssetUrl = (path) => {
    let base = assetBaseUrl;
    if (!base.endsWith('/')) {
      base = `${base}/`;
    }
    return new URL(path.replace(/^\/+/, ''), base).toString();
  };
  return /* @__PURE__ */ jsx(Img, { className, src: getAssetUrl(`/static/${staticAsset}`), alt: '' });
};

export { TemplateImage as T };
