import { prisma as prismaWithReplicas } from '../../../prisma/index.js';

const findUserSecurityAuditLogs = async ({
  userId,
  type,
  page = 1,
  perPage = 10,
  orderBy
}) => {
  const orderByColumn = orderBy?.column ?? 'createdAt';
  const orderByDirection = orderBy?.direction ?? 'desc';
  const whereClause = {
    userId,
    type
  };
  const [data, count] = await Promise.all([prismaWithReplicas.userSecurityAuditLog.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      [orderByColumn]: orderByDirection
    }
  }), prismaWithReplicas.userSecurityAuditLog.count({
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

export { findUserSecurityAuditLogs };
//# sourceMappingURL=find-user-security-audit-logs.js.map
