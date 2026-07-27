import { ZEmailTransportPublicConfigSchema } from '../../../../lib/server-only/email/email-transport-config.js';
import { ZFindResultResponse, ZFindSearchParamsSchema } from '../../../../lib/types/search-params.js';
import { EmailTransportSchema } from '../../../../prisma/generated/zod/modelSchema/EmailTransportSchema.js';
import { z } from 'zod';

const ZFindEmailTransportsRequestSchema = ZFindSearchParamsSchema;
const ZFindEmailTransportsResponseSchema = ZFindResultResponse.extend({
  data: EmailTransportSchema.pick({
    id: true,
    name: true,
    type: true,
    fromName: true,
    fromAddress: true,
    createdAt: true,
    updatedAt: true
  }).extend({
    _count: z.object({
      subscriptionClaims: z.number(),
      organisationClaims: z.number()
    }),
    // Non-secret connection settings, so the edit form can pre-fill them.
    // Null when the stored config can't be decrypted/parsed.
    config: ZEmailTransportPublicConfigSchema.nullable()
  }).array()
});

export { ZFindEmailTransportsRequestSchema, ZFindEmailTransportsResponseSchema };
//# sourceMappingURL=find-email-transports.types.js.map
