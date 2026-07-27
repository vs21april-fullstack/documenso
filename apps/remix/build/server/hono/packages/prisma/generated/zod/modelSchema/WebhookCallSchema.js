import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema.js';
import { WebhookCallStatusSchema } from '../inputTypeSchemas/WebhookCallStatusSchema.js';
import { WebhookTriggerEventsSchema } from '../inputTypeSchemas/WebhookTriggerEventsSchema.js';

/////////////////////////////////////////
// WEBHOOK CALL SCHEMA
/////////////////////////////////////////
const WebhookCallSchema = z.object({
  status: WebhookCallStatusSchema,
  event: WebhookTriggerEventsSchema,
  id: z.string(),
  url: z.string(),
  requestBody: JsonValueSchema,
  responseCode: z.number(),
  responseHeaders: JsonValueSchema.nullable(),
  responseBody: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  webhookId: z.string()
});

export { WebhookCallSchema, WebhookCallSchema as default };
//# sourceMappingURL=WebhookCallSchema.js.map
