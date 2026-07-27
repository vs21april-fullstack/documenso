import { z } from 'zod';

const EmailTransportTypeSchema = z.enum(['SMTP_AUTH', 'SMTP_API', 'RESEND', 'MAILCHANNELS']);

export { EmailTransportTypeSchema };
//# sourceMappingURL=EmailTransportTypeSchema.js.map
