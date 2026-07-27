import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { zodFormData, zfdBrandingImageFile } from '../../utils/zod-form-data.js';

const ZUpdateTeamBrandingLogoRequestSchema = zodFormData({
  payload: zfd.json(z.object({
    teamId: z.number()
  })),
  brandingLogo: zfdBrandingImageFile().optional()
});
const ZUpdateTeamBrandingLogoResponseSchema = z.void();

export { ZUpdateTeamBrandingLogoRequestSchema, ZUpdateTeamBrandingLogoResponseSchema };
//# sourceMappingURL=update-team-branding-logo.types.js.map
