import { getWebhookById } from './get-webhook-by-id.js';
import { generateSampleWebhookPayload } from './trigger/generate-sample-data.js';
import { triggerWebhook } from './trigger/trigger-webhook.js';

const triggerTestWebhook = async ({
  id,
  event,
  userId,
  teamId
}) => {
  const webhook = await getWebhookById({
    id,
    userId,
    teamId
  });
  if (!webhook.enabled) {
    throw new Error('Webhook is disabled');
  }
  if (!webhook.eventTriggers.includes(event)) {
    throw new Error(`Webhook does not support event: ${event}`);
  }
  const samplePayload = generateSampleWebhookPayload(event, webhook.webhookUrl);
  try {
    await triggerWebhook({
      event,
      data: samplePayload.payload,
      userId,
      teamId
    });
    return {
      success: true,
      message: 'Test webhook triggered successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export { triggerTestWebhook };
//# sourceMappingURL=trigger-test-webhook.js.map
