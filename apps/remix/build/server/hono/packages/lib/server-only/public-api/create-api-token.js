import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { DateTime } from 'luxon';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import * as time from '../../constants/time.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { alphaid } from '../../universal/id.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';
import { hashString } from '../auth/hash.js';

const createApiToken = async ({
  userId,
  teamId,
  tokenName,
  expiresIn
}) => {
  const apiToken = `api_${alphaid(16)}`;
  const hashedToken = hashString(apiToken);
  const timeConstantsRecords = time;
  const team = await prismaWithReplicas.team.findFirst({
    where: buildTeamWhereQuery({
      teamId,
      userId,
      roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
    })
  });
  if (!team) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You do not have permission to create a token for this team'
    });
  }
  const storedToken = await prismaWithReplicas.apiToken.create({
    data: {
      name: tokenName,
      token: hashedToken,
      expires: expiresIn ? DateTime.now().plus(timeConstantsRecords[expiresIn]).toJSDate() : null,
      userId,
      teamId
    }
  });
  return {
    id: storedToken.id,
    token: apiToken
  };
};

export { createApiToken };
//# sourceMappingURL=create-api-token.js.map
