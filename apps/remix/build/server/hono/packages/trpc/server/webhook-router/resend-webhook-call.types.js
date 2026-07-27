import { z } from 'zod';

const ZResendWebhookCallRequestSchema = z.object({
  webhookId: z.string(),
  webhookCallId: z.string()
});
const ZResendWebhookCallResponseSchema = z.void();

export { ZResendWebhookCallRequestSchema, ZResendWebhookCallResponseSchema };
//# sourceMappingURL=resend-webhook-call.types.js.map
