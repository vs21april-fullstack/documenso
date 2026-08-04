import { N as h } from './app-uAhqo_pP.js';
import { c as S } from './avatar-BS15TO7o.js';
import { f as b } from './avatars-GsGH8fkv.js';
import { B as T } from './badge-ChcBhPaW.js';
import { i as j } from './billing-CwoEkWpH.js';
import { B } from './button-Dm_JGgap.js';
import { w as g, L as n, r as s } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { D as E } from './data-table-BVE33O_r.js';
import { M as L } from './index-BiLbLflF.js';
import { i as o } from './index-browser-CnbpKWEs.js';
import { T as l, u as m } from './index-CkOHfBoV.js';
import { j as r } from './jsx-runtime-DrYFQjIW.js';
import { a as w } from './meta-1txnm5en.js';
import { c as v } from './organisations-CAYnRnac.js';
import { u as x } from './session-DJFUfUIe.js';
import { S as f } from './settings-header-C7I7HmzF.js';
import './utils-C68LRSOY.js';
import './index-PjhXdBcw.js';
import './index-DJ-EwNXm.js';
import './data-transformer-DaTnp7WB.js';
import './types-GU3YNY2F.js';
import './subscription-MVyIYEGf.js';
import './time-zones-DGI2eNDr.js';
import './envelope-reminder-YclQYJ2m.js';
import './organisations-bLnymRV_.js';
import './document-email-DcBZA0tR.js';
import './index-UGPUXo4T.js';
import './index-J1tJADds.js';
import './index-DAyHhKCk.js';
import './index-CWo-8VFg.js';
import './loader-aSxoB_gm.js';
import './createLucideIcon-UOjYlZt5.js';
import './skeleton-BRFgpeQI.js';
import './table-B2dCCbDr.js';
import './url-CP0Hgou8.js';
import './index-CBoJQWs5.js';
const P = () => {
  const { _: i } = m(),
    { organisations: a } = x(),
    e = s.useMemo(() => a.filter((t) => v('MANAGE_BILLING', t.currentOrganisationRole)), [a]),
    p = (t) =>
      L(t.subscription?.status)
        .with(o.SubscriptionStatus.ACTIVE, () => ({ label: i({ id: '8TE5VM' }), variant: 'default' }))
        .with(o.SubscriptionStatus.PAST_DUE, () => ({ label: i({ id: '+9aCHe' }), variant: 'warning' }))
        .with(o.SubscriptionStatus.INACTIVE, () => ({ label: i({ id: 'j3UjVr' }), variant: 'neutral' }))
        .otherwise(() =>
          j(t)
            ? { label: i({ id: 'L0wYcU' }), variant: 'warning' }
            : { label: i({ id: 'JUkGji' }), variant: 'neutral' },
        ),
    c = s.useMemo(
      () => [
        {
          header: i({ id: 'LB3Kje' }),
          accessorKey: 'name',
          cell: ({ row: t }) =>
            r.jsx(n, {
              to: `/o/${t.original.url}`,
              preventScrollReset: !0,
              children: r.jsx(S, {
                avatarSrc: b(t.original.avatarImageId),
                avatarClass: 'h-12 w-12',
                avatarFallback: t.original.name.slice(0, 1).toUpperCase(),
                primaryText: r.jsx('span', {
                  className: 'font-semibold text-foreground/80',
                  children: t.original.name,
                }),
                secondaryText: `${h()}/o/${t.original.url}`,
              }),
            }),
        },
        {
          header: i({ id: 'umwH8n' }),
          accessorKey: 'subscription',
          cell: ({ row: t }) => {
            const { label: u, variant: d } = p(t.original);
            return r.jsx(T, { variant: d, children: u });
          },
        },
        {
          header: i({ id: '7L01XJ' }),
          id: 'actions',
          cell: ({ row: t }) =>
            r.jsx(B, {
              asChild: !0,
              variant: 'outline',
              children: r.jsx(n, { to: `/o/${t.original.url}/settings/billing`, children: r.jsx(l, { id: '53hao2' }) }),
            }),
        },
      ],
      [e],
    );
  return e.length === 0
    ? r.jsx('div', {
        className:
          'flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center text-muted-foreground',
        children: r.jsx('p', { className: 'text-sm', children: r.jsx(l, { id: 'npBQLj' }) }),
      })
    : r.jsx(E, { columns: c, data: e, perPage: e.length, currentPage: 1, totalPages: 1 });
};
function pt() {
  return w({ id: 'R+w/Va' });
}
const ct = g(() => {
  const { _: a } = m();
  return r.jsxs('div', {
    children: [r.jsx(f, { title: a({ id: 'R+w/Va' }), subtitle: a({ id: 'd2fJuM' }) }), r.jsx(P, {})],
  });
});
export { ct as default, pt as meta };
