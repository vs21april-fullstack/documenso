import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { stripe } from '../../../lib/server-only/stripe/index.js';

const createCheckoutSession = async ({
  customerId,
  priceId,
  returnUrl
}) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{
      price: priceId,
      quantity: 1
    }],
    success_url: `${returnUrl}?success=true`,
    cancel_url: `${returnUrl}?canceled=true`,
    billing_address_collection: 'required'
  });
  if (!session.url) {
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: 'Failed to create checkout session'
    });
  }
  return session.url;
};

export { createCheckoutSession };
//# sourceMappingURL=create-checkout-session.js.map
