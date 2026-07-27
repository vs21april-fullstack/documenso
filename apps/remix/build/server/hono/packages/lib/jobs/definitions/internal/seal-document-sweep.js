import { z } from 'zod';

const SEAL_DOCUMENT_SWEEP_JOB_DEFINITION_ID = 'internal.seal-document-sweep';
const SEAL_DOCUMENT_SWEEP_JOB_DEFINITION_SCHEMA = z.object({});
const SEAL_DOCUMENT_SWEEP_JOB_DEFINITION = {
  id: SEAL_DOCUMENT_SWEEP_JOB_DEFINITION_ID,
  name: 'Seal Document Sweep',
  version: '1.0.0',
  trigger: {
    name: SEAL_DOCUMENT_SWEEP_JOB_DEFINITION_ID,
    schema: SEAL_DOCUMENT_SWEEP_JOB_DEFINITION_SCHEMA,
    cron: '*/15 * * * *' // Every 15 minutes.
  },
  handler: async ({
    payload,
    io
  }) => {
    const handler = await import('./seal-document-sweep.handler.js');
    await handler.run({
      payload,
      io
    });
  }
};

export { SEAL_DOCUMENT_SWEEP_JOB_DEFINITION };
//# sourceMappingURL=seal-document-sweep.js.map
