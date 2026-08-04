import { A as b, b as g, a as w } from './avatar-BS15TO7o.js';
import { f as h } from './avatars-GsGH8fkv.js';
import { B as N } from './button-Dm_JGgap.js';
import { L as o, w as p } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { F as L } from './file-CtHi3arR.js';
import { T as t } from './index-CkOHfBoV.js';
import { j as e } from './jsx-runtime-DrYFQjIW.js';
import { D as S } from './luxon-CkcISRbr.js';
import { e as u } from './recipient-formatter-WzUNI0pB.js';
import { a as f } from './session-DJFUfUIe.js';
import { T as D, c as d, e as k, d as T, a as v, b as y } from './table-B2dCCbDr.js';
import { f as j } from './templates-D-Awpyvf.js';
import { a as A, b as I, T as P } from './tooltip-Dihvg_5U.js';
import './index-PjhXdBcw.js';
import './app-uAhqo_pP.js';
import './index-BiLbLflF.js';
import './types-GU3YNY2F.js';
import './index-DJ-EwNXm.js';
import './data-transformer-DaTnp7WB.js';
import './envelope-B-x3X451.js';
import './index-browser-CnbpKWEs.js';
import './url-CP0Hgou8.js';
import './index-UGPUXo4T.js';
import './index-J1tJADds.js';
import './index-DAyHhKCk.js';
import './index-CWo-8VFg.js';
import './utils-C68LRSOY.js';
import './loader-aSxoB_gm.js';
import './createLucideIcon-UOjYlZt5.js';
import './index-DzY7AtIB.js';
import './index-C829O7aq.js';
import './index-DoLGTOH8.js';
import './index-KpgwOPga.js';
import './index-ZximTWpF.js';
import './index-CZmIGLNu.js';
const l = {
    Premium: { imageSrc: '/static/premium-user-badge.svg', name: 'Premium' },
    EarlySupporter: { imageSrc: '/static/early-supporter-badge.svg', name: 'Early supporter' },
  },
  fe = p(({ loaderData: n }) => {
    const { publicProfile: s } = n,
      { profile: a, templates: i } = s,
      { sessionData: c } = f(),
      m = c?.user;
    return e.jsxs('div', {
      className: 'flex flex-col items-center justify-center py-4 sm:py-32',
      children: [
        e.jsxs('div', {
          className: 'flex flex-col items-center',
          children: [
            e.jsxs(b, {
              className: 'h-24 w-24 border-2 border-solid dark:border-border',
              children: [
                s.avatarImageId && e.jsx(g, { src: h(s.avatarImageId) }),
                e.jsx(w, { className: 'text-gray-400 text-sm', children: u(s.name) }),
              ],
            }),
            e.jsxs('div', {
              className: 'mt-4 flex flex-row items-center justify-center',
              children: [
                e.jsx('h2', { className: 'font-semibold text-xl md:text-2xl', children: s.name }),
                s.badge &&
                  e.jsxs(P, {
                    children: [
                      e.jsx(A, {
                        children: e.jsx('img', {
                          className: 'ml-2 flex items-center justify-center',
                          alt: 'Profile badge',
                          src: l[s.badge.type].imageSrc,
                          height: 24,
                          width: 24,
                        }),
                      }),
                      e.jsxs(I, {
                        className: '!pl-3 !pr-3.5 flex flex-row items-start py-2',
                        children: [
                          e.jsx('img', {
                            className: 'mt-0.5',
                            alt: 'Profile badge',
                            src: l[s.badge.type].imageSrc,
                            height: 24,
                            width: 24,
                          }),
                          e.jsxs('div', {
                            className: 'ml-2',
                            children: [
                              e.jsx('p', {
                                className: 'font-semibold text-base text-foreground',
                                children: l[s.badge.type].name,
                              }),
                              e.jsx('p', {
                                className: 'mt-0.5 text-muted-foreground text-sm',
                                children: e.jsx(t, {
                                  id: 'ltYQCa',
                                  values: { 0: S.fromJSDate(s.badge.since).toFormat('LLL ‘yy') },
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
              ],
            }),
            e.jsx('div', {
              className: 'mt-4 space-y-1 text-muted-foreground',
              children: (a.bio ?? '')
                .split(`
`)
                .map((r, x) =>
                  e.jsx(
                    'p',
                    { className: 'max-w-[60ch] whitespace-pre-wrap break-words text-center text-sm', children: r },
                    x,
                  ),
                ),
            }),
          ],
        }),
        i.length === 0 &&
          e.jsx('div', {
            className: 'mt-4 w-full max-w-xl border-t pt-4',
            children: e.jsxs('p', {
              className:
                'max-w-[60ch] whitespace-pre-wrap break-words text-center text-muted-foreground text-sm leading-relaxed',
              children: [
                e.jsx(t, { id: 'pQgy2V', values: { 0: s.name } }),
                ' ',
                !m?.id && e.jsx('span', { className: 'mt-2 inline-block', children: e.jsx(t, { id: 'nW1D60' }) }),
                'userId' in a &&
                  m?.id === a.userId &&
                  e.jsx('span', {
                    className: 'mt-2 inline-block',
                    children: e.jsx(t, {
                      id: '71XAMD',
                      components: { 0: e.jsx(o, { to: '/settings/public-profile', className: 'underline' }) },
                    }),
                  }),
              ],
            }),
          }),
        i.length > 0 &&
          e.jsx('div', {
            className: 'mt-8 w-full max-w-xl rounded-md border',
            children: e.jsxs(v, {
              className: 'w-full',
              overflowHidden: !0,
              children: [
                e.jsx(y, {
                  children: e.jsx(d, {
                    children: e.jsx(T, {
                      className: 'w-full rounded-tl-md bg-neutral-50 dark:bg-neutral-700',
                      children: e.jsx(t, { id: 'E/muDO' }),
                    }),
                  }),
                }),
                e.jsx(k, {
                  children: i.map((r) =>
                    e.jsx(
                      d,
                      {
                        children: e.jsx(D, {
                          className:
                            'flex flex-col justify-between overflow-hidden text-muted-foreground text-sm sm:flex-row',
                          children: e.jsxs('div', {
                            className: 'flex flex-1 items-start justify-start gap-2',
                            children: [
                              e.jsx(L, {
                                className: 'h-8 w-8 flex-shrink-0 text-muted-foreground/40',
                                strokeWidth: 1.5,
                              }),
                              e.jsxs('div', {
                                className:
                                  'flex flex-1 flex-col gap-4 overflow-hidden md:flex-row md:items-start md:justify-between',
                                children: [
                                  e.jsxs('div', {
                                    children: [
                                      e.jsx('p', {
                                        className: 'break-all font-semibold text-foreground text-sm leading-none',
                                        children: r.publicTitle,
                                      }),
                                      e.jsx('p', {
                                        className:
                                          'mt-1 line-clamp-3 max-w-[70ch] whitespace-normal break-all text-muted-foreground text-xs',
                                        children: r.publicDescription,
                                      }),
                                    ],
                                  }),
                                  e.jsx(N, {
                                    asChild: !0,
                                    className: 'w-fit',
                                    children: e.jsx(o, {
                                      to: j(r.directLink.token),
                                      children: e.jsx(t, { id: 'c+Fnce' }),
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      },
                      r.id,
                    ),
                  ),
                }),
              ],
            }),
          }),
      ],
    });
  });
export { fe as default };
