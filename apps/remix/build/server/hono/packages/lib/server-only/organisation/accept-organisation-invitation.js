import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationGroupType, OrganisationMemberInviteStatus } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { jobs } from '../../jobs/client.js';
import { generateDatabaseId } from '../../universal/id.js';

const acceptOrganisationInvitation = async ({
  token
}) => {
  const organisationMemberInvite = await prismaWithReplicas.organisationMemberInvite.findFirst({
    where: {
      token,
      status: {
        not: OrganisationMemberInviteStatus.DECLINED
      }
    },
    include: {
      organisation: {
        include: {
          groups: true
        }
      }
    }
  });
  if (!organisationMemberInvite) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  if (organisationMemberInvite.status === OrganisationMemberInviteStatus.ACCEPTED) {
    return;
  }
  const user = await prismaWithReplicas.user.findFirst({
    where: {
      email: {
        equals: organisationMemberInvite.email
      }
    },
    select: {
      id: true
    }
  });
  if (!user) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'User must exist to accept an organisation invitation'
    });
  }
  const {
    organisation
  } = organisationMemberInvite;
  const isUserPartOfOrganisation = await prismaWithReplicas.organisationMember.findFirst({
    where: {
      userId: user.id,
      organisationId: organisation.id
    }
  });
  if (isUserPartOfOrganisation) {
    return;
  }
  await addUserToOrganisation({
    userId: user.id,
    organisationId: organisation.id,
    organisationGroups: organisation.groups,
    organisationMemberRole: organisationMemberInvite.organisationRole
  });
  await prismaWithReplicas.organisationMemberInvite.update({
    where: {
      id: organisationMemberInvite.id
    },
    data: {
      status: OrganisationMemberInviteStatus.ACCEPTED
    }
  });
};
const addUserToOrganisation = async ({
  userId,
  organisationId,
  organisationGroups,
  organisationMemberRole,
  bypassEmail = false
}) => {
  const organisationGroupToUse = organisationGroups.find(group => group.type === OrganisationGroupType.INTERNAL_ORGANISATION && group.organisationRole === organisationMemberRole);
  if (!organisationGroupToUse) {
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: 'Organisation group not found'
    });
  }
  await prismaWithReplicas.organisationMember.create({
    data: {
      id: generateDatabaseId('member'),
      userId,
      organisationId,
      organisationGroupMembers: {
        create: {
          id: generateDatabaseId('group_member'),
          groupId: organisationGroupToUse.id
        }
      }
    }
  });
  if (!bypassEmail) {
    await jobs.triggerJob({
      name: 'send.organisation-member-joined.email',
      payload: {
        organisationId,
        memberUserId: userId
      }
    });
  }
};

export { acceptOrganisationInvitation, addUserToOrganisation };
//# sourceMappingURL=accept-organisation-invitation.js.map
