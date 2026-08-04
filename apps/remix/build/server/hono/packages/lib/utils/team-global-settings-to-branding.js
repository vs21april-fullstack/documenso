import { ZCssVarsSchema } from '../types/css-vars.js';
import { resolveEmailBrandingColors } from './email-branding-colors.js';
import { resolveWebappUrl } from './url.js';

const teamGlobalSettingsToBranding = (settings, teamId, hidePoweredBy) => {
  const parsedColors = settings.brandingColors ? ZCssVarsSchema.safeParse(settings.brandingColors) : null;
  const resolvedBrandingColors = resolveEmailBrandingColors(parsedColors?.success ? parsedColors.data : null);
  return {
    ...settings,
    brandingLogo:
      settings.brandingEnabled && settings.brandingLogo ? resolveWebappUrl(`/api/branding/logo/team/${teamId}`) : '',
    brandingHidePoweredBy: hidePoweredBy,
    brandingColors: resolvedBrandingColors ?? undefined,
  };
};
const organisationGlobalSettingsToBranding = (settings, organisationId, hidePoweredBy) => {
  const parsedColors = settings.brandingColors ? ZCssVarsSchema.safeParse(settings.brandingColors) : null;
  const resolvedBrandingColors = resolveEmailBrandingColors(parsedColors?.success ? parsedColors.data : null);
  return {
    ...settings,
    brandingLogo:
      settings.brandingEnabled && settings.brandingLogo
        ? resolveWebappUrl(`/api/branding/logo/organisation/${organisationId}`)
        : '',
    brandingHidePoweredBy: hidePoweredBy,
    brandingColors: resolvedBrandingColors ?? undefined,
  };
};

export { organisationGlobalSettingsToBranding, teamGlobalSettingsToBranding };
//# sourceMappingURL=team-global-settings-to-branding.js.map
