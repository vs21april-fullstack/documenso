import { z } from 'zod';

const ADMIN_DELETE_ORGANISATION_JOB_DEFINITION_ID = 'internal.admin-delete-organisation';
const ADMIN_DELETE_ORGANISATION_JOB_DEFINITION_SCHEMA = z.object({
  organisationId: z.string(),
  /**
   * Whether to email the organisation owner notifying them of the deletion.
   */
  sendEmailToOwner: z.boolean(),
  /**
   * The id of the admin user who requested the deletion (for audit/logging).
   */
  requestedByUserId: z.number()
});
const ADMIN_DELETE_ORGANISATION_JOB_DEFINITION = {
  id: ADMIN_DELETE_ORGANISATION_JOB_DEFINITION_ID,
  name: 'Admin Delete Organisation',
  version: '1.0.0',
  trigger: {
    name: ADMIN_DELETE_ORGANISATION_JOB_DEFINITION_ID,
    schema: ADMIN_DELETE_ORGANISATION_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./admin-delete-organisation.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { ADMIN_DELETE_ORGANISATION_JOB_DEFINITION };
//# sourceMappingURL=admin-delete-organisation.js.map
