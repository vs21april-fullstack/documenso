import { stripe } from '../../../lib/server-only/stripe/index.js';

const getInvoices = async ({
  customerId
}) => {
  return await stripe.invoices.list({
    customer: customerId
  });
};

export { getInvoices };
//# sourceMappingURL=get-invoices.js.map
