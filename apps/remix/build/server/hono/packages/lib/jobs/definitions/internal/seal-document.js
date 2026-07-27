import { z } from 'zod';
import { ZRequestMetadataSchema } from '../../../universal/extract-request-metadata.js';

const SEAL_DOCUMENT_JOB_DEFINITION_ID = 'internal.seal-document';
const SEAL_DOCUMENT_JOB_DEFINITION_SCHEMA = z.object({
  documentId: z.number(),
  sendEmail: z.boolean().optional(),
  isResealing: z.boolean().optional(),
  requestMetadata: ZRequestMetadataSchema.optional()
});
const SEAL_DOCUMENT_JOB_DEFINITION = {
  id: SEAL_DOCUMENT_JOB_DEFINITION_ID,
  name: 'Seal Document',
  version: '1.0.0',
  optimizeParallelism: true,
  trigger: {
    name: SEAL_DOCUMENT_JOB_DEFINITION_ID,
    schema: SEAL_DOCUMENT_JOB_DEFINITION_SCHEMA
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./seal-document.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEAL_DOCUMENT_JOB_DEFINITION };
//# sourceMappingURL=seal-document.js.map
