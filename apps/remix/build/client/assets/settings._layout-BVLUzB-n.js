import { B as o } from './button-Dm_JGgap.js';
import { O as c, w as l, L as m, N as p } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { E as j } from './earth-CnM36IYl.js';
import { G as f } from './generic-error-layout-Ck6Ws6Ds.js';
import { G as v } from './group-C_2i4SON.js';
import { u as d, T as e } from './index-CkOHfBoV.js';
import { j as t } from './jsx-runtime-DrYFQjIW.js';
import { a as g } from './meta-1txnm5en.js';
import { S as b } from './settings-2-BBxFAIyW.js';
import { S as x } from './settings-CJqSZAYR.js';
import { a as h } from './team-BvmzkpNi.js';
import { c as u } from './teams-WAT4Ivvc.js';
import { U as N } from './users-round-wc7SPLK9.js';
import { c as r } from './utils-C68LRSOY.js';
import { W as S, B as y } from './webhook-DTjj7FIC.js';
import './app-uAhqo_pP.js';
import './index-BiLbLflF.js';
import './types-GU3YNY2F.js';
import './teams-D27qC-4o.js';
import './index-browser-CnbpKWEs.js';
import './loader-aSxoB_gm.js';
import './createLucideIcon-UOjYlZt5.js';
import './background-pattern-DQOf2_lH.js';
import './proxy-dEM8-k5c.js';
import './chevron-left-BZCl9klZ.js';
import './url-CP0Hgou8.js';
import './index-CBoJQWs5.js';
function X() {
  return g({ id: 'oMfDc9' });
}
async function Y() {}
const tt = l(() => {
  const { _: a } = d(),
    s = h(),
    n = [
      { path: `/t/${s.url}/settings`, label: a({ id: 'Weq9zb' }), icon: x },
      { path: `/t/${s.url}/settings/document`, label: a({ id: 'Q6hhn8' }), icon: b, isSubNavParent: !0 },
      { path: `/t/${s.url}/settings/document`, label: a({ id: '7Zdnlq' }), isSubNav: !0 },
      { path: `/t/${s.url}/settings/branding`, label: a({ id: 'A3MAIm' }), isSubNav: !0 },
      { path: `/t/${s.url}/settings/email`, label: a({ id: 'O3oNi5' }), isSubNav: !0 },
      { path: `/t/${s.url}/settings/public-profile`, label: a({ id: 'PsWyzr' }), icon: j },
      { path: `/t/${s.url}/settings/members`, label: a({ id: 'wlQNTg' }), icon: N },
      { path: `/t/${s.url}/settings/groups`, label: a({ id: 'zhrjek' }), icon: v },
      { path: `/t/${s.url}/settings/tokens`, label: a({ id: 'ZiooJI' }), icon: y },
      { path: `/t/${s.url}/settings/webhooks`, label: a({ id: 'v1kQyJ' }), icon: S },
    ];
  return u('MANAGE_TEAM', s.currentTeamRole)
    ? t.jsxs('div', {
        className: 'mx-auto w-full max-w-screen-xl px-4 md:px-8',
        children: [
          t.jsx('h1', { className: 'font-semibold text-4xl', children: t.jsx(e, { id: 'oMfDc9' }) }),
          t.jsxs('div', {
            className: 'mt-4 grid grid-cols-12 gap-x-8 md:mt-8',
            children: [
              t.jsx('div', {
                className: r(
                  'col-span-12 mb-8 flex flex-wrap items-center justify-start gap-x-2 gap-y-4 md:col-span-3 md:w-full md:flex-col md:items-start md:gap-y-2',
                ),
                children: n.map((i) =>
                  t.jsx(
                    p,
                    {
                      to: i.path,
                      className: r('group w-full justify-start', i.isSubNav && 'pl-8'),
                      children: t.jsxs(o, {
                        variant: 'ghost',
                        className: r('w-full justify-start', {
                          'group-aria-[current]:bg-secondary': !i.isSubNavParent,
                        }),
                        children: [
                          i.icon && t.jsx(i.icon, { className: 'mr-2 h-5 w-5' }),
                          t.jsx(e, { id: 'J/hVSQ', values: { 0: i.label } }),
                        ],
                      }),
                    },
                    i.path,
                  ),
                ),
              }),
              t.jsx('div', { className: 'col-span-12 md:col-span-9', children: t.jsx(c, {}) }),
            ],
          }),
        ],
      })
    : t.jsx(f, {
        errorCode: 401,
        errorCodeMap: { 401: { heading: { id: 'dA/8If' }, subHeading: { id: 'hA3zf2' }, message: { id: '8sODvG' } } },
        primaryButton: t.jsx(o, {
          asChild: !0,
          children: t.jsx(m, { to: `/t/${s.url}`, children: t.jsx(e, { id: 'sr0UJD' }) }),
        }),
        secondaryButton: null,
      });
});
export { tt as default, X as meta, Y as clientLoader };
