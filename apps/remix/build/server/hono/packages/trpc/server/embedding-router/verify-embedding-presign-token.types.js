import { z } from 'zod';

const verifyEmbeddingPresignTokenMeta = {
  openapi: {
    method: 'POST',
    path: '/embedding/verify-presign-token',
    summary: 'Verify embedding presign token',
    description: 'Verifies a presign token for embedding operations and returns the associated API token',
    tags: ['Embedding']
  }
};
const ZVerifyEmbeddingPresignTokenRequestSchema = z.object({
  token: z.string().min(1, {
    message: 'Token is required'
  }).describe('The presign token to verify'),
  scope: z.string().optional().describe('The scope to verify')
});
const ZVerifyEmbeddingPresignTokenResponseSchema = z.object({
  success: z.boolean()
});

export { ZVerifyEmbeddingPresignTokenRequestSchema, ZVerifyEmbeddingPresignTokenResponseSchema, verifyEmbeddingPresignTokenMeta };
//# sourceMappingURL=verify-embedding-presign-token.types.js.map
