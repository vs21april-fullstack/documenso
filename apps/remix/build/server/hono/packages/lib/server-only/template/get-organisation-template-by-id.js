import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { TemplateType, EnvelopeType } from '@prisma/client';
import { TEAM_DOCUMENT_VISIBILITY_MAP } from '../../constants/teams.js';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { unsafeBuildEnvelopeIdQuery } from '../../utils/envelope.js';
import { getMemberRoles } from '../team/get-member-roles.js';
import { getTeamById } from '../team/get-team.js';

/**
 * Get an organisation template by ID.
 *
 * This validates that the caller's team belongs to the same organisation as the template's team,
 * that the template is of type ORGANISATION, and that the template's visibility is permitted
 * for the caller's role on their own team.
 */
const getOrganisationTemplateById = async ({
  id,
  userId,
  teamId
}) => {
  const [callerTeam, {
    teamRole
  }] = await Promise.all([getTeamById({
    teamId,
    userId
  }), getMemberRoles({
    teamId,
    reference: {
      type: 'User',
      id: userId
    }
  })]);
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: {
      ...unsafeBuildEnvelopeIdQuery(id, EnvelopeType.TEMPLATE),
      templateType: TemplateType.ORGANISATION,
      visibility: {
        in: TEAM_DOCUMENT_VISIBILITY_MAP[teamRole]
      },
      team: {
        organisationId: callerTeam.organisationId
      }
    },
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
      message: 'Organisation template not found'
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
 * Build a where input for querying an organisation template.
 *
 * Matches a TEMPLATE envelope with templateType ORGANISATION belonging to any team
 * within the provided organisation, respecting the caller's team role visibility.
 */
const getOrganisationTemplateWhereInput = ({
  id,
  organisationId,
  teamRole
}) => {
  return {
    ...unsafeBuildEnvelopeIdQuery(id, EnvelopeType.TEMPLATE),
    type: EnvelopeType.TEMPLATE,
    templateType: TemplateType.ORGANISATION,
    visibility: {
      in: TEAM_DOCUMENT_VISIBILITY_MAP[teamRole]
    },
    team: {
      organisationId
    }
  };
};

export { getOrganisationTemplateById, getOrganisationTemplateWhereInput };
//# sourceMappingURL=get-organisation-template-by-id.js.map
