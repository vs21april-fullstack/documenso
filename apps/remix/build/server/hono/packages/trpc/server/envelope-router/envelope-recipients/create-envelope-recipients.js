import { createEnvelopeRecipients } from '../../../../lib/server-only/recipient/create-envelope-recipients.js';
import { authenticatedProcedure } from '../../trpc.js';
import { createEnvelopeRecipientsMeta, ZCreateEnvelopeRecipientsRequestSchema, ZCreateEnvelopeRecipientsResponseSchema } from './create-envelope-recipients.types.js';

const createEnvelopeRecipientsRoute = authenticatedProcedure.meta(createEnvelopeRecipientsMeta).input(ZCreateEnvelopeRecipientsRequestSchema).output(ZCreateEnvelopeRecipientsResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    user,
    teamId,
    metadata
  } = ctx;
  const {
    envelopeId,
    data: recipients
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  const {
    recipients: data
  } = await createEnvelopeRecipients({
    userId: user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    recipients,
    requestMetadata: metadata
  });
  return {
    data
  };
});

export { createEnvelopeRecipientsRoute };
//# sourceMappingURL=create-envelope-recipients.js.map
