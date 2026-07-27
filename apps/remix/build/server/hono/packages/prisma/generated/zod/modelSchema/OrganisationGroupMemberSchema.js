import { z } from 'zod';

/////////////////////////////////////////
// ORGANISATION GROUP MEMBER SCHEMA
/////////////////////////////////////////
const OrganisationGroupMemberSchema = z.object({
  id: z.string(),
  groupId: z.string(),
  organisationMemberId: z.string()
});

export { OrganisationGroupMemberSchema, OrganisationGroupMemberSchema as default };
//# sourceMappingURL=OrganisationGroupMemberSchema.js.map
