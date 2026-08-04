import { B as i } from './button-Dm_JGgap.js';
import { C as y } from './checkbox-PtMmw-z5.js';
import { d as b, r as d, w as N, L as t, u as v } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { G as P } from './generic-error-layout-Ck6Ws6Ds.js';
import { T as r, u as w } from './index-CkOHfBoV.js';
import { a as C } from './index-PjhXdBcw.js';
import { j as e } from './jsx-runtime-DrYFQjIW.js';
import { M as S } from './mails-Bvaju_wc.js';
import { a as E } from './meta-1txnm5en.js';
import { u as k } from './use-toast-pMYLxjk1.js';
import './app-uAhqo_pP.js';
import './index-BiLbLflF.js';
import './types-GU3YNY2F.js';
import './index-DJ-EwNXm.js';
import './loader-aSxoB_gm.js';
import './createLucideIcon-UOjYlZt5.js';
import './utils-C68LRSOY.js';
import './index-DzY7AtIB.js';
import './index-DAyHhKCk.js';
import './index-J1tJADds.js';
import './index-MjUwLcg-.js';
import './index-KpgwOPga.js';
import './index-ZximTWpF.js';
import './check--7Y29bNj.js';
import './background-pattern-DQOf2_lH.js';
import './proxy-dEM8-k5c.js';
import './chevron-left-BZCl9klZ.js';
import './url-CP0Hgou8.js';
import './index-CBoJQWs5.js';
function ie() {
  return E({ id: 'n1ekoW' });
}
const ae = b(() =>
    e.jsx(P, {
      errorCode: 404,
      errorCodeMap: { 404: { heading: { id: 'wnrkPW' }, subHeading: { id: 'ga9sNa' }, message: { id: '8dRoaP' } } },
      primaryButton: e.jsx(i, { asChild: !0, children: e.jsx(t, { to: '/', children: e.jsx(r, { id: 'CKyk7Q' }) }) }),
      secondaryButton: null,
    }),
  ),
  oe = N(({ loaderData: l }) => {
    const [x] = v(),
      { organisationName: p, orgUrl: a } = l,
      { _: o } = w(),
      { toast: u } = k(),
      [h, n] = d.useState(!1),
      [m, f] = d.useState(!1),
      g = x.get('action'),
      j = async () => {
        n(!0);
        try {
          await C.oidc.org.signIn({ orgUrl: a });
        } catch {
          u({ title: o({ id: 'vW+T+d' }), description: o({ id: 'H2R2SX' }), variant: 'destructive' });
        }
        n(!1);
      };
    return g === 'verification-required'
      ? e.jsx('div', {
          className: 'w-screen max-w-lg px-4',
          children: e.jsxs('div', {
            className: 'flex items-start',
            children: [
              e.jsx('div', {
                className: 'mt-1 mr-4 hidden md:block',
                children: e.jsx(S, { className: 'h-10 w-10 text-primary', strokeWidth: 2 }),
              }),
              e.jsxs('div', {
                className: '',
                children: [
                  e.jsx('h2', { className: 'font-bold text-2xl md:text-4xl', children: e.jsx(r, { id: '13PnPF' }) }),
                  e.jsx('p', { className: 'mt-4 text-muted-foreground', children: e.jsx(r, { id: 'mX0XNr' }) }),
                  e.jsx('div', {
                    className: 'mt-4 flex items-center gap-x-2',
                    children: e.jsx(i, {
                      asChild: !0,
                      children: e.jsx(t, { to: `/o/${a}/signin`, replace: !0, children: e.jsx(r, { id: 'vUOn9d' }) }),
                    }),
                  }),
                ],
              }),
            ],
          }),
        })
      : e.jsx('div', {
          className: 'w-screen max-w-lg px-4',
          children: e.jsxs('div', {
            className: 'z-10 rounded-xl border border-border bg-neutral-100 p-6 dark:bg-background',
            children: [
              e.jsx('h1', {
                className: 'font-semibold text-2xl',
                children: e.jsx(r, { id: 'X+e8fP', values: { organisationName: p } }),
              }),
              e.jsx('p', { className: 'mt-2 text-muted-foreground text-sm', children: e.jsx(r, { id: 'NxCJcc' }) }),
              e.jsx('hr', { className: '-mx-6 my-4' }),
              e.jsxs('div', {
                className: 'mb-4 flex items-center gap-x-2',
                children: [
                  e.jsx(y, {
                    id: 'flag-3rd-party-service',
                    checked: m,
                    onCheckedChange: (s) => f(s === 'indeterminate' ? !1 : s),
                  }),
                  e.jsx('label', {
                    className: 'ml-2 flex flex-row items-center text-muted-foreground text-sm',
                    htmlFor: 'flag-3rd-party-service',
                    children: e.jsx(r, { id: 'LE/VOt' }),
                  }),
                ],
              }),
              e.jsx(i, {
                type: 'button',
                size: 'lg',
                variant: 'outline',
                className: 'w-full bg-background',
                loading: h,
                disabled: !m,
                onClick: j,
                children: e.jsx(r, { id: 'n1ekoW' }),
              }),
              e.jsxs('div', {
                className: 'relative mt-2 flex items-center justify-center gap-x-4 py-2 text-xs uppercase',
                children: [
                  e.jsx('div', { className: 'h-px flex-1 bg-border' }),
                  e.jsx('span', {
                    className: 'bg-transparent text-muted-foreground',
                    children: e.jsx(r, { id: 'Qm1NmK' }),
                  }),
                  e.jsx('div', { className: 'h-px flex-1 bg-border' }),
                ],
              }),
              e.jsx('div', {
                className: 'mt-1 flex items-center justify-center text-muted-foreground text-xs',
                children: e.jsx(t, { to: '/signin', children: e.jsx(r, { id: 'xAYUE6' }) }),
              }),
            ],
          }),
        });
  });
export { ae as ErrorBoundary, ie as meta, oe as default };
