import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/organisations.js';
import { TEAM_MEMBER_ROLE_PERMISSIONS_MAP } from '../../constants/teams.js';
import { AppError } from '../../errors/app-error.js';
import { optimiseAvatar } from '../../utils/images/avatar.js';
import { buildOrganisationWhereQuery } from '../../utils/organisations.js';
import { buildTeamWhereQuery } from '../../utils/teams.js';

/**
 * Pretty nasty but will do for now.
 */
const setAvatarImage = async ({
  userId,
  target,
  bytes,
  requestMetadata
}) => {
  let oldAvatarImageId = null;
  if (target.type === 'team') {
    const team = await prismaWithReplicas.team.findFirst({
      where: buildTeamWhereQuery({
        teamId: target.teamId,
        userId,
        roles: TEAM_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_TEAM']
      })
    });
    if (!team) {
      throw new AppError('TEAM_NOT_FOUND', {
        statusCode: 404
      });
    }
    oldAvatarImageId = team.avatarImageId;
  } else if (target.type === 'organisation') {
    const organisation = await prismaWithReplicas.organisation.findFirst({
      where: buildOrganisationWhereQuery({
        organisationId: target.organisationId,
        userId,
        roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
      })
    });
    if (!organisation) {
      throw new AppError('ORGANISATION_NOT_FOUND', {
        statusCode: 404
      });
    }
    oldAvatarImageId = organisation.avatarImageId;
  } else {
    const user = await prismaWithReplicas.user.findUnique({
      where: {
        id: userId
      },
      include: {
        avatarImage: true
      }
    });
    if (!user) {
      throw new AppError('USER_NOT_FOUND', {
        statusCode: 404
      });
    }
    oldAvatarImageId = user.avatarImageId;
  }
  if (oldAvatarImageId) {
    await prismaWithReplicas.avatarImage.delete({
      where: {
        id: oldAvatarImageId
      }
    });
  }
  let newAvatarImageId = null;
  if (bytes) {
    const optimisedBytes = await optimiseAvatar(bytes);
    const avatarImage = await prismaWithReplicas.avatarImage.create({
      data: {
        bytes: optimisedBytes.toString('base64')
      }
    });
    newAvatarImageId = avatarImage.id;
  }
  // TODO: Audit Logs
  if (target.type === 'team') {
    await prismaWithReplicas.team.update({
      where: {
        id: target.teamId
      },
      data: {
        avatarImageId: newAvatarImageId
      }
    });
  } else if (target.type === 'organisation') {
    await prismaWithReplicas.organisation.update({
      where: {
        id: target.organisationId
      },
      data: {
        avatarImageId: newAvatarImageId
      }
    });
  } else {
    await prismaWithReplicas.user.update({
      where: {
        id: userId
      },
      data: {
        avatarImageId: newAvatarImageId
      }
    });
  }
  return newAvatarImageId;
};

export { setAvatarImage };
//# sourceMappingURL=set-avatar-image.js.map
