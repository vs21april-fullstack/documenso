import { SUPPORTED_LANGUAGE_CODES } from './locales.js';
export { APP_I18N_OPTIONS, ZSupportedLanguageCodeSchema } from './locales.js';

const isValidLanguageCode = code => SUPPORTED_LANGUAGE_CODES.includes(code);

export { SUPPORTED_LANGUAGE_CODES, isValidLanguageCode };
//# sourceMappingURL=i18n.js.map
