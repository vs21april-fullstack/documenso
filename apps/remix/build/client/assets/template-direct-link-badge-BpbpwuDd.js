import { a as he, b as pe, A as xe } from './alert-CE06zyBg.js';
import { A as me } from './animate-generic-fade-in-out-CGjjMFem.js';
import { B as n } from './button-Dm_JGgap.js';
import { h as Ce, L as De, r as l } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { C as Le } from './circle-DZ0kJoCe.js';
import { u as ne } from './client-B0NpaJ2O.js';
import { c as J } from './createLucideIcon-UOjYlZt5.js';
import { e as f, d as j, a as je, f as N, c as u, D as ue, b as x } from './dialog-DKtG3c-O.js';
import { D as ce } from './direct-templates-DY4qo5DZ.js';
import { L as Q } from './form-BX2-nwLu.js';
import { t as M } from './index-BbY_VZqi.js';
import { M as Ee, z as g } from './index-BiLbLflF.js';
import { i as X } from './index-browser-CnbpKWEs.js';
import { T as t, u as W } from './index-CkOHfBoV.js';
import { I as Re } from './info-qk5PqWur.js';
import { I as fe } from './input-DdDbBJYb.js';
import { j as e } from './jsx-runtime-DrYFQjIW.js';
import { L as Se } from './link-2-4Mrr1zqj.js';
import { L as Ae } from './link-CCDi6BEg.js';
import { L as we } from './loader-aSxoB_gm.js';
import { u as le } from './organisation-Ylr4XBmr.js';
import { R as oe } from './recipient-roles-CquduZhz.js';
import { S as Ne } from './switch-CsvfEGp8.js';
import { d as _, e as be, b as ge, c as O, T, a as Te } from './table-B2dCCbDr.js';
import { D as de } from './template-Dd97ZbiO.js';
import { f as G } from './templates-D-Awpyvf.js';
import { a as ke, b as ve, T as ye } from './tooltip-Dihvg_5U.js';
import { u as Z } from './use-copy-to-clipboard-C-lPWuoY.js';
import { u as K } from './use-toast-pMYLxjk1.js';
import { c as Ie } from './utils-C68LRSOY.js';
const Me = [
    ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
    ['circle', { cx: '12', cy: '12', r: '1', key: '41hilf' }],
  ],
  Oe = J('circle-dot', Me);
