import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType, DocumentStatus, SigningStatus, RecipientRole } from '@prisma/client';
import { maybeAuthenticatedProcedure } from '../trpc.js';
import { ZSigningStatusEnvelopeRequestSchema, ZSigningStatusEnvelopeResponseSchema } from './signing-status-envelope.types.js';

// Internal route - not intended for public API usage
const signingStatusEnvelopeRoute = maybeAuthenticatedProcedure.input(ZSigningStatusEnvelopeRequestSchema).output(ZSigningStatusEnvelopeResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    token
  } = input;
  ctx.logger.info({
    input: {
      token
    }
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      type: EnvelopeType.DOCUMENT,
      recipients: {
        some: {
          token
        }
      }
    },
    include: {
      recipients: {
        select: {
          id: true,
          name: true,
          email: true,
          signingStatus: true,
          role: true
        }
      }
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  // Check if envelope is rejected
  if (envelope.status === DocumentStatus.REJECTED) {
    return {
      status: 'REJECTED'
    };
  }
  if (envelope.status === DocumentStatus.COMPLETED) {
    return {
      status: 'COMPLETED'
    };
  }
  const isComplete = envelope.recipients.some(recipient => recipient.signingStatus === SigningStatus.REJECTED) || envelope.recipients.every(recipient => recipient.role === RecipientRole.CC || recipient.signingStatus === SigningStatus.SIGNED);
  if (isComplete) {
    return {
      status: 'PROCESSING'
    };
  }
  return {
    status: 'PENDING'
  };
});

export { signingStatusEnvelopeRoute };
//# sourceMappingURL=signing-status-envelope.js.map
