import { z } from 'zod';
import { OrganisationMemberInviteStatusSchema } from '../inputTypeSchemas/OrganisationMemberInviteStatusSchema.js';
import { OrganisationMemberRoleSchema } from '../inputTypeSchemas/OrganisationMemberRoleSchema.js';

/////////////////////////////////////////
// ORGANISATION MEMBER INVITE SCHEMA
/////////////////////////////////////////
const OrganisationMemberInviteSchema = z.object({
  status: OrganisationMemberInviteStatusSchema,
  organisationRole: OrganisationMemberRoleSchema,
  id: z.string(),
  createdAt: z.coerce.date(),
  email: z.string(),
  token: z.string(),
  organisationId: z.string()
});

export { OrganisationMemberInviteSchema, OrganisationMemberInviteSchema as default };
//# sourceMappingURL=OrganisationMemberInviteSchema.js.map
