import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetOrganisationAuthenticationPortalRequestSchema, ZGetOrganisationAuthenticationPortalResponseSchema } from './get-organisation-authentication-portal.types.js';

const getOrganisationAuthenticationPortalRoute = authenticatedProcedure.input(ZGetOrganisationAuthenticationPortalRequestSchema).output(ZGetOrganisationAuthenticationPortalResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    organisationId
  } = input;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  return await getOrganisationAuthenticationPortal({
    userId: ctx.user.id,
    organisationId
  });
});
const getOrganisationAuthenticationPortal = async ({
  userId,
  organisationId
}) => {
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
    }),
    include: {
      organisationClaim: true,
      organisationAuthenticationPortal: {
        select: {
          defaultOrganisationRole: true,
          enabled: true,
          clientId: true,
          wellKnownUrl: true,
          autoProvisionUsers: true,
          allowedDomains: true,
          allowPersonalOrganisations: true,
          clientSecret: true
        }
      }
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Organisation not found'
    });
  }
  if (!organisation.organisationClaim.flags.authenticationPortal) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Authentication portal not found'
    });
  }
  const portal = organisation.organisationAuthenticationPortal;
  return {
    defaultOrganisationRole: portal.defaultOrganisationRole,
    enabled: portal.enabled,
    clientId: portal.clientId,
    wellKnownUrl: portal.wellKnownUrl,
    autoProvisionUsers: portal.autoProvisionUsers,
    allowedDomains: portal.allowedDomains,
    allowPersonalOrganisations: portal.allowPersonalOrganisations,
    clientSecretProvided: Boolean(portal.clientSecret)
  };
};

export { getOrganisationAuthenticationPortal, getOrganisationAuthenticationPortalRoute };
//# sourceMappingURL=get-organisation-authentication-portal.js.map
