import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';

const editWebhook = async ({
  id,
  data,
  userId,
  teamId
}) => {
  return await prismaWithReplicas.webhook.update({
    where: {
      id,
      team: buildTeamWhereQuery({
        teamId,
        userId,
        roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
      })
    },
    data: {
      ...data
    }
  });
};

export { editWebhook };
//# sourceMappingURL=edit-webhook.js.map
