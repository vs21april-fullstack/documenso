import { prisma } from '@documenso/prisma';
import { DateTime } from 'luxon';

import { addZeroMonth } from '../add-zero-month';

export const getUserMonthlyGrowth = async (type: 'count' | 'cumulative' = 'count') => {
  const rows = await prisma.$queryRaw<Array<{ month: string; count: bigint }>>`
    SELECT DATE_FORMAT(createdAt, '%Y-%m') AS month, COUNT(*) AS count
    FROM \`User\`
    GROUP BY month
    ORDER BY month ASC
  `;

  let cumulativeCount = 0;
  const result = rows.map((row) => {
    cumulativeCount += Number(row.count);
    return { month: row.month, count: Number(row.count), cume_count: cumulativeCount };
  });

  const transformedData = {
    labels: result.map((row) => DateTime.fromFormat(row.month, 'yyyy-MM').toFormat('MMM yyyy')),
    datasets: [
      {
        label: type === 'count' ? 'New Users' : 'Total Users',
        data: result.map((row) => (type === 'count' ? row.count : row.cume_count)),
      },
    ],
  };

  return addZeroMonth(transformedData, type === 'cumulative');
};

export type GetUserMonthlyGrowthResult = Awaited<ReturnType<typeof getUserMonthlyGrowth>>;
