import { DateTime } from 'luxon';
import { USE_INTERNAL_URL_BROWSERLESS, NEXT_PUBLIC_WEBAPP_URL, NEXT_PRIVATE_INTERNAL_WEBAPP_URL } from '../../constants/app.js';
import { isValidLanguageCode } from '../../constants/i18n.js';
import { env } from '../../utils/env.js';
import { encryptSecondaryData } from '../crypto/encrypt.js';

/**
 * @deprecated We use Konva to generate the audit logs PDF now.
 */
const getAuditLogsPdf = async ({
  documentId,
  language
}) => {
  const {
    chromium
  } = await import('playwright');
  const encryptedId = encryptSecondaryData({
    data: documentId.toString(),
    expiresAt: DateTime.now().plus({
      minutes: 5
    }).toJSDate().valueOf()
  });
  let browser;
  const browserlessUrl = env('NEXT_PRIVATE_BROWSERLESS_URL');
  if (browserlessUrl) {
    // !: Use CDP rather than the default `connect` method to avoid coupling to the playwright version.
    // !: Previously we would have to keep the playwright version in sync with the browserless version to avoid errors.
    browser = await chromium.connectOverCDP(browserlessUrl);
  } else {
    browser = await chromium.launch({
      executablePath: env('PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH') || undefined
    });
  }
  if (!browser) {
    throw new Error('Failed to establish a browser, please ensure you have either a Browserless.io url or chromium browser installed');
  }
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();
  const lang = isValidLanguageCode(language) ? language : 'en';
  await page.context().addCookies([{
    name: 'language',
    value: lang,
    url: USE_INTERNAL_URL_BROWSERLESS() ? NEXT_PUBLIC_WEBAPP_URL() : NEXT_PRIVATE_INTERNAL_WEBAPP_URL()
  }]);
  await page.goto(`${USE_INTERNAL_URL_BROWSERLESS() ? NEXT_PUBLIC_WEBAPP_URL() : NEXT_PRIVATE_INTERNAL_WEBAPP_URL()}/__htmltopdf/audit-log?d=${encryptedId}`, {
    waitUntil: 'networkidle',
    timeout: 10_000
  });
  // !: This is a workaround to ensure the page is loaded correctly.
  // !: It's not clear why but suddenly browserless cdp connections would
  // !: cause the page to render blank until a reload is performed.
  await page.reload({
    waitUntil: 'networkidle',
    timeout: 10_000
  });
  await page.waitForSelector('h1', {
    state: 'visible',
    timeout: 10_000
  });
  const result = await page.pdf({
    format: 'A4',
    printBackground: true
  });
  await browserContext.close();
  void browser.close();
  return result;
};

export { getAuditLogsPdf };
//# sourceMappingURL=get-audit-logs-pdf.js.map
