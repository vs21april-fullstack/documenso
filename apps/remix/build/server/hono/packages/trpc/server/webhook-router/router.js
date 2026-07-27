import { createWebhook } from '../../../lib/server-only/webhooks/create-webhook.js';
import { deleteWebhookById } from '../../../lib/server-only/webhooks/delete-webhook-by-id.js';
import { editWebhook } from '../../../lib/server-only/webhooks/edit-webhook.js';
import { getWebhookById } from '../../../lib/server-only/webhooks/get-webhook-by-id.js';
import { getWebhooksByTeamId } from '../../../lib/server-only/webhooks/get-webhooks-by-team-id.js';
import { triggerTestWebhook } from '../../../lib/server-only/webhooks/trigger-test-webhook.js';
import { router, authenticatedProcedure } from '../trpc.js';
import { findWebhookCallsRoute } from './find-webhook-calls.js';
import { resendWebhookCallRoute } from './resend-webhook-call.js';
import { ZTriggerTestWebhookRequestSchema, ZEditWebhookRequestSchema, ZDeleteWebhookRequestSchema, ZCreateWebhookRequestSchema, ZGetWebhookByIdRequestSchema } from './schema.js';

const webhookRouter = router({
  calls: {
    find: findWebhookCallsRoute,
    resend: resendWebhookCallRoute
  },
  getTeamWebhooks: authenticatedProcedure.query(async ({
    ctx
  }) => {
    ctx.logger.info({
      input: {
        teamId: ctx.teamId
      }
    });
    return await getWebhooksByTeamId(ctx.teamId, ctx.user.id);
  }),
  getWebhookById: authenticatedProcedure.input(ZGetWebhookByIdRequestSchema).query(async ({
    input,
    ctx
  }) => {
    const {
      id
    } = input;
    ctx.logger.info({
      input: {
        id
      }
    });
    return await getWebhookById({
      id,
      userId: ctx.user.id,
      teamId: ctx.teamId
    });
  }),
  createWebhook: authenticatedProcedure.input(ZCreateWebhookRequestSchema).mutation(async ({
    input,
    ctx
  }) => {
    const {
      enabled,
      eventTriggers,
      secret,
      webhookUrl
    } = input;
    return await createWebhook({
      enabled,
      secret,
      webhookUrl,
      eventTriggers,
      teamId: ctx.teamId,
      userId: ctx.user.id
    });
  }),
  deleteWebhook: authenticatedProcedure.input(ZDeleteWebhookRequestSchema).mutation(async ({
    input,
    ctx
  }) => {
    const {
      id
    } = input;
    ctx.logger.info({
      input: {
        id
      }
    });
    return await deleteWebhookById({
      id,
      teamId: ctx.teamId,
      userId: ctx.user.id
    });
  }),
  editWebhook: authenticatedProcedure.input(ZEditWebhookRequestSchema).mutation(async ({
    input,
    ctx
  }) => {
    const {
      id,
      ...data
    } = input;
    ctx.logger.info({
      input: {
        id
      }
    });
    return await editWebhook({
      id,
      data,
      userId: ctx.user.id,
      teamId: ctx.teamId
    });
  }),
  testWebhook: authenticatedProcedure.input(ZTriggerTestWebhookRequestSchema).mutation(async ({
    input,
    ctx
  }) => {
    const {
      id,
      event
    } = input;
    ctx.logger.info({
      input: {
        id,
        event
      }
    });
    return await triggerTestWebhook({
      id,
      event,
      userId: ctx.user.id,
      teamId: ctx.teamId
    });
  })
});

export { webhookRouter };
//# sourceMappingURL=router.js.map
