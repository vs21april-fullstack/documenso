import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TEAM_DOCUMENT_VISIBILITY_MAP } from '../../constants/teams.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { unsafeBuildEnvelopeIdQuery } from '../../utils/envelope.js';
import { getTeamById } from '../team/get-team.js';

const getEnvelopeById = async ({
  id,
  userId,
  teamId,
  type
}) => {
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id,
    userId,
    teamId,
    type
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
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
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope could not be found'
    });
  }
  return {
    ...envelope,
    user: {
      id: envelope.user.id,
      name: envelope.user.name || '',
      email: envelope.user.email
    }
  };
};
/**
 * Generate the where input for a given Prisma envelope query.
 *
 * This will return a query that allows a user to get a document if they have valid access to it.
 *
 * NOTE: Be extremely careful when modifying this function. Needs at minimum two reviewers to approve any changes.
 */
const getEnvelopeWhereInput = async ({
  id,
  userId,
  teamId,
  type
}) => {
  // Backup validation incase something goes wrong.
  if (!id.id || !userId || !teamId || type === undefined) {
    console.error(`[CRTICAL ERROR]: MUST NEVER HAPPEN`);
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope ID not found'
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
    ...unsafeBuildEnvelopeIdQuery(id, type),
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

export { getEnvelopeById, getEnvelopeWhereInput };
//# sourceMappingURL=get-envelope-by-id.js.map
