import { OrganisationMemberRoleSchema } from '../../../prisma/generated/zod/inputTypeSchemas/OrganisationMemberRoleSchema.js';
import { z } from 'zod';
import { domainRegex } from './create-organisation-email-domain.types.js';

const ZUpdateOrganisationAuthenticationPortalRequestSchema = z.object({
  organisationId: z.string(),
  data: z.object({
    defaultOrganisationRole: OrganisationMemberRoleSchema,
    enabled: z.boolean(),
    clientId: z.string(),
    clientSecret: z.string().optional(),
    wellKnownUrl: z.union([z.string().url(), z.literal('')]),
    autoProvisionUsers: z.boolean(),
    allowedDomains: z.array(z.string().regex(domainRegex)),
    allowPersonalOrganisations: z.boolean()
  })
});
const ZUpdateOrganisationAuthenticationPortalResponseSchema = z.void();

export { ZUpdateOrganisationAuthenticationPortalRequestSchema, ZUpdateOrganisationAuthenticationPortalResponseSchema };
//# sourceMappingURL=update-organisation-authentication-portal.types.js.map
