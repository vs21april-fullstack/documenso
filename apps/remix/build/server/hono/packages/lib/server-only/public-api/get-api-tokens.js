import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';

const getApiTokens = async ({
  userId,
  teamId
}) => {
  return await prismaWithReplicas.apiToken.findMany({
    where: {
      team: buildTeamWhereQuery({
        teamId,
        userId,
        roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
      })
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
      expires: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export { getApiTokens };
//# sourceMappingURL=get-api-tokens.js.map
