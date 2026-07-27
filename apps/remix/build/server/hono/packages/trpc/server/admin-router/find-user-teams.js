import { getHighestTeamRoleInGroup } from '../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZFindUserTeamsRequestSchema, ZFindUserTeamsResponseSchema } from './find-user-teams.types.js';

const findUserTeamsRoute = adminProcedure.input(ZFindUserTeamsRequestSchema).output(ZFindUserTeamsResponseSchema).query(async ({
  input
}) => {
  const {
    userId,
    query,
    page,
    perPage
  } = input;
  return await findUserTeams({
    userId,
    query,
    page,
    perPage
  });
});
const findUserTeams = async ({
  userId,
  query,
  page = 1,
  perPage = 10
}) => {
  const whereClause = {
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
      createdAt: 'desc'
    },
    include: {
      organisation: {
        select: {
          id: true,
          name: true,
          url: true
        }
      },
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
  const mappedData = data.map(team => ({
    id: team.id,
    name: team.name,
    url: team.url,
    createdAt: team.createdAt,
    teamRole: getHighestTeamRoleInGroup(team.teamGroups),
    organisation: team.organisation
  }));
  return {
    data: mappedData,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { findUserTeamsRoute };
//# sourceMappingURL=find-user-teams.js.map
