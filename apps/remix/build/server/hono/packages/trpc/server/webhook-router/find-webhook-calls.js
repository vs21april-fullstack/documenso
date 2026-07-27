import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/teams.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildTeamWhereQuery } from '../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZFindWebhookCallsRequestSchema, ZFindWebhookCallsResponseSchema } from './find-webhook-calls.types.js';

const findWebhookCallsRoute = authenticatedProcedure.input(ZFindWebhookCallsRequestSchema).output(ZFindWebhookCallsResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    webhookId,
    page,
    perPage,
    status,
    query,
    events
  } = input;
  ctx.logger.info({
    input: {
      webhookId,
      status
    }
  });
  return await findWebhookCalls({
    userId: ctx.user.id,
    teamId: ctx.teamId,
    webhookId,
    page,
    perPage,
    status,
    query,
    events
  });
});
const findWebhookCalls = async ({
  userId,
  teamId,
  webhookId,
  page = 1,
  perPage = 20,
  events,
  query = '',
  status
}) => {
  const webhook = await prismaWithReplicas.webhook.findFirst({
    where: {
      id: webhookId,
      team: buildTeamWhereQuery({
        teamId,
        userId,
        roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP.MANAGE_TEAM
      })
    }
  });
  if (!webhook) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  const whereClause = {
    webhookId: webhook.id,
    status,
    id: query || undefined,
    event: events && events.length > 0 ? {
      in: events
    } : undefined
  };
  const [data, count] = await Promise.all([prismaWithReplicas.webhookCall.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      createdAt: 'desc'
    }
  }), prismaWithReplicas.webhookCall.count({
    where: whereClause
  })]);
  return {
    data,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { findWebhookCalls, findWebhookCallsRoute };
//# sourceMappingURL=find-webhook-calls.js.map
