import { z } from 'zod';

const ZDeclineOrganisationMemberInviteRequestSchema = z.object({
  token: z.string()
});
const ZDeclineOrganisationMemberInviteResponseSchema = z.void();

export { ZDeclineOrganisationMemberInviteRequestSchema, ZDeclineOrganisationMemberInviteResponseSchema };
//# sourceMappingURL=decline-organisation-member-invite.types.js.map
