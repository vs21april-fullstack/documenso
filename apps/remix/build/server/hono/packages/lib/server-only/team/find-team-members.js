import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { match, P } from 'ts-pattern';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { getHighestOrganisationRoleInGroup } from '../../utils/organisations.js';
import { getHighestTeamRoleInGroup } from '../../utils/teams.js';

const findTeamMembers = async ({
  userId,
  teamId,
  query,
  page = 1,
  perPage = 10,
  orderBy
}) => {
  const orderByColumn = orderBy?.column ?? 'name';
  const orderByDirection = orderBy?.direction ?? 'desc';
  // Check that the user belongs to the team they are trying to find members in.
  const userTeam = await prismaWithReplicas.organisationMember.findFirst({
    where: {
      userId,
      organisationGroupMembers: {
        some: {
          group: {
            teamGroups: {
              some: {
                teamId
              }
            }
          }
        }
      }
    }
  });
  if (!userTeam) {
    throw new AppError(AppErrorCode.UNAUTHORIZED);
  }
  const termFilters = match(query).with(P.string.minLength(1), () => ({
    user: {
      OR: [{
        name: {
          contains: query
        }
      }, {
        email: {
          contains: query
        }
      }]
    }
  })).otherwise(() => undefined);
  const whereClause = {
    ...termFilters,
    organisationGroupMembers: {
      some: {
        group: {
          teamGroups: {
            some: {
              teamId
            }
          }
        }
      }
    }
  };
  let orderByClause = {
    [orderByColumn]: orderByDirection
  };
  // Name field is nested in the user so we have to handle it differently.
  if (orderByColumn === 'name') {
    orderByClause = {
      user: {
        name: orderByDirection
      }
    };
  }
  const [data, count] = await Promise.all([prismaWithReplicas.organisationMember.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: orderByClause,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          avatarImageId: true
        }
      },
      organisationGroupMembers: {
        include: {
          group: {
            include: {
              teamGroups: true
            }
          }
        }
      }
    }
  }), prismaWithReplicas.organisationMember.count({
    where: whereClause
  })]);
  // same as get-team-members.
  const mappedData = data.map(member => ({
    id: member.id,
    userId: member.userId,
    createdAt: member.createdAt,
    email: member.user.email,
    name: member.user.name,
    avatarImageId: member.user.avatarImageId,
    // Filter teamGroups to only include the current team
    teamRole: getHighestTeamRoleInGroup(member.organisationGroupMembers.flatMap(({
      group
    }) => group.teamGroups.filter(tg => tg.teamId === teamId))),
    teamRoleGroupType: member.organisationGroupMembers[0].group.type,
    organisationRole: getHighestOrganisationRoleInGroup(member.organisationGroupMembers.flatMap(({
      group
    }) => group))
  }));
  return {
    data: mappedData,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { findTeamMembers };
//# sourceMappingURL=find-team-members.js.map
