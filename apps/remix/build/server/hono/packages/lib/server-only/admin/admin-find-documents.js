import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { z } from 'zod';

const ZPositiveIntegerSchema = z.coerce.number().int().positive();
const emptyResponse = {
  data: [],
  count: 0,
  currentPage: 1,
  perPage: 10,
  totalPages: 0
};
const adminFindDocuments = async ({
  query,
  page = 1,
  perPage = 10
}) => {
  let termFilters = !query ? undefined : {
    title: {
      contains: query
    }
  };
  if (query?.startsWith('user:')) {
    const parsedUserId = ZPositiveIntegerSchema.safeParse(query.slice('user:'.length));
    if (parsedUserId.success) {
      termFilters = {
        userId: {
          equals: parsedUserId.data
        }
      };
    } else {
      return emptyResponse;
    }
  }
  if (query?.startsWith('team:')) {
    const parsedTeamId = ZPositiveIntegerSchema.safeParse(query.slice('team:'.length));
    if (parsedTeamId.success) {
      termFilters = {
        teamId: {
          equals: parsedTeamId.data
        }
      };
    } else {
      return emptyResponse;
    }
  }
  if (query && query?.startsWith('envelope_')) {
    termFilters = {
      id: {
        equals: query
      }
    };
  }
  if (query && query?.startsWith('document_')) {
    termFilters = {
      secondaryId: {
        equals: query
      }
    };
  }
  if (query) {
    const isQueryAnInteger = !isNaN(parseInt(query));
    if (isQueryAnInteger) {
      termFilters = {
        secondaryId: {
          equals: `document_${query}`
        }
      };
    }
  }
  const [data, count] = await Promise.all([prismaWithReplicas.envelope.findMany({
    where: {
      type: EnvelopeType.DOCUMENT,
      ...termFilters
    },
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      recipients: true,
      team: {
        select: {
          id: true,
          url: true
        }
      },
      envelopeItems: {
        select: {
          id: true,
          envelopeId: true,
          title: true,
          order: true
        }
      }
    }
  }), prismaWithReplicas.envelope.count({
    where: {
      type: EnvelopeType.DOCUMENT,
      ...termFilters
    }
  })]);
  return {
    data,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { adminFindDocuments };
//# sourceMappingURL=admin-find-documents.js.map
