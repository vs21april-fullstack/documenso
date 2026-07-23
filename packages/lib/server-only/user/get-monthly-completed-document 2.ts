import { prisma } from '@documenso/prisma';
import { DocumentStatus, EnvelopeType } from '@prisma/client';

type MonthlyCountRow = {
  month: string;
  count: bigint;
};

export const getCompletedDocumentsMonthly = async () => {
  const rows = await prisma.$queryRaw<MonthlyCountRow[]>`
    SELECT DATE_FORMAT(updatedAt, '%Y-%m') AS month, COUNT(*) AS count
    FROM \`Envelope\`
    WHERE status = ${DocumentStatus.COMPLETED} AND type = ${EnvelopeType.DOCUMENT}
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

export type GetCompletedDocumentsMonthlyResult = Awaited<ReturnType<typeof getCompletedDocumentsMonthly>>;
