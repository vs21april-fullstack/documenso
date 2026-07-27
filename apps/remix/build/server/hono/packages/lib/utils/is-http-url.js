const ALLOWED_PROTOCOLS = ['http', 'https'];
/**
 * Returns true only when `value` parses as an absolute URL using the http or
 * https protocol.
 *
 * Zod's `.url()` accepts any parseable URL, including non-web schemes. Use this
 * to restrict user-supplied URLs to http(s) before they are stored or rendered
 * as a link.
 */
const isHttpUrl = value => {
  try {
    const url = new URL(value);
    return ALLOWED_PROTOCOLS.includes(url.protocol.slice(0, -1).toLowerCase());
  } catch {
    return false;
  }
};

export { isHttpUrl };
//# sourceMappingURL=is-http-url.js.map
