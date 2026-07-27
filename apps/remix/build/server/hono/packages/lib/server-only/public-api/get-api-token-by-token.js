import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { hashString } from '../auth/hash.js';
import { assertOrganisationRatesAndLimits } from '../rate-limit/assert-organisation-rates-and-limits.js';

const getApiTokenByToken = async ({
  token,
  bypassRateLimit = false
}) => {
  const hashedToken = hashString(token);
  const apiToken = await prismaWithReplicas.apiToken.findFirst({
    where: {
      token: hashedToken
    },
    include: {
      team: {
        include: {
          organisation: {
            include: {
              organisationClaim: true,
              owner: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  disabled: true
                }
              }
            }
          }
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          disabled: true
        }
      }
    }
  });
  if (!apiToken) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'Invalid token',
      statusCode: 401
    });
  }
  if (apiToken.user?.disabled || apiToken.team.organisation.owner.disabled) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'User is disabled',
      statusCode: 401
    });
  }
  if (apiToken.expires && apiToken.expires < new Date()) {
    throw new AppError(AppErrorCode.EXPIRED_CODE, {
      message: 'Expired token',
      statusCode: 401
    });
  }
  if (!bypassRateLimit) {
    await assertOrganisationRatesAndLimits({
      organisationId: apiToken.team.organisationId,
      organisationClaim: apiToken.team.organisation.organisationClaim,
      type: 'api',
      count: 1
    });
  }
  // Handle a silly choice from many moons ago
  if (apiToken.team && !apiToken.user) {
    apiToken.user = apiToken.team.organisation.owner;
  }
  const {
    user
  } = apiToken;
  // This will never happen but we need to narrow types
  if (!user) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'Invalid token',
      statusCode: 401
    });
  }
  return {
    ...apiToken,
    user
  };
};

export { getApiTokenByToken };
//# sourceMappingURL=get-api-token-by-token.js.map
