import { TeamMemberRole } from '../../../prisma/generated/types.js';
import { z } from 'zod';

const ZCreateTeamMembersRequestSchema = z.object({
  teamId: z.number(),
  organisationMembers: z.array(z.object({
    organisationMemberId: z.string().min(1),
    teamRole: z.nativeEnum(TeamMemberRole).describe('The team role to add the user as')
  })).min(1).superRefine((items, ctx) => {
    const seen = new Map();
    items.forEach((item, index) => {
      const id = item.organisationMemberId;
      if (seen.has(id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'IDs must be unique',
          path: [index, 'organisationMemberId'] // relative to organisationMembers
        });
      } else {
        seen.set(id, index);
      }
    });
  })
});
const ZCreateTeamMembersResponseSchema = z.void();

export { ZCreateTeamMembersRequestSchema, ZCreateTeamMembersResponseSchema };
//# sourceMappingURL=create-team-members.types.js.map
