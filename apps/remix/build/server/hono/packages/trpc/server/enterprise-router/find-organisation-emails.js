import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZFindOrganisationEmailsRequestSchema, ZFindOrganisationEmailsResponseSchema } from './find-organisation-emails.types.js';

const findOrganisationEmailsRoute = authenticatedProcedure.input(ZFindOrganisationEmailsRequestSchema).output(ZFindOrganisationEmailsResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    organisationId,
    emailDomainId,
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
  return await findOrganisationEmails({
    userId: user.id,
    organisationId,
    emailDomainId,
    query,
    page,
    perPage
  });
});
const findOrganisationEmails = async ({
  userId,
  organisationId,
  emailDomainId,
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
    emailDomainId
  };
  if (query) {
    whereClause.email = {
      contains: query
    };
  }
  const [data, count] = await Promise.all([prismaWithReplicas.organisationEmail.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      email: true,
      emailName: true,
      // replyTo: true,
      emailDomainId: true,
      organisationId: true
    }
  }), prismaWithReplicas.organisationEmail.count({
    where: whereClause
  })]);
  return {
    data,
    count,
    currentPage: page,
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { findOrganisationEmails, findOrganisationEmailsRoute };
//# sourceMappingURL=find-organisation-emails.js.map
