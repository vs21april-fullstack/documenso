import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { buildTeamWhereQuery } from '../../utils/teams.js';

const updateTeam = async ({
  userId,
  teamId,
  data
}) => {
  try {
    const foundTeamWithUrl = await prismaWithReplicas.team.findFirst({
      where: {
        url: data.url,
        id: {
          not: teamId
        }
      }
    });
    const foundOrganisationWithUrl = await prismaWithReplicas.organisation.findFirst({
      where: {
        url: data.url
      }
    });
    if (foundTeamWithUrl || foundOrganisationWithUrl) {
      throw new AppError(AppErrorCode.ALREADY_EXISTS, {
        message: 'Team URL already exists.'
      });
    }
    await prismaWithReplicas.team.update({
      where: buildTeamWhereQuery({
        teamId,
        userId,
        roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
      }),
      data: {
        url: data.url,
        name: data.name
      }
    });
  } catch (err) {
    console.error(err);
    if (!(err instanceof Prisma.PrismaClientKnownRequestError)) {
      throw err;
    }
    const target = z.array(z.string()).safeParse(err.meta?.target);
    if (err.code === 'P2002' && target.success && target.data.includes('url')) {
      throw new AppError(AppErrorCode.ALREADY_EXISTS, {
        message: 'Team URL already exists.'
      });
    }
    throw err;
  }
};

export { updateTeam };
//# sourceMappingURL=update-team.js.map
