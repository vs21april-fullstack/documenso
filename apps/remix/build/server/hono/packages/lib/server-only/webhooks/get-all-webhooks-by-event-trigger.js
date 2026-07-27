import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';

const getAllWebhooksByEventTrigger = async ({
  event,
  userId,
  teamId
}) => {
  return prismaWithReplicas.webhook.findMany({
    where: {
      enabled: true,
      eventTriggers: {
        array_contains: [event]
      },
      team: buildTeamWhereQuery({
        teamId,
        userId
      })
    }
  });
};

export { getAllWebhooksByEventTrigger };
//# sourceMappingURL=get-all-webhooks-by-event-trigger.js.map
