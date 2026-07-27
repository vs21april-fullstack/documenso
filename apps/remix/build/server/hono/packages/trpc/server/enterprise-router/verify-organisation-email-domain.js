import { verifyEmailDomain } from '../../../ee/server-only/lib/verify-email-domain.js';
import { IS_BILLING_ENABLED } from '../../../lib/constants/app.js';
import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZVerifyOrganisationEmailDomainRequestSchema, ZVerifyOrganisationEmailDomainResponseSchema } from './verify-organisation-email-domain.types.js';

const verifyOrganisationEmailDomainRoute = authenticatedProcedure.input(ZVerifyOrganisationEmailDomainRequestSchema).output(ZVerifyOrganisationEmailDomainResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    organisationId,
    emailDomainId
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      organisationId,
      emailDomainId
    }
  });
  if (!IS_BILLING_ENABLED()) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Billing is not enabled'
    });
  }
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId: user.id,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
    }),
    include: {
      emailDomains: true
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.UNAUTHORIZED);
  }
  // Filter down emails to verify a specific email, otherwise verify all emails regardless of status.
  const emailsToVerify = organisation.emailDomains.filter(email => {
    if (emailDomainId && email.id !== emailDomainId) {
      return false;
    }
    return true;
  });
  await Promise.all(emailsToVerify.map(async email => verifyEmailDomain(email.id)));
});

export { verifyOrganisationEmailDomainRoute };
//# sourceMappingURL=verify-organisation-email-domain.js.map
