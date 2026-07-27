import { z } from 'zod';

const SUPPORTED_LANGUAGE_CODES = ['de', 'en', 'fr', 'es', 'it', 'nl', 'pl', 'pt-BR', 'ja', 'ko', 'zh'];
const APP_I18N_OPTIONS = {
  supportedLangs: SUPPORTED_LANGUAGE_CODES,
  sourceLang: 'en',
  defaultLocale: 'en-US'
};
const ZSupportedLanguageCodeSchema = z.enum(SUPPORTED_LANGUAGE_CODES).catch('en');

export { APP_I18N_OPTIONS, SUPPORTED_LANGUAGE_CODES, ZSupportedLanguageCodeSchema };
//# sourceMappingURL=locales.js.map
