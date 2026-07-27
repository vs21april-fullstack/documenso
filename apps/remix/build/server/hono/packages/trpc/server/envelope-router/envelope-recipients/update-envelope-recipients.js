import { updateEnvelopeRecipients } from '../../../../lib/server-only/recipient/update-envelope-recipients.js';
import { authenticatedProcedure } from '../../trpc.js';
import { updateEnvelopeRecipientsMeta, ZUpdateEnvelopeRecipientsRequestSchema, ZUpdateEnvelopeRecipientsResponseSchema } from './update-envelope-recipients.types.js';

const updateEnvelopeRecipientsRoute = authenticatedProcedure.meta(updateEnvelopeRecipientsMeta).input(ZUpdateEnvelopeRecipientsRequestSchema).output(ZUpdateEnvelopeRecipientsResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    user,
    teamId
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
  } = await updateEnvelopeRecipients({
    userId: user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    recipients,
    requestMetadata: ctx.metadata
  });
  return {
    data
  };
});

export { updateEnvelopeRecipientsRoute };
//# sourceMappingURL=update-envelope-recipients.js.map
