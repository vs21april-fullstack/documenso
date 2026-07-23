import { prisma } from '@documenso/prisma';

type MonthlyCountRow = {
  month: string;
  count: bigint;
};

export const getUserMonthlyGrowth = async () => {
  const rows = await prisma.$queryRaw<MonthlyCountRow[]>`
    SELECT DATE_FORMAT(createdAt, '%Y-%m') AS month, COUNT(*) AS count
    FROM \`User\`
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

export type GetUserMonthlyGrowthResult = Awaited<ReturnType<typeof getUserMonthlyGrowth>>;
