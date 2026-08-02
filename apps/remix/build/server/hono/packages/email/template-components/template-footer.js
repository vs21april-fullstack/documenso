import { Trans } from '@lingui/react';
import { Fragment } from 'react';
import '@react-email/body';
import '@react-email/button';
import '@react-email/column';
import '@react-email/container';
import '@react-email/font';
import '@react-email/head';
import '@react-email/heading';
import '@react-email/hr';
import '@react-email/html';
import '@react-email/img';
import { Link } from '@react-email/link';
import '@react-email/preview';
import '@react-email/render';
import '@react-email/row';
import { Section } from '@react-email/section';
import '@react-email/tailwind';
import { Text } from '@react-email/text';
import { useBranding } from '../providers/branding.js';
import { getSafeBrandingUrl } from '../utils/branding-url.js';
import { jsxs, jsx } from 'react/jsx-runtime';

const TemplateFooter = ({
  isDocument = true,
  reportUrl
}) => {
  const branding = useBranding();
  const safeBrandingUrl = branding.brandingEnabled ? getSafeBrandingUrl(branding.brandingUrl) : null;
  return /*#__PURE__*/jsxs(Section, {
    children: [reportUrl && /*#__PURE__*/jsx(Text, {
      className: "my-4 text-base text-muted-foreground",
      children: /*#__PURE__*/jsx(Trans, {
        id: "E4ee24",
        components: {
          0: /*#__PURE__*/jsx(Link, {
            className: "text-primary",
            href: reportUrl
          })
        }
      })
    }), isDocument && !branding.brandingHidePoweredBy && /*#__PURE__*/jsx(Text, {
      className: "my-4 text-base text-muted-foreground",
      children: /*#__PURE__*/jsx(Trans, {
        id: "yYJVSP",
        components: {
          0: /*#__PURE__*/jsx(Link, {
            className: "text-primary",
            href: "https://api.omni00.com/published-apps/17/160/"
          })
        }
      })
    }), branding.brandingEnabled && branding.brandingCompanyDetails && /*#__PURE__*/jsx(Text, {
      className: "my-8 text-muted-foreground text-sm",
      children: branding.brandingCompanyDetails.split('\n').map((line, idx) => {
        return /*#__PURE__*/jsxs(Fragment, {
          children: [idx > 0 && /*#__PURE__*/jsx("br", {}), line]
        }, idx);
      })
    }), branding.brandingEnabled && safeBrandingUrl && /*#__PURE__*/jsx(Text, {
      className: "my-8 text-muted-foreground text-sm",
      children: /*#__PURE__*/jsx(Link, {
        href: safeBrandingUrl,
        target: "_blank",
        children: safeBrandingUrl
      })
    }), !branding.brandingEnabled && /*#__PURE__*/jsxs(Text, {
      className: "my-8 text-muted-foreground text-sm",
      children: ["Omni Sign", /*#__PURE__*/jsx("br", {}), "2261 Market Street, #5211, San Francisco, CA 94114, USA"]
    })]
  });
};

export { TemplateFooter };
//# sourceMappingURL=template-footer.js.map
