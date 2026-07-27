import { colord } from 'colord';
import { DEFAULT_BRAND_COLORS } from '../constants/theme.js';

/**
 * Normalise an arbitrary stored colour value (hex or any colord-parseable
 * string) to a hex string. Returns `null` for missing/invalid input.
 *
 * `brandingColors` is validated loosely (`z.string()`) so values are not
 * guaranteed to be valid colours — parse defensively.
 */
const normalizeColorToHex = value => {
  if (!value) {
    return null;
  }
  const parsed = colord(value);
  if (!parsed.isValid()) {
    return null;
  }
  return parsed.toHex();
};
/**
 * Resolve a tenant's stored `brandingColors` into an email-ready colour set.
 *
 * Each token is taken from the tenant value when it parses to a valid colour,
 * otherwise the Documenso default. We do NOT enforce contrast or readability —
 * if a tenant picks a low-contrast combination that is their choice; the
 * preview UI can hint at it, but the renderer just applies what was set.
 *
 * Returns `null` (⇒ caller uses the default Documenso palette) only when there
 * is no `brandingColors` object at all.
 */
const resolveEmailBrandingColors = brandingColors => {
  if (!brandingColors) {
    return null;
  }
  const resolve = (value, fallback) => normalizeColorToHex(value) ?? fallback;
  return {
    background: resolve(brandingColors.background, DEFAULT_BRAND_COLORS.background),
    foreground: resolve(brandingColors.foreground, DEFAULT_BRAND_COLORS.foreground),
    muted: resolve(brandingColors.muted, DEFAULT_BRAND_COLORS.muted),
    mutedForeground: resolve(brandingColors.mutedForeground, DEFAULT_BRAND_COLORS.mutedForeground),
    primary: resolve(brandingColors.primary, DEFAULT_BRAND_COLORS.primary),
    primaryForeground: resolve(brandingColors.primaryForeground, DEFAULT_BRAND_COLORS.primaryForeground),
    secondary: resolve(brandingColors.secondary, DEFAULT_BRAND_COLORS.secondary),
    secondaryForeground: resolve(brandingColors.secondaryForeground, DEFAULT_BRAND_COLORS.secondaryForeground),
    accent: resolve(brandingColors.accent, DEFAULT_BRAND_COLORS.accent),
    accentForeground: resolve(brandingColors.accentForeground, DEFAULT_BRAND_COLORS.accentForeground),
    destructive: resolve(brandingColors.destructive, DEFAULT_BRAND_COLORS.destructive),
    destructiveForeground: resolve(brandingColors.destructiveForeground, DEFAULT_BRAND_COLORS.destructiveForeground),
    warning: resolve(brandingColors.warning, DEFAULT_BRAND_COLORS.warning),
    border: resolve(brandingColors.border, DEFAULT_BRAND_COLORS.border)
  };
};

export { normalizeColorToHex, resolveEmailBrandingColors };
//# sourceMappingURL=email-branding-colors.js.map
