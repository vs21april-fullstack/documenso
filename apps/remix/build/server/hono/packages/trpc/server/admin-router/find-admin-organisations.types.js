import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { OrganisationSchema } from '../../../prisma/generated/zod/modelSchema/OrganisationSchema.js';
import { SubscriptionSchema } from '../../../prisma/generated/zod/modelSchema/SubscriptionSchema.js';
import { UserSchema } from '../../../prisma/generated/zod/modelSchema/UserSchema.js';
import { z } from 'zod';

const ZFindAdminOrganisationsRequestSchema = ZFindSearchParamsSchema.extend({
  ownerUserId: z.number().optional(),
  memberUserId: z.number().optional()
});
const ZFindAdminOrganisationsResponseSchema = ZFindResultResponse.extend({
  data: OrganisationSchema.pick({
    id: true,
    createdAt: true,
    updatedAt: true,
    name: true,
    url: true,
    customerId: true
  }).extend({
    owner: UserSchema.pick({
      id: true,
      email: true,
      name: true
    }),
    subscription: SubscriptionSchema.pick({
      status: true,
      id: true,
      planId: true,
      priceId: true,
      periodEnd: true,
      createdAt: true,
      updatedAt: true,
      cancelAtPeriodEnd: true
    }).nullable()
  }).array()
});

export { ZFindAdminOrganisationsRequestSchema, ZFindAdminOrganisationsResponseSchema };
//# sourceMappingURL=find-admin-organisations.types.js.map
