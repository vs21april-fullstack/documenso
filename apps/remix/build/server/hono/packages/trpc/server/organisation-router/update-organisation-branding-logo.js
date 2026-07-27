import { IS_BILLING_ENABLED } from '../../../lib/constants/app.js';
import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildBrandingLogoData } from '../../../lib/server-only/branding/store-branding-logo.js';
import { getOrganisationClaim } from '../../../lib/server-only/organisation/get-organisation-claims.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZUpdateOrganisationBrandingLogoRequestSchema, ZUpdateOrganisationBrandingLogoResponseSchema } from './update-organisation-branding-logo.types.js';

const updateOrganisationBrandingLogoRoute = authenticatedProcedure.input(ZUpdateOrganisationBrandingLogoRequestSchema).output(ZUpdateOrganisationBrandingLogoResponseSchema).mutation(async ({
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
    organisationId
  } = payload;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId: user.id,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
    })
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You do not have permission to update this organisation.'
    });
  }
  // Setting a logo requires the custom-branding entitlement; clearing it is
  // always allowed so a downgraded organisation can still remove its logo.
  if (brandingLogo && IS_BILLING_ENABLED()) {
    const claim = await getOrganisationClaim({
      organisationId
    });
    if (claim.flags?.allowCustomBranding !== true) {
      throw new AppError(AppErrorCode.UNAUTHORIZED, {
        message: 'Your plan does not allow custom branding.'
      });
    }
  }
  const brandingLogoValue = brandingLogo ? await buildBrandingLogoData(brandingLogo) : '';
  await prismaWithReplicas.organisation.update({
    where: {
      id: organisation.id
    },
    data: {
      organisationGlobalSettings: {
        update: {
          brandingLogo: brandingLogoValue
        }
      }
    }
  });
});

export { updateOrganisationBrandingLogoRoute };
//# sourceMappingURL=update-organisation-branding-logo.js.map
