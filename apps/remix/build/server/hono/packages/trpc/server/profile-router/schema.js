import { ZNameSchema } from '../../../lib/types/name.js';
import { z } from 'zod';

const ZFindUserSecurityAuditLogsSchema = z.object({
  page: z.number().optional(),
  perPage: z.number().optional()
});
const ZUpdateProfileMutationSchema = z.object({
  name: ZNameSchema,
  signature: z.string()
});
const ZSetProfileImageMutationSchema = z.object({
  bytes: z.string().nullish(),
  teamId: z.number().min(1).nullable(),
  organisationId: z.string().nullable()
});
const ZSubmitSupportTicketMutationSchema = z.object({
  organisationId: z.string(),
  teamId: z.string().min(1).nullish(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

export { ZFindUserSecurityAuditLogsSchema, ZSetProfileImageMutationSchema, ZSubmitSupportTicketMutationSchema, ZUpdateProfileMutationSchema };
//# sourceMappingURL=schema.js.map
