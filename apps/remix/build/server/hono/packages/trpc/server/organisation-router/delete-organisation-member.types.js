import { z } from 'zod';

// export const deleteOrganisationMemberMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'POST',
//     path: '/organisation/member/delete',
//     summary: 'Delete organisation member',
//     description: 'Delete organisation member',
//     tags: ['Organisation'],
//   },
// };
const ZDeleteOrganisationMemberRequestSchema = z.object({
  organisationId: z.string(),
  organisationMemberId: z.string()
});
const ZDeleteOrganisationMemberResponseSchema = z.void();

export { ZDeleteOrganisationMemberRequestSchema, ZDeleteOrganisationMemberResponseSchema };
//# sourceMappingURL=delete-organisation-member.types.js.map
