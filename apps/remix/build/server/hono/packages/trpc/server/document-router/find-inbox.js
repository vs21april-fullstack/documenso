import { mapEnvelopesToDocumentMany } from '../../../lib/utils/document.js';
import { maskRecipientTokensForDocument } from '../../../lib/utils/mask-recipient-tokens-for-document.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { RecipientRole, DocumentStatus, EnvelopeType } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { ZFindInboxRequestSchema, ZFindInboxResponseSchema } from './find-inbox.types.js';

const findInboxRoute = authenticatedProcedure.input(ZFindInboxRequestSchema).output(ZFindInboxResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    page,
    perPage
  } = input;
  const userId = ctx.user.id;
  const envelopes = await findInbox({
    userId,
    page,
    perPage
  });
  return {
    ...envelopes,
    data: envelopes.data.map(mapEnvelopesToDocumentMany)
  };
});
const findInbox = async ({
  userId,
  page = 1,
  perPage = 10,
  orderBy
}) => {
  const user = await prismaWithReplicas.user.findFirstOrThrow({
    where: {
      id: userId
    },
    select: {
      id: true,
      email: true
    }
  });
  const orderByColumn = orderBy?.column ?? 'createdAt';
  const orderByDirection = orderBy?.direction ?? 'desc';
  const whereClause = {
    type: EnvelopeType.DOCUMENT,
    status: {
      not: DocumentStatus.DRAFT
    },
    deletedAt: null,
    recipients: {
      some: {
        email: user.email,
        role: {
          not: RecipientRole.CC
        }
      }
    }
  };
  const [data, count] = await Promise.all([prismaWithReplicas.envelope.findMany({
    where: whereClause,
    skip: Math.max(page - 1, 0) * perPage,
    take: perPage,
    orderBy: {
      [orderByColumn]: orderByDirection
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
    where: whereClause
  })]);
  const maskedData = data.map(document => maskRecipientTokensForDocument({
    document,
    user
  }));
  return {
    data: maskedData,
    count,
    currentPage: Math.max(page, 1),
    perPage,
    totalPages: Math.ceil(count / perPage)
  };
};

export { findInbox, findInboxRoute };
//# sourceMappingURL=find-inbox.js.map
