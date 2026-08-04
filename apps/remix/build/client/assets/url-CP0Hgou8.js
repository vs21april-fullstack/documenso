import { N as o } from './app-uAhqo_pP.js';
const a = (r) => {
  const e = o(),
    t = e.endsWith('/') ? e : `${e}/`,
    n = r.replace(/^\/+/, '');
  return new URL(n, t).toString();
};
export { a as r };
