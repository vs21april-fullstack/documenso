import { getInvoices } from '../../../ee/server-only/stripe/get-invoices.js';
import { IS_BILLING_ENABLED } from '../../../lib/constants/app.js';
import { ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP } from '../../../lib/constants/organisations.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { buildOrganisationWhereQuery } from '../../../lib/utils/organisations.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetInvoicesRequestSchema } from './get-invoices.types.js';

const getInvoicesRoute = authenticatedProcedure.input(ZGetInvoicesRequestSchema).query(async ({
  ctx,
  input
}) => {
  const {
    organisationId
  } = input;
  ctx.logger.info({
    input: {
      organisationId
    }
  });
  const userId = ctx.user.id;
  if (!IS_BILLING_ENABLED()) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Billing is not enabled'
    });
  }
  const organisation = await prismaWithReplicas.organisation.findFirst({
    where: buildOrganisationWhereQuery({
      organisationId,
      userId,
      roles: ORGANISATION_MEMBER_ROLE_PERMISSIONS_MAP['MANAGE_ORGANISATION']
    }),
    include: {
      subscription: true
    }
  });
  if (!organisation) {
    throw new AppError(AppErrorCode.UNAUTHORIZED, {
      message: 'You are not authorized to access this organisation'
    });
  }
  if (!organisation.customerId) {
    return null;
  }
  const invoices = await getInvoices({
    customerId: organisation.customerId
  });
  return invoices.data.map(invoice => ({
    id: invoice.id,
    status: invoice.status,
    created: invoice.created,
    currency: invoice.currency,
    total: invoice.total,
    hosted_invoice_url: invoice.hosted_invoice_url,
    invoice_pdf: invoice.invoice_pdf
  }));
});

export { getInvoicesRoute };
//# sourceMappingURL=get-invoices.js.map
