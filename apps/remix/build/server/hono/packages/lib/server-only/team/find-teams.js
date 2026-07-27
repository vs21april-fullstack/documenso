import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { getHighestTeamRoleInGroup } from '../../utils/teams.js';

const findTeams = async ({
  userId,
  organisationId,
  query,
  page = 1,
  perPage = 10,
  orderBy
}) => {
  const orderByColumn = orderBy?.column ?? 'name';
  const orderByDirection = orderBy?.direction ?? 'desc';
  const whereClause = {
    organisation: {
      id: organisationId
    },
    teamGroups: {
      some: {
        organisationGroup: {
          organisationGroupMembers: {
            some: {
              organisationMember: {
                userId
              }
            }
          }
        }
      }
    }
  };
  if (query && query.length > 0) {
    whereClause.name = {
      contains: query
    };
  }
  const [data, count] = await Promise.all([prismaWithReplicas.team.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      [orderByColumn]: orderByDirection
    },
    include: {
      teamGroups: {
        where: {
          organisationGroup: {
            organisationGroupMembers: {
              some: {
                organisationMember: {
                  userId
                }
              }
            }
          }
        }
      }
    }
  }), prismaWithReplicas.team.count({
    where: whereClause
  })]);
  const maskedData = data.map(team => ({
    ...team,
    currentTeamRole: getHighestTeamRoleInGroup(team.teamGroups)
  }));
  return {
    data: maskedData,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { findTeams };
//# sourceMappingURL=find-teams.js.map
