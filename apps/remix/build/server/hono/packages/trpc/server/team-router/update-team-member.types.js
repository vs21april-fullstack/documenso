import { TeamMemberRole } from '@prisma/client';
import { z } from 'zod';

// export const updateTeamMemberMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'POST',
//     path: '/team/member/update',
//     summary: 'Update team member',
//     description: 'Update team member',
//     tags: ['Team'],
//   },
// };
const ZUpdateTeamMemberRequestSchema = z.object({
  teamId: z.number(),
  memberId: z.string(),
  data: z.object({
    role: z.nativeEnum(TeamMemberRole)
  })
});
const ZUpdateTeamMemberResponseSchema = z.void();

export { ZUpdateTeamMemberRequestSchema, ZUpdateTeamMemberResponseSchema };
//# sourceMappingURL=update-team-member.types.js.map
