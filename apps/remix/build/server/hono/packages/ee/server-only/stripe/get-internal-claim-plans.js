import { stripe } from '../../../lib/server-only/stripe/index.js';
import { internalClaims, INTERNAL_CLAIM_ID } from '../../../lib/types/subscription.js';
import { toHumanPrice } from '../../../lib/universal/stripe/to-human-price.js';
import { clone } from 'remeda';

/**
 * Returns the main Documenso plans from Stripe.
 */
const getInternalClaimPlans = async () => {
  const {
    data: prices
  } = await stripe.prices.search({
    query: `active:'true' type:'recurring'`,
    expand: ['data.product'],
    limit: 100
  });
  const plans = clone(internalClaims);
  prices.forEach(price => {
    // We use `expand` to get the product, but it's not typed as part of the Price type.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const product = price.product;
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const productClaimId = product.metadata.claimId;
    const isVisibleInApp = price.metadata.visibleInApp === 'true';
    if (!productClaimId || !Object.values(INTERNAL_CLAIM_ID).includes(productClaimId)) {
      return;
    }
    let usdPrice = toHumanPrice(price.unit_amount ?? 0);
    if (price.recurring?.interval === 'month') {
      if (product.metadata['isSeatBased'] === 'true') {
        usdPrice = '50';
      }
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      plans[productClaimId].monthlyPrice = {
        ...price,
        isVisibleInApp,
        product,
        friendlyPrice: `$${usdPrice} ${price.currency.toUpperCase()}`.replace('.00', '')
      };
    }
    if (price.recurring?.interval === 'year') {
      if (product.metadata['isSeatBased'] === 'true') {
        usdPrice = '480';
      }
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      plans[productClaimId].yearlyPrice = {
        ...price,
        isVisibleInApp,
        product,
        friendlyPrice: `$${usdPrice} ${price.currency.toUpperCase()}`.replace('.00', '')
      };
    }
  });
  return plans;
};

export { getInternalClaimPlans };
//# sourceMappingURL=get-internal-claim-plans.js.map
