import { z } from 'zod';

/////////////////////////////////////////
// ORGANISATION MEMBER SCHEMA
/////////////////////////////////////////
const OrganisationMemberSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.number(),
  organisationId: z.string()
});

export { OrganisationMemberSchema, OrganisationMemberSchema as default };
//# sourceMappingURL=OrganisationMemberSchema.js.map
