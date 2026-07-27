import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { deleteDocument } from '../../../lib/server-only/document/delete-document.js';
import { deleteTemplate } from '../../../lib/server-only/template/delete-template.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { match } from 'ts-pattern';
import { ZGenericSuccessResponse } from '../schema.js';
import { authenticatedProcedure } from '../trpc.js';
import { deleteEnvelopeMeta, ZDeleteEnvelopeRequestSchema, ZDeleteEnvelopeResponseSchema } from './delete-envelope.types.js';

const deleteEnvelopeRoute = authenticatedProcedure.meta(deleteEnvelopeMeta).input(ZDeleteEnvelopeRequestSchema).output(ZDeleteEnvelopeResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    envelopeId
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  const unsafeEnvelope = await prismaWithReplicas.envelope.findUnique({
    where: {
      id: envelopeId
    },
    select: {
      type: true
    }
  });
  if (!unsafeEnvelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  await match(unsafeEnvelope.type).with(EnvelopeType.DOCUMENT, async () => deleteDocument({
    userId: ctx.user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    requestMetadata: ctx.metadata
  })).with(EnvelopeType.TEMPLATE, async () => deleteTemplate({
    userId: ctx.user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    }
  })).exhaustive();
  return ZGenericSuccessResponse;
});

export { deleteEnvelopeRoute };
//# sourceMappingURL=delete-envelope.js.map
