import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';

const updateTeamPublicProfile = async ({
  userId,
  teamId,
  data
}) => {
  return await prismaWithReplicas.team.update({
    where: buildTeamWhereQuery({
      teamId,
      userId,
      roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
    }),
    data: {
      profile: {
        upsert: {
          create: data,
          update: data
        }
      }
    },
    include: {
      profile: true
    }
  });
};

export { updateTeamPublicProfile };
//# sourceMappingURL=update-team-public-profile.js.map
