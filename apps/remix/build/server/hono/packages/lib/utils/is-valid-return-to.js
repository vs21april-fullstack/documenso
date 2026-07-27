import { NEXT_PUBLIC_WEBAPP_URL } from '../constants/app.js';

const isValidReturnTo = returnTo => {
  if (!returnTo) {
    return false;
  }
  try {
    // Decode if it's URL encoded
    const decodedReturnTo = decodeURIComponent(returnTo);
    const returnToUrl = new URL(decodedReturnTo, NEXT_PUBLIC_WEBAPP_URL());
    if (returnToUrl.origin !== NEXT_PUBLIC_WEBAPP_URL()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};
const normalizeReturnTo = returnTo => {
  if (!returnTo) {
    return undefined;
  }
  try {
    // Decode if it's URL encoded
    const decodedReturnTo = decodeURIComponent(returnTo);
    const returnToUrl = new URL(decodedReturnTo, NEXT_PUBLIC_WEBAPP_URL());
    return `${returnToUrl.pathname}${returnToUrl.search}${returnToUrl.hash}`;
  } catch {
    return undefined;
  }
};

export { isValidReturnTo, normalizeReturnTo };
//# sourceMappingURL=is-valid-return-to.js.map
