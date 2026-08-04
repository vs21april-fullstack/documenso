import { A as E, a as K } from './app-uAhqo_pP.js';
import { B as T } from './button-Dm_JGgap.js';
import { b, w as N, L as S } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { u as A, e as j, F as k, b as l, a as p, d as u, c as x } from './form-BX2-nwLu.js';
import { M } from './index-BiLbLflF.js';
import { u as F, T as r } from './index-CkOHfBoV.js';
import { a as v } from './index-PjhXdBcw.js';
import { j as s } from './jsx-runtime-DrYFQjIW.js';
import { a as D } from './meta-1txnm5en.js';
import { P as f } from './password-input-Bs5MrKTA.js';
import { Z as c } from './schema-CBwwekVm.js';
import { o as R } from './types-GU3YNY2F.js';
import { u as C } from './use-toast-pMYLxjk1.js';
import { c as y } from './utils-C68LRSOY.js';
import { t as I } from './zod-C00iebzH.js';
import './index-DJ-EwNXm.js';
import './loader-aSxoB_gm.js';
import './createLucideIcon-UOjYlZt5.js';
import './index-DAyHhKCk.js';
import './index-BlIM-koY.js';
import './proxy-dEM8-k5c.js';
import './input-DdDbBJYb.js';
import './eye-off-CYdHb6Re.js';
import './eye-BJpoQCg7.js';
import './url-CP0Hgou8.js';
import './index-CBoJQWs5.js';
const L = R({ password: c, repeatedPassword: c }).refine((e) => e.password === e.repeatedPassword, {
    path: ['repeatedPassword'],
    message: "Passwords don't match",
  }),
  Z = ({ className: e, token: i }) => {
    const m = b(),
      { _: a } = F(),
      { toast: d } = C(),
      t = A({ values: { password: '', repeatedPassword: '' }, resolver: I(L) }),
      n = t.formState.isSubmitting,
      w = async ({ password: o }) => {
        try {
          await v.emailPassword.resetPassword({ password: o, token: i }),
            await m('/signin'),
            t.reset(),
            d({ title: a({ id: 'ogtYkT' }), description: a({ id: 'Ecp9Z/' }), duration: 5e3 });
        } catch (h) {
          const g = E.parseError(h),
            P = M(g.code)
              .with(K.EXPIRED_CODE, () => ({ id: 'AqDhiU' }))
              .with('INVALID_TOKEN', () => ({ id: '2EvyKc' }))
              .with('SAME_PASSWORD', () => ({ id: 'sYnY4M' }))
              .otherwise(() => ({ id: 'zKkKFY' }));
          d({ title: a({ id: 'Vw8l6h' }), description: a(P), variant: 'destructive' });
        }
      };
    return s.jsx(k, {
      ...t,
      children: s.jsxs('form', {
        className: y('flex w-full flex-col gap-y-4', e),
        onSubmit: t.handleSubmit(w),
        children: [
          s.jsxs('fieldset', {
            className: 'flex w-full flex-col gap-y-4',
            disabled: n,
            children: [
              s.jsx(p, {
                control: t.control,
                name: 'password',
                render: ({ field: o }) =>
                  s.jsxs(l, {
                    children: [
                      s.jsx(x, { children: s.jsx(r, { id: '8ZsakT' }) }),
                      s.jsx(u, { children: s.jsx(f, { ...o }) }),
                      s.jsx(j, {}),
                    ],
                  }),
              }),
              s.jsx(p, {
                control: t.control,
                name: 'repeatedPassword',
                render: ({ field: o }) =>
                  s.jsxs(l, {
                    children: [
                      s.jsx(x, { children: s.jsx(r, { id: 'JjG/b1' }) }),
                      s.jsx(u, { children: s.jsx(f, { ...o }) }),
                      s.jsx(j, {}),
                    ],
                  }),
              }),
            ],
          }),
          s.jsx(T, {
            type: 'submit',
            size: 'lg',
            loading: n,
            children: n ? s.jsx(r, { id: 'NI0xtv' }) : s.jsx(r, { id: 'KbS2K9' }),
          }),
        ],
      }),
    });
  };
function ps() {
  return D({ id: 'KbS2K9' });
}
const ls = N(({ loaderData: i }) => {
  const { token: m } = i;
  return s.jsx('div', {
    className: 'w-screen max-w-lg px-4',
    children: s.jsxs('div', {
      className: 'w-full',
      children: [
        s.jsx('h1', { className: 'font-semibold text-4xl', children: s.jsx(r, { id: 'KbS2K9' }) }),
        s.jsx('p', { className: 'mt-2 text-muted-foreground text-sm', children: s.jsx(r, { id: 'GUOCNi' }) }),
        s.jsx(Z, { token: m, className: 'mt-4' }),
        s.jsx('p', {
          className: 'mt-6 text-center text-muted-foreground text-sm',
          children: s.jsx(r, {
            id: '352VU2',
            components: { 0: s.jsx(S, { to: '/signup', className: 'text-primary duration-200 hover:opacity-70' }) },
          }),
        }),
      ],
    }),
  });
});
export { ls as default, ps as meta };
