import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZFindOrganisationMemberInvitesRequestSchema, ZFindOrganisationMemberInvitesResponseSchema } from './find-organisation-member-invites.types.js';

const findOrganisationMemberInvitesRoute = authenticatedProcedure
//   .meta(getOrganisationMemberInvitesMeta)
.input(ZFindOrganisationMemberInvitesRequestSchema).output(ZFindOrganisationMemberInvitesResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    organisationId,
    query,
    page,
    perPage,
    status
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  return await findOrganisationMemberInvites({
    userId: user.id,
    organisationId,
    query,
    page,
    perPage,
    status
  });
});
const findOrganisationMemberInvites = async ({
  userId,
  organisationId,
  query,
  page = 1,
  perPage = 10,
  status
}) => {
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
    })
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  const whereClause = {
    organisationId: organisation.id,
    status
  };
  if (query) {
    whereClause.email = {
      contains: query
    };
  }
  const [data, count] = await Promise.all([prismaWithReplicas.organisationMemberInvite.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      createdAt: 'desc'
    },
    // Exclude token attribute.
    select: {
      id: true,
      organisationId: true,
      email: true,
      createdAt: true,
      organisationRole: true,
      status: true
    }
  }), prismaWithReplicas.organisationMemberInvite.count({
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

export { findOrganisationMemberInvites, findOrganisationMemberInvitesRoute };
//# sourceMappingURL=find-organisation-member-invites.js.map
