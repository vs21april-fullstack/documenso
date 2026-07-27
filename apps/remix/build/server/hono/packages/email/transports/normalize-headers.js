/**
 * Normalizes nodemailer mail headers into the flat `Record<string, string>`
 * shape accepted by HTTP email APIs such as Resend and MailChannels.
 *
 * Kept in sync with `toResendHeaders` in the `@documenso/nodemailer-resend`
 * package, which applies the same normalization for the Resend transport.
 */
const normalizeMailHeaders = headers => {
  if (!headers) {
    return undefined;
  }
  const normalized = {};
  const appendHeader = (key, value) => {
    if (value === null || value === undefined) {
      return;
    }
    const stringValue = String(value);
    normalized[key] = normalized[key] ? `${normalized[key]}, ${stringValue}` : stringValue;
  };
  if (Array.isArray(headers)) {
    for (const {
      key,
      value
    } of headers) {
      appendHeader(key, value);
    }
  } else {
    for (const [key, value] of Object.entries(headers)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          appendHeader(key, item);
        }
        continue;
      }
      if (typeof value === 'object' && value !== null) {
        appendHeader(key, value.value);
        continue;
      }
      appendHeader(key, value);
    }
  }
  if (Object.keys(normalized).length === 0) {
    return undefined;
  }
  return normalized;
};

export { normalizeMailHeaders };
//# sourceMappingURL=normalize-headers.js.map
