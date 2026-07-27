import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../constants/teams.js';
import { AppError, AppErrorCode } from '../../../errors/app-error.js';
import { buildTeamWhereQuery } from '../../../utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { validateApiToken } from './validateApiToken.js';

const unsubscribeHandler = async req => {
  try {
    const authorization = req.headers.get('authorization');
    if (!authorization) {
      throw new AppError(AppErrorCode.UNAUTHORIZED, {
        message: 'Unauthorized'
      });
    }
    const {
      webhookId
    } = await req.json();
    const result = await validateApiToken({
      authorization
    }).catch(() => {
      throw new AppError(AppErrorCode.UNAUTHORIZED, {
        message: 'Unauthorized'
      });
    });
    const userId = result.userId ?? result.user.id;
    const teamId = result.teamId ?? undefined;
    // Re-verify the token holder still has MANAGE_TEAM on the team, mirroring the
    // tRPC delete-webhook-by-id mutation. Guards against stale-privilege use of a
    // token minted while the holder was privileged.
    const deletedWebhook = await prismaWithReplicas.webhook.delete({
      where: {
        id: webhookId,
        team: buildTeamWhereQuery({
          teamId,
          userId,
          roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
        })
      }
    });
    return Response.json(deletedWebhook);
  } catch (err) {
    if (err instanceof AppError) {
      // Map authorization failures to 401, keep other AppErrors as 400 to
      // preserve the existing Zapier contract.
      const status = err.code === AppErrorCode.UNAUTHORIZED ? 401 : 400;
      return Response.json({
        message: err.message
      }, {
        status
      });
    }
    console.error(err);
    return Response.json({
      message: 'Internal Server Error'
    }, {
      status: 500
    });
  }
};

export { unsubscribeHandler };
//# sourceMappingURL=unsubscribe.js.map
