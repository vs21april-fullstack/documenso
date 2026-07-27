import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';

const getOrganisationClaim = async ({
  organisationId
}) => {
  const organisationClaim = await prismaWithReplicas.organisationClaim.findFirst({
    where: {
      organisation: {
        id: organisationId
      }
    }
  });
  if (!organisationClaim) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  return organisationClaim;
};
const getOrganisationClaimByTeamId = async ({
  teamId
}) => {
  const organisationClaim = await prismaWithReplicas.organisationClaim.findFirst({
    where: {
      organisation: {
        teams: {
          some: {
            id: teamId
          }
        }
      }
    }
  });
  if (!organisationClaim) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  return organisationClaim;
};

export { getOrganisationClaim, getOrganisationClaimByTeamId };
//# sourceMappingURL=get-organisation-claims.js.map
