import { createOrGetShareLink } from '../../../lib/server-only/share/create-or-get-share-link.js';
import { procedure } from '../trpc.js';
import { ZShareDocumentRequestSchema, ZShareDocumentResponseSchema } from './share-document.types.js';

// Note: This is an unauthenticated route.
const shareDocumentRoute = procedure.input(ZShareDocumentRequestSchema).output(ZShareDocumentResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    documentId,
    token
  } = input;
  ctx.logger.info({
    input: {
      documentId
    }
  });
  if (token) {
    return await createOrGetShareLink({
      documentId,
      token
    });
  }
  if (!ctx.user?.id) {
    throw new Error('You must either provide a token or be logged in to create a sharing link.');
  }
  return await createOrGetShareLink({
    documentId,
    userId: ctx.user.id
  });
});

export { shareDocumentRoute };
//# sourceMappingURL=share-document.js.map
