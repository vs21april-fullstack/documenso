import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { verifyEmbeddingPresignToken } from '../../../lib/server-only/embedding-presign/verify-embedding-presign-token.js';
import { procedure } from '../trpc.js';
import { verifyEmbeddingPresignTokenMeta, ZVerifyEmbeddingPresignTokenRequestSchema, ZVerifyEmbeddingPresignTokenResponseSchema } from './verify-embedding-presign-token.types.js';

/**
 * Public route.
 */
const verifyEmbeddingPresignTokenRoute = procedure.meta(verifyEmbeddingPresignTokenMeta).input(ZVerifyEmbeddingPresignTokenRequestSchema).output(ZVerifyEmbeddingPresignTokenResponseSchema).mutation(async ({
  input
}) => {
  try {
    const {
      token,
      scope
    } = input;
    const apiToken = await verifyEmbeddingPresignToken({
      token,
      scope
    }).catch(() => null);
    return {
      success: !!apiToken
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: 'Failed to verify embedding presign token'
    });
  }
});

export { verifyEmbeddingPresignTokenRoute };
//# sourceMappingURL=verify-embedding-presign-token.js.map
