import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { normalizeBrandingColors } from '../../../lib/utils/normalize-branding-colors.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { sanitizeBrandingCss } from '../../../lib/utils/sanitize-branding-css.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationType, Prisma } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { ZUpdateOrganisationSettingsRequestSchema, ZUpdateOrganisationSettingsResponseSchema } from './update-organisation-settings.types.js';

const updateOrganisationSettingsRoute = authenticatedProcedure.input(ZUpdateOrganisationSettingsRequestSchema).output(ZUpdateOrganisationSettingsResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    user
  } = ctx;
  const {
    organisationId,
    data
  } = input;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  const {
    // Document related settings.
    documentVisibility,
    documentLanguage,
    documentTimezone,
    documentDateFormat,
    includeSenderDetails,
    includeSigningCertificate,
    includeAuditLog,
    typedSignatureEnabled,
    uploadSignatureEnabled,
    drawSignatureEnabled,
    defaultRecipients,
    delegateDocumentOwnership,
    envelopeExpirationPeriod,
    reminderSettings,
    // Branding related settings.
    brandingEnabled,
    brandingUrl,
    brandingCompanyDetails,
    brandingColors,
    brandingCss,
    // Email related settings.
    emailId,
    emailReplyTo,
    // emailReplyToName,
    emailDocumentSettings,
    // AI features settings.
    aiFeaturesEnabled
  } = data;
  if (Object.values(data).length === 0) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'No settings to update'
    });
  }
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId: user.id,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
    }),
    include: {
      organisationGlobalSettings: true
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You do not have permission to update this organisation.'
    });
  }
  // Validate that the email ID belongs to the organisation.
  if (emailId) {
    const email = await prismaWithReplicas.organisationEmail.findFirst({
      where: {
        id: emailId,
        organisationId
      }
    });
    if (!email) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'Email not found'
      });
    }
  }
  const derivedTypedSignatureEnabled = typedSignatureEnabled ?? organisation.organisationGlobalSettings.typedSignatureEnabled;
  const derivedUploadSignatureEnabled = uploadSignatureEnabled ?? organisation.organisationGlobalSettings.uploadSignatureEnabled;
  const derivedDrawSignatureEnabled = drawSignatureEnabled ?? organisation.organisationGlobalSettings.drawSignatureEnabled;
  const derivedDelegateDocumentOwnership = delegateDocumentOwnership ?? organisation.organisationGlobalSettings.delegateDocumentOwnership;
  if (derivedTypedSignatureEnabled === false && derivedUploadSignatureEnabled === false && derivedDrawSignatureEnabled === false) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'At least one signature type must be enabled'
    });
  }
  const isPersonalOrganisation = organisation.type === OrganisationType.PERSONAL;
  const currentIncludeSenderDetails = organisation.organisationGlobalSettings.includeSenderDetails;
  const isChangingIncludeSenderDetails = includeSenderDetails !== undefined && includeSenderDetails !== currentIncludeSenderDetails;
  if (isPersonalOrganisation && isChangingIncludeSenderDetails) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'Personal organisations cannot update the sender details'
    });
  }
  // Sanitize custom branding CSS at write time so we can store the safe
  // result and skip per-render sanitisation. Warnings are returned to the
  // UI so the user can see what was dropped.
  let cssWarnings;
  let sanitizedBrandingCss;
  if (brandingCss !== undefined) {
    const result = sanitizeBrandingCss(brandingCss);
    sanitizedBrandingCss = result.css;
    cssWarnings = result.warnings;
  }
  // Strip empty-string colour values; collapse to `null` when the payload
  // contains no overrides. Keeps the stored row clean and avoids storing
  // `{}` as a real "override of nothing" (matters more for teams, but the
  // org row stays tidy this way too).
  const normalizedBrandingColors = normalizeBrandingColors(brandingColors);
  await prismaWithReplicas.organisation.update({
    where: {
      id: organisationId
    },
    data: {
      organisationGlobalSettings: {
        update: {
          // Document related settings.
          documentVisibility,
          documentLanguage,
          documentTimezone,
          documentDateFormat,
          includeSenderDetails,
          includeSigningCertificate,
          includeAuditLog,
          typedSignatureEnabled,
          uploadSignatureEnabled,
          drawSignatureEnabled,
          defaultRecipients: defaultRecipients === null ? Prisma.DbNull : defaultRecipients,
          delegateDocumentOwnership: derivedDelegateDocumentOwnership,
          envelopeExpirationPeriod: envelopeExpirationPeriod === null ? Prisma.DbNull : envelopeExpirationPeriod,
          reminderSettings: reminderSettings === null ? Prisma.DbNull : reminderSettings,
          // Branding related settings.
          brandingEnabled,
          brandingUrl,
          brandingCompanyDetails,
          brandingColors: normalizedBrandingColors === null ? Prisma.DbNull : normalizedBrandingColors,
          brandingCss: sanitizedBrandingCss,
          // Email related settings.
          emailId,
          emailReplyTo,
          // emailReplyToName,
          emailDocumentSettings,
          // AI features settings.
          aiFeaturesEnabled
        }
      }
    }
  });
  return {
    cssWarnings: cssWarnings && cssWarnings.length > 0 ? cssWarnings : undefined
  };
});

export { updateOrganisationSettingsRoute };
//# sourceMappingURL=update-organisation-settings.js.map
