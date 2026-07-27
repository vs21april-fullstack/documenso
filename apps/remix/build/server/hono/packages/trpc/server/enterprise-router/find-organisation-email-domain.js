import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZFindOrganisationEmailDomainsRequestSchema, ZFindOrganisationEmailDomainsResponseSchema } from './find-organisation-email-domain.types.js';

const findOrganisationEmailDomainsRoute = authenticatedProcedure.input(ZFindOrganisationEmailDomainsRequestSchema).output(ZFindOrganisationEmailDomainsResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    organisationId,
    emailDomainId,
    statuses,
    query,
    page,
    perPage
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  return await findOrganisationEmailDomains({
    userId: user.id,
    organisationId,
    emailDomainId,
    statuses,
    query,
    page,
    perPage
  });
});
const findOrganisationEmailDomains = async ({
  userId,
  organisationId,
  emailDomainId,
  statuses = [],
  query,
  page = 1,
  perPage = 100
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
    organisationId: organisation.id,
    status: statuses.length > 0 ? {
      in: statuses
    } : undefined
  };
  if (emailDomainId) {
    whereClause.id = emailDomainId;
  }
  if (query) {
    whereClause.domain = {
      contains: query
    };
  }
  const [data, count] = await Promise.all([prismaWithReplicas.emailDomain.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      status: true,
      organisationId: true,
      domain: true,
      selector: true,
      createdAt: true,
      updatedAt: true,
      lastVerifiedAt: true,
      _count: {
        select: {
          emails: true
        }
      }
    }
  }), prismaWithReplicas.emailDomain.count({
    where: whereClause
  })]);
  const mappedData = data.map(item => ({
    ...item,
    emailCount: item._count.emails
  }));
  return {
    data: mappedData,
    count,
    currentPage: page,
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { findOrganisationEmailDomains, findOrganisationEmailDomainsRoute };
//# sourceMappingURL=find-organisation-email-domain.js.map
