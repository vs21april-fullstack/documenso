import { B as m } from './button-Dm_JGgap.js';
import { w as v, r as x } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { D } from './data-table-BVE33O_r.js';
import { d as A, c as b, e as k, a as S, b as T, f as w, D as y } from './dialog-DKtG3c-O.js';
import { u as g, T as r } from './index-CkOHfBoV.js';
import { a as j } from './index-PjhXdBcw.js';
import { j as e } from './jsx-runtime-DrYFQjIW.js';
import { D as M } from './luxon-CkcISRbr.js';
import { a as B } from './meta-1txnm5en.js';
import { S as N } from './settings-header-C7I7HmzF.js';
import { S as p } from './skeleton-BRFgpeQI.js';
import { T as u } from './table-B2dCCbDr.js';
import { u as C } from './use-toast-pMYLxjk1.js';
import { u as L } from './useQuery-Cl3ReeOA.js';
import './app-uAhqo_pP.js';
import './index-BiLbLflF.js';
import './types-GU3YNY2F.js';
import './index-DJ-EwNXm.js';
import './loader-aSxoB_gm.js';
import './createLucideIcon-UOjYlZt5.js';
import './utils-C68LRSOY.js';
import './index-BoPcnRXW.js';
import './index-DzY7AtIB.js';
import './index-DAyHhKCk.js';
import './index-J1tJADds.js';
import './index-C829O7aq.js';
import './index-UGPUXo4T.js';
import './Combination-DaG98sNE.js';
import './index-ZximTWpF.js';
import './x-BhPRmTZ1.js';
import './url-CP0Hgou8.js';
import './index-CBoJQWs5.js';
function pe() {
  return B({ id: 'JxuM3X' });
}
const ue = v(() => {
    const { _: s } = g(),
      {
        data: c,
        isLoading: o,
        isLoadingError: i,
        refetch: a,
      } = L({ queryKey: ['linked-accounts'], queryFn: async () => await j.account.getMany() }),
      n = c?.accounts ?? [],
      l = x.useMemo(
        () => [
          { header: s({ id: 'aemBRq' }), accessorKey: 'provider', cell: ({ row: t }) => t.original.provider },
          {
            header: s({ id: '24KBZ2' }),
            accessorKey: 'createdAt',
            cell: ({ row: t }) =>
              t.original.createdAt ? M.fromJSDate(t.original.createdAt).toRelative() : s({ id: 'Ef7StM' }),
          },
          {
            id: 'actions',
            cell: ({ row: t }) => e.jsx(E, { accountId: t.original.id, provider: t.original.provider, onSuccess: a }),
          },
        ],
        [],
      );
    return e.jsxs('div', {
      children: [
        e.jsx(N, { title: s({ id: 'JxuM3X' }), subtitle: s({ id: 'uc/gmm' }) }),
        e.jsx('div', {
          className: 'mt-4',
          children: e.jsx(D, {
            columns: l,
            data: n,
            hasFilters: !1,
            error: { enable: i },
            skeleton: {
              enable: o,
              rows: 3,
              component: e.jsxs(e.Fragment, {
                children: [
                  e.jsx(u, { children: e.jsx(p, { className: 'h-4 w-40 rounded-full' }) }),
                  e.jsx(u, { children: e.jsx(p, { className: 'h-4 w-24 rounded-full' }) }),
                  e.jsx(u, { children: e.jsx(p, { className: 'h-8 w-16 rounded' }) }),
                ],
              }),
            },
          }),
        }),
      ],
    });
  }),
  E = ({ accountId: f, onSuccess: s, provider: c }) => {
    const { toast: o } = C(),
      { _: i } = g(),
      [a, n] = x.useState(!1),
      [l, t] = x.useState(!1),
      h = async () => {
        n(!0);
        try {
          await j.account.delete(f), await s(), o({ title: i({ id: 'P/zqWA' }) });
        } catch (d) {
          console.error(d), o({ title: i({ id: 'SlfejT' }), description: i({ id: 'IYpcBx' }), variant: 'destructive' });
        }
        n(!1);
      };
    return e.jsxs(y, {
      open: l,
      onOpenChange: (d) => !a && t(d),
      children: [
        e.jsx(S, {
          asChild: !0,
          children: e.jsx(m, { variant: 'destructive', size: 'sm', children: e.jsx(r, { id: '6dvIbw' }) }),
        }),
        e.jsxs(T, {
          position: 'center',
          children: [
            e.jsxs(b, {
              children: [
                e.jsx(A, { children: e.jsx(r, { id: '6foA8n' }) }),
                e.jsx(k, {
                  className: 'mt-4',
                  children: e.jsx(r, {
                    id: 'oCRdtK',
                    values: { provider: c },
                    components: { 0: e.jsx('span', { className: 'font-semibold' }) },
                  }),
                }),
              ],
            }),
            e.jsxs(w, {
              children: [
                e.jsx(m, {
                  type: 'button',
                  variant: 'secondary',
                  onClick: () => t(!1),
                  children: e.jsx(r, { id: 'dEgA5A' }),
                }),
                e.jsx(m, { variant: 'destructive', loading: a, onClick: h, children: e.jsx(r, { id: '6dvIbw' }) }),
              ],
            }),
          ],
        }),
      ],
    });
  };
export { pe as meta, ue as default };
