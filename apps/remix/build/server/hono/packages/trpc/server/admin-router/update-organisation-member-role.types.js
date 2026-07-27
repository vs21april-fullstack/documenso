import { OrganisationMemberRole } from '@prisma/client';
import { z } from 'zod';

/**
 * Admin-only role selection that includes OWNER as a special case.
 * OWNER is not a database role but triggers ownership transfer.
 */
const ZAdminRoleSelection = z.enum(['OWNER', OrganisationMemberRole.ADMIN, OrganisationMemberRole.MANAGER, OrganisationMemberRole.MEMBER]);
const ZUpdateOrganisationMemberRoleRequestSchema = z.object({
  organisationId: z.string().min(1),
  userId: z.number().min(1),
  role: ZAdminRoleSelection
});
const ZUpdateOrganisationMemberRoleResponseSchema = z.void();

export { ZAdminRoleSelection, ZUpdateOrganisationMemberRoleRequestSchema, ZUpdateOrganisationMemberRoleResponseSchema };
//# sourceMappingURL=update-organisation-member-role.types.js.map
