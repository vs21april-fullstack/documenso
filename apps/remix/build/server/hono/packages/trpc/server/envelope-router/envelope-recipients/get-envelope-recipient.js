import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { getEnvelopeWhereInput } from '../../../../lib/server-only/envelope/get-envelope-by-id.js';
import { buildTeamWhereQuery } from '../../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { authenticatedProcedure } from '../../trpc.js';
import { getEnvelopeRecipientMeta, ZGetEnvelopeRecipientRequestSchema, ZGetEnvelopeRecipientResponseSchema } from './get-envelope-recipient.types.js';

const getEnvelopeRecipientRoute = authenticatedProcedure.meta(getEnvelopeRecipientMeta).input(ZGetEnvelopeRecipientRequestSchema).output(ZGetEnvelopeRecipientResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    recipientId
  } = input;
  ctx.logger.info({
    input: {
      recipientId
    }
  });
  const recipient = await prismaWithReplicas.recipient.findFirst({
    where: {
      id: recipientId,
      envelope: {
        team: buildTeamWhereQuery({
          teamId,
          userId: user.id
        })
      }
    },
    include: {
      fields: true
    }
  });
  if (!recipient) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Recipient not found'
    });
  }
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: recipient.envelopeId
    },
    type: null,
    userId: user.id,
    teamId
  });
  // Additional validation to check visibility.
  const envelope = await prismaWithReplicas.envelope.findUnique({
    where: envelopeWhereInput
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Recipient not found'
    });
  }
  return recipient;
});

export { getEnvelopeRecipientRoute };
//# sourceMappingURL=get-envelope-recipient.js.map
