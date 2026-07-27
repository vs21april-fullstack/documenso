import { z } from 'zod';
import { ZSiteSettingsBannerSchema } from './schemas/banner.js';
import { ZSiteSettingsEmailBlocklistSchema } from './schemas/email-blocklist.js';
import { ZSiteSettingsTelemetrySchema } from './schemas/telemetry.js';

const ZSiteSettingSchema = z.union([ZSiteSettingsBannerSchema, ZSiteSettingsEmailBlocklistSchema, ZSiteSettingsTelemetrySchema]);
z.array(ZSiteSettingSchema);

export { ZSiteSettingSchema };
//# sourceMappingURL=schema.js.map
