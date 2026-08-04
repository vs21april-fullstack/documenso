import { A as f, a as h, b as x } from './alert-CE06zyBg.js';
import { I as u } from './app-uAhqo_pP.js';
import { B as J } from './branding-preferences-form-BGGlS8ox.js';
import { B as W } from './button-Dm_JGgap.js';
import { L as F, w as R, r as T } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { t as l } from './index-BbY_VZqi.js';
import { i as Q } from './index-CBoJQWs5.js';
import { T as o, u as X } from './index-CkOHfBoV.js';
import { j as i } from './jsx-runtime-DrYFQjIW.js';
import { L as Y } from './loader-aSxoB_gm.js';
import { a as V } from './meta-1txnm5en.js';
import { u as D } from './organisation-Ylr4XBmr.js';
import { i as _, c as G } from './organisations-CAYnRnac.js';
import { u as M } from './session-DJFUfUIe.js';
import { S as K } from './settings-header-C7I7HmzF.js';
import { u as U } from './team-BvmzkpNi.js';
import { u as H } from './use-toast-pMYLxjk1.js';
import './index-PjhXdBcw.js';
import './index-DJ-EwNXm.js';
import './data-transformer-DaTnp7WB.js';
import './index-BiLbLflF.js';
import './types-GU3YNY2F.js';
import './time-zones-DGI2eNDr.js';
import './envelope-reminder-YclQYJ2m.js';
import './organisations-bLnymRV_.js';
import './index-browser-CnbpKWEs.js';
import './document-email-DcBZA0tR.js';
import './useQuery-Cl3ReeOA.js';
import './utils-C68LRSOY.js';
import './url-CP0Hgou8.js';
import './css-vars-MUIo1hcP.js';
import './accordion-DtuzNAcG.js';
import './index-DzY7AtIB.js';
import './index-DAyHhKCk.js';
import './index-J1tJADds.js';
import './index-DXkD4Uno.js';
import './index-ZximTWpF.js';
import './index-C829O7aq.js';
import './index-UGPUXo4T.js';
import './index-_mbtlgCZ.js';
import './chevron-down-mVGROlJc.js';
import './createLucideIcon-UOjYlZt5.js';
import './color-picker-DFvMRl3R.js';
import './popover-CGHMP7Nz.js';
import './Combination-DaG98sNE.js';
import './index-DoLGTOH8.js';
import './index-KpgwOPga.js';
import './form-BX2-nwLu.js';
import './index-BlIM-koY.js';
import './proxy-dEM8-k5c.js';
import './input-DdDbBJYb.js';
import './select-Dvz92dRn.js';
import './animate-generic-fade-in-out-CGjjMFem.js';
import './index-MjUwLcg-.js';
import './index-CZmIGLNu.js';
import './check--7Y29bNj.js';
import './textarea-D4wUhXuy.js';
import './zod-C00iebzH.js';
import './nonce-Dwj7D0fA.js';
import './form-sticky-save-bar-thblyFdT.js';
import './triangle-alert-Y8Kk1Rgi.js';
function rt() {
  return V({ id: 'ev3nK5' });
}
const st = R(() => {
  const { organisations: j } = M(),
    n = D(),
    b = U(),
    { _: t } = X(),
    { toast: m } = H(),
    c = _(j),
    [g, L] = T.useState([]),
    { data: a, isLoading: v, refetch: y } = l.organisation.get.useQuery({ organisationReference: n.url }),
    { mutateAsync: N } = l.organisation.settings.update.useMutation(),
    { mutateAsync: S } = l.organisation.settings.updateBrandingLogo.useMutation(),
    A = async (r) => {
      try {
        const {
          brandingEnabled: s,
          brandingLogo: e,
          brandingUrl: C,
          brandingCompanyDetails: O,
          brandingColors: E,
          brandingCss: I,
        } = r;
        if (e instanceof File || e === null) {
          const p = new FormData();
          p.append('payload', JSON.stringify({ organisationId: n.id })),
            e instanceof File && p.append('brandingLogo', e),
            await S(p);
        }
        const P = await N({
          organisationId: n.id,
          data: {
            brandingEnabled: s ?? void 0,
            brandingUrl: C,
            brandingCompanyDetails: O,
            brandingColors: E,
            brandingCss: I,
          },
        });
        await y();
        const d = P?.cssWarnings ?? [];
        L(d),
          d.length > 0
            ? m({
                title: t({ id: 'yfhRAv' }),
                description: Q._({ id: 'o0HRfL', values: { 0: d.length } }),
                duration: 8e3,
              })
            : m({ title: t({ id: '4t+Ruo' }), description: t({ id: 'd/M34U' }) });
      } catch (s) {
        throw (m({ title: t({ id: 'nwtY4N' }), description: t({ id: 'sXQQyg' }), variant: 'destructive' }), s);
      }
    };
  if (v || !a) {
    return i.jsx('div', {
      className: 'flex items-center justify-center rounded-lg py-32',
      children: i.jsx(Y, { className: 'h-6 w-6 animate-spin text-muted-foreground' }),
    });
  }
  const B = t({ id: 'ev3nK5' }),
    w = t(c ? { id: 'rhi5za' } : b ? { id: 'XZiG+T' } : { id: 'eAAlXX' });
  return i.jsxs('div', {
    className: 'max-w-2xl',
    children: [
      i.jsx(K, { title: B, subtitle: w }),
      a.organisationClaim.flags.allowCustomBranding || !u()
        ? i.jsxs('section', {
            children: [
              i.jsx(J, {
                context: 'Organisation',
                hasAdvancedBranding: a.organisationClaim.flags.embedSigningWhiteLabel === !0 || !u(),
                settings: a.organisationGlobalSettings,
                onFormSubmit: A,
              }),
              g.length > 0 &&
                i.jsxs(f, {
                  variant: 'warning',
                  className: 'mt-6',
                  children: [
                    i.jsx(x, { children: i.jsx(o, { id: 'RFDjVV' }) }),
                    i.jsx(h, {
                      children: i.jsx('ul', {
                        className: 'list-disc pl-5',
                        children: g.map((r, s) =>
                          i.jsxs(
                            'li',
                            {
                              children: [
                                r.detail,
                                r.line !== void 0 &&
                                  i.jsxs('span', {
                                    className: 'text-muted-foreground',
                                    children: [' ', i.jsx(o, { id: 'PYQZ/s', values: { 0: r.line } })],
                                  }),
                              ],
                            },
                            s,
                          ),
                        ),
                      }),
                    }),
                  ],
                }),
            ],
          })
        : i.jsxs(f, {
            className: 'mt-8 flex flex-col justify-between p-6 sm:flex-row sm:items-center',
            variant: 'neutral',
            children: [
              i.jsxs('div', {
                className: 'mb-4 sm:mb-0',
                children: [
                  i.jsx(x, { children: i.jsx(o, { id: 'ev3nK5' }) }),
                  i.jsx(h, { className: 'mr-2', children: i.jsx(o, { id: 'psC2J0' }) }),
                ],
              }),
              G('MANAGE_BILLING', n.currentOrganisationRole) &&
                i.jsx(W, {
                  asChild: !0,
                  variant: 'outline',
                  children: i.jsx(F, {
                    to: c ? '/settings/billing' : `/o/${n.url}/settings/billing`,
                    children: i.jsx(o, { id: 'J4ERpS' }),
                  }),
                }),
            ],
          }),
    ],
  });
});
export { rt as meta, st as default };
