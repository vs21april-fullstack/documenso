import { z } from 'zod';
import { OrganisationTypeSchema } from '../inputTypeSchemas/OrganisationTypeSchema.js';

/////////////////////////////////////////
// ORGANISATION SCHEMA
/////////////////////////////////////////
const OrganisationSchema = z.object({
  type: OrganisationTypeSchema,
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  url: z.string(),
  avatarImageId: z.string().nullable(),
  customerId: z.string().nullable(),
  organisationClaimId: z.string(),
  ownerUserId: z.number(),
  organisationGlobalSettingsId: z.string(),
  organisationAuthenticationPortalId: z.string()
});

export { OrganisationSchema, OrganisationSchema as default };
//# sourceMappingURL=OrganisationSchema.js.map
