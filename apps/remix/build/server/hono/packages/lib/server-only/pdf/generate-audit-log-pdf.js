import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { PDF } from '@libpdf/core';
import { i18n } from '@lingui/core';
import { ZSupportedLanguageCodeSchema } from '../../constants/locales.js';
import { parseDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { getTranslations } from '../../utils/i18n.js';
import { getOrganisationClaimByTeamId } from '../organisation/get-organisation-claims.js';
import { renderAuditLogs } from './render-audit-logs.js';

const generateAuditLogPdf = async options => {
  const {
    envelope,
    envelopeOwner,
    envelopeItems,
    recipients,
    language,
    pageWidth,
    pageHeight,
    additionalAuditLogs = []
  } = options;
  const documentLanguage = ZSupportedLanguageCodeSchema.parse(language);
  const [organisationClaim, partialAuditLogs, messages] = await Promise.all([getOrganisationClaimByTeamId({
    teamId: envelope.teamId
  }), getAuditLogs(envelope.id), getTranslations(documentLanguage)]);
  i18n.loadAndActivate({
    locale: documentLanguage,
    messages
  });
  const auditLogs = [...additionalAuditLogs, ...partialAuditLogs];
  const auditLogPages = await renderAuditLogs({
    envelope,
    envelopeOwner,
    envelopeItems,
    recipients,
    auditLogs,
    hidePoweredBy: organisationClaim.flags.hidePoweredBy ?? false,
    pageWidth,
    pageHeight,
    i18n
  });
  return await PDF.merge(auditLogPages, {
    includeAnnotations: true
  });
};
const getAuditLogs = async envelopeId => {
  const auditLogs = await prismaWithReplicas.documentAuditLog.findMany({
    where: {
      envelopeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return auditLogs.map(auditLog => parseDocumentAuditLogData(auditLog));
};

export { generateAuditLogPdf };
//# sourceMappingURL=generate-audit-log-pdf.js.map
