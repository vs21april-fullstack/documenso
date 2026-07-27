import { z } from 'zod';

const ZLeaveOrganisationRequestSchema = z.object({
  organisationId: z.string()
});
const ZLeaveOrganisationResponseSchema = z.void();

export { ZLeaveOrganisationRequestSchema, ZLeaveOrganisationResponseSchema };
//# sourceMappingURL=leave-organisation.types.js.map
