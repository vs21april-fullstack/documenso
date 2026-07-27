import { upsertSiteSetting } from '../../../lib/server-only/site-settings/upsert-site-setting.js';
import { adminProcedure } from '../trpc.js';
import { ZUpdateSiteSettingRequestSchema, ZUpdateSiteSettingResponseSchema } from './update-site-setting.types.js';

const updateSiteSettingRoute = adminProcedure.input(ZUpdateSiteSettingRequestSchema).output(ZUpdateSiteSettingResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    ...siteSetting
  } = input;
  ctx.logger.info({
    input: {
      id: siteSetting.id
    }
  });
  await upsertSiteSetting({
    ...siteSetting,
    userId: ctx.user.id
  });
});

export { updateSiteSettingRoute };
//# sourceMappingURL=update-site-setting.js.map
