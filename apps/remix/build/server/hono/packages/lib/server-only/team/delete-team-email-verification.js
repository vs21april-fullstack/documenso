import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';

const deleteTeamEmailVerification = async ({
  userId,
  teamId
}) => {
  await prismaWithReplicas.team.findFirstOrThrow({
    where: buildTeamWhereQuery({
      teamId,
      userId,
      roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
    })
  });
  await prismaWithReplicas.teamEmailVerification.delete({
    where: {
      teamId
    }
  });
};

export { deleteTeamEmailVerification };
//# sourceMappingURL=delete-team-email-verification.js.map
