import { z } from 'zod';
import { ZSiteSettingsBaseSchema } from './_base.js';

const SITE_SETTINGS_TELEMETRY_ID = 'telemetry.installation';
const ZSiteSettingsTelemetrySchema = ZSiteSettingsBaseSchema.extend({
  id: z.literal(SITE_SETTINGS_TELEMETRY_ID),
  data: z.object({
    installationId: z.string()
  })
});

export { SITE_SETTINGS_TELEMETRY_ID, ZSiteSettingsTelemetrySchema };
//# sourceMappingURL=telemetry.js.map
