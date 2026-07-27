import { z } from 'zod';

// export const resendOrganisationMemberInviteMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'POST',
//     path: '/organisation/member/resend-invite',
//     summary: 'Resend organisation member invite',
//     description: 'Resend a organisation member invite',
//     tags: ['Organisation'],
//   },
// };
const ZResendOrganisationMemberInviteRequestSchema = z.object({
  organisationId: z.string(),
  invitationId: z.string()
});
const ZResendOrganisationMemberInviteResponseSchema = z.void();

export { ZResendOrganisationMemberInviteRequestSchema, ZResendOrganisationMemberInviteResponseSchema };
//# sourceMappingURL=resend-organisation-member-invite.types.js.map
