import { z } from 'zod';

const ZDeleteAdminTeamMemberRequestSchema = z.object({
  teamId: z.number().min(1),
  memberId: z.string().min(1)
});
const ZDeleteAdminTeamMemberResponseSchema = z.void();

export { ZDeleteAdminTeamMemberRequestSchema, ZDeleteAdminTeamMemberResponseSchema };
//# sourceMappingURL=delete-team-member.types.js.map
