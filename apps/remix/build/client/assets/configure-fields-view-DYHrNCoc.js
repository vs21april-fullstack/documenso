import { b as Pe } from './app-uAhqo_pP.js';
import { B as W } from './button-Dm_JGgap.js';
import { C as ut, a as xt } from './card-CN1paoKy.js';
import { C as Le } from './checkbox-PtMmw-z5.js';
import { C as jt } from './chevron-down-mVGROlJc.js';
import { C as Nt } from './chevrons-up-down-EpaIOjDM.js';
import { r as d } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { C as Ls } from './circle-question-mark-D1ll6wH4.js';
import { C as Es, R as Ts } from './combobox-BB3QNPhJ.js';
import { c as Bs } from './createLucideIcon-UOjYlZt5.js';
import { D as ds, a as ls } from './date-formats-DF6plI8e.js';
import { a as bs, H as Cs, u as Ds, c as fs, b as Ns, P as Ss, G as vs, D as ws, C as ys } from './dnd.esm-CfBNJDhH.js';
import { D as ps } from './document-CYL_BYk5.js';
import { D as js } from './document-email-checkboxes-CX8K1ZHz.js';
import { Z as Ue } from './document-email-DcBZA0tR.js';
import { b as Xs, a as Ys } from './document-meta-KqDa_V10.js';
import { a as ot } from './envelope-download-nW9wzRpS.js';
import { A as at, E as rt } from './field-checkbox-BxBWYnsv.js';
import { F as ct, T as dt, C as lt, a as mt } from './field-item-advanced-settings-BZLzFohb.js';
import { k as tt } from './field-meta-DZwk3H3T.js';
import { M as it, a as nt } from './field-renderer-DaAJJPbZ.js';
import { F as Vs } from './file-text-BGtrLWy6.js';
import {
  u as Be,
  a as D,
  j as De,
  b as E,
  F as Ge,
  c as I,
  e as M,
  d as T,
  f as us,
  k as xs,
  g as ze,
} from './form-BX2-nwLu.js';
import { b as Us } from './handle-dropzone-rejection-Ca7udH1f.js';
import { S as hs } from './i18n-BYa2gP9D.js';
import { p as be } from './i18n-CTl8GuWM.js';
import { n as J } from './id-DheyC1a4.js';
import { i as l } from './index-browser-CnbpKWEs.js';
import { i as Os } from './index-CBoJQWs5.js';
import { u as ae, T as t } from './index-CkOHfBoV.js';
import { u as zs } from './index-CTt2uJ_H.js';
import { I as Ms } from './info-qk5PqWur.js';
import { I as ee } from './input-DdDbBJYb.js';
import { j as e } from './jsx-runtime-DrYFQjIW.js';
import { L as Gs } from './loader-aSxoB_gm.js';
import { M as gt } from './mail-CUQAW6vZ.js';
import { M as Is } from './multi-select-combobox-I6xiAn1a.js';
import { P as $, b as et, h as Js, g as Ks, c as st, F as we } from './pdf-viewer-lazy-DLZtRd2Q.js';
import { P as _s } from './plus-C8JFN8md.js';
import { m as Ps } from './proxy-dEM8-k5c.js';
import { u as fe } from './react-hotkeys-hook.esm-CqA6Wvap.js';
import { Z as Ws } from './recipient-pdbHHl0S.js';
import { R as ke } from './recipient-selector-CJU_44z2.js';
import { d as de, S as ge, b as he, c as je, a as pe } from './select-Dvz92dRn.js';
import { c as bt, b as ft, S as We, a as Ze } from './sheet-Bw9YNslO.js';
import { S as ht } from './square-check-big-DvZyRfr_.js';
import { a as As, T as Fs, c as Me, b as Oe } from './tabs-Djj3NhT4.js';
import { g as $s } from './teams-WAT4Ivvc.js';
import { T as Rs } from './textarea-D4wUhXuy.js';
import { T as cs, D as ms } from './time-zones-DGI2eNDr.js';
import { a as He, T as Ve, b as Xe } from './tooltip-Dihvg_5U.js';
import { T as ks } from './trash-DYg0tZZQ.js';
import { a as Ce, o as ie, s as L, n as ne, g as Qs, i as qs, b as ve, e as ye } from './types-GU3YNY2F.js';
import { u as Ye } from './use-toast-pMYLxjk1.js';
import { U as pt } from './user-SZ6cyKhO.js';
import { c as P } from './utils-C68LRSOY.js';
import { X as Hs } from './x-BhPRmTZ1.js';
import { t as gs } from './zod-C00iebzH.js';
import { z as Zs } from './zod-uOrAM2YC.js';
const St = [['path', { d: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z', key: 'p7xjir' }]],
  vt = Bs('cloud', St),
  $e = d.createContext(null),
  Oi = ({ isTemplate: n, isPersisted: a, features: i, children: f }) =>
    e.jsx($e.Provider, {
      value: {
        isTemplate: n ?? !1,
        isPersisted: a ?? !1,
        features: {
          allowConfigureSignatureTypes: i.allowConfigureSignatureTypes ?? !0,
          allowConfigureLanguage: i.allowConfigureLanguage ?? !0,
          allowConfigureDateFormat: i.allowConfigureDateFormat ?? !0,
          allowConfigureTimezone: i.allowConfigureTimezone ?? !0,
          allowConfigureRedirectUrl: i.allowConfigureRedirectUrl ?? !0,
          allowConfigureCommunication: i.allowConfigureCommunication ?? !0,
        },
      },
      children: f,
    }),
  ce = () => {
    const n = d.useContext($e);
    if (!n) {
      throw new Error('useConfigureDocument must be used within a ConfigureDocumentProvider');
    }
    return n;
  },
  yt = ({ control: n, isSubmitting: a }) => {
    const { _: i } = ae(),
      f = De(),
      { features: c } = ce(),
      { watch: r, setValue: b } = f,
      k = r('meta.distributionMethod'),
      N = r('meta.emailSettings'),
      C = k === l.DocumentDistributionMethod.EMAIL;
    return e.jsxs('div', {
      children: [
        e.jsx('h3', { className: 'mb-1 font-medium text-foreground text-lg', children: e.jsx(t, { id: 'JiIKww' }) }),
        e.jsx('p', { className: 'mb-6 text-muted-foreground text-sm', children: e.jsx(t, { id: 'lAX/A/' }) }),
        e.jsxs(Fs, {
          defaultValue: 'general',
          children: [
            e.jsxs(As, {
              className: 'mb-6 inline-flex',
              children: [
                e.jsx(Oe, { value: 'general', className: 'px-4', children: e.jsx(t, { id: 'Weq9zb' }) }),
                c.allowConfigureCommunication &&
                  e.jsx(Oe, { value: 'communication', className: 'px-4', children: e.jsx(t, { id: 'hZotg6' }) }),
              ],
            }),
            e.jsx(Me, {
              value: 'general',
              className: 'mt-0',
              children: e.jsxs('div', {
                className: 'flex flex-col space-y-6',
                children: [
                  c.allowConfigureSignatureTypes &&
                    e.jsx(D, {
                      control: n,
                      name: 'meta.signatureTypes',
                      render: ({ field: o }) =>
                        e.jsxs(E, {
                          children: [
                            e.jsx(I, { children: e.jsx(t, { id: 'ISVHvc' }) }),
                            e.jsx(T, {
                              children: e.jsx(Is, {
                                options: Object.values(ps).map((p) => ({ label: i(p.label), value: p.value })),
                                selectedValues: o.value,
                                onChange: o.onChange,
                                className: 'w-full bg-background',
                                emptySelectionPlaceholder: Os._({ id: 'ZsFwYA' }),
                              }),
                            }),
                            e.jsx(M, {}),
                          ],
                        }),
                    }),
                  c.allowConfigureLanguage &&
                    e.jsx(D, {
                      control: n,
                      name: 'meta.language',
                      render: ({ field: o }) =>
                        e.jsxs(E, {
                          children: [
                            e.jsx(I, { children: e.jsx(t, { id: 'vXIe7J' }) }),
                            e.jsx(T, {
                              children: e.jsxs(ge, {
                                ...o,
                                onValueChange: o.onChange,
                                disabled: a,
                                children: [
                                  e.jsx(pe, { className: 'bg-background', children: e.jsx(he, {}) }),
                                  e.jsx(je, {
                                    children: Object.entries(hs).map(([p, X]) =>
                                      e.jsx(de, { value: p, children: i(X.full) }, p),
                                    ),
                                  }),
                                ],
                              }),
                            }),
                            e.jsx(M, {}),
                          ],
                        }),
                    }),
                  c.allowConfigureDateFormat &&
                    e.jsx(D, {
                      control: n,
                      name: 'meta.dateFormat',
                      render: ({ field: o }) =>
                        e.jsxs(E, {
                          children: [
                            e.jsx(I, { children: e.jsx(t, { id: '4BHv90' }) }),
                            e.jsx(T, {
                              children: e.jsxs(ge, {
                                ...o,
                                onValueChange: o.onChange,
                                disabled: a,
                                children: [
                                  e.jsx(pe, { className: 'bg-background', children: e.jsx(he, {}) }),
                                  e.jsx(je, {
                                    children: ls.map((p) => e.jsx(de, { value: p.value, children: p.label }, p.key)),
                                  }),
                                ],
                              }),
                            }),
                            e.jsx(M, {}),
                          ],
                        }),
                    }),
                  c.allowConfigureTimezone &&
                    e.jsx(D, {
                      control: n,
                      name: 'meta.timezone',
                      render: ({ field: o }) =>
                        e.jsxs(E, {
                          children: [
                            e.jsx(I, { children: e.jsx(t, { id: 'RxsRD6' }) }),
                            e.jsx(T, {
                              children: e.jsx(Es, {
                                className: 'bg-background',
                                options: cs,
                                ...o,
                                onChange: (p) => p && o.onChange(p),
                                disabled: a,
                              }),
                            }),
                            e.jsx(M, {}),
                          ],
                        }),
                    }),
                  c.allowConfigureRedirectUrl &&
                    e.jsx(D, {
                      control: n,
                      name: 'meta.redirectUrl',
                      render: ({ field: o }) =>
                        e.jsxs(E, {
                          children: [
                            e.jsxs(I, {
                              className: 'flex flex-row items-center',
                              children: [
                                e.jsx(t, { id: 'VTB2Rz' }),
                                e.jsxs(Ve, {
                                  children: [
                                    e.jsx(He, { children: e.jsx(Ms, { className: 'mx-2 h-4 w-4' }) }),
                                    e.jsx(Xe, {
                                      className: 'max-w-xs text-muted-foreground',
                                      children: e.jsx(t, { id: '7Pz5x5' }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            e.jsx(T, { children: e.jsx(ee, { className: 'bg-background', ...o, disabled: a }) }),
                            e.jsx(M, {}),
                          ],
                        }),
                    }),
                ],
              }),
            }),
            c.allowConfigureCommunication &&
              e.jsx(Me, {
                value: 'communication',
                className: 'mt-0',
                children: e.jsxs('div', {
                  className: 'flex flex-col space-y-6',
                  children: [
                    e.jsx(D, {
                      control: n,
                      name: 'meta.distributionMethod',
                      render: ({ field: o }) =>
                        e.jsxs(E, {
                          children: [
                            e.jsx(I, { children: e.jsx(t, { id: 'mGhS4x' }) }),
                            e.jsx(T, {
                              children: e.jsxs(ge, {
                                ...o,
                                onValueChange: o.onChange,
                                disabled: a,
                                children: [
                                  e.jsx(pe, { className: 'bg-background', children: e.jsx(he, {}) }),
                                  e.jsxs(je, {
                                    children: [
                                      e.jsx(de, {
                                        value: l.DocumentDistributionMethod.EMAIL,
                                        children: e.jsx(t, { id: 'O3oNi5' }),
                                      }),
                                      e.jsx(de, {
                                        value: l.DocumentDistributionMethod.NONE,
                                        children: e.jsx(t, { id: 'EdQY6l' }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                            e.jsx(us, { children: e.jsx(t, { id: 'tjjnKN' }) }),
                            e.jsx(M, {}),
                          ],
                        }),
                    }),
                    e.jsxs('fieldset', {
                      className: 'flex flex-col space-y-6 disabled:cursor-not-allowed disabled:opacity-60',
                      disabled: !C,
                      children: [
                        e.jsx(D, {
                          control: n,
                          name: 'meta.subject',
                          render: ({ field: o }) =>
                            e.jsxs(E, {
                              children: [
                                e.jsx(I, {
                                  htmlFor: 'subject',
                                  children: e.jsx(t, {
                                    id: 'ki77Td',
                                    components: { 0: e.jsx('span', { className: 'text-muted-foreground' }) },
                                  }),
                                }),
                                e.jsx(T, {
                                  children: e.jsx(ee, {
                                    id: 'subject',
                                    className: 'mt-2 bg-background',
                                    disabled: a || !C,
                                    ...o,
                                  }),
                                }),
                                e.jsx(M, {}),
                              ],
                            }),
                        }),
                        e.jsx(D, {
                          control: n,
                          name: 'meta.message',
                          render: ({ field: o }) =>
                            e.jsxs(E, {
                              children: [
                                e.jsx(I, {
                                  htmlFor: 'message',
                                  children: e.jsx(t, {
                                    id: 'ziXm9u',
                                    components: { 0: e.jsx('span', { className: 'text-muted-foreground' }) },
                                  }),
                                }),
                                e.jsx(T, {
                                  children: e.jsx(Rs, {
                                    id: 'message',
                                    className: 'mt-2 h-32 resize-none bg-background',
                                    disabled: a || !C,
                                    ...o,
                                  }),
                                }),
                                e.jsx(M, {}),
                              ],
                            }),
                        }),
                        e.jsx(fs, {}),
                        e.jsx(js, {
                          className: `mt-2 ${C ? '' : 'pointer-events-none'}`,
                          value: N,
                          onChange: (o) => b('meta.emailSettings', o),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          ],
        }),
      ],
    });
  },
  Ct = ({ control: n, isSubmitting: a }) => {
    const { _: i } = ae(),
      { isTemplate: f } = ce(),
      c = d.useRef(null),
      { fields: r, append: b, remove: k, replace: N, move: C } = ze({ control: n, name: 'signers' }),
      { getValues: o, watch: p, setValue: X } = De(),
      Y = p('meta.signingOrder'),
      { errors: h } = xs({ control: n }),
      F = d.useCallback(() => {
        const m = r.length > 0 ? (r[r.length - 1]?.signingOrder || 0) + 1 : 1;
        b({
          formId: J(8),
          name: '',
          email: '',
          role: l.RecipientRole.SIGNER,
          signingOrder: Y === l.DocumentSigningOrder.SEQUENTIAL ? m : void 0,
        });
      }, [b, r]),
      j = Y === l.DocumentSigningOrder.SEQUENTIAL,
      u = d.useCallback(
        (m, y) => {
          const x = y.trim();
          if (!x) {
            return;
          }
          const _ = Number(x);
          if (!Number.isInteger(_) || _ < 1) {
            return;
          }
          const A = o('signers') || [...r],
            R = A[m],
            V = A.filter((Q, se) => se !== m),
            O = Math.min(Math.max(0, _ - 1), A.length - 1);
          V.splice(O, 0, R);
          const re = V.map((Q, se) => ({
            ...Q,
            signingOrder: Y === l.DocumentSigningOrder.SEQUENTIAL ? se + 1 : void 0,
          }));
          N(re);
        },
        [r, N, o],
      ),
      q = d.useCallback(
        (m) => {
          if (!m.destination) {
            return;
          }
          C(m.source.index, m.destination.index);
          const x = o('signers').map((_, A) => ({
            ..._,
            signingOrder: Y === l.DocumentSigningOrder.SEQUENTIAL ? A + 1 : void 0,
          }));
          N(x);
        },
        [C, N, o],
      ),
      v = (m) => {
        X('meta.signingOrder', m),
          m === l.DocumentSigningOrder.SEQUENTIAL &&
            r.forEach((y, x) => {
              X(`signers.${x}.signingOrder`, x + 1);
            });
      };
    return e.jsxs('div', {
      children: [
        e.jsx('h3', { className: 'mb-1 font-medium text-foreground text-lg', children: e.jsx(t, { id: 'yPrbsy' }) }),
        e.jsx('p', { className: 'mb-6 text-muted-foreground text-sm', children: e.jsx(t, { id: 'eprjYr' }) }),
        e.jsx(D, {
          control: n,
          name: 'meta.signingOrder',
          render: ({ field: m }) =>
            e.jsxs(E, {
              className: 'mb-6 flex flex-row items-center space-x-2 space-y-0',
              children: [
                e.jsx(T, {
                  children: e.jsx(Le, {
                    ...m,
                    id: 'signingOrder',
                    checked: m.value === l.DocumentSigningOrder.SEQUENTIAL,
                    onCheckedChange: (y) => v(y ? l.DocumentSigningOrder.SEQUENTIAL : l.DocumentSigningOrder.PARALLEL),
                    disabled: a,
                  }),
                }),
                e.jsx(I, {
                  htmlFor: 'signingOrder',
                  className: 'text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  children: e.jsx(t, { id: 'S+mLLv' }),
                }),
              ],
            }),
        }),
        e.jsx(D, {
          control: n,
          name: 'meta.allowDictateNextSigner',
          render: ({ field: { value: m, ...y } }) =>
            e.jsxs(E, {
              className: 'mb-6 flex flex-row items-center space-x-2 space-y-0',
              children: [
                e.jsx(T, {
                  children: e.jsx(Le, {
                    ...y,
                    id: 'allowDictateNextSigner',
                    checked: m,
                    onCheckedChange: y.onChange,
                    disabled: a || !j,
                  }),
                }),
                e.jsxs('div', {
                  className: 'flex items-center',
                  children: [
                    e.jsx(I, {
                      htmlFor: 'allowDictateNextSigner',
                      className: 'text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                      children: e.jsx(t, { id: 'DFEsC5' }),
                    }),
                    e.jsxs(Ve, {
                      children: [
                        e.jsx(He, {
                          asChild: !0,
                          children: e.jsx('span', {
                            className: 'ml-1 cursor-help text-muted-foreground',
                            children: e.jsx(Ls, { className: 'h-3.5 w-3.5' }),
                          }),
                        }),
                        e.jsx(Xe, {
                          className: 'max-w-80 p-4',
                          children: e.jsx('p', { children: e.jsx(t, { id: 'IE45gX' }) }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
        }),
        e.jsx(bs, {
          onDragEnd: q,
          sensors: [
            (m) => {
              c.current = m;
            },
          ],
          children: e.jsx(Ns, {
            droppableId: 'signers',
            children: (m) =>
              e.jsxs('div', {
                ...m.droppableProps,
                ref: m.innerRef,
                className: 'space-y-2',
                children: [
                  r.map((y, x) =>
                    e.jsx(
                      Ss,
                      {
                        draggableId: y.id,
                        index: x,
                        isDragDisabled: !j || a || y.disabled,
                        children: (_, A) =>
                          e.jsx('fieldset', {
                            ref: _.innerRef,
                            ..._.draggableProps,
                            ..._.dragHandleProps,
                            disabled: y.disabled,
                            className: P('py-1', {
                              'pointer-events-none rounded-md bg-widget-foreground pt-2': A.isDragging,
                            }),
                            children: e.jsxs(Ps.div, {
                              className: P('flex items-end gap-2 pb-2', { 'border-destructive/50': h?.signers?.[x] }),
                              children: [
                                j &&
                                  e.jsx(D, {
                                    control: n,
                                    name: `signers.${x}.signingOrder`,
                                    render: ({ field: R }) =>
                                      e.jsxs(E, {
                                        className: P('flex w-16 flex-none items-center gap-x-1', {
                                          'mb-6': h?.signers?.[x] && !h?.signers?.[x]?.signingOrder,
                                        }),
                                        children: [
                                          e.jsx(vs, { className: 'h-5 w-5 flex-shrink-0 opacity-40' }),
                                          e.jsx(T, {
                                            children: e.jsx(ee, {
                                              type: 'number',
                                              max: r.length,
                                              min: 1,
                                              className:
                                                'w-full text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                                              ...R,
                                              disabled: a || A.isDragging,
                                              onChange: (V) => {
                                                R.onChange(V);
                                              },
                                              onBlur: (V) => {
                                                R.onBlur(), u(x, V.target.value);
                                              },
                                            }),
                                          }),
                                          e.jsx(M, {}),
                                        ],
                                      }),
                                  }),
                                e.jsx(D, {
                                  control: n,
                                  name: `signers.${x}.name`,
                                  render: ({ field: R }) =>
                                    e.jsxs(E, {
                                      className: P('flex-1', { 'mb-6': h?.signers?.[x] && !h?.signers?.[x]?.name }),
                                      children: [
                                        e.jsx(I, { className: 'sr-only', children: e.jsx(t, { id: '6YtxFj' }) }),
                                        e.jsx(T, {
                                          children: e.jsx(ee, {
                                            placeholder: i({ id: '6YtxFj' }),
                                            className: 'w-full',
                                            ...R,
                                            disabled: a || A.isDragging,
                                          }),
                                        }),
                                        e.jsx(M, {}),
                                      ],
                                    }),
                                }),
                                e.jsx(D, {
                                  control: n,
                                  name: `signers.${x}.email`,
                                  render: ({ field: R }) =>
                                    e.jsxs(E, {
                                      className: P('flex-1', { 'mb-6': h?.signers?.[x] && !h?.signers?.[x]?.email }),
                                      children: [
                                        e.jsx(I, { className: 'sr-only', children: e.jsx(t, { id: 'O3oNi5' }) }),
                                        e.jsx(T, {
                                          children: e.jsx(ee, {
                                            type: 'email',
                                            placeholder: i({ id: 'O3oNi5' }),
                                            className: 'w-full',
                                            ...R,
                                            disabled: a || A.isDragging,
                                          }),
                                        }),
                                        e.jsx(M, {}),
                                      ],
                                    }),
                                }),
                                e.jsx(D, {
                                  control: n,
                                  name: `signers.${x}.role`,
                                  render: ({ field: R }) =>
                                    e.jsxs(E, {
                                      className: P('flex-none', { 'mb-6': h?.signers?.[x] && !h?.signers?.[x]?.role }),
                                      children: [
                                        e.jsx(I, { className: 'sr-only', children: e.jsx(t, { id: 'GDvlUT' }) }),
                                        e.jsx(T, {
                                          children: e.jsx(Ts, {
                                            ...R,
                                            isAssistantEnabled: j,
                                            onValueChange: R.onChange,
                                            disabled: a || A.isDragging || y.disabled,
                                          }),
                                        }),
                                        e.jsx(M, {}),
                                      ],
                                    }),
                                }),
                                e.jsx(W, {
                                  type: 'button',
                                  variant: 'ghost',
                                  disabled: a || r.length === 1 || A.isDragging || y.disabled,
                                  onClick: () => k(x),
                                  children: e.jsx(ks, { className: 'h-4 w-4' }),
                                }),
                              ],
                            }),
                          }),
                      },
                      y.id,
                    ),
                  ),
                  m.placeholder,
                ],
              }),
          }),
        }),
        e.jsx('div', {
          className: 'mt-4 flex justify-end',
          children: e.jsxs(W, {
            type: 'button',
            variant: 'outline',
            className: 'w-auto',
            disabled: a,
            onClick: F,
            children: [e.jsx(_s, { className: 'mr-2 -ml-1 h-5 w-5' }), e.jsx(t, { id: 'vcxlzZ' })],
          }),
        }),
      ],
    });
  },
  wt = ({ isSubmitting: n = !1 }) => {
    const { _: a } = ae(),
      { toast: i } = Ye(),
      { isPersisted: f } = ce(),
      c = De(),
      [r, b] = d.useState(!1),
      k = c.watch('documentData'),
      N = async (F) => {
        try {
          const j = F[0];
          if (!j) {
            return;
          }
          b(!0);
          const u = await j.arrayBuffer(),
            q = new Uint8Array(u);
          if (
            (c.setValue('documentData', { name: j.name, type: j.type, size: j.size, data: q }), !c.getValues('title'))
          ) {
            const m = j.name.replace(/\.[^/.]+$/, '');
            c.setValue('title', m);
          }
        } catch (j) {
          console.error('Error uploading file', j),
            i({ title: a({ id: 'mTV4LO' }), description: a({ id: 'zAosiU' }), variant: 'destructive', duration: 5e3 });
        } finally {
          b(!1);
        }
      },
      C = (F) => {
        i({ title: a({ id: 'pj2JS8' }), description: a(Us(F)), duration: 5e3, variant: 'destructive' });
      },
      o = () => {
        if (f) {
          i({ title: a({ id: '1iuAhz' }), description: a({ id: '/nnoBX' }), duration: 5e3, variant: 'destructive' });
          return;
        }
        c.unregister('documentData');
      },
      p = (F) => {
        if (F === 0) {
          return '0 Bytes';
        }
        const j = ['Bytes', 'KB', 'MB', 'GB'],
          u = Math.floor(Math.log(F) / Math.log(1024));
        return `${parseFloat((F / 1024 ** u).toFixed(2))} ${j[u]}`;
      },
      {
        getRootProps: X,
        getInputProps: Y,
        isDragActive: h,
      } = zs({
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: Pe * 1024 * 1024,
        multiple: !1,
        disabled: n || r || f,
        onDrop: (F) => {
          N(F);
        },
        onDropRejected: C,
      });
    return e.jsx('div', {
      children: e.jsx(D, {
        control: c.control,
        name: 'documentData',
        render: () =>
          e.jsxs(E, {
            children: [
              e.jsx(I, { required: !0, children: e.jsx(t, { id: 'yYDKjE' }) }),
              e.jsx('div', {
                className: 'relative',
                children: k
                  ? e.jsx('div', {
                      className: 'mt-2 rounded-lg border p-4',
                      children: e.jsxs('div', {
                        className: 'flex items-center gap-x-4',
                        children: [
                          e.jsx('div', {
                            className:
                              'flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary',
                            children: e.jsx(Vs, { className: 'h-6 w-6' }),
                          }),
                          e.jsxs('div', {
                            className: 'flex-1',
                            children: [
                              e.jsx('div', { className: 'font-medium text-sm', children: k.name }),
                              e.jsx('div', { className: 'text-muted-foreground text-xs', children: p(k.size) }),
                            ],
                          }),
                          !f &&
                            e.jsx(W, {
                              type: 'button',
                              variant: 'outline',
                              size: 'sm',
                              onClick: o,
                              disabled: n,
                              className: 'h-8 w-8 p-0',
                              children: e.jsx(Hs, { className: 'h-4 w-4' }),
                            }),
                        ],
                      }),
                    })
                  : e.jsxs('div', {
                      className: 'relative',
                      children: [
                        e.jsx(T, {
                          children: e.jsxs('div', {
                            ...X(),
                            className: P(
                              'relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border border-border border-dashed bg-background transition',
                              {
                                'border-primary/50 bg-primary/5': h,
                                'hover:bg-muted/30': !h && !n && !r && !f,
                                'cursor-not-allowed opacity-60': n || r || f,
                              },
                            ),
                            children: [
                              e.jsx('input', { ...Y() }),
                              e.jsxs('div', {
                                className: 'flex flex-col items-center justify-center gap-y-2 px-4 py-4 text-center',
                                children: [
                                  e.jsx(vt, {
                                    className: P('h-10 w-10', { 'text-primary': h, 'text-muted-foreground': !h }),
                                  }),
                                  e.jsxs('div', {
                                    className: P('flex flex-col space-y-1', {
                                      'text-primary': h,
                                      'text-muted-foreground': !h,
                                    }),
                                    children: [
                                      e.jsx('p', {
                                        className: 'font-medium text-sm',
                                        children: h
                                          ? e.jsx(t, { id: 'XrBXnv' })
                                          : f
                                            ? e.jsx(t, { id: '9Pbygf' })
                                            : e.jsx(t, { id: 'MNfvL1' }),
                                      }),
                                      e.jsx('p', {
                                        className: 'text-xs',
                                        children: f
                                          ? e.jsx(t, { id: 'wmhLUn' })
                                          : e.jsx(t, { id: 'CfVnwo', values: { APP_DOCUMENT_UPLOAD_SIZE_LIMIT: Pe } }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                        r &&
                          e.jsx('div', {
                            className: 'absolute inset-0 flex items-center justify-center rounded-lg bg-background/50',
                            children: e.jsx(Gs, { className: 'h-10 w-10 animate-spin text-muted-foreground' }),
                          }),
                      ],
                    }),
              }),
              e.jsx(M, {}),
            ],
          }),
      }),
    });
  },
  qe = ie({
    title: L().min(1, { message: 'Title is required' }),
    signers: Ce(
      ie({
        nativeId: ne().optional(),
        formId: L(),
        name: L(),
        email: Zs('Invalid email address'),
        role: ye(['SIGNER', 'CC', 'APPROVER', 'VIEWER', 'ASSISTANT']),
        signingOrder: ne().optional(),
        disabled: ve().optional(),
      }),
    ).min(1, { message: 'At least one signer is required' }),
    meta: ie({
      subject: L().optional(),
      message: L().optional(),
      distributionMethod: Qs($s),
      emailSettings: Ue,
      dateFormat: Ys.optional(),
      timezone: L().min(1, 'Timezone is required'),
      redirectUrl: L().optional(),
      language: Xs.optional(),
      signatureTypes: Ce(L()).default([]),
      signingOrder: ye(['SEQUENTIAL', 'PARALLEL']),
      allowDictateNextSigner: ve().default(!1).optional(),
      externalId: L().optional(),
    }),
    documentData: ie({ name: L(), type: L(), size: ne(), data: qs(Uint8Array) }).optional(),
  }),
  Dt = qe.extend({
    signers: Ce(
      ie({
        nativeId: ne().optional(),
        formId: L(),
        name: L(),
        email: Ws,
        role: ye(['SIGNER', 'CC', 'APPROVER', 'VIEWER', 'ASSISTANT']),
        signingOrder: ne().optional(),
        disabled: ve().optional(),
      }),
    ),
  }),
  Mi = ({ type: n = 'document', onSubmit: a, defaultValues: i, disableUpload: f }) => {
    const { isTemplate: c } = ce(),
      r = Be({
        resolver: gs(n === 'template' ? Dt : qe),
        defaultValues: {
          title: i?.title || '',
          signers: i?.signers || [
            { formId: J(8), name: '', email: '', role: l.RecipientRole.SIGNER, signingOrder: 1, disabled: !1 },
          ],
          meta: {
            subject: i?.meta?.subject || '',
            message: i?.meta?.message || '',
            distributionMethod: i?.meta?.distributionMethod || l.DocumentDistributionMethod.EMAIL,
            emailSettings: i?.meta?.emailSettings || Ue.parse({}),
            dateFormat: i?.meta?.dateFormat || ds,
            timezone: i?.meta?.timezone || ms,
            redirectUrl: i?.meta?.redirectUrl || '',
            language: i?.meta?.language || 'en',
            signatureTypes: i?.meta?.signatureTypes || [],
            signingOrder: i?.meta?.signingOrder || l.DocumentSigningOrder.PARALLEL,
            allowDictateNextSigner: i?.meta?.allowDictateNextSigner || !1,
            externalId: i?.meta?.externalId || '',
          },
          documentData: i?.documentData,
        },
      }),
      { control: b, handleSubmit: k } = r,
      N = r.formState.isSubmitting,
      C = k(a);
    return e.jsxs('div', {
      className: 'flex w-full flex-col space-y-8',
      children: [
        e.jsxs('div', {
          children: [
            e.jsx('h2', {
              className: 'mb-1 font-semibold text-foreground text-xl',
              children: c ? e.jsx(t, { id: 'drYVUG' }) : e.jsx(t, { id: 'NzCaJn' }),
            }),
            e.jsx('p', {
              className: 'text-muted-foreground text-sm',
              children: c ? e.jsx(t, { id: 'c8LG2E' }) : e.jsx(t, { id: 'FBQaix' }),
            }),
          ],
        }),
        e.jsx(Ge, {
          ...r,
          children: e.jsxs('div', {
            className: 'flex flex-col space-y-8',
            children: [
              e.jsx('div', {
                children: e.jsx(D, {
                  control: b,
                  name: 'title',
                  render: ({ field: o }) =>
                    e.jsxs(E, {
                      children: [
                        e.jsx(I, { required: !0, children: e.jsx(t, { id: 'MHrjPM' }) }),
                        e.jsx(T, { children: e.jsx(ee, { ...o, disabled: N }) }),
                        e.jsx(M, {}),
                      ],
                    }),
                }),
              }),
              !f && e.jsx(wt, { isSubmitting: N }),
              e.jsx(Ct, { control: b, isSubmitting: N }),
              e.jsx(yt, { control: b, isSubmitting: N }),
              e.jsx('div', {
                className: 'flex justify-end',
                children: e.jsx(W, {
                  type: 'button',
                  onClick: C,
                  disabled: N,
                  className: 'w-full sm:w-auto',
                  children: e.jsx(t, { id: 'xGVfLh' }),
                }),
              }),
            ],
          }),
        }),
      ],
    });
  },
  _e = ({ className: n, selectedField: a, onSelectedFieldChange: i, disabled: f = !1 }) => {
    const c = [
      { type: l.FieldType.SIGNATURE, label: 'Signature', icon: null },
      { type: l.FieldType.INITIALS, label: 'Initials', icon: ys },
      { type: l.FieldType.EMAIL, label: 'Email', icon: gt },
      { type: l.FieldType.NAME, label: 'Name', icon: pt },
      { type: l.FieldType.DATE, label: 'Date', icon: lt },
      { type: l.FieldType.TEXT, label: 'Text', icon: dt },
      { type: l.FieldType.NUMBER, label: 'Number', icon: Cs },
      { type: l.FieldType.RADIO, label: 'Radio', icon: ws },
      { type: l.FieldType.CHECKBOX, label: 'Checkbox', icon: ht },
      { type: l.FieldType.DROPDOWN, label: 'Dropdown', icon: jt },
    ];
    return e.jsx('div', {
      className: 'grid grid-cols-2 gap-2',
      children: c.map((r) => {
        const b = r.icon;
        return e.jsx(
          'button',
          {
            type: 'button',
            className: 'group w-full',
            onPointerDown: () => i(r.type),
            disabled: f,
            'data-selected': a === r.type ? !0 : void 0,
            children: e.jsx(ut, {
              className: P('flex w-full cursor-pointer items-center justify-center group-disabled:opacity-50', {
                'border-primary': a === r.type,
              }),
              children: e.jsxs(xt, {
                className: 'relative flex items-center justify-center gap-x-2 px-6 py-4',
                children: [
                  b && e.jsx(b, { className: 'h-4 w-4 text-muted-foreground' }),
                  e.jsx('span', {
                    className: P(
                      'text-muted-foreground text-sm group-data-[selected]:text-foreground',
                      r.type === l.FieldType.SIGNATURE && 'invisible',
                    ),
                    children: r.label,
                  }),
                  r.type === l.FieldType.SIGNATURE &&
                    e.jsx('div', {
                      className:
                        'absolute inset-0 flex items-center justify-center font-signature text-lg text-muted-foreground',
                      children: e.jsx(t, { id: 'n+8yVN' }),
                    }),
                ],
              }),
            }),
          },
          r.type,
        );
      }),
    });
  },
  Et = ({ isOpen: n, onOpenChange: a, currentField: i, fields: f, onFieldUpdate: c }) => {
    const { _: r } = ae();
    return i
      ? e.jsx(We, {
          open: n,
          onOpenChange: a,
          children: e.jsxs(Ze, {
            position: 'right',
            size: 'lg',
            className: 'w-9/12 max-w-sm overflow-y-auto',
            children: [
              e.jsx(ft, { className: 'sr-only', children: be(r, { id: '2IFhvX', values: { 0: be(r, we[i.type]) } }) }),
              e.jsx(ct, {
                title: { id: 'VNgKZz' },
                description: { id: '92KLYs', values: { 0: be(r, we[i.type]) } },
                field: i,
                fields: f,
                onAdvancedSettings: () => a(!1),
                onSave: (b) => {
                  c(i.formId, b), a(!1);
                },
              }),
            ],
          }),
        })
      : null;
  },
  Ne = 30,
  Se = 90,
  Li = ({ configData: n, presignToken: a, envelopeItem: i, defaultValues: f, onBack: c, onSubmit: r }) => {
    const { _: b } = ae(),
      { toast: k } = Ye(),
      { isWithinPageBounds: N, getFieldPosition: C, getPage: o } = Ds(),
      [p, X] = d.useState(!1),
      [Y, h] = d.useState(!1);
    d.useEffect(() => {
      const s = () => {
        X(window.innerWidth < 768);
      };
      return (
        s(),
        window.addEventListener('resize', s),
        () => {
          window.removeEventListener('resize', s);
        }
      );
    }, []);
    const F = d.useMemo(() => {
        if (i) {
          return ot({
            envelopeId: i.envelopeId,
            envelopeItemId: i.id,
            documentDataId: i.documentDataId,
            version: 'current',
            token: void 0,
            presignToken: a,
          });
        }
        if (n.documentData) {
          return n.documentData.data;
        }
      }, [n.documentData, i, a]),
      j = d.useMemo(
        () =>
          n.signers.map((s, g) => ({
            id: s.nativeId || g,
            name: s.name || '',
            email: s.email || '',
            role: s.role,
            signingOrder: s.signingOrder || null,
            documentId: null,
            templateId: null,
            token: '',
            documentDeletedAt: null,
            expired: null,
            expiresAt: null,
            expirationNotifiedAt: null,
            signedAt: null,
            authOptions: null,
            rejectionReason: null,
            sendStatus: s.disabled ? l.SendStatus.SENT : l.SendStatus.NOT_SENT,
            readStatus: s.disabled ? l.ReadStatus.OPENED : l.ReadStatus.NOT_OPENED,
            signingStatus: s.disabled ? l.SigningStatus.SIGNED : l.SigningStatus.NOT_SIGNED,
            envelopeId: '',
          })),
        [n.signers],
      ),
      [u, q] = d.useState(() => j.find((s) => s.signingStatus === l.SigningStatus.NOT_SIGNED) || null),
      [v, m] = d.useState(null),
      [y, x] = d.useState(!1),
      [_, A] = d.useState({ x: 0, y: 0 }),
      [R, V] = d.useState(null),
      [O, re] = d.useState(null),
      [Q, se] = d.useState(null),
      [Qe, me] = d.useState(!1),
      [Ke, Ee] = d.useState(null),
      U = d.useRef({ height: Ne, width: Se }),
      Je = j.findIndex((s) => s.id === u?.id),
      es = Ks(Je),
      G = Be({ defaultValues: { fields: f?.fields ?? [] } }),
      { control: ss, handleSubmit: ts } = G,
      Te = ts(r),
      { append: Z, remove: is, update: K, fields: H } = ze({ control: ss, name: 'fields' }),
      oe = d.useCallback(
        (s, g) => {
          const { duplicate: w = !1, duplicateAll: S = !1 } = g ?? {};
          if (O) {
            if ((s?.preventDefault(), w)) {
              const z = {
                ...structuredClone(O),
                nativeId: void 0,
                formId: J(12),
                signerEmail: u?.email ?? O.signerEmail,
                recipientId: u?.id ?? O.recipientId,
                pageX: O.pageX + 3,
                pageY: O.pageY + 3,
              };
              Z(z);
              return;
            }
            if (S) {
              const z = Js();
              if (z < 1) {
                return;
              }
              for (let B = 1; B <= z; B += 1) {
                if (B === O.pageNumber) {
                  continue;
                }
                const te = {
                  ...structuredClone(O),
                  nativeId: void 0,
                  formId: J(12),
                  signerEmail: u?.email ?? O.signerEmail,
                  recipientId: u?.id ?? O.recipientId,
                  pageNumber: B,
                };
                Z(te);
              }
              return;
            }
            se(O), k({ title: b({ id: '4/En7/' }), description: b({ id: 'Jhyo/P' }) });
          }
        },
        [Z, O, u?.email, u?.id, k],
      ),
      ns = d.useCallback(
        (s) => {
          if (Q) {
            s.preventDefault();
            const g = structuredClone(Q);
            Z({
              ...g,
              nativeId: void 0,
              formId: J(12),
              signerEmail: u?.email ?? g.signerEmail,
              recipientId: u?.id ?? g.recipientId,
              pageX: g.pageX + 3,
              pageY: g.pageY + 3,
            });
          }
        },
        [Z, Q, u?.email, u?.id],
      );
    fe(['ctrl+c', 'meta+c'], (s) => oe(s)),
      fe(['ctrl+v', 'meta+v'], (s) => ns(s)),
      fe(['ctrl+d', 'meta+d'], (s) => oe(s, { duplicate: !0 }));
    const ue = d.useCallback(
        (s) => {
          v &&
            (x(N(s, $, U.current.width, U.current.height)),
            A({ x: s.clientX - U.current.width / 2, y: s.clientY - U.current.height / 2 }));
        },
        [N, v],
      ),
      xe = d.useCallback(
        (s) => {
          if (!v || !u) {
            return;
          }
          const g = o(s, $);
          if (!g || !N(s, $, U.current.width, U.current.height)) {
            return;
          }
          const { top: w, left: S, height: z, width: B } = et(g),
            te = parseInt(g.getAttribute('data-page-number') ?? '1', 10);
          let le = ((s.pageX - S) / B) * 100,
            Ie = ((s.pageY - w) / z) * 100;
          const Fe = (U.current.width / B) * 100,
            Ae = (U.current.height / z) * 100;
          (le -= Fe / 2), (Ie -= Ae / 2);
          const Re = {
            formId: J(12),
            type: v,
            pageNumber: te,
            pageX: le,
            pageY: Ie,
            pageWidth: Fe,
            pageHeight: Ae,
            recipientId: u.id,
            signerEmail: u.email,
            fieldMeta: void 0,
          };
          Z(Re), at.includes(v) && (Ee(Re), me(!0)), m(null);
        },
        [Z, o, N, v, u],
      ),
      as = d.useCallback(
        (s, g) => {
          const w = H[g],
            S = window.document.querySelector(`${$}[data-page-number="${w.pageNumber}"]`);
          if (!S) {
            return;
          }
          const { x: z, y: B, width: te, height: le } = C(S, s);
          K(g, { ...w, pageX: z, pageY: B, pageWidth: te, pageHeight: le });
        },
        [C, H, K],
      ),
      rs = d.useCallback(
        (s, g) => {
          const w = H[g],
            S = window.document.querySelector(`${$}[data-page-number="${w.pageNumber}"]`);
          if (!S) {
            return;
          }
          const { x: z, y: B } = C(S, s);
          K(g, { ...w, pageX: z, pageY: B });
        },
        [C, H, K],
      ),
      os = d.useCallback(
        (s, g) => {
          const w = H.findIndex((S) => S.formId === s);
          if (w !== -1) {
            const S = tt.parse(g);
            K(w, { ...H[w], fieldMeta: S });
          }
        },
        [H, K],
      );
    return (
      d.useEffect(
        () => (
          v && (window.addEventListener('mousemove', ue), window.addEventListener('mouseup', xe)),
          () => {
            window.removeEventListener('mousemove', ue), window.removeEventListener('mouseup', xe);
          }
        ),
        [xe, ue, v],
      ),
      d.useEffect(() => {
        const s = new MutationObserver((g) => {
          document.querySelector($) && (U.current = { height: Math.max(Ne), width: Math.max(Se) });
        });
        return (
          s.observe(document.body, { childList: !0, subtree: !0 }),
          () => {
            s.disconnect();
          }
        );
      }, []),
      d.useEffect(() => {
        p && v && h(!1);
      }, [p, v]),
      e.jsxs(e.Fragment, {
        children: [
          e.jsxs('div', {
            className: 'grid w-full grid-cols-12 gap-4',
            children: [
              !p &&
                e.jsx('div', {
                  className: 'order-2 col-span-12 md:order-1 md:col-span-4',
                  children: e.jsxs('div', {
                    className:
                      'sticky top-4 max-h-[calc(100vh-2rem)] rounded-lg border border-border bg-widget p-4 pb-6',
                    children: [
                      e.jsx('h2', { className: 'mb-1 font-medium text-lg', children: e.jsx(t, { id: 'YhSRZB' }) }),
                      e.jsx('p', {
                        className: 'mb-6 text-muted-foreground text-sm',
                        children: e.jsx(t, { id: '+3W5d+' }),
                      }),
                      e.jsx(ke, {
                        selectedRecipient: u,
                        onSelectedRecipientChange: q,
                        recipients: j,
                        className: 'w-full',
                      }),
                      e.jsx('hr', { className: 'my-6' }),
                      e.jsx('div', {
                        className: 'space-y-2',
                        children: e.jsx(_e, {
                          selectedField: v,
                          onSelectedFieldChange: m,
                          className: 'w-full',
                          disabled: !u,
                        }),
                      }),
                      e.jsxs('div', {
                        className: 'mt-6 flex gap-2',
                        children: [
                          c &&
                            e.jsx(W, {
                              type: 'button',
                              variant: 'ghost',
                              className: 'flex-1',
                              loading: G.formState.isSubmitting,
                              onClick: () => c(G.getValues()),
                              children: e.jsx(t, { id: 'iH8pgl' }),
                            }),
                          e.jsx(W, {
                            className: 'flex-1',
                            type: 'button',
                            loading: G.formState.isSubmitting,
                            disabled: !G.formState.isValid,
                            onClick: async () => Te(),
                            children: e.jsx(t, { id: 'tfDRzk' }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              e.jsx('div', {
                className: P('order-1 col-span-12 md:order-2', !p && 'md:col-span-8'),
                children: e.jsxs('div', {
                  className: 'relative',
                  children: [
                    v &&
                      e.jsx('div', {
                        className: P(
                          'pointer-events-none fixed z-50 flex cursor-pointer flex-col items-center justify-center bg-white text-muted-foreground transition duration-200 [container-type:size] dark:text-muted',
                          es.base,
                          { '-rotate-6 scale-90 opacity-50 dark:bg-black/20': !y, 'dark:text-black/60': y },
                          v === 'SIGNATURE' && 'font-signature',
                        ),
                        style: { top: _.y, left: _.x, height: U.current.height, width: U.current.width },
                        children: e.jsx('span', {
                          className: 'text-[clamp(0.425rem,25cqw,0.825rem)]',
                          children: b(we[v]),
                        }),
                      }),
                    e.jsx(Ge, {
                      ...G,
                      children: e.jsxs('div', {
                        children: [
                          F && e.jsx(st, { data: F, scrollParentRef: 'window' }),
                          e.jsx(rt, {
                            target: $,
                            children: H.map((s, g) => {
                              const w = j.findIndex((S) => S.id === s.recipientId);
                              return e.jsx(
                                mt,
                                {
                                  field: s,
                                  minHeight: nt,
                                  minWidth: it,
                                  defaultHeight: Ne,
                                  defaultWidth: Se,
                                  onResize: (S) => as(S, g),
                                  onMove: (S) => rs(S, g),
                                  onRemove: () => is(g),
                                  onDuplicate: () => oe(null, { duplicate: !0 }),
                                  onDuplicateAllPages: () => oe(null, { duplicateAll: !0 }),
                                  onFocus: () => re(s),
                                  onBlur: () => re(null),
                                  onAdvancedSettings: () => {
                                    Ee(s), me(!0);
                                  },
                                  recipientIndex: w,
                                  active: R === s.formId,
                                  onFieldActivate: () => V(s.formId),
                                  onFieldDeactivate: () => V(null),
                                  disabled: u?.id !== s.recipientId,
                                },
                                s.formId,
                              );
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            ],
          }),
          p &&
            e.jsxs(We, {
              open: Y,
              onOpenChange: h,
              children: [
                e.jsx(bt, {
                  asChild: !0,
                  children: e.jsxs('div', {
                    className:
                      'fixed right-6 bottom-6 left-6 z-50 flex items-center justify-between gap-2 rounded-lg border border-border bg-widget p-4',
                    children: [
                      e.jsx('span', { className: 'font-medium text-lg', children: e.jsx(t, { id: 'YhSRZB' }) }),
                      e.jsx('button', {
                        type: 'button',
                        className:
                          'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground',
                        children: e.jsx(Nt, { className: 'h-6 w-6' }),
                      }),
                    ],
                  }),
                }),
                e.jsxs(Ze, {
                  position: 'bottom',
                  size: 'xl',
                  className: 'h-fit max-h-[80vh] overflow-y-auto rounded-t-xl bg-widget p-4',
                  children: [
                    e.jsx('h2', { className: 'mb-1 font-medium text-lg', children: e.jsx(t, { id: 'YhSRZB' }) }),
                    e.jsx('p', {
                      className: 'mb-6 text-muted-foreground text-sm',
                      children: e.jsx(t, { id: '+3W5d+' }),
                    }),
                    e.jsx(ke, {
                      selectedRecipient: u,
                      onSelectedRecipientChange: q,
                      recipients: j,
                      className: 'w-full',
                    }),
                    e.jsx('hr', { className: 'my-6' }),
                    e.jsx('div', {
                      className: 'space-y-2',
                      children: e.jsx(_e, {
                        selectedField: v,
                        onSelectedFieldChange: (s) => {
                          m(s), s && h(!1);
                        },
                        className: 'w-full',
                        disabled: !u,
                      }),
                    }),
                    e.jsxs('div', {
                      className: 'mt-6 flex gap-2',
                      children: [
                        c &&
                          e.jsx(W, {
                            type: 'button',
                            variant: 'ghost',
                            className: 'flex-1',
                            loading: G.formState.isSubmitting,
                            onClick: () => c(G.getValues()),
                            children: e.jsx(t, { id: 'iH8pgl' }),
                          }),
                        e.jsx(W, {
                          className: 'flex-1',
                          type: 'button',
                          loading: G.formState.isSubmitting,
                          disabled: !G.formState.isValid,
                          onClick: async () => Te(),
                          children: e.jsx(t, { id: 'tfDRzk' }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          e.jsx(Et, { isOpen: Qe, onOpenChange: me, currentField: Ke, fields: H, onFieldUpdate: os }),
        ],
      })
    );
  };
export { Li as b, Mi as a, Oi as C };
