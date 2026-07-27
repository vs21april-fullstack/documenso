import { linkOrganisationAccount } from '../../../ee/server-only/lib/link-organisation-account.js';
import { assertRateLimit } from '../../../lib/server-only/rate-limit/rate-limit-middleware.js';
import { linkOrgAccountRateLimit } from '../../../lib/server-only/rate-limit/rate-limits.js';
import { procedure } from '../trpc.js';
import { ZLinkOrganisationAccountRequestSchema, ZLinkOrganisationAccountResponseSchema } from './link-organisation-account.types.js';

/**
 * Unauthenicated procedure, do not copy paste.
 */
const linkOrganisationAccountRoute = procedure.input(ZLinkOrganisationAccountRequestSchema).output(ZLinkOrganisationAccountResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    token
  } = input;
  const rateLimitResult = await linkOrgAccountRateLimit.check({
    ip: ctx.metadata.requestMetadata.ipAddress ?? 'unknown',
    identifier: token
  });
  assertRateLimit(rateLimitResult);
  await linkOrganisationAccount({
    token,
    requestMeta: ctx.metadata.requestMetadata
  });
});

export { linkOrganisationAccountRoute };
//# sourceMappingURL=link-organisation-account.js.map
