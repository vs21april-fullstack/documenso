import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { getEnvelopeWhereInput } from '../../../../lib/server-only/envelope/get-envelope-by-id.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { FieldType } from '@prisma/client';
import { authenticatedProcedure } from '../../trpc.js';
import { ZGetEnvelopeFieldSignaturesRequestSchema, ZGetEnvelopeFieldSignaturesResponseSchema } from './get-envelope-field-signatures.types.js';

const getEnvelopeFieldSignaturesRoute = authenticatedProcedure.input(ZGetEnvelopeFieldSignaturesRequestSchema).output(ZGetEnvelopeFieldSignaturesResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    envelopeId
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  // Validate the user has access to the envelope.
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    type: null,
    userId: user.id,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput,
    include: {
      fields: {
        where: {
          inserted: true,
          type: {
            in: [FieldType.SIGNATURE, FieldType.FREE_SIGNATURE]
          }
        },
        include: {
          signature: true
        }
      }
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  const signatures = envelope.fields.map(field => ({
    fieldId: field.id,
    signatureImageAsBase64: field.signature?.signatureImageAsBase64 ?? null,
    typedSignature: field.signature?.typedSignature ?? null
  }));
  return signatures;
});

export { getEnvelopeFieldSignaturesRoute };
//# sourceMappingURL=get-envelope-field-signatures.js.map
