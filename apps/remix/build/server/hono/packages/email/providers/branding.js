import { useContext, createContext } from 'react';
import { jsx } from 'react/jsx-runtime';

const BrandingContext = /*#__PURE__*/createContext(undefined);
const defaultBrandingContextValue = {
  brandingEnabled: false,
  brandingUrl: '',
  brandingLogo: '',
  brandingCompanyDetails: '',
  brandingHidePoweredBy: false
};
const BrandingProvider = props => {
  return /*#__PURE__*/jsx(BrandingContext.Provider, {
    value: props.branding ?? defaultBrandingContextValue,
    children: props.children
  });
};
const useBranding = () => {
  const ctx = useContext(BrandingContext);
  if (!ctx) {
    throw new Error('Branding context not found');
  }
  return ctx;
};

export { BrandingProvider, useBranding };
//# sourceMappingURL=branding.js.map
