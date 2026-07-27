import { z } from 'zod';

const ZDeleteAdminOrganisationMemberRequestSchema = z.object({
  organisationId: z.string().min(1),
  organisationMemberId: z.string().min(1)
});
const ZDeleteAdminOrganisationMemberResponseSchema = z.void();

export { ZDeleteAdminOrganisationMemberRequestSchema, ZDeleteAdminOrganisationMemberResponseSchema };
//# sourceMappingURL=delete-organisation-member.types.js.map
