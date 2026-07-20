import { prisma } from '@documenso/prisma';
import type { Passkey, Prisma } from '@prisma/client';

import type { FindResultResponse } from '../../types/search-params';

export interface FindPasskeysOptions {
  userId: number;
  query?: string;
  page?: number;
  perPage?: number;
  orderBy?: {
    column: keyof Passkey;
    direction: 'asc' | 'desc';
    nulls?: Prisma.NullsOrder;
  };
}

export const findPasskeys = async ({ userId, query = '', page = 1, perPage = 10, orderBy }: FindPasskeysOptions) => {
  const orderByColumn = orderBy?.column ?? 'lastUsedAt';
  const orderByDirection = orderBy?.direction ?? 'desc';
  const orderByNulls: Prisma.NullsOrder | undefined = orderBy?.nulls ?? 'last';

  const whereClause: Prisma.PasskeyWhereInput = {
    userId,
  };

  if (query.length > 0) {
    whereClause.name = {
      contains: query,
    };
  }

  const [data, count] = await Promise.all([
    prisma.passkey.findMany({
      where: whereClause,
      skip: Math.max(page - 1, 0) * perPage,
      take: perPage,
      orderBy: {
        [orderByColumn]: {
          sort: orderByDirection,
          nulls: orderByNulls,
        },
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
        transports: true,
      },
    }),
    prisma.passkey.count({
      where: whereClause,
    }),
  ]);

  const normalizedData: Omit<Passkey, 'credentialId' | 'credentialPublicKey'>[] = data.map((passkey) => ({
    ...passkey,
    transports: Array.isArray(passkey.transports) ? (passkey.transports as string[]) : [],
  }));

  return {
    data: normalizedData,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage),
  } satisfies FindResultResponse<typeof normalizedData>;
};
