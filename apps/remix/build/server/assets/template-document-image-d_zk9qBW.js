import { jsx, jsxs } from "react/jsx-runtime";
import { Column } from "@react-email/column";
import { Img } from "@react-email/img";
import { Row } from "@react-email/row";
import { Section } from "@react-email/section";
const TemplateDocumentImage = ({
  assetBaseUrl,
  className
}) => {
  const getAssetUrl = (path) => {
    return new URL(path, assetBaseUrl).toString();
  };
  return /* @__PURE__ */ jsx(Section, { className, children: /* @__PURE__ */ jsxs(Row, { className: "table-fixed", children: [
    /* @__PURE__ */ jsx(Column, {}),
    /* @__PURE__ */ jsx(Column, { children: /* @__PURE__ */ jsx(Img, { className: "mx-auto h-42", src: getAssetUrl("/static/document.png"), alt: "Documenso" }) }),
    /* @__PURE__ */ jsx(Column, {})
  ] }) });
};
export {
  TemplateDocumentImage as T
};
