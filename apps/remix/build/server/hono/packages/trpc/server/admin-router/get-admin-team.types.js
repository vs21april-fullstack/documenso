import { OrganisationMemberRoleSchema } from '../../../prisma/generated/zod/inputTypeSchemas/OrganisationMemberRoleSchema.js';
import { TeamMemberRoleSchema } from '../../../prisma/generated/zod/inputTypeSchemas/TeamMemberRoleSchema.js';
import { OrganisationGlobalSettingsSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationGlobalSettingsSchema.js';
import { OrganisationMemberInviteSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationMemberInviteSchema.js';
import { OrganisationMemberSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationMemberSchema.js';
import { OrganisationSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationSchema.js';
import { TeamEmailSchema } from '../../../prisma/generated/zod/modelSchema/TeamEmailSchema.js';
import { TeamGlobalSettingsSchema } from '../../../prisma/generated/zod/modelSchema/TeamGlobalSettingsSchema.js';
import { TeamSchema } from '../../../prisma/generated/zod/modelSchema/TeamSchema.js';
import { UserSchema } from '../../../prisma/generated/zod/modelSchema/UserSchema.js';
import { z } from 'zod';

const ZGetAdminTeamRequestSchema = z.object({
  teamId: z.number().min(1)
});
const ZGetAdminTeamResponseSchema = TeamSchema.extend({
  organisation: OrganisationSchema.pick({
    id: true,
    name: true,
    url: true,
    ownerUserId: true
  }).extend({
    organisationGlobalSettings: OrganisationGlobalSettingsSchema
  }),
  teamEmail: TeamEmailSchema.nullable(),
  teamGlobalSettings: TeamGlobalSettingsSchema.nullable(),
  memberCount: z.number(),
  teamMembers: OrganisationMemberSchema.pick({
    id: true,
    userId: true,
    createdAt: true
  }).extend({
    user: UserSchema.pick({
      id: true,
      email: true,
      name: true
    }),
    teamRole: TeamMemberRoleSchema,
    organisationRole: OrganisationMemberRoleSchema
  }).array(),
  pendingInvites: OrganisationMemberInviteSchema.pick({
    id: true,
    email: true,
    createdAt: true,
    organisationRole: true,
    status: true
  }).array()
});

export { ZGetAdminTeamRequestSchema, ZGetAdminTeamResponseSchema };
//# sourceMappingURL=get-admin-team.types.js.map
