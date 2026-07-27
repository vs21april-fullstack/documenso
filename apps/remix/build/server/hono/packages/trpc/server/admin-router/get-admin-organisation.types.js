import { ZOrganisationSchema } from '../../../lib/types/organisation.js';
import { OrganisationClaimSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationClaimSchema.js';
import { OrganisationGlobalSettingsSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationGlobalSettingsSchema.js';
import { OrganisationGroupMemberSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationGroupMemberSchema.js';
import { OrganisationGroupSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationGroupSchema.js';
import { OrganisationMemberSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationMemberSchema.js';
import { OrganisationMonthlyStatSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationMonthlyStatSchema.js';
import { SubscriptionSchema } from '../../../prisma/generated/zod/modelSchema/SubscriptionSchema.js';
import { TeamSchema } from '../../../prisma/generated/zod/modelSchema/TeamSchema.js';
import { UserSchema } from '../../../prisma/generated/zod/modelSchema/UserSchema.js';
import { z } from 'zod';

const ZGetAdminOrganisationRequestSchema = z.object({
  organisationId: z.string()
});
const ZGetAdminOrganisationResponseSchema = ZOrganisationSchema.extend({
  organisationGlobalSettings: OrganisationGlobalSettingsSchema,
  teams: z.array(TeamSchema.pick({
    id: true,
    name: true,
    url: true,
    createdAt: true,
    avatarImageId: true,
    organisationId: true
  })),
  members: OrganisationMemberSchema.extend({
    user: UserSchema.pick({
      id: true,
      email: true,
      name: true
    }),
    organisationGroupMembers: z.array(OrganisationGroupMemberSchema.pick({
      id: true,
      groupId: true
    }).extend({
      group: OrganisationGroupSchema.pick({
        id: true,
        type: true,
        organisationRole: true
      })
    }))
  }).array(),
  subscription: SubscriptionSchema.nullable(),
  organisationClaim: OrganisationClaimSchema,
  monthlyStats: z.array(OrganisationMonthlyStatSchema.pick({
    period: true,
    documentCount: true,
    emailCount: true,
    apiCount: true,
    emailReports: true
  }))
});

export { ZGetAdminOrganisationRequestSchema, ZGetAdminOrganisationResponseSchema };
//# sourceMappingURL=get-admin-organisation.types.js.map
