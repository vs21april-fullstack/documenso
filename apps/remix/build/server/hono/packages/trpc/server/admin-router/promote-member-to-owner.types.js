import { z } from 'zod';

const ZPromoteMemberToOwnerRequestSchema = z.object({
  organisationId: z.string().min(1),
  userId: z.number().min(1)
});
const ZPromoteMemberToOwnerResponseSchema = z.void();

export { ZPromoteMemberToOwnerRequestSchema, ZPromoteMemberToOwnerResponseSchema };
//# sourceMappingURL=promote-member-to-owner.types.js.map
