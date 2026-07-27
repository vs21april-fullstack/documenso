import { deleteEmailDomain } from '../../../ee/server-only/lib/delete-email-domain.js';
import { IS_BILLING_ENABLED } from '../../../lib/constants/app.js';
import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZDeleteOrganisationEmailDomainRequestSchema, ZDeleteOrganisationEmailDomainResponseSchema } from './delete-organisation-email-domain.types.js';

const deleteOrganisationEmailDomainRoute = authenticatedProcedure.input(ZDeleteOrganisationEmailDomainRequestSchema).output(ZDeleteOrganisationEmailDomainResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    emailDomainId
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      emailDomainId
    }
  });
  if (!IS_BILLING_ENABLED()) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Billing is not enabled'
    });
  }
  const emailDomain = await prismaWithReplicas.emailDomain.findFirst({
    where: {
      id: emailDomainId,
      organisation: buildOrganisationWhereQuery({
        organisationId: undefined,
        userId: user.id,
        roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
      })
    }
  });
  if (!emailDomain) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Email domain not found'
    });
  }
  await deleteEmailDomain({
    emailDomainId: emailDomain.id
  });
});

export { deleteOrganisationEmailDomainRoute };
//# sourceMappingURL=delete-organisation-email-domain.js.map
