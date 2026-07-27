import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';

const updateTeamEmail = async ({
  userId,
  teamId,
  data
}) => {
  const team = await prismaWithReplicas.team.findFirst({
    where: buildTeamWhereQuery({
      teamId,
      userId,
      roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
    }),
    include: {
      teamEmail: true
    }
  });
  if (!team) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  if (!team.teamEmail) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Team email does not exist'
    });
  }
  await prismaWithReplicas.teamEmail.update({
    where: {
      teamId
    },
    data: {
      // Note: Never allow the email to be updated without re-verifying via email.
      name: data.name
    }
  });
};

export { updateTeamEmail };
//# sourceMappingURL=update-team-email.js.map
