import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZFindEmailDomainsRequestSchema, ZFindEmailDomainsResponseSchema } from './find-email-domains.types.js';

const findEmailDomainsRoute = adminProcedure.input(ZFindEmailDomainsRequestSchema).output(ZFindEmailDomainsResponseSchema).query(async ({
  input
}) => {
  const {
    query,
    page,
    perPage,
    status
  } = input;
  return await findEmailDomains({
    query,
    page,
    perPage,
    status
  });
});
const findEmailDomains = async ({
  query,
  page = 1,
  perPage = 20,
  status
}) => {
  const whereClause = {};
  if (query) {
    whereClause.OR = [{
      domain: {
        contains: query
      }
    }, {
      organisation: {
        name: {
          contains: query
        }
      }
    }];
  }
  if (status) {
    whereClause.status = status;
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
      domain: true,
      status: true,
      selector: true,
      createdAt: true,
      updatedAt: true,
      lastVerifiedAt: true,
      organisation: {
        select: {
          id: true,
          name: true,
          url: true
        }
      },
      _count: {
        select: {
          emails: true
        }
      }
    }
  }), prismaWithReplicas.emailDomain.count({
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

export { findEmailDomainsRoute };
//# sourceMappingURL=find-email-domains.js.map
