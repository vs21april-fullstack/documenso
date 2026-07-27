import { stripe } from '../../../lib/server-only/stripe/index.js';

const getPortalSession = async ({
  customerId,
  returnUrl
}) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl
  });
  return session.url;
};

export { getPortalSession };
//# sourceMappingURL=get-portal-session.js.map
