import { z } from 'zod';

const ZSiteSettingsBaseSchema = z.object({
  id: z.string().min(1),
  enabled: z.boolean(),
  data: z.never()
});

export { ZSiteSettingsBaseSchema };
//# sourceMappingURL=_base.js.map
