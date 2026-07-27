import { z } from 'zod';
import { TeamMemberRoleSchema } from '../inputTypeSchemas/TeamMemberRoleSchema.js';

/////////////////////////////////////////
// TEAM GROUP SCHEMA
/////////////////////////////////////////
const TeamGroupSchema = z.object({
  teamRole: TeamMemberRoleSchema,
  id: z.string(),
  organisationGroupId: z.string(),
  teamId: z.number()
});

export { TeamGroupSchema };
//# sourceMappingURL=TeamGroupSchema.js.map
