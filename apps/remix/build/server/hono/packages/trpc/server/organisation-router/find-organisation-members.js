import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getHighestOrganisationRoleInGroup, buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZFindOrganisationMembersRequestSchema, ZFindOrganisationMembersResponseSchema } from './find-organisation-members.types.js';

const findOrganisationMembersRoute = authenticatedProcedure
//   .meta(getOrganisationMembersMeta)
.input(ZFindOrganisationMembersRequestSchema).output(ZFindOrganisationMembersResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    organisationId
  } = input;
  const {
    id
  } = ctx.user;
  const organisationMembers = await findOrganisationMembers({
    userId: id,
    organisationId,
    query: input.query,
    page: input.page,
    perPage: input.perPage,
    excludeTeamId: input.excludeTeamId
  });
  return {
    ...organisationMembers,
    data: organisationMembers.data.map(organisationMember => {
      const groups = organisationMember.organisationGroupMembers.map(group => group.group);
      return {
        id: organisationMember.id,
        userId: organisationMember.user.id,
        email: organisationMember.user.email,
        name: organisationMember.user.name || '',
        createdAt: organisationMember.createdAt,
        currentOrganisationRole: getHighestOrganisationRoleInGroup(groups),
        avatarImageId: organisationMember.user.avatarImageId,
        groups
      };
    })
  };
});
const findOrganisationMembers = async ({
  userId,
  organisationId,
  query,
  page = 1,
  perPage = 10,
  excludeTeamId
}) => {
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId
    })
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  const whereClause = {
    organisationId: organisation.id
  };
  if (query) {
    whereClause.user = {
      OR: [{
        email: {
          contains: query
        }
      }, {
        name: {
          contains: query
        }
      }]
    };
  }
  // Exclude organisation members who are already part of the given team —
  // i.e. they belong to an organisation group that has a team-group entry
  // pointing at the team.
  if (excludeTeamId !== undefined) {
    whereClause.organisationGroupMembers = {
      none: {
        group: {
          teamGroups: {
            some: {
              teamId: excludeTeamId
            }
          }
        }
      }
    };
  }
  const [data, count] = await Promise.all([prismaWithReplicas.organisationMember.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      organisationId: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          avatarImageId: true
        }
      },
      organisationGroupMembers: {
        select: {
          group: true
        }
      },
      createdAt: true
    }
  }), prismaWithReplicas.organisationMember.count({
    where: whereClause
  })]);
  return {
    data,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { findOrganisationMembers, findOrganisationMembersRoute };
//# sourceMappingURL=find-organisation-members.js.map
