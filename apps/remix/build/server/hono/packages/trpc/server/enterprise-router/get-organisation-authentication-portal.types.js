import { OrganisationAuthenticationPortalSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationAuthenticationPortalSchema.js';
import { z } from 'zod';

const ZGetOrganisationAuthenticationPortalRequestSchema = z.object({
  organisationId: z.string()
});
const ZGetOrganisationAuthenticationPortalResponseSchema = OrganisationAuthenticationPortalSchema.pick({
  defaultOrganisationRole: true,
  enabled: true,
  clientId: true,
  wellKnownUrl: true,
  autoProvisionUsers: true,
  allowedDomains: true,
  allowPersonalOrganisations: true
}).extend({
  /**
   * Whether we have the client secret in the database.
   *
   * Do not expose the actual client secret.
   */
  clientSecretProvided: z.boolean()
});

export { ZGetOrganisationAuthenticationPortalRequestSchema, ZGetOrganisationAuthenticationPortalResponseSchema };
//# sourceMappingURL=get-organisation-authentication-portal.types.js.map
