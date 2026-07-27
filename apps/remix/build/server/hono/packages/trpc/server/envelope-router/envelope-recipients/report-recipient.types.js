import { z } from 'zod';

const ZReportRecipientRequestSchema = z.object({
  token: z.string().min(1).describe('The recipient token from the email link used to report the sender.')
});
const ZReportRecipientResponseSchema = z.void();

export { ZReportRecipientRequestSchema, ZReportRecipientResponseSchema };
//# sourceMappingURL=report-recipient.types.js.map
