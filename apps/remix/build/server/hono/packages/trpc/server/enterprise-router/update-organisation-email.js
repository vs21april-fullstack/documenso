import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZUpdateOrganisationEmailRequestSchema, ZUpdateOrganisationEmailResponseSchema } from './update-organisation-email.types.js';

const updateOrganisationEmailRoute = authenticatedProcedure.input(ZUpdateOrganisationEmailRequestSchema).output(ZUpdateOrganisationEmailResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    emailId,
    emailName
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      emailId
    }
  });
  const organisationEmail = await prismaWithReplicas.organisationEmail.findFirst({
    where: {
      id: emailId,
      organisation: buildOrganisationWhereQuery({
        organisationId: undefined,
        userId: user.id,
        roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
      })
    }
  });
  if (!organisationEmail) {
    throw new AppError(AppErrorCode.UNAUTHORIZED);
  }
  await prismaWithReplicas.organisationEmail.update({
    where: {
      id: emailId
    },
    data: {
      emailName
      // replyTo,
    }
  });
});

export { updateOrganisationEmailRoute };
//# sourceMappingURL=update-organisation-email.js.map
