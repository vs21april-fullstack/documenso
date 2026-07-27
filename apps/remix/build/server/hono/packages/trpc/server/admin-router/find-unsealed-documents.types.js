import { ZFindSearchParamsSchema, ZFindResultResponse } from '../../../lib/types/search-params.js';
import { z } from 'zod';

const ZFindUnsealedDocumentsRequestSchema = ZFindSearchParamsSchema.pick({
  page: true,
  perPage: true
}).extend({
  perPage: z.number().optional().default(20)
});
const ZAdminUnsealedDocumentSchema = z.object({
  id: z.string(),
  secondaryId: z.string(),
  title: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.number(),
  teamId: z.number(),
  ownerName: z.string().nullable(),
  ownerEmail: z.string(),
  lastSignedAt: z.date().nullable()
});
const ZFindUnsealedDocumentsResponseSchema = ZFindResultResponse.extend({
  data: ZAdminUnsealedDocumentSchema.array()
});

export { ZAdminUnsealedDocumentSchema, ZFindUnsealedDocumentsRequestSchema, ZFindUnsealedDocumentsResponseSchema };
//# sourceMappingURL=find-unsealed-documents.types.js.map
