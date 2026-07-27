import { router } from '../trpc.js';
import { createOrganisationEmailRoute } from './create-organisation-email.js';
import { createOrganisationEmailDomainRoute } from './create-organisation-email-domain.js';
import { createSubscriptionRoute } from './create-subscription.js';
import { cscSignEnvelopeRoute } from './csc-sign-envelope.js';
import { declineLinkOrganisationAccountRoute } from './decline-link-organisation-account.js';
import { deleteOrganisationEmailRoute } from './delete-organisation-email.js';
import { deleteOrganisationEmailDomainRoute } from './delete-organisation-email-domain.js';
import { findOrganisationEmailDomainsRoute } from './find-organisation-email-domain.js';
import { findOrganisationEmailsRoute } from './find-organisation-emails.js';
import { getInvoicesRoute } from './get-invoices.js';
import { getOrganisationAuthenticationPortalRoute } from './get-organisation-authentication-portal.js';
import { getOrganisationEmailDomainRoute } from './get-organisation-email-domain.js';
import { getPlansRoute } from './get-plans.js';
import { getSubscriptionRoute } from './get-subscription.js';
import { linkOrganisationAccountRoute } from './link-organisation-account.js';
import { manageSubscriptionRoute } from './manage-subscription.js';
import { syncSubscriptionRoute } from './sync-subscription.js';
import { updateOrganisationAuthenticationPortalRoute } from './update-organisation-authentication-portal.js';
import { updateOrganisationEmailRoute } from './update-organisation-email.js';
import { verifyOrganisationEmailDomainRoute } from './verify-organisation-email-domain.js';

const enterpriseRouter = router({
  organisation: {
    email: {
      find: findOrganisationEmailsRoute,
      create: createOrganisationEmailRoute,
      update: updateOrganisationEmailRoute,
      delete: deleteOrganisationEmailRoute
    },
    emailDomain: {
      get: getOrganisationEmailDomainRoute,
      find: findOrganisationEmailDomainsRoute,
      create: createOrganisationEmailDomainRoute,
      delete: deleteOrganisationEmailDomainRoute,
      verify: verifyOrganisationEmailDomainRoute
    },
    authenticationPortal: {
      get: getOrganisationAuthenticationPortalRoute,
      update: updateOrganisationAuthenticationPortalRoute,
      linkAccount: linkOrganisationAccountRoute,
      declineLinkAccount: declineLinkOrganisationAccountRoute
    }
  },
  billing: {
    plans: {
      get: getPlansRoute
    },
    subscription: {
      get: getSubscriptionRoute,
      create: createSubscriptionRoute,
      manage: manageSubscriptionRoute,
      sync: syncSubscriptionRoute
    },
    invoices: {
      get: getInvoicesRoute
    }
  },
  csc: {
    signEnvelope: cscSignEnvelopeRoute
  }
});

export { enterpriseRouter };
//# sourceMappingURL=router.js.map
