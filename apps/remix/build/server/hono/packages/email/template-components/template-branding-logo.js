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
import { Link } from '@react-email/link';
import '@react-email/preview';
import '@react-email/render';
import '@react-email/row';
import '@react-email/section';
import '@react-email/tailwind';
import '@react-email/text';
import { useBranding } from '../providers/branding.js';
import { getSafeBrandingUrl } from '../utils/branding-url.js';
import { jsx } from 'react/jsx-runtime';

const TemplateBrandingLogo = ({
  assetBaseUrl,
  className = 'mb-4 h-6'
}) => {
  const branding = useBranding();
  const hasCustomBrandingLogo = branding.brandingEnabled && Boolean(branding.brandingLogo);
  if (!hasCustomBrandingLogo) {
    const documensoLogoUrl = new URL('/static/logo.png', assetBaseUrl).toString();
    return /*#__PURE__*/jsx(Img, {
      src: documensoLogoUrl,
      alt: "Documenso Logo",
      className: className
    });
  }
  const brandingLogo = /*#__PURE__*/jsx(Img, {
    src: branding.brandingLogo,
    alt: "Branding Logo",
    className: className
  });
  const safeBrandingUrl = getSafeBrandingUrl(branding.brandingUrl);
  if (!safeBrandingUrl) {
    return brandingLogo;
  }
  return /*#__PURE__*/jsx(Link, {
    href: safeBrandingUrl,
    target: "_blank",
    children: brandingLogo
  });
};

export { TemplateBrandingLogo };
//# sourceMappingURL=template-branding-logo.js.map
