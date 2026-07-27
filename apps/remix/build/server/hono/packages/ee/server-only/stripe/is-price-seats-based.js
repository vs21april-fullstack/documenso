import { stripe } from '../../../lib/server-only/stripe/index.js';

const isPriceSeatsBased = async priceId => {
  const foundStripePrice = await stripe.prices.retrieve(priceId, {
    expand: ['product']
  });
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const product = foundStripePrice.product;
  return product.metadata.isSeatBased === 'true';
};

export { isPriceSeatsBased };
//# sourceMappingURL=is-price-seats-based.js.map
