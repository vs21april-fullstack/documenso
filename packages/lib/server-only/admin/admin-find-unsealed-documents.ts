import { prisma } from '@documenso/prisma';
import type { Prisma } from '@prisma/client';
import { DocumentStatus, EnvelopeType, RecipientRole, SigningStatus } from '@prisma/client';

import type { FindResultResponse } from '../../types/search-params';

export type AdminUnsealedDocument = {
  id: string;
  secondaryId: string;
  title: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  teamId: number;
  ownerName: string | null;
  ownerEmail: string;
  lastSignedAt: Date | null;
};

export type AdminFindUnsealedDocumentsOptions = {
  page?: number;
  perPage?: number;
};

export const adminFindUnsealedDocuments = async ({
  page = 1,
  perPage = 20,
}: AdminFindUnsealedDocumentsOptions): Promise<FindResultResponse<AdminUnsealedDocument[]>> => {
  const offset = Math.max(page - 1, 0) * perPage;

  const where: Prisma.EnvelopeWhereInput = {
    status: DocumentStatus.PENDING,
    type: EnvelopeType.DOCUMENT,
    deletedAt: null,
    recipients: { some: {} },
    OR: [
      {
        recipients: {
          none: {
            AND: [{ signingStatus: { not: SigningStatus.SIGNED } }, { role: { not: RecipientRole.CC } }],
          },
        },
      },
      { recipients: { some: { signingStatus: SigningStatus.REJECTED } } },
    ],
  };

  const [data, countResult] = await Promise.all([
    prisma.envelope.findMany({
      where,
      select: {
        id: true,
        secondaryId: true,
        title: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        teamId: true,
        user: { select: { name: true, email: true } },
        recipients: {
          where: { signedAt: { not: null } },
          select: { signedAt: true },
          orderBy: { signedAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: perPage,
      skip: offset,
    }),
    prisma.envelope.count({ where }),
  ]);

  const count = Number(countResult);

  return {
    data: data.map(({ user, recipients, ...envelope }) => ({
      ...envelope,
      ownerName: user.name,
      ownerEmail: user.email,
      lastSignedAt: recipients[0]?.signedAt ?? null,
    })),
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage),
  };
};
