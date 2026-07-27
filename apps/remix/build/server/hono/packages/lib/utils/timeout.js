/**
 * Race a promise against a timeout. Returns `null` if the timeout
 * fires before the promise settles.
 */
const withTimeout = async (promise, timeoutMs) => await Promise.race([promise, new Promise(resolve => {
  setTimeout(() => resolve(null), timeoutMs);
})]);
/**
 * Wrapper around `fetch` that aborts the request after `timeoutMs`.
 * Throws with a descriptive message on timeout.
 */
const fetchWithTimeout = async (input, init) => {
  const {
    timeoutMs,
    ...fetchInit
  } = init;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, {
      ...fetchInit,
      signal: controller.signal
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
};

export { fetchWithTimeout, withTimeout };
//# sourceMappingURL=timeout.js.map
