import { LicenseClient } from '../../../lib/server-only/license/license-client.js';
import { adminProcedure } from '../trpc.js';
import { ZResyncLicenseRequestSchema, ZResyncLicenseResponseSchema } from './resync-license.types.js';

const resyncLicenseRoute = adminProcedure.input(ZResyncLicenseRequestSchema).output(ZResyncLicenseResponseSchema).mutation(async () => {
  const client = LicenseClient.getInstance();
  if (!client) {
    return;
  }
  await client.resync();
});

export { resyncLicenseRoute };
//# sourceMappingURL=resync-license.js.map
