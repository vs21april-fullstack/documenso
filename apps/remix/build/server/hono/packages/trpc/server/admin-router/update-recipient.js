import { updateRecipient } from '../../../lib/server-only/admin/update-recipient.js';
import { adminProcedure } from '../trpc.js';
import { ZUpdateRecipientRequestSchema, ZUpdateRecipientResponseSchema } from './update-recipient.types.js';

const updateRecipientRoute = adminProcedure.input(ZUpdateRecipientRequestSchema).output(ZUpdateRecipientResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    id,
    name,
    email,
    role
  } = input;
  ctx.logger.info({
    input: {
      id
    }
  });
  await updateRecipient({
    id,
    name,
    email,
    role
  });
});

export { updateRecipientRoute };
//# sourceMappingURL=update-recipient.js.map
