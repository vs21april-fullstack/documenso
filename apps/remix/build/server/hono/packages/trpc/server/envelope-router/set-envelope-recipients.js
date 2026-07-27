import { setDocumentRecipients } from '../../../lib/server-only/recipient/set-document-recipients.js';
import { setTemplateRecipients } from '../../../lib/server-only/recipient/set-template-recipients.js';
import { EnvelopeType } from '@prisma/client';
import { match } from 'ts-pattern';
import { authenticatedProcedure } from '../trpc.js';
import { ZSetEnvelopeRecipientsRequestSchema, ZSetEnvelopeRecipientsResponseSchema } from './set-envelope-recipients.types.js';

const setEnvelopeRecipientsRoute = authenticatedProcedure.input(ZSetEnvelopeRecipientsRequestSchema).output(ZSetEnvelopeRecipientsResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId
  } = ctx;
  const {
    envelopeId,
    envelopeType,
    recipients
  } = input;
  ctx.logger.info({
    input: {
      envelopeId
    }
  });
  const {
    recipients: data
  } = await match(envelopeType).with(EnvelopeType.DOCUMENT, async () => setDocumentRecipients({
    userId: ctx.user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    recipients,
    requestMetadata: ctx.metadata
  })).with(EnvelopeType.TEMPLATE, async () => setTemplateRecipients({
    userId: ctx.user.id,
    teamId,
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    recipients
  })).exhaustive();
  return {
    data
  };
});

export { setEnvelopeRecipientsRoute };
//# sourceMappingURL=set-envelope-recipients.js.map
