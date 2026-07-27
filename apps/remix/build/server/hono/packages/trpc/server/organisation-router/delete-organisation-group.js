import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { getMemberOrganisationRole } from '../../../lib/server-only/team/get-member-roles.js';
import { buildOrganisationWhereQuery, isOrganisationRoleWithinUserHierarchy } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { OrganisationGroupType } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { ZDeleteOrganisationGroupRequestSchema, ZDeleteOrganisationGroupResponseSchema } from './delete-organisation-group.types.js';

const deleteOrganisationGroupRoute = authenticatedProcedure
// .meta(deleteOrganisationGroupMeta)
.input(ZDeleteOrganisationGroupRequestSchema).output(ZDeleteOrganisationGroupResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    groupId,
    organisationId
  } = input;
  const {
    user
  } = ctx;
  ctx.logger.info({
    input: {
      groupId,
      organisationId
    }
  });
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId: user.id,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
    })
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.UNAUTHORIZED);
  }
  const group = await prismaWithReplicas.organisationGroup.findFirst({
    where: {
      id: groupId,
      organisationId
    }
  });
  if (!group) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Organisation group not found'
    });
  }
  if (group.type === OrganisationGroupType.INTERNAL_ORGANISATION || group.type === OrganisationGroupType.INTERNAL_TEAM) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You are not allowed to delete internal groups'
    });
  }
  const currentUserOrganisationRole = await getMemberOrganisationRole({
    organisationId,
    reference: {
      type: 'User',
      id: user.id
    }
  });
  // A user cannot delete a group whose role is higher than their own
  // (e.g. a manager deleting an admin-role group).
  if (!isOrganisationRoleWithinUserHierarchy(currentUserOrganisationRole, group.organisationRole)) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You are not allowed to delete this organisation group'
    });
  }
  await prismaWithReplicas.organisationGroup.delete({
    where: {
      id: groupId,
      organisationId: organisation.id
    }
  });
});

export { deleteOrganisationGroupRoute };
//# sourceMappingURL=delete-organisation-group.js.map
