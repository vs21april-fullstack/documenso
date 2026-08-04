import { b as f, A as h, a as p } from './alert-CE06zyBg.js';
import { A as T } from './app-uAhqo_pP.js';
import { B as i } from './button-Dm_JGgap.js';
import { w as B, r as C, L as S } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { c as D, f as E, D as J, d as k, e as P, a as U, b as Y, g as z } from './dialog-DKtG3c-O.js';
import { d as ts } from './download-file-3Be3-k_S.js';
import { R as es, E as rs } from './enable-authenticator-app-dialog-Cg9wx4x6.js';
import { u as _, b as g, F as I, c as N, d as v, a as w, e as y } from './form-BX2-nwLu.js';
import { M as X } from './index-BiLbLflF.js';
import { T as e, u as O } from './index-CkOHfBoV.js';
import { r as ss } from './index-DAyHhKCk.js';
import { a as M } from './index-PjhXdBcw.js';
import { I as $ } from './input-DdDbBJYb.js';
import { j as s } from './jsx-runtime-DrYFQjIW.js';
import { a as ns } from './meta-1txnm5en.js';
import { P as A } from './password-input-Bs5MrKTA.js';
import { P as G, a as H, b as K } from './pin-input-C0sMYNZe.js';
import { a as is, Z } from './schema-CBwwekVm.js';
import { u as q } from './session-DJFUfUIe.js';
import { S as as } from './settings-header-C7I7HmzF.js';
import { s as R, o as V } from './types-GU3YNY2F.js';
import { u as Q } from './use-toast-pMYLxjk1.js';
import { c as os } from './utils-C68LRSOY.js';
import { t as L } from './zod-C00iebzH.js';
import './data-transformer-DaTnp7WB.js';
import './index-DJ-EwNXm.js';
import './loader-aSxoB_gm.js';
import './createLucideIcon-UOjYlZt5.js';
import './index-BoPcnRXW.js';
import './index-DzY7AtIB.js';
import './index-J1tJADds.js';
import './index-C829O7aq.js';
import './index-UGPUXo4T.js';
import './Combination-DaG98sNE.js';
import './index-ZximTWpF.js';
import './x-BhPRmTZ1.js';
import './index-BlIM-koY.js';
import './proxy-dEM8-k5c.js';
import './index-DTHQjZge.js';
import './use-copy-to-clipboard-C-lPWuoY.js';
import './copy-wv5mRIE-.js';
import './eye-off-CYdHb6Re.js';
import './eye-BJpoQCg7.js';
import './url-CP0Hgou8.js';
import './index-CBoJQWs5.js';
const ls = V({ totpCode: R().trim().optional(), backupCode: R().trim().optional() }),
  cs = () => {
    const { _: o } = O(),
      { toast: c } = Q(),
      { refreshSession: a } = q(),
      [r, n] = C.useState(!1),
      [x, t] = C.useState('totp'),
      l = _({ defaultValues: { totpCode: '', backupCode: '' }, resolver: L(ls) }),
      u = () => {
        l.reset(), n(!r);
      },
      d = () => {
        const m = x === 'totp' ? 'backup' : 'totp';
        m === 'totp' && l.setValue('backupCode', ''), m === 'backup' && l.setValue('totpCode', ''), t(m);
      },
      { isSubmitting: j } = l.formState,
      b = async ({ totpCode: m, backupCode: W }) => {
        try {
          await M.twoFactor.disable({ totpCode: m, backupCode: W }),
            c({ title: o({ id: 'NwChk2' }), description: o({ id: 'Rirbh5' }) }),
            ss.flushSync(() => {
              u();
            }),
            await a();
        } catch {
          c({ title: o({ id: 'wp9XuY' }), description: o({ id: 'bw0W5A' }), variant: 'destructive' });
        }
      };
    return s.jsxs(J, {
      open: r,
      onOpenChange: u,
      children: [
        s.jsx(U, {
          asChild: !0,
          children: s.jsx(i, {
            className: 'flex-shrink-0',
            variant: 'destructive',
            children: s.jsx(e, { id: 'qERl58' }),
          }),
        }),
        s.jsxs(Y, {
          position: 'center',
          children: [
            s.jsxs(D, {
              children: [
                s.jsx(k, { children: s.jsx(e, { id: 'qERl58' }) }),
                s.jsx(P, { children: s.jsx(e, { id: 'VJEW4M' }) }),
              ],
            }),
            s.jsx(I, {
              ...l,
              children: s.jsx('form', {
                onSubmit: l.handleSubmit(b),
                children: s.jsxs('fieldset', {
                  className: 'flex flex-col gap-y-4',
                  disabled: j,
                  children: [
                    x === 'totp' &&
                      s.jsx(w, {
                        name: 'totpCode',
                        control: l.control,
                        render: ({ field: m }) =>
                          s.jsxs(g, {
                            children: [
                              s.jsx(v, {
                                children: s.jsx(G, {
                                  ...m,
                                  value: m.value ?? '',
                                  maxLength: 6,
                                  children: Array(6)
                                    .fill(null)
                                    .map((W, F) => s.jsx(H, { children: s.jsx(K, { index: F }) }, F)),
                                }),
                              }),
                              s.jsx(y, {}),
                            ],
                          }),
                      }),
                    x === 'backup' &&
                      s.jsx(w, {
                        control: l.control,
                        name: 'backupCode',
                        render: ({ field: m }) =>
                          s.jsxs(g, {
                            children: [
                              s.jsx(N, { children: s.jsx(e, { id: 'ev7oAJ' }) }),
                              s.jsx(v, { children: s.jsx($, { type: 'text', ...m }) }),
                              s.jsx(y, {}),
                            ],
                          }),
                      }),
                    s.jsxs(E, {
                      children: [
                        s.jsx(i, {
                          type: 'button',
                          variant: 'secondary',
                          onClick: d,
                          children: x === 'totp' ? s.jsx(e, { id: 'VLViRK' }) : s.jsx(e, { id: '5UWfU/' }),
                        }),
                        s.jsx(i, {
                          type: 'submit',
                          variant: 'destructive',
                          loading: j,
                          children: s.jsx(e, { id: 'qERl58' }),
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
  ds = V({ token: R().min(1, { message: 'Token is required' }) }),
  ms = () => {
    const [o, c] = C.useState(!1),
      [a, r] = C.useState(null),
      [n, x] = C.useState(null),
      t = _({ defaultValues: { token: '' }, resolver: L(ds) }),
      l = async ({ token: d }) => {
        x(null);
        try {
          const j = await M.twoFactor.viewRecoveryCodes({ token: d });
          r(j.backupCodes);
        } catch (j) {
          const b = T.parseError(j);
          x(b.code);
        }
      },
      u = () => {
        if (a) {
          const d = new Blob(
            [
              a.join(`
`),
            ],
            { type: 'text/plain' },
          );
          ts({ filename: 'documenso-2FA-recovery-codes.txt', data: d });
        }
      };
    return s.jsxs(J, {
      open: o,
      onOpenChange: c,
      children: [
        s.jsx(U, {
          asChild: !0,
          children: s.jsx(i, { className: 'flex-shrink-0', children: s.jsx(e, { id: 't5bHu+' }) }),
        }),
        s.jsx(Y, {
          className: 'w-full max-w-xl md:max-w-xl lg:max-w-xl',
          children: a
            ? s.jsxs('div', {
                children: [
                  s.jsxs(D, {
                    className: 'mb-4',
                    children: [
                      s.jsx(k, { children: s.jsx(e, { id: 'z0hW8A' }) }),
                      s.jsx(P, { children: s.jsx(e, { id: '/N3QQp' }) }),
                    ],
                  }),
                  s.jsx(es, { recoveryCodes: a }),
                  s.jsxs(E, {
                    className: 'mt-4',
                    children: [
                      s.jsx(z, {
                        asChild: !0,
                        children: s.jsx(i, { variant: 'secondary', children: s.jsx(e, { id: 'yz7wBu' }) }),
                      }),
                      s.jsx(i, { onClick: u, children: s.jsx(e, { id: 'mzI/c+' }) }),
                    ],
                  }),
                ],
              })
            : s.jsx(I, {
                ...t,
                children: s.jsxs('form', {
                  onSubmit: t.handleSubmit(l),
                  children: [
                    s.jsxs(D, {
                      className: 'mb-4',
                      children: [
                        s.jsx(k, { children: s.jsx(e, { id: 'z0hW8A' }) }),
                        s.jsx(P, { children: s.jsx(e, { id: 'Lwg9X/' }) }),
                      ],
                    }),
                    s.jsxs('fieldset', {
                      className: 'flex flex-col space-y-4',
                      disabled: t.formState.isSubmitting,
                      children: [
                        s.jsx(w, {
                          name: 'token',
                          control: t.control,
                          render: ({ field: d }) =>
                            s.jsxs(g, {
                              children: [
                                s.jsx(v, {
                                  children: s.jsx(G, {
                                    ...d,
                                    value: d.value ?? '',
                                    maxLength: 6,
                                    children: Array(6)
                                      .fill(null)
                                      .map((j, b) => s.jsx(H, { children: s.jsx(K, { index: b }) }, b)),
                                  }),
                                }),
                                s.jsx(y, {}),
                              ],
                            }),
                        }),
                        n &&
                          s.jsx(h, {
                            variant: 'destructive',
                            children: s.jsx(p, {
                              children: X(T.parseError(n).message)
                                .with('INCORRECT_TWO_FACTOR_CODE', () => s.jsx(e, { id: 'v7dfDY' }))
                                .otherwise(() => s.jsx(e, { id: 'db0Ycb' })),
                            }),
                          }),
                        s.jsxs(E, {
                          children: [
                            s.jsx(z, {
                              asChild: !0,
                              children: s.jsx(i, {
                                type: 'button',
                                variant: 'secondary',
                                children: s.jsx(e, { id: 'dEgA5A' }),
                              }),
                            }),
                            s.jsx(i, {
                              type: 'submit',
                              loading: t.formState.isSubmitting,
                              children: s.jsx(e, { id: 'jpctdh' }),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
        }),
      ],
    });
  },
  xs = V({ currentPassword: is, password: Z, repeatedPassword: Z }).refine((o) => o.password === o.repeatedPassword, {
    message: 'Passwords do not match',
    path: ['repeatedPassword'],
  }),
  js = ({ className: o }) => {
    const { _: c } = O(),
      { toast: a } = Q(),
      r = _({ values: { currentPassword: '', password: '', repeatedPassword: '' }, resolver: L(xs) }),
      n = r.formState.isSubmitting,
      x = async ({ currentPassword: t, password: l }) => {
        try {
          await M.emailPassword.updatePassword({ currentPassword: t, password: l }),
            r.reset(),
            a({ title: c({ id: 'ogtYkT' }), description: c({ id: 'Ecp9Z/' }), duration: 5e3 });
        } catch (u) {
          const d = T.parseError(u),
            j = X(d.code)
              .with('NO_PASSWORD', () => ({ id: 'yb42zb' }))
              .with('INCORRECT_PASSWORD', () => ({ id: 'Cl55aD' }))
              .with('SAME_PASSWORD', () => ({ id: 'sYnY4M' }))
              .otherwise(() => ({ id: 'ZAGznT' }));
          a({ title: c({ id: 'Vw8l6h' }), description: c(j), variant: 'destructive' });
        }
      };
    return s.jsx(I, {
      ...r,
      children: s.jsxs('form', {
        className: os('flex w-full flex-col gap-y-4', o),
        onSubmit: r.handleSubmit(x),
        children: [
          s.jsxs('fieldset', {
            className: 'flex w-full flex-col gap-y-4',
            disabled: n,
            children: [
              s.jsx(w, {
                control: r.control,
                name: 'currentPassword',
                render: ({ field: t }) =>
                  s.jsxs(g, {
                    children: [
                      s.jsx(N, { children: s.jsx(e, { id: 'DCKkhU' }) }),
                      s.jsx(v, { children: s.jsx(A, { autoComplete: 'current-password', ...t }) }),
                      s.jsx(y, {}),
                    ],
                  }),
              }),
              s.jsx(w, {
                control: r.control,
                name: 'password',
                render: ({ field: t }) =>
                  s.jsxs(g, {
                    children: [
                      s.jsx(N, { children: s.jsx(e, { id: '7vhWI8' }) }),
                      s.jsx(v, { children: s.jsx(A, { autoComplete: 'new-password', ...t }) }),
                      s.jsx(y, {}),
                    ],
                  }),
              }),
              s.jsx(w, {
                control: r.control,
                name: 'repeatedPassword',
                render: ({ field: t }) =>
                  s.jsxs(g, {
                    children: [
                      s.jsx(N, { children: s.jsx(e, { id: 'JjG/b1' }) }),
                      s.jsx(v, { children: s.jsx(A, { autoComplete: 'new-password', ...t }) }),
                      s.jsx(y, {}),
                    ],
                  }),
              }),
            ],
          }),
          s.jsx('div', {
            className: 'mt-4 ml-auto',
            children: s.jsx(i, {
              type: 'submit',
              loading: n,
              children: n ? s.jsx(e, { id: '2uDkRs' }) : s.jsx(e, { id: 'Q3MPWA' }),
            }),
          }),
        ],
      }),
    });
  };
function oe() {
  return ns({ id: 'a3LDKx' });
}
const ae = B(({ loaderData: c }) => {
  const { hasEmailPasswordAccount: a } = c,
    { _: r } = O(),
    { user: n } = q();
  return s.jsxs('div', {
    children: [
      s.jsx(as, { title: r({ id: 'a3LDKx' }), subtitle: r({ id: 'gPNXUO' }) }),
      a &&
        s.jsxs(s.Fragment, { children: [s.jsx(js, { user: n }), s.jsx('hr', { className: 'mt-6 border-border/50' })] }),
      s.jsxs(h, {
        className: 'mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center',
        variant: 'neutral',
        children: [
          s.jsxs('div', {
            className: 'mb-4 sm:mb-0',
            children: [
              s.jsx(f, { children: s.jsx(e, { id: '0s6zAM' }) }),
              s.jsx(p, { className: 'mr-4', children: a ? s.jsx(e, { id: 'o7gocE' }) : s.jsx(e, { id: 'GQ/q/T' }) }),
            ],
          }),
          n.twoFactorEnabled ? s.jsx(cs, {}) : s.jsx(rs, {}),
        ],
      }),
      n.twoFactorEnabled &&
        s.jsxs(h, {
          className: 'mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center',
          variant: 'neutral',
          children: [
            s.jsxs('div', {
              className: 'mb-4 sm:mb-0',
              children: [
                s.jsx(f, { children: s.jsx(e, { id: 'x5rgeJ' }) }),
                s.jsx(p, { className: 'mr-4', children: s.jsx(e, { id: 'rkM+2p' }) }),
              ],
            }),
            s.jsx(ms, {}),
          ],
        }),
      s.jsxs(h, {
        className: 'mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center',
        variant: 'neutral',
        children: [
          s.jsxs('div', {
            className: 'mb-4 sm:mb-0',
            children: [
              s.jsx(f, { children: s.jsx(e, { id: 'UZKLEA' }) }),
              s.jsx(p, { className: 'mr-4', children: s.jsx(e, { id: '8URWfv' }) }),
            ],
          }),
          s.jsx(i, {
            asChild: !0,
            variant: 'outline',
            className: 'bg-background',
            children: s.jsx(S, { to: '/settings/security/passkeys', children: s.jsx(e, { id: 'HVAyb8' }) }),
          }),
        ],
      }),
      s.jsxs(h, {
        className: 'mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center',
        variant: 'neutral',
        children: [
          s.jsxs('div', {
            className: 'mr-4 mb-4 sm:mb-0',
            children: [
              s.jsx(f, { children: s.jsx(e, { id: 'M1HGuR' }) }),
              s.jsx(p, { className: 'mr-2', children: s.jsx(e, { id: 'F8qz8t' }) }),
            ],
          }),
          s.jsx(i, {
            asChild: !0,
            variant: 'outline',
            className: 'bg-background',
            children: s.jsx(S, { to: '/settings/security/activity', children: s.jsx(e, { id: 'c3aao/' }) }),
          }),
        ],
      }),
      s.jsxs(h, {
        className: 'mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center',
        variant: 'neutral',
        children: [
          s.jsxs('div', {
            className: 'mr-4 mb-4 sm:mb-0',
            children: [
              s.jsx(f, { children: s.jsx(e, { id: 'q+4bzE' }) }),
              s.jsx(p, { className: 'mr-2', children: s.jsx(e, { id: '/JhFQS' }) }),
            ],
          }),
          s.jsx(i, {
            asChild: !0,
            variant: 'outline',
            className: 'bg-background',
            children: s.jsx(S, { to: '/settings/security/sessions', children: s.jsx(e, { id: 'EXnJei' }) }),
          }),
        ],
      }),
      s.jsxs(h, {
        className: 'mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center',
        variant: 'neutral',
        children: [
          s.jsxs('div', {
            className: 'mr-4 mb-4 sm:mb-0',
            children: [
              s.jsx(f, { children: s.jsx(e, { id: 'JxuM3X' }) }),
              s.jsx(p, { className: 'mr-2', children: s.jsx(e, { id: 'uc/gmm' }) }),
            ],
          }),
          s.jsx(i, {
            asChild: !0,
            variant: 'outline',
            className: 'bg-background',
            children: s.jsx(S, { to: '/settings/security/linked-accounts', children: s.jsx(e, { id: '7eoeLV' }) }),
          }),
        ],
      }),
    ],
  });
});
export { ae as default, oe as meta };
