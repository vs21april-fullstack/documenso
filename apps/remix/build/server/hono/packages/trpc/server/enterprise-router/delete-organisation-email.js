import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZDeleteOrganisationEmailRequestSchema, ZDeleteOrganisationEmailResponseSchema } from './delete-organisation-email.types.js';

const deleteOrganisationEmailRoute = authenticatedProcedure.input(ZDeleteOrganisationEmailRequestSchema).output(ZDeleteOrganisationEmailResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    emailId
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      emailId
    }
  });
  const email = await prismaWithReplicas.organisationEmail.findFirst({
    where: {
      id: emailId,
      organisation: buildOrganisationWhereQuery({
        organisationId: undefined,
        userId: user.id,
        roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
      })
    }
  });
  if (!email) {
    throw new AppError(AppErrorCode.UNAUTHORIZED);
  }
  await prismaWithReplicas.organisationEmail.delete({
    where: {
      id: email.id
    }
  });
});

export { deleteOrganisationEmailRoute };
//# sourceMappingURL=delete-organisation-email.js.map
