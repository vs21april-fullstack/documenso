import { fetchWithTimeout } from '../../utils/timeout.js';
import { assertNotPrivateUrl } from './assert-webhook-url.js';

const WEBHOOK_TIMEOUT_MS = 10_000;
const parseBody = text => {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};
const executeWebhookCall = async options => {
  const {
    url,
    body,
    secret
  } = options;
  try {
    await assertNotPrivateUrl(url);
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      body: JSON.stringify(body),
      redirect: 'manual',
      timeoutMs: WEBHOOK_TIMEOUT_MS,
      headers: {
        'Content-Type': 'application/json',
        'X-Documenso-Secret': secret ?? ''
      }
    });
    const text = await response.text();
    return {
      success: response.ok,
      responseCode: response.status,
      responseBody: parseBody(text),
      responseHeaders: Object.fromEntries(response.headers.entries())
    };
  } catch (err) {
    return {
      success: false,
      responseCode: 0,
      responseBody: err instanceof Error ? err.message : 'Unknown error',
      responseHeaders: {}
    };
  }
};

export { executeWebhookCall };
//# sourceMappingURL=execute-webhook-call.js.map
