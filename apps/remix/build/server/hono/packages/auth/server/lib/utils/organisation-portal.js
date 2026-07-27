import { IS_BILLING_ENABLED } from '../../../../lib/constants/app.js';
import { DOCUMENSO_ENCRYPTION_KEY } from '../../../../lib/constants/crypto.js';
import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { symmetricDecrypt } from '../../../../lib/universal/crypto.js';
import { formatOrganisationCallbackUrl } from '../../../../lib/utils/organisation-authentication-portal.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';

const getOrganisationAuthenticationPortalOptions = async options => {
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: options.type === 'url' ? {
      url: options.organisationUrl
    } : {
      id: options.organisationId
    },
    include: {
      organisationClaim: true,
      organisationAuthenticationPortal: true,
      groups: true
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Organisation not found'
    });
  }
  if (!IS_BILLING_ENABLED()) {
    throw new AppError(AppErrorCode.NOT_SETUP, {
      message: 'Billing is not enabled'
    });
  }
  if (!organisation.organisationClaim.flags.authenticationPortal || !organisation.organisationAuthenticationPortal.enabled) {
    throw new AppError(AppErrorCode.NOT_SETUP, {
      message: 'Authentication portal is not enabled for this organisation'
    });
  }
  const {
    clientId,
    clientSecret: encryptedClientSecret,
    wellKnownUrl
  } = organisation.organisationAuthenticationPortal;
  if (!clientId || !encryptedClientSecret || !wellKnownUrl) {
    throw new AppError(AppErrorCode.NOT_SETUP, {
      message: 'Authentication portal is not configured for this organisation'
    });
  }
  if (!DOCUMENSO_ENCRYPTION_KEY) {
    throw new AppError(AppErrorCode.NOT_SETUP, {
      message: 'Encryption key is not set'
    });
  }
  const clientSecret = Buffer.from(symmetricDecrypt({
    key: DOCUMENSO_ENCRYPTION_KEY,
    data: encryptedClientSecret
  })).toString('utf-8');
  return {
    organisation,
    clientId,
    clientSecret,
    wellKnownUrl,
    clientOptions: {
      id: organisation.id,
      scope: ['openid', 'email', 'profile'],
      clientId,
      clientSecret,
      redirectUrl: formatOrganisationCallbackUrl(organisation.url),
      wellKnownUrl
    }
  };
};

export { getOrganisationAuthenticationPortalOptions };
//# sourceMappingURL=organisation-portal.js.map
