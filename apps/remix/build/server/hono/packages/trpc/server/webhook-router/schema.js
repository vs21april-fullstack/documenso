import { isPrivateUrl } from '../../../lib/server-only/webhooks/is-private-url.js';
import { URL_PATTERN } from '../../../lib/types/name.js';
import { WebhookTriggerEvents } from '@prisma/client';
import { z } from 'zod';

const ZWebhookUrlSchema = z.string().url().refine(url => !isPrivateUrl(url), {
  message: 'Webhook URL cannot point to a private or loopback address'
})
/*
 * Without this, values like "foo: bar" would be valid URLs.
 * Keep the same error message as the zod url() validator.
 */.refine(value => URL_PATTERN.test(value), {
  message: 'Invalid url'
});
const ZCreateWebhookRequestSchema = z.object({
  webhookUrl: ZWebhookUrlSchema,
  eventTriggers: z.array(z.nativeEnum(WebhookTriggerEvents)).min(1, {
    message: 'At least one event trigger is required'
  }),
  secret: z.string().nullable(),
  enabled: z.boolean()
});
const ZGetWebhookByIdRequestSchema = z.object({
  id: z.string()
});
const ZEditWebhookRequestSchema = ZCreateWebhookRequestSchema.extend({
  id: z.string()
});
const ZDeleteWebhookRequestSchema = z.object({
  id: z.string()
});
const ZTriggerTestWebhookRequestSchema = z.object({
  id: z.string(),
  event: z.nativeEnum(WebhookTriggerEvents)
});

export { ZCreateWebhookRequestSchema, ZDeleteWebhookRequestSchema, ZEditWebhookRequestSchema, ZGetWebhookByIdRequestSchema, ZTriggerTestWebhookRequestSchema, ZWebhookUrlSchema };
//# sourceMappingURL=schema.js.map
