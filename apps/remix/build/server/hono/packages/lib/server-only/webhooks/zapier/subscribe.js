import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../constants/teams.js';
import { AppError, AppErrorCode } from '../../../errors/app-error.js';
import { buildTeamWhereQuery } from '../../../utils/teams.js';
import { prisma as prismaWithReplicas } from '../../../../prisma/index.js';
import { assertNotPrivateUrl } from '../assert-webhook-url.js';
import { validateApiToken } from './validateApiToken.js';

const subscribeHandler = async req => {
  try {
    const authorization = req.headers.get('authorization');
    if (!authorization) {
      throw new AppError(AppErrorCode.UNAUTHORIZED, {
        message: 'Unauthorized'
      });
    }
    const {
      webhookUrl,
      eventTrigger
    } = await req.json();
    await assertNotPrivateUrl(webhookUrl);
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
    // tRPC webhook mutations (create-webhook.ts). Guards against stale-privilege
    // use of a token minted while the holder was privileged.
    const team = await prismaWithReplicas.team.findFirst({
      where: buildTeamWhereQuery({
        teamId,
        userId,
        roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
      })
    });
    if (!team) {
      throw new AppError(AppErrorCode.UNAUTHORIZED, {
        message: 'You do not have permission to manage webhooks for this team'
      });
    }
    const createdWebhook = await prismaWithReplicas.webhook.create({
      data: {
        webhookUrl,
        eventTriggers: [eventTrigger],
        secret: null,
        enabled: true,
        userId,
        teamId
      }
    });
    return Response.json(createdWebhook);
  } catch (err) {
    if (err instanceof AppError) {
      // Map authorization failures to 401, keep other AppErrors as 400 to
      // preserve the existing Zapier contract (e.g. invalid webhook URL).
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

export { subscribeHandler };
//# sourceMappingURL=subscribe.js.map
