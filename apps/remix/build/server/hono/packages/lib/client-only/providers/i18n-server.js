import { setupI18n } from '@lingui/core';
import { isValidLanguageCode } from '../../constants/i18n.js';
import { env } from '../../utils/env.js';
import { remember } from '../../utils/remember.js';
import { APP_I18N_OPTIONS, SUPPORTED_LANGUAGE_CODES } from '../../constants/locales.js';

async function loadCatalog(lang) {
  const extension = env('NODE_ENV') === 'development' ? 'po' : 'mjs';
  const {
    messages
  } = await import(`../../translations/${lang}/web.${extension}`);
  return {
    [lang]: messages
  };
}
const catalogs = Promise.all(SUPPORTED_LANGUAGE_CODES.map(loadCatalog));
// transform array of catalogs into a single object
const allMessages = async () => {
  return await catalogs.then(catalogs => catalogs.reduce((acc, oneCatalog) => {
    return {
      ...acc,
      ...oneCatalog
    };
  }, {}));
};
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const allI18nInstances = remember('i18n.allI18nInstances', async () => {
  const loadedMessages = await allMessages();
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return SUPPORTED_LANGUAGE_CODES.reduce((acc, lang) => {
    const messages = loadedMessages[lang] ?? {};
    const i18n = setupI18n({
      locale: lang,
      messages: {
        [lang]: messages
      }
    });
    return {
      ...acc,
      [lang]: i18n
    };
  }, {});
});
// eslint-disable-next-line @typescript-eslint/ban-types
const getI18nInstance = async lang => {
  const instances = await allI18nInstances;
  if (!isValidLanguageCode(lang)) {
    return instances[APP_I18N_OPTIONS.sourceLang];
  }
  return instances[lang] ?? instances[APP_I18N_OPTIONS.sourceLang];
};

export { allI18nInstances, getI18nInstance, loadCatalog };
//# sourceMappingURL=i18n-server.js.map
