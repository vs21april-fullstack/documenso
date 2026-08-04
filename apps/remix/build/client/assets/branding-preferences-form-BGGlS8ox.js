import { j as e } from './jsx-runtime-DrYFQjIW.js';
import { u as M } from './organisation-Ylr4XBmr.js';
import './app-uAhqo_pP.js';
import { A as $, a as H, c as K, b as X } from './accordion-DtuzNAcG.js';
import { B as Q } from './button-Dm_JGgap.js';
import { r as f } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { C as g } from './color-picker-DFvMRl3R.js';
import { Z as O } from './css-vars-MUIo1hcP.js';
import { c as d, F as ee, b as i, f as l, a as o, u as q, d as t } from './form-BX2-nwLu.js';
import { F as te } from './form-sticky-save-bar-thblyFdT.js';
import { u as oe, T as s } from './index-CkOHfBoV.js';
import { I as v } from './input-DdDbBJYb.js';
import { L as ce } from './loader-aSxoB_gm.js';
import { u as de } from './nonce-Dwj7D0fA.js';
import { c as ae, d as C, b as ne, S as re, a as se } from './select-Dvz92dRn.js';
import { u as ie } from './team-BvmzkpNi.js';
import { T as w } from './textarea-D4wUhXuy.js';
import { i as je, l as me, b as ue, o as xe, s as y } from './types-GU3YNY2F.js';
import { r as F } from './url-CP0Hgou8.js';
import { c as W } from './utils-C68LRSOY.js';
import { t as le } from './zod-C00iebzH.js';
const A = 5,
  ge = A * 1024 * 1024,
  B = ['image/jpeg', 'image/png', 'image/webp'],
  h = {
    background: '#ffffff',
    foreground: '#0f172a',
    border: '#e2e8f0',
    primary: '#a2e771',
    primaryForeground: '#162c07',
    ring: '#a2e771',
  },
  he = '0.5rem',
  be = xe({
    brandingEnabled: ue().nullable(),
    brandingLogo: je(File)
      .refine((c) => c.size <= ge, `File size must be less than ${A}MB`)
      .refine((c) => B.includes(c.type), 'Only .jpg, .png, and .webp files are accepted')
      .nullish(),
    brandingUrl: y().url().optional().or(me('')),
    brandingCompanyDetails: y().max(500).optional(),
    brandingColors: O.default({}),
    brandingCss: y().max(1e4).default(''),
  });
