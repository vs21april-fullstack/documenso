import { IS_BILLING_ENABLED } from '../../../lib/constants/app.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/teams.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildBrandingLogoData } from '../../../lib/server-only/branding/store-branding-logo.js';
import { getOrganisationClaimByTeamId } from '../../../lib/server-only/organisation/get-organisation-claims.js';
import { buildTeamWhereQuery } from '../../../lib/utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZUpdateTeamBrandingLogoRequestSchema, ZUpdateTeamBrandingLogoResponseSchema } from './update-team-branding-logo.types.js';

const updateTeamBrandingLogoRoute = authenticatedProcedure.input(ZUpdateTeamBrandingLogoRequestSchema).output(ZUpdateTeamBrandingLogoResponseSchema).mutation(async ({
  ctx,
  input
}) => {
  const {
    user
  } = ctx;
  const {
    payload,
    brandingLogo
  } = input;
  const {
    teamId
  } = payload;
  ctx.logger.info({
    input: {
      teamId
    }
  });
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
  // Setting a logo requires the custom-branding entitlement; clearing it is
  // always allowed so a downgraded team can still remove its logo.
  if (brandingLogo && IS_BILLING_ENABLED()) {
    const claim = await getOrganisationClaimByTeamId({
      teamId
    });
    if (claim.flags?.allowCustomBranding !== true) {
      throw new AppError(AppErrorCode.UNAUTHORIZED, {
        message: 'Your plan does not allow custom branding.'
      });
    }
  }
  const brandingLogoValue = brandingLogo ? await buildBrandingLogoData(brandingLogo) : '';
  await prismaWithReplicas.team.update({
    where: {
      id: team.id
    },
    data: {
      teamGlobalSettings: {
        update: {
          brandingLogo: brandingLogoValue
        }
      }
    }
  });
});

export { updateTeamBrandingLogoRoute };
//# sourceMappingURL=update-team-branding-logo.js.map
