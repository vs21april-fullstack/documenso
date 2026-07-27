import { ZOrganisationSchema } from '../../../lib/types/organisation.js';
import { OrganisationMemberRole, TeamMemberRole } from '../../../prisma/generated/types.js';
import { SubscriptionSchema } from '../../../prisma/generated/zod/modelSchema/SubscriptionSchema.js';
import { TeamEmailSchema } from '../../../prisma/generated/zod/modelSchema/TeamEmailSchema.js';
import { TeamSchema } from '../../../prisma/generated/zod/modelSchema/TeamSchema.js';
import { z } from 'zod';

const ZGetOrganisationSessionResponseSchema = ZOrganisationSchema.extend({
  teams: z.array(TeamSchema.pick({
    id: true,
    name: true,
    url: true,
    createdAt: true,
    avatarImageId: true,
    organisationId: true
  }).extend({
    currentTeamRole: z.nativeEnum(TeamMemberRole),
    teamEmail: TeamEmailSchema.pick({
      email: true
    }).nullable(),
    preferences: z.object({
      aiFeaturesEnabled: z.boolean()
    })
  })),
  subscription: SubscriptionSchema.nullable(),
  currentOrganisationRole: z.nativeEnum(OrganisationMemberRole)
}).array();

export { ZGetOrganisationSessionResponseSchema };
//# sourceMappingURL=get-organisation-session.types.js.map
