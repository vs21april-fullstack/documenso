import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema.js';
import { OrganisationMemberRoleSchema } from '../inputTypeSchemas/OrganisationMemberRoleSchema.js';

/////////////////////////////////////////
// ORGANISATION AUTHENTICATION PORTAL SCHEMA
/////////////////////////////////////////
const OrganisationAuthenticationPortalSchema = z.object({
  defaultOrganisationRole: OrganisationMemberRoleSchema,
  id: z.string(),
  enabled: z.boolean(),
  clientId: z.string(),
  clientSecret: z.string(),
  wellKnownUrl: z.string(),
  autoProvisionUsers: z.boolean(),
  /**
   * [string[]]
   */
  allowedDomains: JsonValueSchema,
  allowPersonalOrganisations: z.boolean()
});

export { OrganisationAuthenticationPortalSchema };
//# sourceMappingURL=OrganisationAuthenticationPortalSchema.js.map
