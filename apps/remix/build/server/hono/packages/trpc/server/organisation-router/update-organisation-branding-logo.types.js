import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { zodFormData, zfdBrandingImageFile } from '../../utils/zod-form-data.js';

const ZUpdateOrganisationBrandingLogoRequestSchema = zodFormData({
  payload: zfd.json(z.object({
    organisationId: z.string()
  })),
  brandingLogo: zfdBrandingImageFile().optional()
});
const ZUpdateOrganisationBrandingLogoResponseSchema = z.void();

export { ZUpdateOrganisationBrandingLogoRequestSchema, ZUpdateOrganisationBrandingLogoResponseSchema };
//# sourceMappingURL=update-organisation-branding-logo.types.js.map
