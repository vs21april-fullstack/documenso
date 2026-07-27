import { ZNameSchema } from '../../../lib/types/name.js';
import { z } from 'zod';

// export const createOrganisationMeta: TrpcOpenApiMeta = {
//   openapi: {
//     method: 'POST',
//     path: '/organisation',
//     summary: 'Create organisation',
//     description: 'Create an organisation',
//     tags: ['Organisation'],
//   },
// };
const ZCreateOrganisationRequestSchema = z.object({
  name: ZNameSchema,
  priceId: z.string().optional()
});
const ZCreateOrganisationResponseSchema = z.union([z.object({
  paymentRequired: z.literal(false)
}), z.object({
  paymentRequired: z.literal(true),
  checkoutUrl: z.string()
})]);

export { ZCreateOrganisationRequestSchema, ZCreateOrganisationResponseSchema };
//# sourceMappingURL=create-organisation.types.js.map
