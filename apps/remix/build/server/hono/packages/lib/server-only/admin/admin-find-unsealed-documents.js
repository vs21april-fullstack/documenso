import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { SigningStatus, RecipientRole, EnvelopeType, DocumentStatus } from '@prisma/client';

const adminFindUnsealedDocuments = async ({
  page = 1,
  perPage = 20
}) => {
  const offset = Math.max(page - 1, 0) * perPage;
  const where = {
    status: DocumentStatus.PENDING,
    type: EnvelopeType.DOCUMENT,
    deletedAt: null,
    recipients: {
      some: {}
    },
    OR: [{
      recipients: {
        none: {
          AND: [{
            signingStatus: {
              not: SigningStatus.SIGNED
            }
          }, {
            role: {
              not: RecipientRole.CC
            }
          }]
        }
      }
    }, {
      recipients: {
        some: {
          signingStatus: SigningStatus.REJECTED
        }
      }
    }]
  };
  const [data, countResult] = await Promise.all([prismaWithReplicas.envelope.findMany({
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
      user: {
        select: {
          name: true,
          email: true
        }
      },
      recipients: {
        where: {
          signedAt: {
            not: null
          }
        },
        select: {
          signedAt: true
        },
        orderBy: {
          signedAt: 'desc'
        },
        take: 1
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: perPage,
    skip: offset
  }), prismaWithReplicas.envelope.count({
    where
  })]);
  const count = Number(countResult);
  return {
    data: data.map(({
      user,
      recipients,
      ...envelope
    }) => ({
      ...envelope,
      ownerName: user.name,
      ownerEmail: user.email,
      lastSignedAt: recipients[0]?.signedAt ?? null
    })),
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { adminFindUnsealedDocuments };
//# sourceMappingURL=admin-find-unsealed-documents.js.map
