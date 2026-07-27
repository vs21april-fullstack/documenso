import { z } from 'zod';
import { SubscriptionStatusSchema } from '../inputTypeSchemas/SubscriptionStatusSchema.js';

/////////////////////////////////////////
// SUBSCRIPTION SCHEMA
/////////////////////////////////////////
const SubscriptionSchema = z.object({
  status: SubscriptionStatusSchema,
  id: z.number(),
  planId: z.string(),
  priceId: z.string(),
  periodEnd: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  cancelAtPeriodEnd: z.boolean(),
  customerId: z.string(),
  organisationId: z.string()
});

export { SubscriptionSchema, SubscriptionSchema as default };
//# sourceMappingURL=SubscriptionSchema.js.map
