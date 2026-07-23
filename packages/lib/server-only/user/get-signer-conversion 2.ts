import { prisma } from '@documenso/prisma';

type MonthlyCountRow = {
  month: string;
  count: bigint;
};

export const getSignerConversionMonthly = async () => {
  const rows = await prisma.$queryRaw<MonthlyCountRow[]>`
    SELECT DATE_FORMAT(u.createdAt, '%Y-%m') AS month, COUNT(DISTINCT r.email) AS count
    FROM \`Recipient\` r
    INNER JOIN \`User\` u ON r.email = u.email
    WHERE r.signedAt IS NOT NULL AND r.signedAt < u.createdAt
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
    .reverse();
};

export type GetSignerConversionMonthlyResult = Awaited<ReturnType<typeof getSignerConversionMonthly>>;
