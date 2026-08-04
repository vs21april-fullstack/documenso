import { Img } from '@react-email/img';
import { Link } from '@react-email/link';
import { Text } from '@react-email/text';
import { jsx } from 'react/jsx-runtime';
import { a as getSafeBrandingUrl, u as useBranding } from './render-email-with-i18n-hJlZB03t.js';

const TemplateBrandingLogo = (props) => {
  const { className = 'mb-4 h-6' } = props;
  const branding = useBranding();
  const hasCustomBrandingLogo = branding.brandingEnabled && Boolean(branding.brandingLogo);
  if (!hasCustomBrandingLogo) {
    return /* @__PURE__ */ jsx(Text, {
      className: `${className} font-bold text-xl leading-none`,
      children: 'Omni Sign',
    });
  }
  const brandingLogo = /* @__PURE__ */ jsx(Img, { src: branding.brandingLogo, alt: 'Branding Logo', className });
  const safeBrandingUrl = getSafeBrandingUrl(branding.brandingUrl);
  if (!safeBrandingUrl) {
    return brandingLogo;
  }
  return /* @__PURE__ */ jsx(Link, { href: safeBrandingUrl, target: '_blank', children: brandingLogo });
};

export { TemplateBrandingLogo as T };
