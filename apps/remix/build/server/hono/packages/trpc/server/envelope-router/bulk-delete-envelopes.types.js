import { z } from 'zod';

// READ ME: IF YOU UNCOMMENT THIS THEN UNSKIP THE TEST IN api-access-envelope-bulk.spec.ts
// Keeping this as a private API for a little while until we're sure it's stable and the request/response schemas are finalized.
// export const bulkDeleteEnvelopesMeta: TrpcRouteMeta = {
//   openapi: {
//     method: 'POST',
//     path: '/envelope/bulk/delete',
//     summary: 'Bulk delete envelopes',
//     description: 'Delete multiple envelopes.',
//     tags: ['Envelopes'],
//   },
// };
const ZBulkDeleteEnvelopesRequestSchema = z.object({
  envelopeIds: z.array(z.string()).min(1).max(100).describe('The IDs of the envelopes to delete. The maximum number of envelopes you can delete at once is 100.')
});
const ZBulkDeleteEnvelopesResponseSchema = z.object({
  deletedCount: z.number(),
  failedIds: z.array(z.string())
});

export { ZBulkDeleteEnvelopesRequestSchema, ZBulkDeleteEnvelopesResponseSchema };
//# sourceMappingURL=bulk-delete-envelopes.types.js.map
