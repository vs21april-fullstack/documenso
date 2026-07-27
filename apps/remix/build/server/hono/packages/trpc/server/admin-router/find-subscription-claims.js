import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZFindSubscriptionClaimsRequestSchema, ZFindSubscriptionClaimsResponseSchema } from './find-subscription-claims.types.js';

const findSubscriptionClaimsRoute = adminProcedure.input(ZFindSubscriptionClaimsRequestSchema).output(ZFindSubscriptionClaimsResponseSchema).query(async ({
  input
}) => {
  const {
    query,
    page,
    perPage
  } = input;
  return await findSubscriptionClaims({
    query,
    page,
    perPage
  });
});
const findSubscriptionClaims = async ({
  query,
  page = 1,
  perPage = 50
}) => {
  let whereClause = {};
  if (query) {
    whereClause = {
      OR: [{
        id: {
          contains: query
        }
      }, {
        name: {
          contains: query
        }
      }]
    };
  }
  const [data, count] = await Promise.all([prismaWithReplicas.subscriptionClaim.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      name: 'asc'
    }
  }), prismaWithReplicas.subscriptionClaim.count({
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

export { findSubscriptionClaims, findSubscriptionClaimsRoute };
//# sourceMappingURL=find-subscription-claims.js.map
