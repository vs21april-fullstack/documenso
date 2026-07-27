import { z } from 'zod';

/////////////////////////////////////////
// TEAM SCHEMA
/////////////////////////////////////////
const TeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  createdAt: z.coerce.date(),
  avatarImageId: z.string().nullable(),
  organisationId: z.string(),
  teamGlobalSettingsId: z.string()
});

export { TeamSchema, TeamSchema as default };
//# sourceMappingURL=TeamSchema.js.map
