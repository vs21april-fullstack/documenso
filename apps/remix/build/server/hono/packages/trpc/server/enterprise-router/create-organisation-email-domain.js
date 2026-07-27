import { createEmailDomain } from '../../../ee/server-only/lib/create-email-domain.js';
import { IS_BILLING_ENABLED } from '../../../lib/constants/app.js';
import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZCreateOrganisationEmailDomainRequestSchema, ZCreateOrganisationEmailDomainResponseSchema } from './create-organisation-email-domain.types.js';

const createOrganisationEmailDomainRoute = authenticatedProcedure.input(ZCreateOrganisationEmailDomainRequestSchema).output(ZCreateOrganisationEmailDomainResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    organisationId,
    domain
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      organisationId,
      domain
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
      emailDomains: true,
      organisationClaim: true
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.UNAUTHORIZED);
  }
  if (!organisation.organisationClaim.flags.emailDomains) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'Email domains are not enabled for this organisation'
    });
  }
  if (organisation.emailDomains.length >= 100) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'You have reached the maximum number of email domains'
    });
  }
  return await createEmailDomain({
    domain,
    organisationId
  });
});

export { createOrganisationEmailDomainRoute };
//# sourceMappingURL=create-organisation-email-domain.js.map
