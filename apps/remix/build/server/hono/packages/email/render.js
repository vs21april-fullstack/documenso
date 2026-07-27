import { DEFAULT_BRAND_COLORS } from '../lib/constants/theme.js';
import { resolveEmailBrandingColors } from '../lib/utils/email-branding-colors.js';
import { I18nProvider } from '@lingui/react';
import * as ReactEmail from '@react-email/render';
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
import '@react-email/link';
import '@react-email/preview';
import '@react-email/row';
import '@react-email/section';
import { Tailwind } from '@react-email/tailwind';
import '@react-email/text';
import { BrandingProvider } from './providers/branding.js';
import { jsx } from 'react/jsx-runtime';

const DEFAULT_EMAIL_BRANDING_COLORS = resolveEmailBrandingColors(DEFAULT_BRAND_COLORS) ?? DEFAULT_BRAND_COLORS;
/**
 * Map the resolved colour set to flat semantic Tailwind tokens. Templates use
 * these directly (`bg-primary`, `text-muted-foreground`, `border-border`, …),
 * mirroring the app's shadcn tokens, instead of bespoke `slate-*`/`documenso-*`
 * scale classes.
 *
 * Always defined: falls back to `DEFAULT_EMAIL_BRANDING_COLORS` when no tenant
 * colours are supplied, so the tokens resolve whether or not custom branding is
 * in play.
 */
const buildEmailColors = brandingColors => {
  const c = brandingColors ?? DEFAULT_EMAIL_BRANDING_COLORS;
  return {
    background: c.background,
    foreground: c.foreground,
    muted: c.muted,
    'muted-foreground': c.mutedForeground,
    primary: c.primary,
    'primary-foreground': c.primaryForeground,
    secondary: c.secondary,
    'secondary-foreground': c.secondaryForeground,
    accent: c.accent,
    'accent-foreground': c.accentForeground,
    destructive: c.destructive,
    'destructive-foreground': c.destructiveForeground,
    warning: c.warning,
    border: c.border
  };
};
const renderWithI18N = async (element, options) => {
  const {
    branding,
    i18n,
    ...otherOptions
  } = options ?? {};
  if (!i18n) {
    throw new Error('i18n is required');
  }
  const tailwindColors = buildEmailColors(branding?.brandingColors);
  return ReactEmail.render(/*#__PURE__*/jsx(I18nProvider, {
    i18n: i18n,
    children: /*#__PURE__*/jsx(BrandingProvider, {
      branding: branding,
      children: /*#__PURE__*/jsx(Tailwind, {
        config: {
          theme: {
            extend: {
              colors: tailwindColors
            }
          }
        },
        children: element
      })
    })
  }), otherOptions);
};

export { renderWithI18N };
//# sourceMappingURL=render.js.map
