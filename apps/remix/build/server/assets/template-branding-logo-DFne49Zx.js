import { jsx } from "react/jsx-runtime";
import { Img } from "@react-email/img";
import { Link } from "@react-email/link";
import { u as useBranding, a as getSafeBrandingUrl } from "./render-email-with-i18n-_rsgz8pg.js";
const TemplateBrandingLogo = ({
  assetBaseUrl,
  className = "mb-4 h-6"
}) => {
  const branding = useBranding();
  const hasCustomBrandingLogo = branding.brandingEnabled && Boolean(branding.brandingLogo);
  if (!hasCustomBrandingLogo) {
    const documensoLogoUrl = new URL("/static/logo.png", assetBaseUrl).toString();
    return /* @__PURE__ */ jsx(Img, { src: documensoLogoUrl, alt: "Documenso Logo", className });
  }
  const brandingLogo = /* @__PURE__ */ jsx(Img, { src: branding.brandingLogo, alt: "Branding Logo", className });
  const safeBrandingUrl = getSafeBrandingUrl(branding.brandingUrl);
  if (!safeBrandingUrl) {
    return brandingLogo;
  }
  return /* @__PURE__ */ jsx(Link, { href: safeBrandingUrl, target: "_blank", children: brandingLogo });
};
export {
  TemplateBrandingLogo as T
};
