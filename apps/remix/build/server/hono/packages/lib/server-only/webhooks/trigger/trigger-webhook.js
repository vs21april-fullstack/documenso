import { jobs } from '../../../jobs/client.js';
import { getAllWebhooksByEventTrigger } from '../get-all-webhooks-by-event-trigger.js';

const triggerWebhook = async ({
  event,
  data,
  userId,
  teamId
}) => {
  try {
    const registeredWebhooks = await getAllWebhooksByEventTrigger({
      event,
      userId,
      teamId
    });
    if (registeredWebhooks.length === 0) {
      return;
    }
    await Promise.allSettled(registeredWebhooks.map(async webhook => {
      await jobs.triggerJob({
        name: 'internal.execute-webhook',
        payload: {
          event,
          webhookId: webhook.id,
          data
        }
      });
    }));
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to trigger webhook`);
  }
};

export { triggerWebhook };
//# sourceMappingURL=trigger-webhook.js.map
