import { stripe } from '../../../lib/server-only/stripe/index.js';

const createCustomer = async ({
  name,
  email
}) => {
  return await stripe.customers.create({
    name,
    email
  });
};

export { createCustomer };
//# sourceMappingURL=create-customer.js.map
