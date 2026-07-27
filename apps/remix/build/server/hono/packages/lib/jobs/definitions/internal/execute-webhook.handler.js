import { executeWebhookCall } from '../../../server-only/webhooks/execute-webhook-call.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { WebhookCallStatus } from '@prisma/client';

const run = async ({
  payload,
  io: _io
}) => {
  const {
    event,
    webhookId,
    data
  } = payload;
  const webhook = await prismaWithReplicas.webhook.findUniqueOrThrow({
    where: {
      id: webhookId
    }
  });
  const {
    webhookUrl: url,
    secret
  } = webhook;
  const payloadData = {
    event,
    payload: data,
    createdAt: new Date().toISOString(),
    webhookEndpoint: url
  };
  const result = await executeWebhookCall({
    url,
    body: payloadData,
    secret
  });
  await prismaWithReplicas.webhookCall.create({
    data: {
      url,
      event,
      status: result.success ? WebhookCallStatus.SUCCESS : WebhookCallStatus.FAILED,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      requestBody: payloadData,
      responseCode: result.responseCode,
      responseBody: result.responseBody,
      responseHeaders: result.responseHeaders,
      webhookId: webhook.id
    }
  });
  if (!result.success) {
    throw new Error(`Webhook execution failed with status ${result.responseCode}`);
  }
  return {
    success: true,
    status: result.responseCode
  };
};

export { run };
//# sourceMappingURL=execute-webhook.handler.js.map
