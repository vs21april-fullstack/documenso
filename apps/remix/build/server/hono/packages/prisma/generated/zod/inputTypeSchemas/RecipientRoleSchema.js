import { z } from 'zod';

const RecipientRoleSchema = z.enum(['CC', 'SIGNER', 'VIEWER', 'APPROVER', 'ASSISTANT']);

export { RecipientRoleSchema };
//# sourceMappingURL=RecipientRoleSchema.js.map
