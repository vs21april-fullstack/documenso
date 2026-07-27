import { resendDocument } from '../../../lib/server-only/document/resend-document.js';
import { formatSigningLink } from '../../../lib/utils/recipients.js';
import { authenticatedProcedure } from '../trpc.js';
import { redistributeEnvelopeMeta, ZRedistributeEnvelopeRequestSchema, ZRedistributeEnvelopeResponseSchema } from './redistribute-envelope.types.js';

const redistributeEnvelopeRoute = authenticatedProcedure.meta(redistributeEnvelopeMeta).input(ZRedistributeEnvelopeRequestSchema).output(ZRedistributeEnvelopeResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    envelopeId,
    recipients
  } = input;
  ctx.logger.info({
    input: {
      envelopeId,
      recipients
    }
  });
  const envelope = await resendDocument({
    userId: ctx.user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    recipients,
    requestMetadata: ctx.metadata
  });
  return {
    success: true,
    id: envelope.id,
    recipients: envelope.recipients.map(recipient => ({
      id: recipient.id,
      name: recipient.name,
      email: recipient.email,
      token: recipient.token,
      role: recipient.role,
      signingOrder: recipient.signingOrder,
      signingUrl: formatSigningLink(recipient.token)
    }))
  };
});

export { redistributeEnvelopeRoute };
//# sourceMappingURL=redistribute-envelope.js.map
