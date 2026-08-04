import { w as E, e as T } from './chunk-KS7C4IRE-FYOnnPbz.js';
import { j as i } from './jsx-runtime-DrYFQjIW.js';
import './document-CYL_BYk5.js';
import { D as A } from './document-preferences-form-DrLQXubl.js';
import { t as a } from './index-BbY_VZqi.js';
import { u as P } from './index-CkOHfBoV.js';
import { L as H } from './loader-aSxoB_gm.js';
import { a as R } from './meta-1txnm5en.js';
import { S as v } from './settings-header-C7I7HmzF.js';
import { a as C } from './team-BvmzkpNi.js';
import { D as e } from './teams-WAT4Ivvc.js';
import { u as F } from './use-toast-pMYLxjk1.js';
import './index-browser-CnbpKWEs.js';
import './data-transformer-DaTnp7WB.js';
import './app-uAhqo_pP.js';
import './index-BiLbLflF.js';
import './types-GU3YNY2F.js';
import './index-DJ-EwNXm.js';
import './useQuery-Cl3ReeOA.js';
import './organisation-Ylr4XBmr.js';
import './session-DJFUfUIe.js';
import './index-PjhXdBcw.js';
import './date-formats-DF6plI8e.js';
import './luxon-CkcISRbr.js';
import './time-zones-DGI2eNDr.js';
import './envelope-reminder-YclQYJ2m.js';
import './i18n-BYa2gP9D.js';
import './locales-CAv2cHk7.js';
import './default-recipients-DcgeNtBb.js';
import './zod-uOrAM2YC.js';
import './document-meta-KqDa_V10.js';
import './DocumentMetaSchema-DuD4SbwH.js';
import './document-email-DcBZA0tR.js';
import './organisations-CAYnRnac.js';
import './organisations-bLnymRV_.js';
import './recipient-formatter-WzUNI0pB.js';
import './document-signature-settings-tooltip-mnlREIOb.js';
import './tooltip-Dihvg_5U.js';
import './index-DzY7AtIB.js';
import './index-DAyHhKCk.js';
import './button-Dm_JGgap.js';
import './utils-C68LRSOY.js';
import './index-J1tJADds.js';
import './index-C829O7aq.js';
import './index-UGPUXo4T.js';
import './index-DoLGTOH8.js';
import './index-KpgwOPga.js';
import './index-ZximTWpF.js';
import './index-CZmIGLNu.js';
import './info-qk5PqWur.js';
import './createLucideIcon-UOjYlZt5.js';
import './reminder-settings-picker-BBjJdH4Y.js';
import './input-DdDbBJYb.js';
import './select-Dvz92dRn.js';
import './animate-generic-fade-in-out-CGjjMFem.js';
import './proxy-dEM8-k5c.js';
import './index-DXkD4Uno.js';
import './index-_mbtlgCZ.js';
import './Combination-DaG98sNE.js';
import './index-MjUwLcg-.js';
import './index-BlIM-koY.js';
import './chevron-down-mVGROlJc.js';
import './check--7Y29bNj.js';
import './form-BX2-nwLu.js';
import './combobox-BB3QNPhJ.js';
import './user-SZ6cyKhO.js';
import './eye-BJpoQCg7.js';
import './copy-wv5mRIE-.js';
import './command-DSdqtVmj.js';
import './dialog-DKtG3c-O.js';
import './index-BoPcnRXW.js';
import './x-BhPRmTZ1.js';
import './search-CRP2I58A.js';
import './popover-CGHMP7Nz.js';
import './alert-CE06zyBg.js';
import './avatar-BS15TO7o.js';
import './index-CWo-8VFg.js';
import './multi-select-combobox-I6xiAn1a.js';
import './index-CBoJQWs5.js';
import './chevrons-up-down-EpaIOjDM.js';
import './zod-C00iebzH.js';
import './recipients-DRTWdniN.js';
import './is-signature-field-D16ckqDg.js';
import './id-DheyC1a4.js';
import './envelope-B-x3X451.js';
import './multiselect-BlrA1Tug.js';
import './form-sticky-save-bar-thblyFdT.js';
import './triangle-alert-Y8Kk1Rgi.js';
import './url-CP0Hgou8.js';
import './teams-D27qC-4o.js';
function xi() {
  return R({ id: 'H90iLe' });
}
const Di = E(() => {
  const { isAiFeaturesConfigured: s } = T(),
    m = C(),
    { _: t } = P(),
    { toast: p } = F(),
    { data: n, isLoading: u } = a.team.get.useQuery({ teamReference: m.id }),
    { mutateAsync: d } = a.team.settings.update.useMutation(),
    c = async (l) => {
      try {
        const {
          documentVisibility: o,
          documentLanguage: g,
          documentTimezone: f,
          documentDateFormat: S,
          includeSenderDetails: x,
          includeSigningCertificate: D,
          includeAuditLog: b,
          signatureTypes: r,
          defaultRecipients: j,
          delegateDocumentOwnership: y,
          aiFeaturesEnabled: h,
          envelopeExpirationPeriod: L,
          reminderSettings: w,
        } = l;
        await d({
          teamId: m.id,
          data: {
            documentVisibility: o,
            documentLanguage: g,
            documentTimezone: f,
            documentDateFormat: S,
            includeSenderDetails: x,
            includeSigningCertificate: D,
            includeAuditLog: b,
            defaultRecipients: j,
            aiFeaturesEnabled: h,
            envelopeExpirationPeriod: L,
            reminderSettings: w,
            ...(r.length === 0
              ? { typedSignatureEnabled: null, uploadSignatureEnabled: null, drawSignatureEnabled: null }
              : {
                  typedSignatureEnabled: r.includes(e.TYPE),
                  uploadSignatureEnabled: r.includes(e.UPLOAD),
                  drawSignatureEnabled: r.includes(e.DRAW),
                }),
            delegateDocumentOwnership: y,
          },
        }),
          p({ title: t({ id: 'FjIbFC' }), description: t({ id: 'ARqDVF' }) });
      } catch (o) {
        throw (p({ title: t({ id: 'ywDBfs' }), description: t({ id: 'sdujY+' }), variant: 'destructive' }), o);
      }
    };
  return u || !n
    ? i.jsx('div', {
        className: 'flex items-center justify-center rounded-lg py-32',
        children: i.jsx(H, { className: 'h-6 w-6 animate-spin text-muted-foreground' }),
      })
    : i.jsxs('div', {
        className: 'max-w-2xl',
        children: [
          i.jsx(v, { title: t({ id: 'H90iLe' }), subtitle: t({ id: 'jJf2gJ' }) }),
          i.jsx('section', {
            children: i.jsx(A, {
              canInherit: !0,
              isAiFeaturesConfigured: s,
              settings: n.teamSettings,
              onFormSubmit: c,
            }),
          }),
        ],
      });
});
export { Di as default, xi as meta };
