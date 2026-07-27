import { z } from 'zod';

const CANCEL_ORGANISATION_SUBSCRIPTION_JOB_DEFINITION_ID = 'internal.cancel-organisation-subscription';
const CANCEL_ORGANISATION_SUBSCRIPTION_JOB_DEFINITION_SCHEMA = z.object({
  /**
   * The Stripe subscription id (Subscription.planId in our schema).
   *
   * This must be captured before the local organisation row is deleted,
   * because the Subscription row cascades away when the organisation is
   * removed.
   */
  stripeSubscriptionId: z.string(),
  /**
   * The organisation id, for logging only. The organisation may no longer
   * exist by the time this job runs.
   */
  organisationId: z.string()
});
const CANCEL_ORGANISATION_SUBSCRIPTION_JOB_DEFINITION = {
  id: CANCEL_ORGANISATION_SUBSCRIPTION_JOB_DEFINITION_ID,
  name: 'Cancel Organisation Subscription',
  version: '1.0.0',
  trigger: {
    name: CANCEL_ORGANISATION_SUBSCRIPTION_JOB_DEFINITION_ID,
    schema: CANCEL_ORGANISATION_SUBSCRIPTION_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./cancel-organisation-subscription.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { CANCEL_ORGANISATION_SUBSCRIPTION_JOB_DEFINITION };
//# sourceMappingURL=cancel-organisation-subscription.js.map
