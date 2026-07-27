/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *
 * KEEP THIS FILE IN SYNC WITH `packages/ui/styles/theme.css`.
 *
 * These are the light-mode default values for the CSS custom properties
 * defined under `:root` in the theme stylesheet, exposed here as hex strings
 * so they can be used as defaults for colour-picker UI components and other
 * places that don't render through CSS variables.
 *
 * If you change a value in `theme.css`, update it here too. There is NO
 * automated check linking the two files; they have drifted historically
 * and will drift again unless you update both.
 *
 * Computed via `colord({ h, s, l }).toHex()` — see the inline HSL comments
 * for the source-of-truth values from `theme.css`.
 *
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */
const DEFAULT_BRAND_COLORS = {
  background: '#ffffff',
  //              0 0% 100%
  foreground: '#0f172a',
  //              222.2 47.4% 11.2%
  muted: '#f1f5f9',
  //                   210 40% 96.1%
  mutedForeground: '#64748b',
  //        0 0% 95%
  border: '#e2e8f0',
  //                   214.3 31.8% 91.4%
  primary: '#a2e771',
  //                 95.08 71.08% 67.45%
  primaryForeground: '#162c07',
  //       95.08 71.08% 10%
  secondary: '#f1f5f9',
  //               210 40% 96.1%
  secondaryForeground: '#0f172a',
  //     222.2 47.4% 11.2%
  accent: '#f1f5f9',
  //                  210 40% 96.1%
  accentForeground: '#0f172a',
  //        222.2 47.4% 11.2%
  destructive: '#ff0000',
  //             0 100% 50%
  destructiveForeground: '#f8fafc',
  //                    95.08 71.08% 67.45%
  warning: '#e1cb05'};

export { DEFAULT_BRAND_COLORS };
//# sourceMappingURL=theme.js.map
