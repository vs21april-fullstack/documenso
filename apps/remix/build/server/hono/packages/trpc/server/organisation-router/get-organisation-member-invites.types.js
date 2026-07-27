import { OrganisationMemberInviteSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationMemberInviteSchema.js';
import { OrganisationSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationSchema.js';
import { OrganisationMemberInviteStatus } from '@prisma/client';
import { z } from 'zod';

const ZGetOrganisationMemberInvitesRequestSchema = z.object({
  status: z.nativeEnum(OrganisationMemberInviteStatus).optional()
});
const ZGetOrganisationMemberInvitesResponseSchema = OrganisationMemberInviteSchema.pick({
  id: true,
  organisationId: true,
  email: true,
  createdAt: true,
  token: true
}).extend({
  organisation: OrganisationSchema.pick({
    id: true,
    name: true,
    url: true,
    avatarImageId: true
  })
}).array();

export { ZGetOrganisationMemberInvitesRequestSchema, ZGetOrganisationMemberInvitesResponseSchema };
//# sourceMappingURL=get-organisation-member-invites.types.js.map
