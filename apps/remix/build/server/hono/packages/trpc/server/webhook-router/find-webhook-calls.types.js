import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { WebhookCallSchema } from '../../../prisma/generated/zod/modelSchema/WebhookCallSchema.js';
import { WebhookTriggerEvents, WebhookCallStatus } from '@prisma/client';
import { z } from 'zod';

const ZFindWebhookCallsRequestSchema = ZFindSearchParamsSchema.extend({
  webhookId: z.string(),
  status: z.nativeEnum(WebhookCallStatus).optional(),
  events: z.array(z.nativeEnum(WebhookTriggerEvents)).optional().refine(arr => !arr || new Set(arr).size === arr.length, {
    message: 'Events must be unique'
  })
});
const ZFindWebhookCallsResponseSchema = ZFindResultResponse.extend({
  data: WebhookCallSchema.pick({
    webhookId: true,
    status: true,
    event: true,
    id: true,
    url: true,
    responseCode: true,
    createdAt: true
  }).extend({
    requestBody: z.unknown(),
    responseHeaders: z.unknown().nullable(),
    responseBody: z.unknown().nullable()
  }).array()
});

export { ZFindWebhookCallsRequestSchema, ZFindWebhookCallsResponseSchema };
//# sourceMappingURL=find-webhook-calls.types.js.map
