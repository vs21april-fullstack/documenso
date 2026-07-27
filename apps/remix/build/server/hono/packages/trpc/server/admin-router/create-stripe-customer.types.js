import { z } from 'zod';

const ZCreateStripeCustomerRequestSchema = z.object({
  organisationId: z.string().describe('The organisation to attach the customer to')
});
const ZCreateStripeCustomerResponseSchema = z.void();

export { ZCreateStripeCustomerRequestSchema, ZCreateStripeCustomerResponseSchema };
//# sourceMappingURL=create-stripe-customer.types.js.map
