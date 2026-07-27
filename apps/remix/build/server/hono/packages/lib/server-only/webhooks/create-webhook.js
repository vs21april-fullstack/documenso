import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';

const createWebhook = async ({
  webhookUrl,
  eventTriggers,
  secret,
  enabled,
  userId,
  teamId
}) => {
  const team = await prismaWithReplicas.team.findFirst({
    where: buildTeamWhereQuery({
      teamId,
      userId,
      roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
    })
  });
  if (!team) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Team not found'
    });
  }
  return await prismaWithReplicas.webhook.create({
    data: {
      webhookUrl,
      eventTriggers,
      secret,
      enabled,
      userId,
      teamId
    }
  });
};

export { createWebhook };
//# sourceMappingURL=create-webhook.js.map
