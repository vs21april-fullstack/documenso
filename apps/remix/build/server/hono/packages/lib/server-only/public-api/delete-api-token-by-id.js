import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';

const deleteTokenById = async ({
  id,
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
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You do not have permission to delete this token'
    });
  }
  await prismaWithReplicas.apiToken.delete({
    where: {
      id,
      teamId
    }
  });
};

export { deleteTokenById };
//# sourceMappingURL=delete-api-token-by-id.js.map
