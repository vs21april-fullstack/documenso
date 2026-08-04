import { B as H } from './badge-ChcBhPaW.js';
import { B as h } from './button-Dm_JGgap.js';
import { L as C, w as Q, r as S } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { D as B } from './data-table-BVE33O_r.js';
import { f as A, d as E, b as F, e as L, c as M, D as P, a as W } from './dialog-DKtG3c-O.js';
import { a as _, b as $, D as J, c as N, e as X } from './dropdown-menu-2Yi5vAvU.js';
import { E as ae } from './ellipsis-BF6023K1.js';
import { c as b, b as f, a as g, F as I, e as k, u as q, d as v, f as y } from './form-BX2-nwLu.js';
import { t as D } from './index-BbY_VZqi.js';
import { T as r, u as T } from './index-CkOHfBoV.js';
import { I as U } from './input-DdDbBJYb.js';
import { j as e } from './jsx-runtime-DrYFQjIW.js';
import { L as ie } from './loader-aSxoB_gm.js';
import { a as oe } from './meta-1txnm5en.js';
import { P as Y } from './password-input-Bs5MrKTA.js';
import { S as ne } from './scroll-text-D4jFcLIK.js';
import { S as te } from './settings-header-C7I7HmzF.js';
import { S as p } from './skeleton-BRFgpeQI.js';
import { S as le } from './square-pen-D6ZWiFby.js';
import { S as ee } from './switch-CsvfEGp8.js';
import { T as u } from './table-B2dCCbDr.js';
import { a as w } from './team-BvmzkpNi.js';
import { T as de } from './trash-2-8_LAF_rE.js';
import { l as re, o as se } from './types-GU3YNY2F.js';
import { u as R } from './use-toast-pMYLxjk1.js';
import { a as K, Z as V, t as Z, W as z } from './webhook-edit-dialog-CK77dTvx.js';
import { t as G } from './zod-C00iebzH.js';
import './name-B9Bt3kH5.js';
import './index-browser-CnbpKWEs.js';
import './multiselect-BlrA1Tug.js';
import './command-DSdqtVmj.js';
import './index-DAyHhKCk.js';
import './Combination-DaG98sNE.js';
import './index-DzY7AtIB.js';
import './index-J1tJADds.js';
import './index-UGPUXo4T.js';
import './utils-C68LRSOY.js';
import './search-CRP2I58A.js';
import './createLucideIcon-UOjYlZt5.js';
import './x-BhPRmTZ1.js';
import './data-transformer-DaTnp7WB.js';
import './app-uAhqo_pP.js';
import './index-BiLbLflF.js';
import './index-DJ-EwNXm.js';
import './useQuery-Cl3ReeOA.js';
import './index-DXkD4Uno.js';
import './index-_mbtlgCZ.js';
import './index-C829O7aq.js';
import './index-DoLGTOH8.js';
import './index-KpgwOPga.js';
import './index-ZximTWpF.js';
import './index-BE7cqlHg.js';
import './chevron-right-DREuxHzc.js';
import './check--7Y29bNj.js';
import './circle-DZ0kJoCe.js';
import './index-BoPcnRXW.js';
import './index-BlIM-koY.js';
import './proxy-dEM8-k5c.js';
import './eye-off-CYdHb6Re.js';
import './eye-BJpoQCg7.js';
import './index-MjUwLcg-.js';
import './url-CP0Hgou8.js';
import './index-CBoJQWs5.js';
const ce = V,
  me = ({ trigger: n, ...i }) => {
    const { _: t } = T(),
      { toast: c } = R();
    w();
    const [m, a] = S.useState(!1),
      o = q({ resolver: G(ce), values: { webhookUrl: '', eventTriggers: [], secret: '', enabled: !0 } }),
      { mutateAsync: l } = D.webhook.createWebhook.useMutation(),
      j = async ({ enabled: s, eventTriggers: x, secret: d, webhookUrl: O }) => {
        try {
          await l({ enabled: s, eventTriggers: x, secret: d, webhookUrl: O }),
            a(!1),
            c({ title: t({ id: 'an6ayw' }), description: t({ id: 'V+5KQa' }) }),
            o.reset();
        } catch {
          c({ title: t({ id: 'SlfejT' }), description: t({ id: '8jjOHI' }), variant: 'destructive' });
        }
      };
    return e.jsxs(P, {
      open: m,
      onOpenChange: (s) => !o.formState.isSubmitting && a(s),
      ...i,
      children: [
        e.jsx(W, {
          onClick: (s) => s.stopPropagation(),
          asChild: !0,
          children: n ?? e.jsx(h, { className: 'flex-shrink-0', children: e.jsx(r, { id: 'dkAPxi' }) }),
        }),
        e.jsxs(F, {
          className: 'max-w-lg',
          position: 'center',
          children: [
            e.jsxs(M, {
              children: [
                e.jsx(E, { children: e.jsx(r, { id: 'SiPp29' }) }),
                e.jsx(L, { children: e.jsx(r, { id: 'Oizhkg' }) }),
              ],
            }),
            e.jsx(I, {
              ...o,
              children: e.jsx('form', {
                onSubmit: o.handleSubmit(j),
                children: e.jsxs('fieldset', {
                  className: 'flex h-full flex-col space-y-4',
                  disabled: o.formState.isSubmitting,
                  children: [
                    e.jsxs('div', {
                      className: 'flex flex-col-reverse gap-4 md:flex-row',
                      children: [
                        e.jsx(g, {
                          control: o.control,
                          name: 'webhookUrl',
                          render: ({ field: s }) =>
                            e.jsxs(f, {
                              className: 'flex-1',
                              children: [
                                e.jsx(b, { required: !0, children: e.jsx(r, { id: 'nuh/Wq' }) }),
                                e.jsx(v, { children: e.jsx(U, { className: 'bg-background', ...s }) }),
                                e.jsx(y, { children: e.jsx(r, { id: '+FTKbv' }) }),
                                e.jsx(k, {}),
                              ],
                            }),
                        }),
                        e.jsx(g, {
                          control: o.control,
                          name: 'enabled',
                          render: ({ field: s }) =>
                            e.jsxs(f, {
                              children: [
                                e.jsx(b, { children: e.jsx(r, { id: 'RxzN1M' }) }),
                                e.jsx('div', {
                                  children: e.jsx(v, {
                                    children: e.jsx(ee, {
                                      className: 'bg-background',
                                      checked: s.value,
                                      onCheckedChange: s.onChange,
                                    }),
                                  }),
                                }),
                                e.jsx(k, {}),
                              ],
                            }),
                        }),
                      ],
                    }),
                    e.jsx(g, {
                      control: o.control,
                      name: 'eventTriggers',
                      render: ({ field: { onChange: s, value: x } }) =>
                        e.jsxs(f, {
                          className: 'flex flex-col gap-2',
                          children: [
                            e.jsx(b, { required: !0, children: e.jsx(r, { id: '34nxyb' }) }),
                            e.jsx(v, {
                              children: e.jsx(K, {
                                listValues: x,
                                onChange: (d) => {
                                  s(d);
                                },
                              }),
                            }),
                            e.jsx(y, { children: e.jsx(r, { id: 'S20Dp9' }) }),
                            e.jsx(k, {}),
                          ],
                        }),
                    }),
                    e.jsx(g, {
                      control: o.control,
                      name: 'secret',
                      render: ({ field: s }) =>
                        e.jsxs(f, {
                          children: [
                            e.jsx(b, { children: e.jsx(r, { id: '8VEDbV' }) }),
                            e.jsx(v, {
                              children: e.jsx(Y, { className: 'bg-background', ...s, value: s.value ?? '' }),
                            }),
                            e.jsx(y, { children: e.jsx(r, { id: 'LqN4/8' }) }),
                            e.jsx(k, {}),
                          ],
                        }),
                    }),
                    e.jsxs(A, {
                      children: [
                        e.jsx(h, {
                          type: 'button',
                          variant: 'secondary',
                          onClick: () => a(!1),
                          children: e.jsx(r, { id: 'dEgA5A' }),
                        }),
                        e.jsx(h, {
                          type: 'submit',
                          loading: o.formState.isSubmitting,
                          children: e.jsx(r, { id: 'hYgDIe' }),
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
    });
  },
  xe = ({ webhook: n, children: i }) => {
    const { _: t } = T(),
      { toast: c } = R();
    w();
    const [m, a] = S.useState(!1),
      o = t({ id: 'lS8vkm', values: { 0: n.webhookUrl } }),
      l = se({
        webhookUrl: re(o, { errorMap: () => ({ message: t({ id: 'OGT1bh', values: { deleteMessage: o } }) }) }),
      }),
      { mutateAsync: j } = D.webhook.deleteWebhook.useMutation(),
      s = q({ resolver: G(l), values: { webhookUrl: '' } }),
      x = async () => {
        try {
          await j({ id: n.id }),
            c({ title: t({ id: 'LnaC5y' }), description: t({ id: 'V92DHZ' }), duration: 5e3 }),
            a(!1);
        } catch {
          c({ title: t({ id: 'vW+T+d' }), description: t({ id: '5jf+Ky' }), variant: 'destructive', duration: 5e3 });
        }
      };
    return (
      S.useEffect(() => {
        m || s.reset();
      }, [m, s]),
      e.jsxs(P, {
        open: m,
        onOpenChange: (d) => !s.formState.isSubmitting && a(d),
        children: [
          e.jsx(W, {
            asChild: !0,
            children:
              i ?? e.jsx(h, { className: 'mr-4', variant: 'destructive', children: e.jsx(r, { id: 'cnGeoo' }) }),
          }),
          e.jsxs(F, {
            children: [
              e.jsxs(M, {
                children: [
                  e.jsx(E, { children: e.jsx(r, { id: 'zdyslo' }) }),
                  e.jsx(L, { children: e.jsx(r, { id: 'bGHA6C' }) }),
                ],
              }),
              e.jsx(I, {
                ...s,
                children: e.jsx('form', {
                  onSubmit: s.handleSubmit(x),
                  children: e.jsxs('fieldset', {
                    className: 'flex h-full flex-col space-y-4',
                    disabled: s.formState.isSubmitting,
                    children: [
                      e.jsx(g, {
                        control: s.control,
                        name: 'webhookUrl',
                        render: ({ field: d }) =>
                          e.jsxs(f, {
                            children: [
                              e.jsx(b, {
                                children: e.jsx(r, {
                                  id: 'gv1JXQ',
                                  values: { deleteMessage: o },
                                  components: {
                                    0: e.jsx('span', { className: 'font-semibold text-destructive text-sm' }),
                                  },
                                }),
                              }),
                              e.jsx(v, { children: e.jsx(U, { className: 'bg-background', type: 'text', ...d }) }),
                              e.jsx(k, {}),
                            ],
                          }),
                      }),
                      e.jsxs(A, {
                        children: [
                          e.jsx(h, {
                            type: 'button',
                            variant: 'secondary',
                            onClick: () => a(!1),
                            children: e.jsx(r, { id: 'dEgA5A' }),
                          }),
                          e.jsx(h, {
                            type: 'submit',
                            variant: 'destructive',
                            disabled: !s.formState.isValid,
                            loading: s.formState.isSubmitting,
                            children: e.jsx(r, { id: 'cnGeoo' }),
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
  };
function Ns() {
  return oe({ id: 'v1kQyJ' });
}
const ys = Q(() => {
    const { _: i, i18n: t } = T(),
      c = w(),
      { data: m, isLoading: a, isError: o } = D.webhook.getTeamWebhooks.useQuery(),
      l = { data: m ?? [], perPage: 0, currentPage: 0, totalPages: 0 },
      j = S.useMemo(
        () => [
          {
            header: i({ id: 'TRDppN' }),
            cell: ({ row: s }) =>
              e.jsxs(C, {
                to: `/t/${c.url}/settings/webhooks/${s.original.id}`,
                children: [
                  e.jsx('p', { className: 'text-muted-foreground text-xs', children: s.original.id }),
                  e.jsx('p', {
                    className: 'max-w-sm truncate font-semibold text-foreground text-xs',
                    title: s.original.webhookUrl,
                    children: s.original.webhookUrl,
                  }),
                ],
              }),
          },
          {
            header: i({ id: 'uAQUqI' }),
            cell: ({ row: s }) =>
              e.jsx(H, {
                variant: s.original.enabled ? 'default' : 'neutral',
                size: 'small',
                children: s.original.enabled ? e.jsx(r, { id: 'RxzN1M' }) : e.jsx(r, { id: 'E/QGRL' }),
              }),
          },
          {
            header: i({ id: 'pKbTxN' }),
            cell: ({ row: s }) =>
              e.jsx('p', {
                className: 'text-foreground',
                title: s.original.eventTriggers.map((x) => Z(x)).join(', '),
                children: e.jsx(r, { id: 'CEfZvK', values: { 0: s.original.eventTriggers.length } }),
              }),
          },
          { header: i({ id: 'd+F6q9' }), cell: ({ row: s }) => t.date(s.original.createdAt) },
          { header: i({ id: '7L01XJ' }), cell: ({ row: s }) => e.jsx(he, { webhook: s.original }) },
        ],
        [],
      );
    return e.jsxs('div', {
      children: [
        e.jsx(te, { title: i({ id: 'v1kQyJ' }), subtitle: i({ id: 'SpqtG7' }), children: e.jsx(me, {}) }),
        a &&
          e.jsx('div', {
            className: 'absolute inset-0 flex items-center justify-center bg-white/50',
            children: e.jsx(ie, { className: 'h-8 w-8 animate-spin text-gray-500' }),
          }),
        e.jsx(B, {
          columns: j,
          data: l.data,
          perPage: l.perPage,
          currentPage: l.currentPage,
          totalPages: l.totalPages,
          error: { enable: o },
          emptyState: e.jsx('div', {
            className: 'flex h-60 flex-col items-center justify-center gap-y-4 text-muted-foreground/60',
            children: e.jsx('p', { children: e.jsx(r, { id: '9vc55I' }) }),
          }),
          skeleton: {
            enable: a,
            rows: 3,
            component: e.jsxs(e.Fragment, {
              children: [
                e.jsx(u, { children: e.jsx(p, { className: 'h-4 w-24 rounded-full' }) }),
                e.jsx(u, { children: e.jsx(p, { className: 'h-4 w-8 rounded-full' }) }),
                e.jsx(u, { children: e.jsx(p, { className: 'h-4 w-12 rounded-full' }) }),
                e.jsx(u, { children: e.jsx(p, { className: 'h-4 w-12 rounded-full' }) }),
                e.jsx(u, { children: e.jsx(p, { className: 'h-4 w-6 rounded-full' }) }),
              ],
            }),
          },
        }),
      ],
    });
  }),
  he = ({ webhook: n }) => {
    const i = w();
    return e.jsxs(J, {
      children: [
        e.jsx(_, {
          'data-testid': 'webhook-table-action-btn',
          children: e.jsx(ae, { className: 'h-5 w-5 text-muted-foreground' }),
        }),
        e.jsxs($, {
          align: 'end',
          forceMount: !0,
          children: [
            e.jsx(X, { children: e.jsx(r, { id: 'bwRvnp' }) }),
            e.jsx(N, {
              asChild: !0,
              children: e.jsxs(C, {
                to: `/t/${i.url}/settings/webhooks/${n.id}`,
                children: [e.jsx(ne, { className: 'mr-2 h-4 w-4' }), e.jsx(r, { id: 'w/bY7R' })],
              }),
            }),
            e.jsx(z, {
              webhook: n,
              trigger: e.jsx(N, {
                asChild: !0,
                onSelect: (t) => t.preventDefault(),
                children: e.jsxs('div', {
                  children: [e.jsx(le, { className: 'mr-2 h-4 w-4' }), e.jsx(r, { id: 'ePK91l' })],
                }),
              }),
            }),
            e.jsx(xe, {
              webhook: n,
              children: e.jsx(N, {
                asChild: !0,
                onSelect: (t) => t.preventDefault(),
                children: e.jsxs('div', {
                  children: [e.jsx(de, { className: 'mr-2 h-4 w-4' }), e.jsx(r, { id: 'cnGeoo' })],
                }),
              }),
            }),
          ],
        }),
      ],
    });
  };
export { Ns as meta, ys as default };