function Pe({ canInherit: c = !1, hasAdvancedBranding: E, settings: x, onFormSubmit: T, context: N }) {
  const { _: k } = oe(),
    j = de(),
    R = ie(),
    D = M(),
    [m, b] = f.useState(''),
    [_, V] = f.useState(!1),
    S = O.safeParse(x.brandingColors),
    P = S.success ? S.data : {},
    L = {
      brandingEnabled: x.brandingEnabled ?? null,
      brandingUrl: x.brandingUrl ?? '',
      brandingLogo: void 0,
      brandingCompanyDetails: x.brandingCompanyDetails ?? '',
      brandingColors: P,
      brandingCss: x.brandingCss ?? '',
    },
    n = q({ values: L, resolver: le(be) }),
    u = n.watch('brandingEnabled'),
    U = () => {
      if (!x.brandingLogo) {
        return '';
      }
      const r = JSON.parse(x.brandingLogo);
      return !('type' in r) || !('data' in r)
        ? ''
        : `${N === 'Team' ? F(`/api/branding/logo/team/${R?.id}`) : F(`/api/branding/logo/organisation/${D?.id}`)}?v=${Date.now()}`;
    };
  f.useEffect(() => {
    const r = U();
    r && b(r), V(!0);
  }, [x.brandingLogo]);
  const z = () => {
      b(U()), n.reset(L);
    },
    G = Object.keys(n.formState.dirtyFields).length > 0,
    I = n.handleSubmit(async (r) => {
      try {
        await T(r);
      } catch {
        return;
      }
      n.reset(n.getValues());
    });
  return (
    f.useEffect(
      () => () => {
        m.startsWith('blob:') && URL.revokeObjectURL(m);
      },
      [m],
    ),
    e.jsx(ee, {
      ...n,
      children: e.jsx('form', {
        onSubmit: I,
        children: e.jsxs('fieldset', {
          className: 'flex h-full flex-col gap-y-4',
          disabled: n.formState.isSubmitting,
          children: [
            e.jsx(o, {
              control: n.control,
              name: 'brandingEnabled',
              render: ({ field: r }) =>
                e.jsxs(i, {
                  className: 'flex-1',
                  children: [
                    e.jsx(d, { children: e.jsx(s, { id: 'S32Lnx' }) }),
                    e.jsx(t, {
                      children: e.jsxs(re, {
                        ...r,
                        value: r.value === null ? '-1' : r.value.toString(),
                        onValueChange: (a) => r.onChange(a === 'true' ? !0 : a === 'false' ? !1 : null),
                        children: [
                          e.jsx(se, {
                            className: 'bg-background text-muted-foreground',
                            'data-testid': 'enable-branding',
                            children: e.jsx(ne, {}),
                          }),
                          e.jsxs(ae, {
                            className: 'z-[9999]',
                            children: [
                              e.jsx(C, { value: 'true', children: e.jsx(s, { id: 'l75CjT' }) }),
                              e.jsx(C, { value: 'false', children: e.jsx(s, { id: '1UzENP' }) }),
                              c && e.jsx(C, { value: '-1', children: e.jsx(s, { id: 'tuB67I' }) }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    e.jsx(l, { children: N === 'Team' ? e.jsx(s, { id: 'J7a4PX' }) : e.jsx(s, { id: 'DfaSxK' }) }),
                  ],
                }),
            }),
            e.jsxs('div', {
              className: 'relative flex w-full flex-col gap-y-4',
              children: [
                !u && e.jsx('div', { className: 'absolute inset-0 z-30 bg-background/60' }),
                e.jsx(o, {
                  control: n.control,
                  name: 'brandingLogo',
                  render: ({ field: { value: r, onChange: a, ...Y } }) =>
                    e.jsxs(i, {
                      className: 'flex-1',
                      children: [
                        e.jsx(d, { children: e.jsx(s, { id: '156zOB' }) }),
                        e.jsxs('div', {
                          className: 'flex flex-col gap-4',
                          children: [
                            e.jsx('div', {
                              className:
                                'relative h-48 w-full overflow-hidden rounded-lg border border-border bg-background',
                              children: m
                                ? e.jsx('img', {
                                    src: m,
                                    alt: 'Logo preview',
                                    className: 'h-full w-full object-contain p-4',
                                  })
                                : e.jsxs('div', {
                                    className:
                                      'relative flex h-full w-full items-center justify-center bg-muted/20 text-muted-foreground text-sm dark:bg-muted',
                                    children: [
                                      e.jsx(s, { id: 'NJE9Yt' }),
                                      !_ &&
                                        e.jsx('div', {
                                          className:
                                            'absolute inset-0 z-[999] flex items-center justify-center bg-muted dark:bg-muted',
                                          children: e.jsx(ce, {
                                            className: 'h-8 w-8 animate-spin text-muted-foreground',
                                          }),
                                        }),
                                    ],
                                  }),
                            }),
                            e.jsxs('div', {
                              className: 'relative',
                              children: [
                                e.jsx(t, {
                                  className: 'relative',
                                  children: e.jsx(v, {
                                    type: 'file',
                                    accept: B.join(','),
                                    disabled: !u,
                                    onChange: (Z) => {
                                      const p = Z.target.files?.[0];
                                      if (p) {
                                        m.startsWith('blob:') && URL.revokeObjectURL(m);
                                        const J = URL.createObjectURL(p);
                                        b(J), a(p);
                                      }
                                    },
                                    className: W(
                                      'h-auto p-2',
                                      'file:text-primary hover:file:bg-primary/90',
                                      'file:mr-4 file:cursor-pointer file:rounded-md file:border-0',
                                      'file:p-2 file:py-2 file:font-medium',
                                      'file:bg-primary file:text-primary-foreground',
                                      !u && 'cursor-not-allowed',
                                    ),
                                    ...Y,
                                  }),
                                }),
                                e.jsx('div', {
                                  className: 'absolute top-0 right-2 inline-flex h-full items-center justify-center',
                                  children: e.jsx(Q, {
                                    type: 'button',
                                    variant: 'link',
                                    size: 'sm',
                                    className: 'text-destructive text-xs',
                                    onClick: () => {
                                      b(''), a(null);
                                    },
                                    children: e.jsx(s, { id: 't/YqKh' }),
                                  }),
                                }),
                              ],
                            }),
                            e.jsxs(l, {
                              children: [
                                e.jsx(s, { id: 'JGebAV' }),
                                c && e.jsxs('span', { children: ['. ', e.jsx(s, { id: 'pBsccO' })] }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                }),
                e.jsx(o, {
                  control: n.control,
                  name: 'brandingUrl',
                  render: ({ field: r }) =>
                    e.jsxs(i, {
                      className: 'flex-1',
                      children: [
                        e.jsx(d, { children: e.jsx(s, { id: '1A1lHQ' }) }),
                        e.jsx(t, {
                          children: e.jsx(v, { type: 'url', placeholder: 'https://example.com', disabled: !u, ...r }),
                        }),
                        e.jsxs(l, {
                          children: [
                            e.jsx(s, { id: 'xLZFMa' }),
                            c && e.jsxs('span', { children: ['. ', e.jsx(s, { id: 'pBsccO' })] }),
                          ],
                        }),
                      ],
                    }),
                }),
                e.jsx(o, {
                  control: n.control,
                  name: 'brandingCompanyDetails',
                  render: ({ field: r }) =>
                    e.jsxs(i, {
                      className: 'flex-1',
                      children: [
                        e.jsx(d, { children: e.jsx(s, { id: 'CZVcen' }) }),
                        e.jsx(t, {
                          children: e.jsx(w, {
                            placeholder: k({ id: '1dUr0D' }),
                            className: 'min-h-[100px] resize-y',
                            disabled: !u,
                            ...r,
                          }),
                        }),
                        e.jsxs(l, {
                          children: [
                            e.jsx(s, { id: 'Vew0g+' }),
                            c && e.jsxs('span', { children: ['. ', e.jsx(s, { id: 'pBsccO' })] }),
                          ],
                        }),
                      ],
                    }),
                }),
              ],
            }),
            E &&
              e.jsxs('div', {
                className: 'relative flex w-full flex-col gap-y-6',
                children: [
                  !u && e.jsx('div', { className: 'absolute inset-0 z-30 bg-background/60' }),
                  e.jsxs('div', {
                    children: [
                      e.jsx(d, { children: e.jsx(s, { id: '2bDlHs' }) }),
                      e.jsx(l, { className: 'mt-1 mb-4', children: e.jsx(s, { id: '2VNeY6' }) }),
                      e.jsxs('div', {
                        className: 'grid grid-cols-2 gap-4',
                        children: [
                          e.jsx(o, {
                            control: n.control,
                            name: 'brandingColors.background',
                            render: ({ field: r }) =>
                              e.jsxs(i, {
                                children: [
                                  e.jsx(d, { children: e.jsx(s, { id: 'GtJbUa' }) }),
                                  e.jsx(l, { children: e.jsx(s, { id: 'CeQZAv' }) }),
                                  e.jsx(t, {
                                    children: e.jsx(g, {
                                      nonce: j,
                                      value: r.value ?? '',
                                      defaultValue: h.background,
                                      onChange: (a) => r.onChange(a),
                                    }),
                                  }),
                                ],
                              }),
                          }),
                          e.jsx(o, {
                            control: n.control,
                            name: 'brandingColors.foreground',
                            render: ({ field: r }) =>
                              e.jsxs(i, {
                                children: [
                                  e.jsx(d, { children: e.jsx(s, { id: 'GRlybe' }) }),
                                  e.jsx(l, { children: e.jsx(s, { id: 'ScvEY9' }) }),
                                  e.jsx(t, {
                                    children: e.jsx(g, {
                                      nonce: j,
                                      value: r.value ?? '',
                                      defaultValue: h.foreground,
                                      onChange: (a) => r.onChange(a),
                                    }),
                                  }),
                                ],
                              }),
                          }),
                          e.jsx(o, {
                            control: n.control,
                            name: 'brandingColors.primary',
                            render: ({ field: r }) =>
                              e.jsxs(i, {
                                children: [
                                  e.jsx(d, { children: e.jsx(s, { id: 'T/R+Qz' }) }),
                                  e.jsx(l, { children: e.jsx(s, { id: '+kLk5X' }) }),
                                  e.jsx(t, {
                                    children: e.jsx(g, {
                                      nonce: j,
                                      value: r.value ?? '',
                                      defaultValue: h.primary,
                                      onChange: (a) => r.onChange(a),
                                    }),
                                  }),
                                ],
                              }),
                          }),
                          e.jsx(o, {
                            control: n.control,
                            name: 'brandingColors.primaryForeground',
                            render: ({ field: r }) =>
                              e.jsxs(i, {
                                children: [
                                  e.jsx(d, { children: e.jsx(s, { id: 'HYSe9N' }) }),
                                  e.jsx(l, { children: e.jsx(s, { id: 'YFV7kS' }) }),
                                  e.jsx(t, {
                                    children: e.jsx(g, {
                                      nonce: j,
                                      value: r.value ?? '',
                                      defaultValue: h.primaryForeground,
                                      onChange: (a) => r.onChange(a),
                                    }),
                                  }),
                                ],
                              }),
                          }),
                          e.jsx(o, {
                            control: n.control,
                            name: 'brandingColors.border',
                            render: ({ field: r }) =>
                              e.jsxs(i, {
                                children: [
                                  e.jsx(d, { children: e.jsx(s, { id: 'dCIGNG' }) }),
                                  e.jsx(l, { children: e.jsx(s, { id: 'f7xJty' }) }),
                                  e.jsx(t, {
                                    children: e.jsx(g, {
                                      nonce: j,
                                      value: r.value ?? '',
                                      defaultValue: h.border,
                                      onChange: (a) => r.onChange(a),
                                    }),
                                  }),
                                ],
                              }),
                          }),
                          e.jsx(o, {
                            control: n.control,
                            name: 'brandingColors.ring',
                            render: ({ field: r }) =>
                              e.jsxs(i, {
                                children: [
                                  e.jsx(d, { children: e.jsx(s, { id: 'EKlSR5' }) }),
                                  e.jsx(l, { children: e.jsx(s, { id: 'A6p7Yg' }) }),
                                  e.jsx(t, {
                                    children: e.jsx(g, {
                                      nonce: j,
                                      value: r.value ?? '',
                                      defaultValue: h.ring,
                                      onChange: (a) => r.onChange(a),
                                    }),
                                  }),
                                ],
                              }),
                          }),
                        ],
                      }),
                      e.jsx('div', {
                        className: 'mt-4',
                        children: e.jsx(o, {
                          control: n.control,
                          name: 'brandingColors.radius',
                          render: ({ field: r }) =>
                            e.jsxs(i, {
                              children: [
                                e.jsx(d, { children: e.jsx(s, { id: 'bjp1xg' }) }),
                                e.jsx(t, {
                                  children: e.jsx(v, {
                                    type: 'text',
                                    placeholder: he,
                                    value: r.value ?? '',
                                    onChange: (a) => r.onChange(a.target.value),
                                  }),
                                }),
                                e.jsx(l, { children: e.jsx(s, { id: 'wqfaRj' }) }),
                              ],
                            }),
                        }),
                      }),
                    ],
                  }),
                  e.jsx($, {
                    type: 'single',
                    collapsible: !0,
                    children: e.jsxs(H, {
                      value: 'custom-css',
                      className: 'border-none',
                      children: [
                        e.jsx(X, {
                          className:
                            'rounded border px-3 py-2 text-left text-foreground hover:bg-muted/40 hover:no-underline',
                          children: e.jsx(s, { id: 'ui/AJL' }),
                        }),
                        e.jsx(K, {
                          className: '-mx-1 px-1 pt-4 text-muted-foreground text-sm leading-relaxed',
                          children: e.jsx(o, {
                            control: n.control,
                            name: 'brandingCss',
                            render: ({ field: r }) =>
                              e.jsxs(i, {
                                className: 'flex-1',
                                children: [
                                  e.jsx(t, {
                                    children: e.jsx(w, {
                                      placeholder: `/* Write CSS targeting your signing pages. Selectors are scoped automatically. */
.my-button {
  background: red;
}`,
                                      className: 'min-h-[200px] font-mono text-xs',
                                      ...r,
                                      value: r.value ?? '',
                                    }),
                                  }),
                                  e.jsx(l, { children: e.jsx(s, { id: 'NaT8PB' }) }),
                                ],
                              }),
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            e.jsx(te, { isDirty: G, isSubmitting: n.formState.isSubmitting, onReset: z }),
          ],
        }),
      }),
    })
  );
}
export { Pe as B };
