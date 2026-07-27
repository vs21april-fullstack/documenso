import { TWO_FACTOR_EMAIL_EXPIRATION_MINUTES } from '../../../lib/server-only/2fa/email/constants.js';
import { send2FATokenEmail } from '../../../lib/server-only/2fa/email/send-2fa-token-email.js';
import { assertRateLimit } from '../../../lib/server-only/rate-limit/rate-limit-middleware.js';
import { request2FAEmailRateLimit } from '../../../lib/server-only/rate-limit/rate-limits.js';
import { DocumentAuth } from '../../../lib/types/document-auth.js';
import { extractDocumentAuthMethods } from '../../../lib/utils/document-auth.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { DateTime } from 'luxon';
import { procedure } from '../trpc.js';
import { ZAccessAuthRequest2FAEmailRequestSchema, ZAccessAuthRequest2FAEmailResponseSchema } from './access-auth-request-2fa-email.types.js';

const accessAuthRequest2FAEmailRoute = procedure.input(ZAccessAuthRequest2FAEmailRequestSchema).output(ZAccessAuthRequest2FAEmailResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  try {
    const {
      token
    } = input;
    const rateLimitResult = await request2FAEmailRateLimit.check({
      ip: ctx.metadata.requestMetadata.ipAddress ?? 'unknown',
      identifier: token
    });
    assertRateLimit(rateLimitResult);
    const user = ctx.user;
    // Get document and recipient by token
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
          where: {
            token
          }
        }
      }
    });
    if (!envelope) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Document not found'
      });
    }
    const [recipient] = envelope.recipients;
    const {
      derivedRecipientAccessAuth
    } = extractDocumentAuthMethods({
      documentAuth: envelope.authOptions,
      recipientAuth: recipient.authOptions
    });
    if (!derivedRecipientAccessAuth.includes(DocumentAuth.TWO_FACTOR_AUTH)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: '2FA is not required for this document'
      });
    }
    // if (user && recipient.email !== user.email) {
    //   throw new TRPCError({
    //     code: 'UNAUTHORIZED',
    //     message: 'User does not match recipient',
    //   });
    // }
    const expiresAt = DateTime.now().plus({
      minutes: TWO_FACTOR_EMAIL_EXPIRATION_MINUTES
    });
    await send2FATokenEmail({
      token,
      envelopeId: envelope.id
    });
    return {
      success: true,
      expiresAt: expiresAt.toJSDate()
    };
  } catch (error) {
    console.error('Error sending access auth 2FA email:', error);
    if (error instanceof TRPCError) {
      throw error;
    }
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to send 2FA email'
    });
  }
});

export { accessAuthRequest2FAEmailRoute };
//# sourceMappingURL=access-auth-request-2fa-email.js.map
