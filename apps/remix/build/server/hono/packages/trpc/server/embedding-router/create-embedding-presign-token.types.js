import { z } from 'zod';

const createEmbeddingPresignTokenMeta = {
  openapi: {
    method: 'POST',
    path: '/embedding/create-presign-token',
    summary: 'Create embedding presign token',
    description: 'Creates a presign token for embedding operations with configurable expiration time',
    tags: ['Embedding']
  }
};
const ZCreateEmbeddingPresignTokenRequestSchema = z.object({
  expiresIn: z.number().min(0).max(10080).optional().default(60).describe('Expiration time in minutes (default: 60, max: 10,080)'),
  scope: z.string().optional().describe('Resource restriction. V1 embeds only support documentId:1, templateId:2. V2 embeds only support envelopeId:envelope_123')
});
const ZCreateEmbeddingPresignTokenResponseSchema = z.object({
  token: z.string(),
  expiresAt: z.date(),
  expiresIn: z.number().describe('Expiration time in seconds')
});

export { ZCreateEmbeddingPresignTokenRequestSchema, ZCreateEmbeddingPresignTokenResponseSchema, createEmbeddingPresignTokenMeta };
//# sourceMappingURL=create-embedding-presign-token.types.js.map
