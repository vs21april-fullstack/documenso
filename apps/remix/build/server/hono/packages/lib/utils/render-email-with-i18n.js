import { renderWithI18N } from '../../email/render.js';
import { getI18nInstance } from '../client-only/providers/i18n-server.js';
import { isValidLanguageCode } from '../constants/i18n.js';
import { APP_I18N_OPTIONS } from '../constants/locales.js';

const renderEmailWithI18N = async (component, options) => {
  try {
    const {
      lang: providedLang,
      ...otherOptions
    } = options ?? {};
    const lang = isValidLanguageCode(providedLang) ? providedLang : APP_I18N_OPTIONS.sourceLang;
    const i18n = await getI18nInstance(lang);
    i18n.activate(lang);
    return renderWithI18N(component, {
      i18n,
      ...otherOptions
    });
  } catch (err) {
    console.error(err);
    throw new Error('Failed to render email');
  }
};

export { renderEmailWithI18N };
//# sourceMappingURL=render-email-with-i18n.js.map
