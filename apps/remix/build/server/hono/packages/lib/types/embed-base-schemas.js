import { ZSupportedLanguageCodeSchema } from '../constants/locales.js';
import { z } from 'zod';
import { ZCssVarsSchema } from './css-vars.js';

const ZBaseEmbedDataSchema = z.object({
  darkModeDisabled: z.boolean().optional().default(false),
  css: z.string().optional().transform(value => value || undefined),
  cssVars: ZCssVarsSchema.optional().default({}),
  language: ZSupportedLanguageCodeSchema.optional()
});

export { ZBaseEmbedDataSchema };
//# sourceMappingURL=embed-base-schemas.js.map
