import { reregisterEmailDomain } from '../../../ee/server-only/lib/reregister-email-domain.js';
import { adminProcedure } from '../trpc.js';
import { ZReregisterEmailDomainRequestSchema, ZReregisterEmailDomainResponseSchema } from './reregister-email-domain.types.js';

const reregisterEmailDomainRoute = adminProcedure.input(ZReregisterEmailDomainRequestSchema).output(ZReregisterEmailDomainResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    emailDomainId
  } = input;
  ctx.logger.info({
    input: {
      emailDomainId
    }
  });
  await reregisterEmailDomain({
    emailDomainId
  });
});

export { reregisterEmailDomainRoute };
//# sourceMappingURL=reregister-email-domain.js.map
