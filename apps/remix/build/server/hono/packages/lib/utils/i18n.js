import '@lingui/core';
import '../constants/locales.js';
import { env } from './env.js';

async function getTranslations(locale) {
  const extension = env('NODE_ENV') === 'development' ? 'po' : 'mjs';
  const {
    messages
  } = await import(`../translations/${locale}/web.${extension}`);
  return messages;
}

export { getTranslations };
//# sourceMappingURL=i18n.js.map
