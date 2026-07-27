import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZFindAdminOrganisationsRequestSchema, ZFindAdminOrganisationsResponseSchema } from './find-admin-organisations.types.js';

const findAdminOrganisationsRoute = adminProcedure.input(ZFindAdminOrganisationsRequestSchema).output(ZFindAdminOrganisationsResponseSchema).query(async ({
  input
}) => {
  const {
    query,
    page,
    perPage,
    ownerUserId,
    memberUserId
  } = input;
  return await findAdminOrganisations({
    query,
    page,
    perPage,
    ownerUserId,
    memberUserId
  });
});
const findAdminOrganisations = async ({
  query,
  page = 1,
  perPage = 10,
  ownerUserId,
  memberUserId
}) => {
  let whereClause = {};
  if (query) {
    whereClause = {
      OR: [{
        id: {
          contains: query
        }
      }, {
        owner: {
          email: {
            contains: query
          }
        }
      }, {
        customerId: {
          contains: query
        }
      }, {
        name: {
          contains: query
        }
      }]
    };
  }
  if (query && query.startsWith('claim:')) {
    whereClause = {
      organisationClaim: {
        originalSubscriptionClaimId: {
          contains: query.slice(6)
        }
      }
    };
  }
  if (query && query.startsWith('org_')) {
    whereClause = {
      OR: [{
        id: {
          equals: query
        }
      }, {
        url: {
          equals: query
        }
      }]
    };
  }
  if (ownerUserId) {
    whereClause = {
      ...whereClause,
      ownerUserId
    };
  }
  if (memberUserId) {
    whereClause = {
      ...whereClause,
      members: {
        some: {
          userId: memberUserId
        }
      }
    };
  }
  const orderBy = query ? [{
    subscription: {
      status: 'asc'
    }
  }, {
    name: 'asc'
  }] : [{
    createdAt: 'desc'
  }];
  const [data, count] = await Promise.all([prismaWithReplicas.organisation.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy,
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      url: true,
      customerId: true,
      owner: {
        select: {
          id: true,
          email: true,
          name: true
        }
      },
      subscription: true
    }
  }), prismaWithReplicas.organisation.count({
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

export { findAdminOrganisations, findAdminOrganisationsRoute };
//# sourceMappingURL=find-admin-organisations.js.map
