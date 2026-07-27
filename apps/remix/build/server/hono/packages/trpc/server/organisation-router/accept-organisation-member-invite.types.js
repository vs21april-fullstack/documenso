import { z } from 'zod';

const ZAcceptOrganisationMemberInviteRequestSchema = z.object({
  token: z.string()
});
const ZAcceptOrganisationMemberInviteResponseSchema = z.void();

export { ZAcceptOrganisationMemberInviteRequestSchema, ZAcceptOrganisationMemberInviteResponseSchema };
//# sourceMappingURL=accept-organisation-member-invite.types.js.map
