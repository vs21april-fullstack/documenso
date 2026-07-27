import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';

const getWebhookById = async ({
  id,
  userId,
  teamId
}) => {
  return await prismaWithReplicas.webhook.findFirstOrThrow({
    where: {
      id,
      team: buildTeamWhereQuery({
        teamId,
        userId,
        roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP.MANAGE_TEAM
      })
    }
  });
};

export { getWebhookById };
//# sourceMappingURL=get-webhook-by-id.js.map
