import { createCustomer } from '../../../ee/server-only/stripe/create-customer.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { adminProcedure } from '../trpc.js';
import { ZCreateStripeCustomerRequestSchema, ZCreateStripeCustomerResponseSchema } from './create-stripe-customer.types.js';

const createStripeCustomerRoute = adminProcedure.input(ZCreateStripeCustomerRequestSchema).output(ZCreateStripeCustomerResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    organisationId
  } = input;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  const organisation = await prismaWithReplicas.organisation.findUnique({
    where: {
      id: organisationId
    },
    include: {
      owner: {
        select: {
          email: true,
          name: true
        }
      }
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.NOT_FOUND);
  }
  // Create Stripe customer outside a transaction to avoid holding a
  // connection open during the external API call.
  const stripeCustomer = await createCustomer({
    name: organisation.name,
    email: organisation.owner.email
  });
  await prismaWithReplicas.organisation.update({
    where: {
      id: organisationId
    },
    data: {
      customerId: stripeCustomer.id
    }
  });
});

export { createStripeCustomerRoute };
//# sourceMappingURL=create-stripe-customer.js.map
