const ALLOWED_PROTOCOLS = ['http', 'https'];
const isValidRedirectUrl = value => {
  try {
    const url = new URL(value);
    if (!ALLOWED_PROTOCOLS.includes(url.protocol.slice(0, -1).toLowerCase())) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export { isValidRedirectUrl };
//# sourceMappingURL=is-valid-redirect-url.js.map
