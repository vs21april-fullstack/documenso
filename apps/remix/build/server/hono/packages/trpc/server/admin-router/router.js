import { router } from '../trpc.js';
import { createAdminOrganisationRoute } from './create-admin-organisation.js';
import { createStripeCustomerRoute } from './create-stripe-customer.js';
import { createSubscriptionClaimRoute } from './create-subscription-claim.js';
import { createUserRoute } from './create-user.js';
import { deleteDocumentRoute } from './delete-document.js';
import { deleteOrganisationRoute } from './delete-organisation.js';
import { deleteAdminOrganisationMemberRoute } from './delete-organisation-member.js';
import { deleteSubscriptionClaimRoute } from './delete-subscription-claim.js';
import { deleteAdminTeamMemberRoute } from './delete-team-member.js';
import { deleteUserRoute } from './delete-user.js';
import { disableUserRoute } from './disable-user.js';
import { downloadDocumentAuditLogsRoute } from './download-document-audit-logs.js';
import { createEmailTransportRoute } from './email-transport/create-email-transport.js';
import { deleteEmailTransportRoute } from './email-transport/delete-email-transport.js';
import { findEmailTransportsRoute } from './email-transport/find-email-transports.js';
import { sendTestEmailTransportRoute } from './email-transport/send-test-email-transport.js';
import { updateEmailTransportRoute } from './email-transport/update-email-transport.js';
import { enableUserRoute } from './enable-user.js';
import { findAdminOrganisationsRoute } from './find-admin-organisations.js';
import { findDocumentAuditLogsRoute } from './find-document-audit-logs.js';
import { findDocumentJobsRoute } from './find-document-jobs.js';
import { findDocumentsRoute } from './find-documents.js';
import { findEmailDomainsRoute } from './find-email-domains.js';
import { findOrganisationStatsRoute } from './find-organisation-stats.js';
import { findSubscriptionClaimsRoute } from './find-subscription-claims.js';
import { findUnsealedDocumentsRoute } from './find-unsealed-documents.js';
import { findUserTeamsRoute } from './find-user-teams.js';
import { getAdminOrganisationRoute } from './get-admin-organisation.js';
import { getAdminTeamRoute } from './get-admin-team.js';
import { getEmailDomainRoute } from './get-email-domain.js';
import { getUserRoute } from './get-user.js';
import { promoteMemberToOwnerRoute } from './promote-member-to-owner.js';
import { reregisterEmailDomainRoute } from './reregister-email-domain.js';
import { resealDocumentRoute } from './reseal-document.js';
import { resetOrganisationMonthlyStatRoute } from './reset-organisation-monthly-stat.js';
import { resetTwoFactorRoute } from './reset-two-factor-authentication.js';
import { resyncLicenseRoute } from './resync-license.js';
import { swapOrganisationSubscriptionRoute } from './swap-organisation-subscription.js';
import { syncOrganisationSubscriptionRoute } from './sync-organisation-subscription.js';
import { updateAdminOrganisationRoute } from './update-admin-organisation.js';
import { updateOrganisationMemberRoleRoute } from './update-organisation-member-role.js';
import { updateRecipientRoute } from './update-recipient.js';
import { updateSiteSettingRoute } from './update-site-setting.js';
import { updateSubscriptionClaimRoute } from './update-subscription-claim.js';
import { updateUserRoute } from './update-user.js';

const adminRouter = router({
  organisation: {
    find: findAdminOrganisationsRoute,
    get: getAdminOrganisationRoute,
    create: createAdminOrganisationRoute,
    update: updateAdminOrganisationRoute,
    delete: deleteOrganisationRoute,
    subscription: {
      swap: swapOrganisationSubscriptionRoute,
      sync: syncOrganisationSubscriptionRoute
    },
    stats: {
      find: findOrganisationStatsRoute,
      reset: resetOrganisationMonthlyStatRoute
    }
  },
  organisationMember: {
    promoteToOwner: promoteMemberToOwnerRoute,
    updateRole: updateOrganisationMemberRoleRoute,
    delete: deleteAdminOrganisationMemberRoute
  },
  claims: {
    find: findSubscriptionClaimsRoute,
    create: createSubscriptionClaimRoute,
    update: updateSubscriptionClaimRoute,
    delete: deleteSubscriptionClaimRoute
  },
  stripe: {
    createCustomer: createStripeCustomerRoute
  },
  license: {
    resync: resyncLicenseRoute
  },
  user: {
    get: getUserRoute,
    create: createUserRoute,
    update: updateUserRoute,
    delete: deleteUserRoute,
    enable: enableUserRoute,
    disable: disableUserRoute,
    resetTwoFactor: resetTwoFactorRoute,
    findTeams: findUserTeamsRoute
  },
  document: {
    find: findDocumentsRoute,
    findUnsealed: findUnsealedDocumentsRoute,
    delete: deleteDocumentRoute,
    reseal: resealDocumentRoute,
    findJobs: findDocumentJobsRoute,
    findAuditLogs: findDocumentAuditLogsRoute,
    downloadAuditLogs: downloadDocumentAuditLogsRoute
  },
  recipient: {
    update: updateRecipientRoute
  },
  emailDomain: {
    find: findEmailDomainsRoute,
    get: getEmailDomainRoute,
    reregister: reregisterEmailDomainRoute
  },
  emailTransport: {
    find: findEmailTransportsRoute,
    create: createEmailTransportRoute,
    update: updateEmailTransportRoute,
    delete: deleteEmailTransportRoute,
    sendTest: sendTestEmailTransportRoute
  },
  team: {
    get: getAdminTeamRoute
  },
  teamMember: {
    delete: deleteAdminTeamMemberRoute
  },
  updateSiteSetting: updateSiteSettingRoute
});

export { adminRouter };
//# sourceMappingURL=router.js.map
