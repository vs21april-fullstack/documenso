import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const findPasskeys = async ({
  userId,
  query = '',
  page = 1,
  perPage = 10,
  orderBy
}) => {
  const orderByColumn = orderBy?.column ?? 'lastUsedAt';
  const orderByDirection = orderBy?.direction ?? 'desc';
  const orderByNulls = orderBy?.nulls ?? 'last';
  const whereClause = {
    userId
  };
  if (query.length > 0) {
    whereClause.name = {
      contains: query
    };
  }
  const [data, count] = await Promise.all([prismaWithReplicas.passkey.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      [orderByColumn]: {
        sort: orderByDirection,
        nulls: orderByNulls
      }
    },
    select: {
      id: true,
      userId: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      lastUsedAt: true,
      counter: true,
      credentialDeviceType: true,
      credentialBackedUp: true,
      transports: true
    }
  }), prismaWithReplicas.passkey.count({
    where: whereClause
  })]);
  const normalizedData = data.map(passkey => ({
    ...passkey,
    transports: Array.isArray(passkey.transports) ? passkey.transports : []
  }));
  return {
    data: normalizedData,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { findPasskeys };
//# sourceMappingURL=find-passkeys.js.map
