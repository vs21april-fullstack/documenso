import { prisma } from '@documenso/prisma';
import { DateTime } from 'luxon';

import { addZeroMonth } from '../add-zero-month';

export const getSignerConversionMonthly = async (type: 'count' | 'cumulative' = 'count') => {
  const rows = await prisma.$queryRaw<Array<{ month: string; count: bigint }>>`
    SELECT DATE_FORMAT(u.createdAt, '%Y-%m') AS month, COUNT(DISTINCT r.email) AS count
    FROM \`Recipient\` r
    INNER JOIN \`User\` u ON r.email = u.email
    WHERE r.signedAt IS NOT NULL AND r.signedAt < u.createdAt
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
        label: type === 'count' ? 'Signers That Signed Up' : 'Total Signers That Signed Up',
        data: result.map((row) => (type === 'count' ? row.count : row.cume_count)),
      },
    ],
  };

  return addZeroMonth(transformedData, type === 'cumulative');
};

export type GetSignerConversionMonthlyResult = Awaited<ReturnType<typeof getSignerConversionMonthly>>;
