import { ZSiteSettingSchema } from '../../../lib/server-only/site-settings/schema.js';
import { z } from 'zod';

const ZUpdateSiteSettingRequestSchema = ZSiteSettingSchema;
const ZUpdateSiteSettingResponseSchema = z.void();

export { ZUpdateSiteSettingRequestSchema, ZUpdateSiteSettingResponseSchema };
//# sourceMappingURL=update-site-setting.types.js.map
