import { prisma } from '@documenso/prisma';
import { SubscriptionStatus, UserSecurityAuditLogType } from '@documenso/prisma/client';

export const getUsersCount = async () => {
  return await prisma.user.count();
};

export const getOrganisationsWithSubscriptionsCount = async () => {
  return await prisma.organisation.count({
    where: {
      subscription: {
        status: SubscriptionStatus.ACTIVE,
      },
    },
  });
};

export type GetUserWithDocumentMonthlyGrowth = Array<{
  month: string;
  count: number;
  signed_count: number;
}>;

type GetUserWithDocumentMonthlyGrowthQueryResult = Array<{
  month: string;
  count: bigint;
  signed_count: bigint;
}>;

export const getUserWithSignedDocumentMonthlyGrowth = async () => {
  const result = await prisma.$queryRaw<GetUserWithDocumentMonthlyGrowthQueryResult>`
      SELECT
        DATE_FORMAT(e.createdAt, '%Y-%m') AS month,
        COUNT(DISTINCT e.userId) AS count,
        COUNT(DISTINCT CASE WHEN e.status = 'COMPLETED' THEN e.userId END) AS signed_count
      FROM Envelope e
      INNER JOIN Team t ON e.teamId = t.id
      INNER JOIN Organisation o ON t.organisationId = o.id
      WHERE e.type = 'DOCUMENT'
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12
`;

  return result.map((row) => ({
    month: row.month,
    count: Number(row.count),
    signed_count: Number(row.signed_count),
  }));
};

export type GetMonthlyActiveUsersResult = Array<{
  month: string;
  count: number;
  cume_count: number;
}>;

export const getMonthlyActiveUsers = async () => {
  const rows = await prisma.$queryRaw<Array<{ month: string; count: bigint }>>`
    SELECT DATE_FORMAT(createdAt, '%Y-%m') AS month, COUNT(DISTINCT userId) AS count
    FROM UserSecurityAuditLog
    WHERE type = ${UserSecurityAuditLogType.SIGN_IN}
    GROUP BY month
    ORDER BY month ASC
  `;

  let cumulativeCount = 0;

  return rows
    .map((row) => {
      const count = Number(row.count);
      cumulativeCount += count;

      return { month: row.month, count, cume_count: cumulativeCount };
    })
    .slice(-12)
    .reverse();
};
