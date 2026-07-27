import { z } from 'zod';

const ZGetInvoicesRequestSchema = z.object({
  organisationId: z.string().describe('The organisation to get the invoices for')
});

export { ZGetInvoicesRequestSchema };
//# sourceMappingURL=get-invoices.types.js.map
