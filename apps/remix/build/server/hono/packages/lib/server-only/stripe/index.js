import Stripe from 'stripe';
export { default as Stripe } from 'stripe';
import { env } from '../../utils/env.js';

/// <reference types="./stripe.d.ts" />
const stripe = new Stripe(env('NEXT_PRIVATE_STRIPE_API_KEY') ?? '', {
  apiVersion: '2022-11-15',
  typescript: true
});

export { stripe };
//# sourceMappingURL=index.js.map