const _e = [
    ['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1', key: 'tgr4d6' }],
    ['path', { d: 'M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2', key: '4jdomd' }],
    ['path', { d: 'M16 4h2a2 2 0 0 1 2 2v4', key: '3hqy98' }],
    ['path', { d: 'M21 14H11', key: '1bme5i' }],
    ['path', { d: 'm15 10-4 4 4 4', key: '5dvupr' }],
  ],
  Ge = J('clipboard-copy', _e),
  hs = ({
    templateId: c,
    directLink: o,
    recipients: d,
    trigger: b,
    triggerSizeVariant: p = 'sm',
    onCreateSuccess: y,
    onDeleteSuccess: k,
  }) => {
    const { toast: a } = K(),
      { quota: v, remaining: P } = ne(),
      { _: i } = W(),
      { revalidate: C } = Ce(),
      [, $] = Z(),
      [F, D] = l.useState(!1),
      [H, V] = l.useState(o?.enabled ?? !1),
      [E, A] = l.useState(o?.token ?? null),
      [z, w] = l.useState(null),
      [B, m] = l.useState(E ? 'MANAGE' : 'ONBOARD'),
      U = le(),
      h = l.useMemo(() => d.filter((s) => s.role !== X.RecipientRole.CC && s.role !== X.RecipientRole.ASSISTANT), [d]),
      {
        mutateAsync: q,
        isPending: L,
        reset: ee,
      } = M.template.createTemplateDirectLink.useMutation({
        onSuccess: async (s) => {
          await C(), await y?.(), A(s.token), V(s.enabled), m('MANAGE');
        },
        onError: () => {
          w(null), a({ title: i({ id: 'nwtY4N' }), description: i({ id: 'IFfB53' }), variant: 'destructive' });
        },
      }),
      { mutateAsync: se, isPending: Y } = M.template.toggleTemplateDirectLink.useMutation({
        onSuccess: async (s) => {
          await C();
          const r = { id: 'gsc+pZ' },
            S = { id: 'k2FNdx' };
          a({ title: i({ id: 'zzDlyQ' }), description: i(s.enabled ? r : S) });
        },
        onError: (s, r) => {
          const S = { id: 'WnEuiF' },
            re = { id: 'D6tvkq' };
          a({ title: i({ id: 'nwtY4N' }), description: i(r.enabled ? S : re), variant: 'destructive' });
        },
      }),
      { mutateAsync: te, isPending: R } = M.template.deleteTemplateDirectLink.useMutation({
        onSuccess: async () => {
          await C(),
            await k?.(),
            D(!1),
            A(null),
            a({ title: i({ id: 'zzDlyQ' }), description: i({ id: 'WCGIfx' }), duration: 5e3 }),
            A(null);
        },
        onError: () => {
          a({ title: i({ id: 'nwtY4N' }), description: i({ id: '4CEdkv' }), variant: 'destructive' });
        },
      }),
      ie = async (s) =>
        $(G(s)).then(() => {
          a({ title: i({ id: 'FxVG/l' }), description: i({ id: '+lDHlp' }) });
        }),
      ae = async (s) => {
        I || (w(s), await q({ templateId: c, directRecipientId: s }));
      },
      I = L || Y || R;
    return (
      l.useEffect(() => {
        ee(), m(E ? 'MANAGE' : 'ONBOARD'), w(null);
      }, [F]),
      e.jsxs(ue, {
        open: F,
        onOpenChange: (s) => !I && D(s),
        children: [
          e.jsx(je, {
            asChild: !0,
            children:
              b ||
              e.jsxs(n, {
                variant: 'outline',
                className: 'shrink-0 px-3',
                size: p,
                children: [
                  e.jsx(Ae, { className: 'mr-1.5 h-3.5 w-3.5' }),
                  o ? e.jsx(t, { id: 'OcvAVs' }) : e.jsx(t, { id: 'JqmhmE' }),
                ],
              }),
          }),
          e.jsx(x, {
            hideClose: !0,
            children: e.jsx('fieldset', {
              disabled: I,
              className: 'relative',
              children: e.jsx(me, {
                motionKey: B,
                children: Ee({ token: E, currentStep: B })
                  .with({ token: g.nullish, currentStep: 'ONBOARD' }, () =>
                    e.jsxs(x, {
                      children: [
                        e.jsxs(u, {
                          children: [
                            e.jsx(j, { children: e.jsx(t, { id: 'wtV4WO' }) }),
                            e.jsx(f, { children: e.jsx(t, { id: 'rLZFM2' }) }),
                          ],
                        }),
                        e.jsx('ul', {
                          className: 'mt-4 space-y-4 pl-12',
                          children: de.map((s, r) =>
                            e.jsxs(
                              'li',
                              {
                                className: 'relative',
                                children: [
                                  e.jsx('div', {
                                    className: 'absolute -left-12',
                                    children: e.jsx('div', {
                                      className:
                                        'flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-neutral-200 font-bold text-sm',
                                      children: r + 1,
                                    }),
                                  }),
                                  e.jsx('h3', { className: 'font-semibold', children: i(s.title) }),
                                  e.jsx('p', {
                                    className: 'mt-1 text-muted-foreground text-sm',
                                    children: i(s.description),
                                  }),
                                ],
                              },
                              r,
                            ),
                          ),
                        }),
                        P.directTemplates === 0 &&
                          e.jsxs(xe, {
                            variant: 'warning',
                            children: [
                              e.jsx(pe, {
                                children: e.jsx(t, {
                                  id: '2HKj5L',
                                  values: { 0: v.directTemplates, 1: v.directTemplates },
                                }),
                              }),
                              e.jsx(he, {
                                children: e.jsx(t, {
                                  id: 'yvV4GX',
                                  values: { 0: v.directTemplates },
                                  components: {
                                    0: e.jsx(De, {
                                      className: 'mt-1 block underline underline-offset-4',
                                      to: `/o/${U.url}/settings/billing`,
                                    }),
                                  },
                                }),
                              }),
                            ],
                          }),
                        P.directTemplates !== 0 &&
                          e.jsx(N, {
                            className: 'mx-auto mt-4',
                            children: e.jsx(n, {
                              type: 'button',
                              onClick: () => m('SELECT_RECIPIENT'),
                              children: e.jsx(t, { id: 'iNXTYT' }),
                            }),
                          }),
                      ],
                    }),
                  )
                  .with({ token: g.nullish, currentStep: 'SELECT_RECIPIENT' }, () =>
                    e.jsxs(x, {
                      className: 'relative',
                      children: [
                        L &&
                          h.length !== 0 &&
                          e.jsx('div', {
                            className:
                              'absolute inset-0 z-50 flex items-center justify-center rounded bg-white/50 dark:bg-black/50',
                            children: e.jsx(we, { className: 'h-6 w-6 animate-spin text-gray-500' }),
                          }),
                        e.jsxs(u, {
                          children: [
                            e.jsx(j, { children: e.jsx(t, { id: 'iWVl0V' }) }),
                            e.jsx(f, { children: e.jsx(t, { id: 'MeyfTD' }) }),
                          ],
                        }),
                        e.jsx('div', {
                          className: 'custom-scrollbar max-h-[60vh] overflow-y-auto rounded-md border',
                          children: e.jsxs(Te, {
                            children: [
                              e.jsx(ge, {
                                children: e.jsxs(O, {
                                  children: [
                                    e.jsx(_, { children: e.jsx(t, { id: 'I3QpvQ' }) }),
                                    e.jsx(_, { children: e.jsx(t, { id: 'GDvlUT' }) }),
                                    e.jsx(_, {}),
                                  ],
                                }),
                              }),
                              e.jsxs(be, {
                                children: [
                                  h.length === 0 &&
                                    e.jsx(O, {
                                      children: e.jsx(T, {
                                        colSpan: 3,
                                        className: 'h-16 text-center',
                                        children: e.jsx('p', {
                                          className: 'text-muted-foreground',
                                          children: e.jsx(t, { id: 'l08XJv' }),
                                        }),
                                      }),
                                    }),
                                  h.map((s) =>
                                    e.jsxs(
                                      O,
                                      {
                                        className: 'cursor-pointer',
                                        onClick: async () => ae(s.id),
                                        children: [
                                          e.jsx(T, {
                                            children: e.jsxs('div', {
                                              className: 'text-muted-foreground text-sm',
                                              children: [
                                                e.jsx('p', { children: s.name }),
                                                e.jsx('p', {
                                                  className: 'text-muted-foreground/70 text-xs',
                                                  children: s.email,
                                                }),
                                              ],
                                            }),
                                          }),
                                          e.jsx(T, {
                                            className: 'text-muted-foreground text-sm',
                                            children: i(oe[s.role].roleName),
                                          }),
                                          e.jsx(T, {
                                            children:
                                              z === s.id
                                                ? e.jsx(Oe, { className: 'h-5 w-5 text-neutral-300' })
                                                : e.jsx(Le, { className: 'h-5 w-5 text-neutral-300' }),
                                          }),
                                        ],
                                      },
                                      s.id,
                                    ),
                                  ),
                                ],
                              }),
                            ],
                          }),
                        }),
                        !d.some((s) => s.email === ce) &&
                          e.jsx(N, {
                            className: 'mx-auto',
                            children: e.jsxs('div', {
                              className: 'flex flex-col items-center justify-center',
                              children: [
                                h.length !== 0 &&
                                  e.jsx('p', {
                                    className: 'text-muted-foreground text-sm',
                                    children: e.jsx(t, { id: 'ZAVklK' }),
                                  }),
                                e.jsx(n, {
                                  type: 'button',
                                  className: 'mt-2',
                                  loading: L && !z,
                                  onClick: async () => q({ templateId: c }),
                                  children: e.jsx(t, { id: 'JLQooE' }),
                                }),
                              ],
                            }),
                          }),
                      ],
                    }),
                  )
                  .with({ token: g.string, currentStep: 'MANAGE' }, ({ token: s }) =>
                    e.jsxs(x, {
                      className: 'relative',
                      children: [
                        e.jsxs(u, {
                          children: [
                            e.jsx(j, { children: e.jsx(t, { id: 'nNHqgX' }) }),
                            e.jsx(f, { children: e.jsx(t, { id: 'aA0Gfq' }) }),
                          ],
                        }),
                        e.jsxs('div', {
                          children: [
                            e.jsxs('div', {
                              className: 'flex flex-row items-center justify-between',
                              children: [
                                e.jsxs(Q, {
                                  className: 'flex flex-row',
                                  children: [
                                    e.jsx(t, { id: 'qChNnS' }),
                                    e.jsxs(ye, {
                                      children: [
                                        e.jsx(ke, {
                                          tabIndex: -1,
                                          className: 'ml-2',
                                          children: e.jsx(Re, { className: 'h-4 w-4' }),
                                        }),
                                        e.jsx(ve, {
                                          className: 'z-9999 max-w-md p-4 text-foreground',
                                          children: e.jsx(t, { id: 'H11Db4' }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                e.jsx(Ne, { className: 'mt-2', checked: H, onCheckedChange: (r) => V(r) }),
                              ],
                            }),
                            e.jsxs('div', {
                              className: 'mt-2',
                              children: [
                                e.jsx(Q, { htmlFor: 'copy-direct-link', children: e.jsx(t, { id: 'ZxZS0E' }) }),
                                e.jsxs('div', {
                                  className: 'relative mt-1',
                                  children: [
                                    e.jsx(fe, {
                                      id: 'copy-direct-link',
                                      disabled: !0,
                                      value: G(s).replace(/https?:\/\//, ''),
                                      readOnly: !0,
                                      className: 'pr-12',
                                    }),
                                    e.jsx('div', {
                                      className: 'absolute top-0 right-1 bottom-0 flex items-center justify-center',
                                      children: e.jsx(n, {
                                        variant: 'none',
                                        type: 'button',
                                        className: 'h-8 w-8',
                                        onClick: () => {
                                          ie(s);
                                        },
                                        children: e.jsx(Ge, { className: 'h-4 w-4 flex-shrink-0' }),
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        e.jsxs(N, {
                          className: 'mt-4',
                          children: [
                            e.jsx(n, {
                              type: 'button',
                              variant: 'destructive',
                              className: 'mr-auto w-full sm:w-auto',
                              loading: R,
                              onClick: () => m('CONFIRM_DELETE'),
                              children: e.jsx(t, { id: 't/YqKh' }),
                            }),
                            e.jsx(n, {
                              type: 'button',
                              loading: Y,
                              onClick: async () => {
                                await se({ templateId: c, enabled: H }).catch(() => null), D(!1);
                              },
                              children: e.jsx(t, { id: 'tfDRzk' }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  )
                  .with({ token: g.string, currentStep: 'CONFIRM_DELETE' }, () =>
                    e.jsxs(x, {
                      className: 'relative',
                      children: [
                        e.jsxs(u, {
                          children: [
                            e.jsx(j, { children: e.jsx(t, { id: '6foA8n' }) }),
                            e.jsx(f, { children: e.jsx(t, { id: 'jG5btV' }) }),
                          ],
                        }),
                        e.jsxs(N, {
                          children: [
                            e.jsx(n, {
                              type: 'button',
                              variant: 'secondary',
                              onClick: () => m('MANAGE'),
                              children: e.jsx(t, { id: 'dEgA5A' }),
                            }),
                            e.jsx(n, {
                              type: 'button',
                              variant: 'destructive',
                              loading: R,
                              onClick: () => {
                                te({ templateId: c });
                              },
                              children: e.jsx(t, { id: '7VpPHA' }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  )
                  .otherwise(() => null),
              }),
            }),
          }),
        ],
      })
    );
  },
  us = ({ token: c, enabled: o, className: d }) => {
    const [, b] = Z(),
      { _: p } = W(),
      { toast: y } = K(),
      k = async (a) =>
        b(G(a)).then(() => {
          y({ title: p({ id: 'FxVG/l' }), description: p({ id: '+lDHlp' }) });
        });
    return e.jsxs('button', {
      title: 'Copy direct link',
      className: Ie(
        'flex flex-row items-center rounded border border-neutral-300 bg-neutral-200 px-1.5 py-0.5 text-xs dark:border-neutral-500 dark:bg-neutral-600',
        d,
      ),
      onClick: async () => k(c),
      children: [e.jsx(Se, { className: 'mr-1 h-3 w-3' }), o ? e.jsx(t, { id: 'YseRvk' }) : e.jsx(t, { id: 'VdX+I4' })],
    });
  };
export { hs as T, us as a };
