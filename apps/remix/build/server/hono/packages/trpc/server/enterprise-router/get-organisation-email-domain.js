import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetOrganisationEmailDomainRequestSchema, ZGetOrganisationEmailDomainResponseSchema } from './get-organisation-email-domain.types.js';

const getOrganisationEmailDomainRoute = authenticatedProcedure.input(ZGetOrganisationEmailDomainRequestSchema).output(ZGetOrganisationEmailDomainResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    emailDomainId
  } = input;
  ctx.logger.info({
    input: {
      emailDomainId
    }
  });
  return await getOrganisationEmailDomain({
    userId: ctx.user.id,
    emailDomainId
  });
});
const getOrganisationEmailDomain = async ({
  userId,
  emailDomainId
}) => {
  const emailDomain = await prismaWithReplicas.emailDomain.findFirst({
    where: {
      id: emailDomainId,
      organisation: buildOrganisationWhereQuery({
        organisationId: undefined,
        userId,
        roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
      })
    },
    omit: {
      privateKey: true
    },
    include: {
      emails: true
    }
  });
  if (!emailDomain) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Email domain not found'
    });
  }
  return emailDomain;
};

export { getOrganisationEmailDomain, getOrganisationEmailDomainRoute };
//# sourceMappingURL=get-organisation-email-domain.js.map
