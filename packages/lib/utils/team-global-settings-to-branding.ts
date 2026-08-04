import type { OrganisationGlobalSettings } from '@prisma/client';

import { ZCssVarsSchema } from '../types/css-vars';
import { resolveEmailBrandingColors } from './email-branding-colors';
import { resolveWebappUrl } from './url';

export const teamGlobalSettingsToBranding = (
  settings: Omit<OrganisationGlobalSettings, 'id'>,
  teamId: number,
  hidePoweredBy: boolean,
) => {
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

export const organisationGlobalSettingsToBranding = (
  settings: Omit<OrganisationGlobalSettings, 'id'>,
  organisationId: string,
  hidePoweredBy: boolean,
) => {
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
