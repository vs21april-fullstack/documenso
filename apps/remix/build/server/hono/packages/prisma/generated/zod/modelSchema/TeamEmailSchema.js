import { z } from 'zod';

/////////////////////////////////////////
// TEAM EMAIL SCHEMA
/////////////////////////////////////////
const TeamEmailSchema = z.object({
  teamId: z.number(),
  createdAt: z.coerce.date(),
  name: z.string(),
  email: z.string()
});

export { TeamEmailSchema, TeamEmailSchema as default };
//# sourceMappingURL=TeamEmailSchema.js.map
