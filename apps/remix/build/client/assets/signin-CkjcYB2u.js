import { a as I, A as w } from './alert-CE06zyBg.js';
import { w as b, u as E, r as e, L as N } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { T as o, u as P } from './index-CkOHfBoV.js';
import { a as v } from './index-PjhXdBcw.js';
import { j as r } from './jsx-runtime-DrYFQjIW.js';
import { L } from './loader-circle-h5otgUzC.js';
import { a as O } from './meta-1txnm5en.js';
import { S as R } from './signin-Bfi4Ha1e.js';
import { S as C } from './signup-W1uVfPNM.js';
import './app-uAhqo_pP.js';
import './index-BiLbLflF.js';
import './types-GU3YNY2F.js';
import './index-DJ-EwNXm.js';
import './loader-aSxoB_gm.js';
import './createLucideIcon-UOjYlZt5.js';
import './utils-C68LRSOY.js';
import './zod-uOrAM2YC.js';
import './index-BbY_VZqi.js';
import './data-transformer-DaTnp7WB.js';
import './useQuery-Cl3ReeOA.js';
import './schema-CBwwekVm.js';
import './button-Dm_JGgap.js';
import './dialog-DKtG3c-O.js';
import './index-BoPcnRXW.js';
import './index-DzY7AtIB.js';
import './index-DAyHhKCk.js';
import './index-J1tJADds.js';
import './index-C829O7aq.js';
import './index-UGPUXo4T.js';
import './Combination-DaG98sNE.js';
import './index-ZximTWpF.js';
import './x-BhPRmTZ1.js';
import './form-BX2-nwLu.js';
import './index-BlIM-koY.js';
import './proxy-dEM8-k5c.js';
import './input-DdDbBJYb.js';
import './password-input-Bs5MrKTA.js';
import './eye-off-CYdHb6Re.js';
import './eye-BJpoQCg7.js';
import './pin-input-C0sMYNZe.js';
import './use-toast-pMYLxjk1.js';
import './zod-C00iebzH.js';
import './index-CbTZzQE2.js';
import './index-C3kCGJtQ.js';
import './toAuthenticatorAttachment-BAxCDoik.js';
import './startAuthentication-mwDUkj2u.js';
import './key-round-BrbTuIzk.js';
import './use-analytics-CnJvzaqs.js';
import './preload-helper-CW4hCJly.js';
import './feature-flags-CieBQceQ.js';
import './name-B9Bt3kH5.js';
import './signature-pad-dialog-CDyaU21P.js';
import './i18n-CTl8GuWM.js';
import './index-CBoJQWs5.js';
import './locales-CAv2cHk7.js';
import './document-CYL_BYk5.js';
import './teams-WAT4Ivvc.js';
import './teams-D27qC-4o.js';
import './index-browser-CnbpKWEs.js';
import './signatures-9TyUhfQR.js';
import './signature-gMGlyIgk.js';
import './select-Dvz92dRn.js';
import './animate-generic-fade-in-out-CGjjMFem.js';
import './index-DXkD4Uno.js';
import './index-_mbtlgCZ.js';
import './index-DoLGTOH8.js';
import './index-KpgwOPga.js';
import './index-MjUwLcg-.js';
import './index-CZmIGLNu.js';
import './chevron-down-mVGROlJc.js';
import './check--7Y29bNj.js';
import './cloud-upload-BW9TGWWx.js';
import './file-CtHi3arR.js';
import './url-CP0Hgou8.js';
function Yr() {
  return O({ id: 'n1ekoW' });
}
const Zr = b(({ loaderData: a }) => {
  const {
      isEmailPasswordSigninEnabled: n,
      isGoogleSSOEnabled: d,
      isMicrosoftSSOEnabled: c,
      isOIDCSSOEnabled: l,
      isSignupEnabled: x,
      oidcProviderLabel: m,
      returnTo: t,
      shouldAutoRedirectToOIDC: i,
    } = a,
    { _: u } = P(),
    [f] = E(),
    [h, g] = e.useState(!1),
    s = f.get('error'),
    p = s ? C[s] : void 0;
  return (
    e.useEffect(() => {
      const j = window.location.hash.slice(1),
        S = new URLSearchParams(j);
      g(S.get('embedded') === 'true');
    }, []),
    e.useEffect(() => {
      i && v.oidc.signIn({ redirectPath: t ?? '/' });
    }, [i, t]),
    i
      ? r.jsx('div', {
          className: 'w-screen max-w-lg px-4',
          children: r.jsxs('div', {
            className: 'flex flex-col items-center justify-center gap-y-4 py-12',
            children: [
              r.jsx(L, { className: 'h-8 w-8 animate-spin text-muted-foreground' }),
              r.jsx('p', {
                className: 'text-muted-foreground text-sm',
                children: r.jsx(o, { id: '7kInOT', values: { 0: m || 'OIDC' } }),
              }),
            ],
          }),
        })
      : r.jsx('div', {
          className: 'w-screen max-w-lg px-4',
          children: r.jsxs('div', {
            className: 'z-10 rounded-xl border border-border bg-neutral-100 p-6 dark:bg-background',
            children: [
              p && r.jsx(w, { variant: 'destructive', className: 'mb-4', children: r.jsx(I, { children: u(p) }) }),
              r.jsx('h1', { className: 'font-semibold text-2xl', children: r.jsx(o, { id: 'NxCJcc' }) }),
              r.jsx('p', { className: 'mt-2 text-muted-foreground text-sm', children: r.jsx(o, { id: 'nx8adn' }) }),
              r.jsx('hr', { className: '-mx-6 my-4' }),
              r.jsx(R, {
                isEmailPasswordSigninEnabled: n,
                isGoogleSSOEnabled: d,
                isMicrosoftSSOEnabled: c,
                isOIDCSSOEnabled: l,
                oidcProviderLabel: m,
                returnTo: t,
              }),
              !h &&
                x &&
                r.jsx('p', {
                  className: 'mt-6 text-center text-muted-foreground text-sm',
                  children: r.jsx(o, {
                    id: '352VU2',
                    components: {
                      0: r.jsx(N, {
                        to: t ? `/signup?returnTo=${encodeURIComponent(t)}` : '/signup',
                        className: 'text-documenso-700 duration-200 hover:opacity-70',
                      }),
                    },
                  }),
                }),
            ],
          }),
        })
  );
});
export { Yr as meta, Zr as default };
