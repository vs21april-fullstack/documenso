import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { generateDatabaseId } from '../../../lib/universal/id.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZCreateOrganisationEmailRequestSchema, ZCreateOrganisationEmailResponseSchema } from './create-organisation-email.types.js';

const createOrganisationEmailRoute = authenticatedProcedure.input(ZCreateOrganisationEmailRequestSchema).output(ZCreateOrganisationEmailResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    email,
    emailName,
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
  const allowedEmailSuffix = '@' + emailDomain.domain;
  if (!email.endsWith(allowedEmailSuffix)) {
    throw new AppError(AppErrorCode.INVALID_BODY, {
      message: 'Cannot create an email with a different domain'
    });
  }
  await prismaWithReplicas.organisationEmail.create({
    data: {
      id: generateDatabaseId('org_email'),
      organisationId: emailDomain.organisationId,
      emailName,
      // replyTo,
      email,
      emailDomainId
    }
  });
});

export { createOrganisationEmailRoute };
//# sourceMappingURL=create-organisation-email.js.map
