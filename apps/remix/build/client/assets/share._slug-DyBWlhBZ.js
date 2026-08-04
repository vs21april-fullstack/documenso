import { e as E, r as f, w } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { j as e } from './jsx-runtime-DrYFQjIW.js';
import './app-uAhqo_pP.js';
import { B as p } from './button-Dm_JGgap.js';
import { e as _, c as b, D as C, f as L, b as M, d as V } from './dialog-DKtG3c-O.js';
import { D as v } from './download-CZg2-a2o.js';
import { E as g } from './envelope-download-dialog-B6CCzceG.js';
import { a as T } from './envelope-download-nW9wzRpS.js';
import { E as W } from './envelope-generic-page-renderer-CsmRAdYk.js';
import { P as I, b as N, c as P, d as S, u as y } from './envelope-pdf-viewer-CWkS8txA.js';
import { t as R } from './index-BbY_VZqi.js';
import { i as l } from './index-browser-CnbpKWEs.js';
import { T as i } from './index-CkOHfBoV.js';
import { D as h } from './luxon-CkcISRbr.js';
import { c as U } from './pdf-viewer-lazy-DLZtRd2Q.js';
import { a as O } from './teams-WAT4Ivvc.js';
import { r as j } from './url-CP0Hgou8.js';
import './index-BiLbLflF.js';
import './types-GU3YNY2F.js';
import './utils-C68LRSOY.js';
import './field-root-container-classes-BAoS6g-a.js';
import './index-CIc6bU3R.js';
import './field-meta-DZwk3H3T.js';
import './fields-_NYj1Vq9.js';
import './id-DheyC1a4.js';
import './envelope-B-x3X451.js';
import './field-renderer-DaAJJPbZ.js';
import './preload-helper-CW4hCJly.js';
import './template-Dd97ZbiO.js';
import './recipient-formatter-WzUNI0pB.js';
import './signature-gMGlyIgk.js';
import './avatar-BS15TO7o.js';
import './index-UGPUXo4T.js';
import './index-J1tJADds.js';
import './index-DAyHhKCk.js';
import './index-CWo-8VFg.js';
import './badge-ChcBhPaW.js';
import './loader-aSxoB_gm.js';
import './createLucideIcon-UOjYlZt5.js';
import './popover-CGHMP7Nz.js';
import './index-DzY7AtIB.js';
import './index-C829O7aq.js';
import './Combination-DaG98sNE.js';
import './index-DoLGTOH8.js';
import './index-KpgwOPga.js';
import './index-ZximTWpF.js';
import './lock-BpOJ2dWJ.js';
import './clock-BQjtjFZ4.js';
import './eye-off-CYdHb6Re.js';
import './alert-CE06zyBg.js';
import './teams-D27qC-4o.js';
import './data-transformer-DaTnp7WB.js';
import './index-DJ-EwNXm.js';
import './useQuery-Cl3ReeOA.js';
import './index-BoPcnRXW.js';
import './x-BhPRmTZ1.js';
import './download-file-3Be3-k_S.js';
import './skeleton-BRFgpeQI.js';
import './use-toast-pMYLxjk1.js';
import './file-text-BGtrLWy6.js';
import './zod-uOrAM2YC.js';
import './spinner-CEVyI0yx.js';
const F = ({
    documentId: o,
    title: t,
    internalVersion: s,
    envelopeItems: r,
    documentTeamUrl: a,
    recipientCount: d = 0,
    completedDate: c,
    token: m,
  }) => {
    const { data: n } = R.document.get.useQuery({ documentId: o }),
      [D, x] = f.useState(() => !!n),
      u = c ? h.fromJSDate(c).toLocaleString(h.DATETIME_MED) : '';
    return (
      f.useEffect(() => {
        n && x(!0);
      }, [n]),
      e.jsxs('div', {
        className: 'mx-auto w-full max-w-screen-md',
        children: [
          n &&
            e.jsx(C, {
              open: D,
              onOpenChange: x,
              children: e.jsxs(M, {
                children: [
                  e.jsxs(b, {
                    children: [
                      e.jsx(V, { children: e.jsx(i, { id: 'iPMYUL' }) }),
                      e.jsx(_, { children: e.jsx(i, { id: '11lQJo' }) }),
                    ],
                  }),
                  e.jsx(L, {
                    className: 'flex flex-row justify-end gap-2',
                    children: e.jsx(p, {
                      asChild: !0,
                      children: e.jsx('a', {
                        href: `${O(a)}/${n.envelopeId}`,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        children: e.jsx(i, { id: 'zs+Nz6' }),
                      }),
                    }),
                  }),
                ],
              }),
            }),
          s === 2
            ? e.jsx(N, {
                version: 'current',
                envelope: { id: r[0].envelopeId, status: l.DocumentStatus.COMPLETED, type: l.EnvelopeType.DOCUMENT },
                envelopeItems: r,
                token: m,
                children: e.jsx(z, { title: t, recipientCount: d, formattedDate: u, token: m }),
              })
            : e.jsxs(e.Fragment, {
                children: [
                  e.jsxs('div', {
                    className: 'flex w-full flex-col justify-between gap-4 md:flex-row md:items-end',
                    children: [
                      e.jsxs('div', {
                        className: 'space-y-1',
                        children: [
                          e.jsx('h1', { className: 'font-medium text-xl', children: t }),
                          e.jsxs('div', {
                            className: 'flex flex-col gap-0.5 text-muted-foreground text-sm',
                            children: [
                              e.jsx('p', { children: e.jsx(i, { id: 'M71PWW', values: { recipientCount: d } }) }),
                              e.jsx('p', { children: e.jsx(i, { id: '8hKDDT', values: { formattedDate: u } }) }),
                            ],
                          }),
                        ],
                      }),
                      e.jsx(g, {
                        envelopeId: r[0].envelopeId,
                        envelopeStatus: l.DocumentStatus.COMPLETED,
                        envelopeItems: r,
                        token: m,
                        trigger: e.jsxs(p, {
                          type: 'button',
                          variant: 'outline',
                          className: 'w-fit',
                          children: [e.jsx(v, { className: 'mr-2 h-5 w-5' }), e.jsx(i, { id: 'mzI/c+' })],
                        }),
                      }),
                    ],
                  }),
                  e.jsx('div', {
                    className: 'mt-12 w-full',
                    children: e.jsx(
                      U,
                      {
                        data: T({
                          envelopeId: r[0]?.envelopeId,
                          envelopeItemId: r[0]?.id,
                          documentDataId: r[0]?.documentDataId,
                          version: 'current',
                          token: m,
                          presignToken: void 0,
                        }),
                        scrollParentRef: 'window',
                      },
                      r[0]?.id,
                    ),
                  }),
                ],
              }),
        ],
      })
    );
  },
  z = ({ title: o, recipientCount: t, formattedDate: s, token: r }) => {
    const { envelopeItems: a } = y();
    return e.jsxs('div', {
      className: 'flex min-h-screen flex-col items-start',
      children: [
        e.jsxs('div', {
          className: 'flex w-full flex-col justify-between gap-4 md:flex-row md:items-end',
          children: [
            e.jsxs('div', {
              className: 'space-y-1',
              children: [
                e.jsx('h1', { className: 'font-medium text-xl', children: o }),
                e.jsxs('div', {
                  className: 'flex flex-col gap-0.5 text-muted-foreground text-sm',
                  children: [
                    e.jsx('p', { children: e.jsx(i, { id: 'M71PWW', values: { recipientCount: t } }) }),
                    e.jsx('p', { children: e.jsx(i, { id: '8hKDDT', values: { formattedDate: s } }) }),
                  ],
                }),
              ],
            }),
            e.jsx(g, {
              envelopeId: a[0].envelopeId,
              envelopeStatus: l.DocumentStatus.COMPLETED,
              envelopeItems: a,
              token: r,
              trigger: e.jsxs(p, {
                type: 'button',
                variant: 'outline',
                className: 'w-fit',
                children: [e.jsx(v, { className: 'mr-2 h-5 w-5' }), e.jsx(i, { id: 'mzI/c+' })],
              }),
            }),
          ],
        }),
        e.jsxs('div', {
          className: 'mt-12 w-full',
          children: [
            e.jsx(P, { className: 'mb-4 p-0', fields: [], secondaryOverride: '' }),
            e.jsx(S, { scrollParentRef: 'window', customPageRenderer: W, errorMessage: I.preview }),
          ],
        }),
      ],
    });
  };
function He({ params: { slug: o } }) {
  if (!o.startsWith('qr_')) {
    return [
      { title: 'Omni Sign - Share' },
      { description: 'I just signed a document in style with Omni Sign!' },
      { property: 'og:title', content: 'Omni Sign - Join the open source signing revolution' },
      { property: 'og:description', content: 'I just signed with Omni Sign!' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: j(`/share/${o}/opengraph`) },
      { name: 'twitter:site', content: '@documenso' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: j(`/share/${o}/opengraph`) },
      { name: 'twitter:description', content: 'I just signed with Omni Sign!' },
    ];
  }
}
const Ye = w(() => {
  const { document: t, token: s } = E();
  return t
    ? e.jsx(F, {
        documentId: t.id,
        title: t.title,
        documentTeamUrl: t.documentTeamUrl,
        internalVersion: t.internalVersion,
        envelopeItems: t.envelopeItems,
        recipientCount: t.recipientCount,
        completedDate: t.completedAt ?? void 0,
        token: s,
      })
    : e.jsx('div', {});
});
export { He as meta, Ye as default };
