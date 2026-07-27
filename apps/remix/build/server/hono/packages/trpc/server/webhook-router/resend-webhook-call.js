import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/teams.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { jobs } from '../../../lib/jobs/client.js';
import { ZWebhookPayloadSchema } from '../../../lib/types/webhook-payload.js';
import { buildTeamWhereQuery } from '../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZResendWebhookCallRequestSchema, ZResendWebhookCallResponseSchema } from './resend-webhook-call.types.js';

const resendWebhookCallRoute = authenticatedProcedure.input(ZResendWebhookCallRequestSchema).output(ZResendWebhookCallResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    webhookId,
    webhookCallId
  } = input;
  ctx.logger.info({
    input: {
      webhookId,
      webhookCallId
    }
  });
  const webhookCall = await prismaWithReplicas.webhookCall.findFirst({
    where: {
      id: webhookCallId,
      webhook: {
        id: webhookId,
        team: buildTeamWhereQuery({
          teamId,
          userId: user.id,
          roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP.MANAGE_TEAM
        })
      }
    }
  });
  if (!webhookCall) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  // `requestBody` stores the full delivery envelope; unwrap to the inner
  // document so the handler doesn't wrap it a second time.
  const {
    payload: data
  } = ZWebhookPayloadSchema.parse(webhookCall.requestBody);
  await jobs.triggerJob({
    name: 'internal.execute-webhook',
    payload: {
      event: webhookCall.event,
      webhookId,
      data
    }
  });
});

export { resendWebhookCallRoute };
//# sourceMappingURL=resend-webhook-call.js.map
