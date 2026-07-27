import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { DocumentStatus, EnvelopeType, RecipientRole } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetInboxCountRequestSchema, ZGetInboxCountResponseSchema } from './get-inbox-count.types.js';

const getInboxCountRoute = authenticatedProcedure.input(ZGetInboxCountRequestSchema).output(ZGetInboxCountResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    readStatus
  } = input ?? {};
  const userEmail = ctx.user.email;
  const count = await prismaWithReplicas.recipient.count({
    where: {
      email: userEmail,
      readStatus,
      role: {
        not: RecipientRole.CC
      },
      envelope: {
        type: EnvelopeType.DOCUMENT,
        status: {
          notIn: [DocumentStatus.DRAFT, DocumentStatus.REJECTED]
        },
        deletedAt: null
      }
    }
  });
  return {
    count
  };
});

export { getInboxCountRoute };
//# sourceMappingURL=get-inbox-count.js.map
