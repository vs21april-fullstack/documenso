import { z } from 'zod';
import { OrganisationGroupTypeSchema } from '../inputTypeSchemas/OrganisationGroupTypeSchema.js';
import { OrganisationMemberRoleSchema } from '../inputTypeSchemas/OrganisationMemberRoleSchema.js';

/////////////////////////////////////////
// ORGANISATION GROUP SCHEMA
/////////////////////////////////////////
const OrganisationGroupSchema = z.object({
  type: OrganisationGroupTypeSchema,
  organisationRole: OrganisationMemberRoleSchema,
  id: z.string(),
  name: z.string().nullable(),
  organisationId: z.string()
});

export { OrganisationGroupSchema, OrganisationGroupSchema as default };
//# sourceMappingURL=OrganisationGroupSchema.js.map
