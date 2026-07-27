import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';

const deleteWebhookById = async ({
  id,
  userId,
  teamId
}) => {
  return await prismaWithReplicas.webhook.delete({
    where: {
      id,
      team: buildTeamWhereQuery({
        teamId,
        userId,
        roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
      })
    }
  });
};

export { deleteWebhookById };
//# sourceMappingURL=delete-webhook-by-id.js.map
