import { router } from '../trpc.js';
import { acceptOrganisationMemberInviteRoute } from './accept-organisation-member-invite.js';
import { createOrganisationRoute } from './create-organisation.js';
import { createOrganisationGroupRoute } from './create-organisation-group.js';
import { createOrganisationMemberInvitesRoute } from './create-organisation-member-invites.js';
import { declineOrganisationMemberInviteRoute } from './decline-organisation-member-invite.js';
import { deleteOrganisationRoute } from './delete-organisation.js';
import { deleteOrganisationGroupRoute } from './delete-organisation-group.js';
import { deleteOrganisationMemberRoute } from './delete-organisation-member.js';
import { deleteOrganisationMemberInvitesRoute } from './delete-organisation-member-invites.js';
import { deleteOrganisationMembersRoute } from './delete-organisation-members.js';
import { findOrganisationGroupsRoute } from './find-organisation-groups.js';
import { findOrganisationMemberInvitesRoute } from './find-organisation-member-invites.js';
import { findOrganisationMembersRoute } from './find-organisation-members.js';
import { getOrganisationRoute } from './get-organisation.js';
import { getOrganisationMemberInvitesRoute } from './get-organisation-member-invites.js';
import { getOrganisationQuotaFlagsRoute } from './get-organisation-quota-flags.js';
import { getOrganisationSessionRoute } from './get-organisation-session.js';
import { getOrganisationsRoute } from './get-organisations.js';
import { leaveOrganisationRoute } from './leave-organisation.js';
import { resendOrganisationMemberInviteRoute } from './resend-organisation-member-invite.js';
import { updateOrganisationRoute } from './update-organisation.js';
import { updateOrganisationBrandingLogoRoute } from './update-organisation-branding-logo.js';
import { updateOrganisationGroupRoute } from './update-organisation-group.js';
import { updateOrganisationMemberRoute } from './update-organisation-members.js';
import { updateOrganisationSettingsRoute } from './update-organisation-settings.js';

const organisationRouter = router({
  get: getOrganisationRoute,
  getMany: getOrganisationsRoute,
  getQuotaFlags: getOrganisationQuotaFlagsRoute,
  create: createOrganisationRoute,
  update: updateOrganisationRoute,
  delete: deleteOrganisationRoute,
  leave: leaveOrganisationRoute,
  member: {
    find: findOrganisationMembersRoute,
    update: updateOrganisationMemberRoute,
    delete: deleteOrganisationMemberRoute,
    deleteMany: deleteOrganisationMembersRoute,
    invite: {
      find: findOrganisationMemberInvitesRoute,
      getMany: getOrganisationMemberInvitesRoute,
      createMany: createOrganisationMemberInvitesRoute,
      deleteMany: deleteOrganisationMemberInvitesRoute,
      accept: acceptOrganisationMemberInviteRoute,
      decline: declineOrganisationMemberInviteRoute,
      resend: resendOrganisationMemberInviteRoute
    }
  },
  group: {
    find: findOrganisationGroupsRoute,
    create: createOrganisationGroupRoute,
    update: updateOrganisationGroupRoute,
    delete: deleteOrganisationGroupRoute
  },
  settings: {
    update: updateOrganisationSettingsRoute,
    updateBrandingLogo: updateOrganisationBrandingLogoRoute
  },
  internal: {
    getOrganisationSession: getOrganisationSessionRoute
  }
});

export { organisationRouter };
//# sourceMappingURL=router.js.map
