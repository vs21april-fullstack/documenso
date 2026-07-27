import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/teams.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { normalizeBrandingColors } from '../../../lib/utils/normalize-branding-colors.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { sanitizeBrandingCss } from '../../../lib/utils/sanitize-branding-css.js';
import { buildTeamWhereQuery } from '../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationType, Prisma } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { ZUpdateTeamSettingsRequestSchema, ZUpdateTeamSettingsResponseSchema } from './update-team-settings.types.js';

const updateTeamSettingsRoute = authenticatedProcedure.input(ZUpdateTeamSettingsRequestSchema).output(ZUpdateTeamSettingsResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    user
  } = ctx;
  const {
    teamId,
    data
  } = input;
  ctx.logger.info({
    input: {
      teamId
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
    // Default recipients settings.
    defaultRecipients,
    // AI features settings.
    aiFeaturesEnabled
  } = data;
  if (Object.values(data).length === 0) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'No settings to update'
    });
  }
  // Signatures will only be inherited if all are NULL.
  if (typedSignatureEnabled === false && uploadSignatureEnabled === false && drawSignatureEnabled === false) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'At least one signature type must be enabled'
    });
  }
  const team = await prismaWithReplicas.team.findFirst({
    where: buildTeamWhereQuery({
      teamId,
      userId: user.id,
      roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
    })
  });
  if (!team) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You do not have permission to update this team.'
    });
  }
  // Validate that the email ID belongs to the organisation.
  if (emailId) {
    const email = await prismaWithReplicas.organisationEmail.findFirst({
      where: {
        id: emailId,
        organisationId: team.organisationId
      }
    });
    if (!email) {
      throw new AppError(AppErrorCode.NOT_FOUND, {
        message: 'Email not found'
      });
    }
  }
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId: team.organisationId,
      userId: user.id,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
    }),
    select: {
      type: true,
      organisationGlobalSettings: {
        select: {
          includeSenderDetails: true
        }
      }
    }
  });
  const isPersonalOrganisation = organisation?.type === OrganisationType.PERSONAL;
  const currentIncludeSenderDetails = organisation?.organisationGlobalSettings.includeSenderDetails;
  const isChangingIncludeSenderDetails = includeSenderDetails !== undefined && includeSenderDetails !== currentIncludeSenderDetails;
  if (isPersonalOrganisation && isChangingIncludeSenderDetails) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'Personal teams cannot update the sender details'
    });
  }
  // Sanitize custom branding CSS at write time. `null` means inherit-from-org
  // for teams, so only run the sanitiser when an explicit string is provided.
  // An empty string after sanitisation is collapsed to `null` so the team
  // row inherits rather than persisting an empty override.
  let cssWarnings;
  let sanitizedBrandingCss;
  if (brandingCss === null) {
    sanitizedBrandingCss = null;
  } else if (typeof brandingCss === 'string') {
    const result = sanitizeBrandingCss(brandingCss);
    sanitizedBrandingCss = result.css.trim() === '' ? null : result.css;
    cssWarnings = result.warnings;
  }
  // Strip empty-string colour values; collapse to `null` when the payload
  // contains no overrides. For teams this matters because brandingEnabled
  // = null inherits from the org — leaving `{}` here would persist a real
  // override of nothing once a team toggles brandingEnabled = true.
  const normalizedBrandingColors = normalizeBrandingColors(brandingColors);
  await prismaWithReplicas.team.update({
    where: {
      id: teamId
    },
    data: {
      teamGlobalSettings: {
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
          delegateDocumentOwnership,
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
          emailDocumentSettings: emailDocumentSettings === null ? Prisma.DbNull : emailDocumentSettings,
          defaultRecipients: defaultRecipients === null ? Prisma.DbNull : defaultRecipients,
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

export { updateTeamSettingsRoute };
//# sourceMappingURL=update-team-settings.js.map
