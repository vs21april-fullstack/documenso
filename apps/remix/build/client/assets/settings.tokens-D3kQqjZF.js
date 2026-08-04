import { a as K, A as Y, b as z } from './alert-CE06zyBg.js';
import { A as ee, a as te } from './app-uAhqo_pP.js';
import { B as U } from './badge-ChcBhPaW.js';
import { B as p } from './button-Dm_JGgap.js';
import { w as G, r as j } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { C as ie } from './copy-text-button-rUVOmEVL.js';
import { D as W } from './data-table-BVE33O_r.js';
import { a as B, b as H, f as k, c as N, D as P, d as S, e as v } from './dialog-DKtG3c-O.js';
import { e as A, d as C, c as D, b as E, u as J, f as oe, a as y, F as Z } from './form-BX2-nwLu.js';
import { t as I } from './index-BbY_VZqi.js';
import { M as me } from './index-BiLbLflF.js';
import { i as $ } from './index-browser-CnbpKWEs.js';
import { u as F, T as t } from './index-CkOHfBoV.js';
import { I as M } from './input-DdDbBJYb.js';
import { j as e } from './jsx-runtime-DrYFQjIW.js';
import { a as ue } from './meta-1txnm5en.js';
import { Z as se } from './name-B9Bt3kH5.js';
import { S as ae, d as ce, c as de, b as le, a as ne } from './select-Dvz92dRn.js';
import { S as pe } from './settings-header-C7I7HmzF.js';
import { S as g } from './skeleton-BRFgpeQI.js';
import { T as b } from './table-B2dCCbDr.js';
import { a as X, u as xe } from './team-BvmzkpNi.js';
import { n as _, s as R, l as re, o as w } from './types-GU3YNY2F.js';
import { u as V } from './use-toast-pMYLxjk1.js';
import { t as q } from './zod-C00iebzH.js';
import './data-transformer-DaTnp7WB.js';
import './index-DJ-EwNXm.js';
import './useQuery-Cl3ReeOA.js';
import './loader-aSxoB_gm.js';
import './createLucideIcon-UOjYlZt5.js';
import './utils-C68LRSOY.js';
import './use-copy-to-clipboard-C-lPWuoY.js';
import './index-BlIM-koY.js';
import './proxy-dEM8-k5c.js';
import './square-check-big-DvZyRfr_.js';
import './copy-wv5mRIE-.js';
import './index-BoPcnRXW.js';
import './index-DzY7AtIB.js';
import './index-DAyHhKCk.js';
import './index-J1tJADds.js';
import './index-C829O7aq.js';
import './index-UGPUXo4T.js';
import './Combination-DaG98sNE.js';
import './index-ZximTWpF.js';
import './x-BhPRmTZ1.js';
import './animate-generic-fade-in-out-CGjjMFem.js';
import './index-DXkD4Uno.js';
import './index-_mbtlgCZ.js';
import './index-DoLGTOH8.js';
import './index-KpgwOPga.js';
import './index-MjUwLcg-.js';
import './index-CZmIGLNu.js';
import './chevron-down-mVGROlJc.js';
import './check--7Y29bNj.js';
import './url-CP0Hgou8.js';
import './index-CBoJQWs5.js';
const je = w({ teamId: _(), tokenName: se, expirationDate: R().nullable() });
w({ id: _(), token: R() });
const O = 'NEVER',
  he = {
    ONE_WEEK: { id: 'rJe6vw' },
    ONE_MONTH: { id: 'voMgY+' },
    THREE_MONTHS: { id: 'x1VeBD' },
    SIX_MONTHS: { id: 'aQ1pHA' },
    ONE_YEAR: { id: 'J00CPN' },
    [O]: { id: 'qqeAJM' },
  },
  fe = je.pick({ tokenName: !0, expirationDate: !0 }),
  ge = ({ trigger: h, ...c }) => {
    const { _: a } = F(),
      { toast: i } = V(),
      m = X(),
      [u, d] = j.useState(!1),
      [n, x] = j.useState(null),
      s = J({ resolver: q(fe), defaultValues: { tokenName: '', expirationDate: 'THREE_MONTHS' } }),
      { mutateAsync: T } = I.apiToken.create.useMutation(),
      o = async ({ tokenName: r, expirationDate: l }) => {
        try {
          const { token: f } = await T({ teamId: m.id, tokenName: r, expirationDate: l === O ? null : l });
          x(f);
        } catch (f) {
          const L = ee.parseError(f),
            Q = me(L.code)
              .with(te.UNAUTHORIZED, () => ({ id: 'VNk9IJ' }))
              .otherwise(() => ({ id: 'lkE00/' }));
          i({ title: a({ id: 'Vw8l6h' }), description: a(Q), variant: 'destructive', duration: 5e3 });
        }
      };
    return (
      j.useEffect(() => {
        u && (s.reset(), x(null));
      }, [u, s]),
      e.jsxs(P, {
        open: u,
        onOpenChange: (r) => !s.formState.isSubmitting && d(r),
        ...c,
        children: [
          e.jsx(B, {
            onClick: (r) => r.stopPropagation(),
            asChild: !0,
            children: h ?? e.jsx(p, { className: 'flex-shrink-0', children: e.jsx(t, { id: 'pzXZ8+' }) }),
          }),
          e.jsx(H, {
            className: 'max-w-lg',
            position: 'center',
            onInteractOutside: (r) => {
              n && r.preventDefault();
            },
            children: n
              ? e.jsxs(e.Fragment, {
                  children: [
                    e.jsxs(N, {
                      children: [
                        e.jsx(S, { children: e.jsx(t, { id: 'OBjhQ4' }) }),
                        e.jsx(v, { children: e.jsx(t, { id: 'Phvr0A' }) }),
                      ],
                    }),
                    e.jsxs('div', {
                      className: 'relative',
                      children: [
                        e.jsx(M, {
                          className: 'pr-12 font-mono text-sm',
                          'aria-label': a({ id: 'xYjNp4' }),
                          name: 'createdToken',
                          readOnly: !0,
                          value: n,
                        }),
                        e.jsx('div', {
                          className: 'absolute top-0 right-2 bottom-0 flex items-center justify-center',
                          children: e.jsx(ie, { value: n, onCopySuccess: () => i({ title: a({ id: 'SWyfbd' }) }) }),
                        }),
                      ],
                    }),
                    e.jsx(k, {
                      children: e.jsx(p, {
                        type: 'button',
                        onClick: () => d(!1),
                        children: e.jsx(t, { id: 'DPfwMq' }),
                      }),
                    }),
                  ],
                })
              : e.jsxs(e.Fragment, {
                  children: [
                    e.jsxs(N, {
                      children: [
                        e.jsx(S, { children: e.jsx(t, { id: 'DRZ48c' }) }),
                        e.jsx(v, { children: e.jsx(t, { id: 'd2JCTC' }) }),
                      ],
                    }),
                    e.jsx(Z, {
                      ...s,
                      children: e.jsx('form', {
                        onSubmit: s.handleSubmit(o),
                        children: e.jsxs('fieldset', {
                          className: 'flex h-full flex-col space-y-4',
                          disabled: s.formState.isSubmitting,
                          children: [
                            e.jsx(y, {
                              control: s.control,
                              name: 'tokenName',
                              render: ({ field: r }) =>
                                e.jsxs(E, {
                                  children: [
                                    e.jsx(D, { required: !0, children: e.jsx(t, { id: '6YtxFj' }) }),
                                    e.jsx(C, { children: e.jsx(M, { className: 'bg-background', ...r }) }),
                                    e.jsx(oe, { children: e.jsx(t, { id: '64n3OQ' }) }),
                                    e.jsx(A, {}),
                                  ],
                                }),
                            }),
                            e.jsx(y, {
                              control: s.control,
                              name: 'expirationDate',
                              render: ({ field: r }) =>
                                e.jsxs(E, {
                                  children: [
                                    e.jsx(D, { children: e.jsx(t, { id: 'i9qiyR' }) }),
                                    e.jsx(C, {
                                      children: e.jsxs(ae, {
                                        value: r.value ?? O,
                                        onValueChange: r.onChange,
                                        children: [
                                          e.jsx(ne, { className: 'bg-background', children: e.jsx(le, {}) }),
                                          e.jsx(de, {
                                            children: Object.entries(he).map(([l, f]) =>
                                              e.jsx(ce, { value: l, children: a(f) }, l),
                                            ),
                                          }),
                                        ],
                                      }),
                                    }),
                                    e.jsx(A, {}),
                                  ],
                                }),
                            }),
                            e.jsxs(k, {
                              children: [
                                e.jsx(p, {
                                  type: 'button',
                                  variant: 'secondary',
                                  onClick: () => d(!1),
                                  children: e.jsx(t, { id: 'dEgA5A' }),
                                }),
                                e.jsx(p, {
                                  type: 'submit',
                                  loading: s.formState.isSubmitting,
                                  children: e.jsx(t, { id: 'pzXZ8+' }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
          }),
        ],
      })
    );
  };
function be({ token: h, onDelete: c, children: a }) {
  const { _: i } = F(),
    { toast: m } = V(),
    u = X(),
    [d, n] = j.useState(!1),
    x = i({ id: 'lS8vkm', values: { 0: h.name } }),
    s = w({ tokenName: re(x, { errorMap: () => ({ message: i({ id: 'OGT1bh', values: { deleteMessage: x } }) }) }) }),
    { mutateAsync: T } = I.apiToken.delete.useMutation({
      onSuccess() {
        c?.();
      },
    }),
    o = J({ resolver: q(s), values: { tokenName: '' } }),
    r = async () => {
      try {
        await T({ id: h.id, teamId: u?.id }),
          m({ title: i({ id: 'B5MBOV' }), description: i({ id: '5cysp1' }), duration: 5e3 }),
          n(!1);
      } catch {
        m({ title: i({ id: 'vW+T+d' }), description: i({ id: 'kQiucd' }), variant: 'destructive', duration: 5e3 });
      }
    };
  return (
    j.useEffect(() => {
      d || o.reset();
    }, [d, o]),
    e.jsxs(P, {
      open: d,
      onOpenChange: (l) => !o.formState.isSubmitting && n(l),
      children: [
        e.jsx(B, {
          asChild: !0,
          children: a ?? e.jsx(p, { className: 'mr-4', variant: 'destructive', children: e.jsx(t, { id: 'cnGeoo' }) }),
        }),
        e.jsxs(H, {
          children: [
            e.jsxs(N, {
              children: [
                e.jsx(S, { children: e.jsx(t, { id: 'Ijsgym' }) }),
                e.jsx(v, { children: e.jsx(t, { id: 'LIf5dA' }) }),
              ],
            }),
            e.jsx(Z, {
              ...o,
              children: e.jsx('form', {
                onSubmit: o.handleSubmit(r),
                children: e.jsxs('fieldset', {
                  className: 'flex h-full flex-col space-y-4',
                  disabled: o.formState.isSubmitting,
                  children: [
                    e.jsx(y, {
                      control: o.control,
                      name: 'tokenName',
                      render: ({ field: l }) =>
                        e.jsxs(E, {
                          children: [
                            e.jsx(D, {
                              children: e.jsx(t, {
                                id: 'gv1JXQ',
                                values: { deleteMessage: x },
                                components: {
                                  0: e.jsx('span', { className: 'font-semibold text-destructive text-sm' }),
                                },
                              }),
                            }),
                            e.jsx(C, { children: e.jsx(M, { className: 'bg-background', type: 'text', ...l }) }),
                            e.jsx(A, {}),
                          ],
                        }),
                    }),
                    e.jsxs(k, {
                      children: [
                        e.jsx(p, {
                          type: 'button',
                          variant: 'secondary',
                          onClick: () => n(!1),
                          children: e.jsx(t, { id: 'dEgA5A' }),
                        }),
                        e.jsx(p, {
                          type: 'submit',
                          variant: 'destructive',
                          disabled: !o.formState.isValid,
                          loading: o.formState.isSubmitting,
                          children: e.jsx(t, { id: 'cnGeoo' }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
      ],
    })
  );
}
function St() {
  return ue({ id: 'ZiooJI' });
}
const vt = G(() => {
  const { _: c, i18n: a } = F(),
    i = xe(),
    m = !!i && i.currentTeamRole !== $.TeamMemberRole.ADMIN,
    { data: u, isLoading: d, isError: n } = I.apiToken.getMany.useQuery(void 0, { enabled: !m }),
    x = j.useMemo(
      () => [
        {
          header: c({ id: '6YtxFj' }),
          cell: ({ row: s }) => e.jsx('span', { className: 'font-medium text-foreground', children: s.original.name }),
        },
        { header: c({ id: 'd+F6q9' }), cell: ({ row: s }) => a.date(s.original.createdAt) },
        {
          header: c({ id: 'KnN1Tu' }),
          cell: ({ row: s }) =>
            s.original.expires
              ? s.original.expires < new Date()
                ? e.jsx(U, { variant: 'destructive', size: 'small', children: e.jsx(t, { id: 'M1RnFv' }) })
                : a.date(s.original.expires)
              : e.jsx('span', { className: 'text-muted-foreground', children: e.jsx(t, { id: 'qqeAJM' }) }),
        },
        {
          header: c({ id: '7L01XJ' }),
          cell: ({ row: s }) =>
            e.jsx(be, {
              token: s.original,
              children: e.jsx(p, { variant: 'destructive', children: e.jsx(t, { id: 'cnGeoo' }) }),
            }),
        },
      ],
      [],
    );
  return e.jsxs('div', {
    children: [
      e.jsx(pe, {
        title: e.jsx(t, { id: 'ZiooJI' }),
        subtitle: e.jsx(t, {
          id: '3/JBHf',
          components: {
            0: e.jsx('a', {
              className: 'text-primary underline',
              href: 'https://docs.documenso.com/developers/public-api',
              target: '_blank',
              rel: 'noopener',
            }),
          },
        }),
        children: !m && e.jsx(ge, {}),
      }),
      m
        ? e.jsx(Y, {
            className: 'flex flex-col items-center justify-between gap-4 p-6 md:flex-row',
            variant: 'warning',
            children: e.jsxs('div', {
              children: [
                e.jsx(z, { children: e.jsx(t, { id: 'dA/8If' }) }),
                e.jsx(K, { className: 'mr-2', children: e.jsx(t, { id: '0WULuX' }) }),
              ],
            }),
          })
        : e.jsx(W, {
            columns: x,
            data: u ?? [],
            perPage: 0,
            currentPage: 0,
            totalPages: 0,
            error: { enable: n },
            emptyState: e.jsx('div', {
              className: 'flex h-60 flex-col items-center justify-center gap-y-4 text-muted-foreground/60',
              children: e.jsx('p', { children: e.jsx(t, { id: 'pcKKGF' }) }),
            }),
            skeleton: {
              enable: d,
              rows: 3,
              component: e.jsxs(e.Fragment, {
                children: [
                  e.jsx(b, { children: e.jsx(g, { className: 'h-4 w-24 rounded-full' }) }),
                  e.jsx(b, { children: e.jsx(g, { className: 'h-4 w-16 rounded-full' }) }),
                  e.jsx(b, { children: e.jsx(g, { className: 'h-4 w-16 rounded-full' }) }),
                  e.jsx(b, { children: e.jsx(g, { className: 'h-4 w-12 rounded-full' }) }),
                ],
              }),
            },
          }),
    ],
  });
});
export { St as meta, vt as default };
