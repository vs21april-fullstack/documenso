import { z } from 'zod';

const downloadDocumentMeta = {
  openapi: {
    method: 'GET',
    path: '/document/{documentId}/download',
    summary: 'Download document',
    tags: ['Document'],
    responseHeaders: z.object({
      'Content-Type': z.literal('application/pdf')
    })
  }
};
const ZDownloadDocumentRequestSchema = z.object({
  documentId: z.number().describe('The ID of the document to download.'),
  version: z.enum(['original', 'signed']).describe('The version of the document to download. "signed" returns the completed document with signatures, "original" returns the original uploaded document.').default('signed')
});
const ZDownloadDocumentResponseSchema = z.instanceof(Uint8Array);

export { ZDownloadDocumentRequestSchema, ZDownloadDocumentResponseSchema, downloadDocumentMeta };
//# sourceMappingURL=download-document.types.js.map
