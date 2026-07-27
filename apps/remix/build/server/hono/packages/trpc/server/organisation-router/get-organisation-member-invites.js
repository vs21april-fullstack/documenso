import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetOrganisationMemberInvitesRequestSchema, ZGetOrganisationMemberInvitesResponseSchema } from './get-organisation-member-invites.types.js';

const getOrganisationMemberInvitesRoute = authenticatedProcedure
//   .meta(getOrganisationMemberInvitesMeta)
.input(ZGetOrganisationMemberInvitesRequestSchema).output(ZGetOrganisationMemberInvitesResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    user
  } = ctx;
  const {
    status
  } = input;
  return await prismaWithReplicas.organisationMemberInvite.findMany({
    where: {
      email: user.email,
      status
    },
    include: {
      organisation: {
        select: {
          id: true,
          name: true,
          url: true,
          avatarImageId: true
        }
      }
    }
  });
});

export { getOrganisationMemberInvitesRoute };
//# sourceMappingURL=get-organisation-member-invites.js.map
