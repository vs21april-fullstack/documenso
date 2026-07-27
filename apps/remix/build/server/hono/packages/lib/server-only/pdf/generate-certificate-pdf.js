import { PDF } from '@libpdf/core';
import { i18n } from '@lingui/core';
import { FieldType } from '@prisma/client';
import { sortBy, prop } from 'remeda';
import { match } from 'ts-pattern';
import { ZSupportedLanguageCodeSchema } from '../../constants/locales.js';
import { extractDocumentAuthMethods } from '../../utils/document-auth.js';
import { getTranslations } from '../../utils/i18n.js';
import { getDocumentCertificateAuditLogs } from '../document/get-document-certificate-audit-logs.js';
import { getOrganisationClaimByTeamId } from '../organisation/get-organisation-claims.js';
import { renderCertificate } from './render-certificate.js';

const generateCertificatePdf = async options => {
  const {
    envelope,
    envelopeOwner,
    recipients,
    fields,
    language,
    pageWidth,
    pageHeight
  } = options;
  const documentLanguage = ZSupportedLanguageCodeSchema.parse(language);
  const [organisationClaim, auditLogs, messages] = await Promise.all([getOrganisationClaimByTeamId({
    teamId: envelope.teamId
  }), getDocumentCertificateAuditLogs({
    envelopeId: envelope.id
  }), getTranslations(documentLanguage)]);
  i18n.loadAndActivate({
    locale: documentLanguage,
    messages
  });
  const payload = {
    recipients: recipients.map(recipient => {
      const recipientId = recipient.id;
      const signatureField = fields.find(field => field.recipientId === recipient.id && field.type === FieldType.SIGNATURE);
      const emailSent = auditLogs['EMAIL_SENT'].find(log => log.type === 'EMAIL_SENT' && log.data.recipientId === recipientId);
      const documentSent = auditLogs['DOCUMENT_SENT'].find(log => log.type === 'DOCUMENT_SENT');
      const documentOpened = auditLogs['DOCUMENT_OPENED'].find(log => log.type === 'DOCUMENT_OPENED' && log.data.recipientId === recipientId);
      const documentRecipientCompleted = auditLogs['DOCUMENT_RECIPIENT_COMPLETED'].find(log => log.type === 'DOCUMENT_RECIPIENT_COMPLETED' && log.data.recipientId === recipientId);
      const documentRecipientRejected = auditLogs['DOCUMENT_RECIPIENT_REJECTED'].find(log => log.type === 'DOCUMENT_RECIPIENT_REJECTED' && log.data.recipientId === recipientId);
      const extractedAuthMethods = extractDocumentAuthMethods({
        documentAuth: envelope.authOptions,
        recipientAuth: recipient.authOptions
      });
      const insertedAuditLogsWithFieldAuth = sortBy(auditLogs.DOCUMENT_FIELD_INSERTED.filter(log => log.data.recipientId === recipient.id && log.data.fieldSecurity), [prop('createdAt'), 'desc']);
      const actionAuthMethod = insertedAuditLogsWithFieldAuth.at(0)?.data?.fieldSecurity?.type;
      let authLevel = match(actionAuthMethod).with('ACCOUNT', () => i18n._(
      /*i18n*/
      {
        id: "T1QAP8"
      })).with('TWO_FACTOR_AUTH', () => i18n._(
      /*i18n*/
      {
        id: "CatCEu"
      })).with('PASSWORD', () => i18n._(
      /*i18n*/
      {
        id: "WFA/1o"
      })).with('PASSKEY', () => i18n._(
      /*i18n*/
      {
        id: "5H5E01"
      })).with('EXPLICIT_NONE', () => i18n._(
      /*i18n*/
      {
        id: "O3oNi5"
      })).with(undefined, () => null).exhaustive();
      if (!authLevel) {
        const accessAuthMethod = extractedAuthMethods.derivedRecipientAccessAuth.at(0);
        authLevel = match(accessAuthMethod).with('ACCOUNT', () => i18n._(
        /*i18n*/
        {
          id: "yn+h2a"
        })).with('TWO_FACTOR_AUTH', () => i18n._(
        /*i18n*/
        {
          id: "C4pKXW"
        })).with(undefined, () => i18n._(
        /*i18n*/
        {
          id: "O3oNi5"
        })).exhaustive();
      }
      return {
        id: recipient.id,
        name: recipient.name,
        email: recipient.email,
        role: recipient.role,
        signingStatus: recipient.signingStatus,
        signatureField,
        rejectionReason: recipient.rejectionReason,
        authLevel,
        logs: {
          emailed: emailSent ?? null,
          sent: documentSent ?? null,
          opened: documentOpened ?? null,
          completed: documentRecipientCompleted ?? null,
          rejected: documentRecipientRejected ?? null
        }
      };
    }),
    envelopeOwner,
    envelopeId: envelope.id,
    qrToken: envelope.qrToken,
    hidePoweredBy: organisationClaim.flags.hidePoweredBy ?? false,
    pageWidth,
    pageHeight,
    i18n
  };
  const certificatePages = await renderCertificate(payload);
  return await PDF.merge(certificatePages);
};

export { generateCertificatePdf };
//# sourceMappingURL=generate-certificate-pdf.js.map
