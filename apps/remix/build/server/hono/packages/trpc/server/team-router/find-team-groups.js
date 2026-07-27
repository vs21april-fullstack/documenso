import { buildTeamWhereQuery } from '../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { unique } from 'remeda';
import { authenticatedProcedure } from '../trpc.js';
import { ZFindTeamGroupsRequestSchema, ZFindTeamGroupsResponseSchema } from './find-team-groups.types.js';

const findTeamGroupsRoute = authenticatedProcedure
// .meta(getTeamGroupsMeta)
.input(ZFindTeamGroupsRequestSchema).output(ZFindTeamGroupsResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    types,
    query,
    page,
    perPage,
    teamGroupId,
    organisationRoles
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      teamId,
      teamGroupId
    }
  });
  return await findTeamGroups({
    userId: user.id,
    teamId,
    teamGroupId,
    types: unique(types || []),
    organisationRoles: unique(organisationRoles || []),
    query,
    page,
    perPage
  });
});
const findTeamGroups = async ({
  userId,
  teamId,
  teamGroupId,
  types = [],
  organisationRoles = [],
  query,
  page = 1,
  perPage = 10
}) => {
  const whereClause = {
    team: buildTeamWhereQuery({
      teamId,
      userId
    }),
    id: teamGroupId,
    organisationGroup: {
      organisationRole: organisationRoles.length > 0 ? {
        in: organisationRoles
      } : undefined,
      type: types.length > 0 ? {
        in: types
      } : undefined,
      ...(query && {
        name: {
          contains: query
        }
      })
    }
  };
  const [data, count] = await Promise.all([prismaWithReplicas.teamGroup.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      organisationGroup: {
        name: 'desc'
      }
    },
    select: {
      id: true,
      teamRole: true,
      teamId: true,
      organisationGroup: {
        select: {
          id: true,
          name: true,
          type: true,
          organisationGroupMembers: {
            select: {
              organisationMember: {
                select: {
                  id: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      avatarImageId: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }), prismaWithReplicas.teamGroup.count({
    where: whereClause
  })]);
  const mappedData = data.map(group => ({
    id: group.id,
    teamId: group.teamId,
    teamRole: group.teamRole,
    name: group.organisationGroup.name || '',
    organisationGroupId: group.organisationGroup.id,
    organisationGroupType: group.organisationGroup.type,
    members: group.organisationGroup.organisationGroupMembers.map(({
      organisationMember
    }) => ({
      id: organisationMember.id,
      userId: organisationMember.user.id,
      name: organisationMember.user.name || '',
      email: organisationMember.user.email,
      avatarImageId: organisationMember.user.avatarImageId
    }))
  }));
  return {
    data: mappedData,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { findTeamGroups, findTeamGroupsRoute };
//# sourceMappingURL=find-team-groups.js.map
