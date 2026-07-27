import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_DOCUMENT_VISIBILITY_MAP } from '../../constants/teams.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { unsafeBuildEnvelopeIdsQuery } from '../../utils/envelope.js';
import { getTeamById } from '../team/get-team.js';

/**
 * Fetches multiple envelopes by their IDs with proper access control.
 *
 * Only returns envelopes that the user has valid access to based on:
 * 1. Document ownership (userId matches)
 * 2. Team membership with appropriate visibility level
 * 3. Team email ownership
 *
 * NOTE: Be extremely careful when modifying this function. Needs at minimum two reviewers to approve any changes.
 */
const getEnvelopesByIds = async ({
  ids,
  userId,
  teamId,
  type
}) => {
  const {
    envelopeWhereInput
  } = await getMultipleEnvelopeWhereInput({
    ids,
    userId,
    teamId,
    type
  });
  const envelopes = await prismaWithReplicas.envelope.findMany({
    where: envelopeWhereInput,
    include: {
      envelopeItems: {
        include: {
          documentData: true
        },
        orderBy: {
          order: 'asc'
        }
      },
      folder: true,
      documentMeta: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      recipients: {
        orderBy: {
          id: 'asc'
        }
      },
      fields: true,
      team: {
        select: {
          id: true,
          url: true
        }
      },
      directLink: {
        select: {
          directTemplateRecipientId: true,
          enabled: true,
          id: true,
          token: true
        }
      }
    }
  });
  return envelopes.map(envelope => ({
    ...envelope,
    user: {
      id: envelope.user.id,
      name: envelope.user.name || '',
      email: envelope.user.email
    }
  }));
};
/**
 * Generate the where input for a multiple envelope Prisma query.
 *
 * This will return a query that allows a user to get documents if they have valid access to them.
 *
 * NOTE: Be extremely careful when modifying this function. Needs at minimum two reviewers to approve any changes.
 */
const getMultipleEnvelopeWhereInput = async ({
  ids,
  userId,
  teamId,
  type
}) => {
  // Backup validation incase something goes wrong.
  if (!ids.ids || !userId || !teamId || type === undefined) {
    console.error(`[CRTICAL ERROR]: MUST NEVER HAPPEN`);
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope IDs not found'
    });
  }
  // Validate that the user belongs to the team provided.
  const team = await getTeamById({
    teamId,
    userId
  });
  const envelopeOrInput = [
  // Allow access if they own the document.
  {
    userId
  },
  // Or, if they belong to the team that the document is associated with.
  {
    visibility: {
      in: TEAM_DOCUMENT_VISIBILITY_MAP[team.currentTeamRole]
    },
    teamId: team.id
  }];
  // Allow access to documents sent from the team email.
  if (team.teamEmail) {
    envelopeOrInput.push({
      user: {
        email: team.teamEmail.email
      }
    });
  }
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // NOTE: DO NOT PUT ANY CODE AFTER THIS POINT.
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  const envelopeWhereInput = {
    ...unsafeBuildEnvelopeIdsQuery(ids, type),
    OR: envelopeOrInput
  };
  // Final backup validation incase something goes wrong.
  if (!envelopeWhereInput.OR || envelopeWhereInput.OR.length < 2 || !userId || !teamId || !team.id || teamId !== team.id) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'Query not valid'
    });
  }
  // Do not modify this return directly, all adjustments need to be made prior to the above if statement.
  return {
    envelopeWhereInput,
    team
  };
};

export { getEnvelopesByIds, getMultipleEnvelopeWhereInput };
//# sourceMappingURL=get-envelopes-by-ids.js.map
