import { router } from '../trpc.js';
import { createEmbeddingDocumentRoute } from './create-embedding-document.js';
import { createEmbeddingEnvelopeRoute } from './create-embedding-envelope.js';
import { createEmbeddingPresignTokenRoute } from './create-embedding-presign-token.js';
import { createEmbeddingTemplateRoute } from './create-embedding-template.js';
import { getMultiSignDocumentRoute } from './get-multi-sign-document.js';
import { updateEmbeddingDocumentRoute } from './update-embedding-document.js';
import { updateEmbeddingEnvelopeRoute } from './update-embedding-envelope.js';
import { updateEmbeddingTemplateRoute } from './update-embedding-template.js';
import { verifyEmbeddingPresignTokenRoute } from './verify-embedding-presign-token.js';

const embeddingPresignRouter = router({
  createEmbeddingPresignToken: createEmbeddingPresignTokenRoute,
  verifyEmbeddingPresignToken: verifyEmbeddingPresignTokenRoute,
  createEmbeddingEnvelope: createEmbeddingEnvelopeRoute,
  createEmbeddingDocument: createEmbeddingDocumentRoute,
  createEmbeddingTemplate: createEmbeddingTemplateRoute,
  updateEmbeddingEnvelope: updateEmbeddingEnvelopeRoute,
  updateEmbeddingDocument: updateEmbeddingDocumentRoute,
  updateEmbeddingTemplate: updateEmbeddingTemplateRoute,
  // applyMultiSignSignature: applyMultiSignSignatureRoute,
  getMultiSignDocument: getMultiSignDocumentRoute
});

export { embeddingPresignRouter };
//# sourceMappingURL=_router.js.map
