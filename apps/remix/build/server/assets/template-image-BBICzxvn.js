import { jsx } from "react/jsx-runtime";
import { Img } from "@react-email/img";
const TemplateImage = ({
  assetBaseUrl,
  className,
  staticAsset
}) => {
  const getAssetUrl = (path) => {
    return new URL(path, assetBaseUrl).toString();
  };
  return /* @__PURE__ */ jsx(Img, { className, src: getAssetUrl(`/static/${staticAsset}`), alt: "" });
};
export {
  TemplateImage as T
};
