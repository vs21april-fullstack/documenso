import { IS_BILLING_ENABLED } from '../../../lib/constants/app.js';
import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { createEmbeddingPresignToken } from '../../../lib/server-only/embedding-presign/create-embedding-presign-token.js';
import { getOrganisationClaimByTeamId } from '../../../lib/server-only/organisation/get-organisation-claims.js';
import { getApiTokenByToken } from '../../../lib/server-only/public-api/get-api-token-by-token.js';
import { procedure } from '../trpc.js';
import { createEmbeddingPresignTokenMeta, ZCreateEmbeddingPresignTokenRequestSchema, ZCreateEmbeddingPresignTokenResponseSchema } from './create-embedding-presign-token.types.js';

/**
 * Route to create embedding presign tokens.
 */
const createEmbeddingPresignTokenRoute = procedure.meta(createEmbeddingPresignTokenMeta).input(ZCreateEmbeddingPresignTokenRequestSchema).output(ZCreateEmbeddingPresignTokenResponseSchema).mutation(async ({
  input,
  ctx: {
    req
  }
}) => {
  try {
    const authorizationHeader = req.headers.get('authorization');
    const [apiToken] = (authorizationHeader || '').split('Bearer ').filter(s => s.length > 0);
    if (!apiToken) {
      throw new AppError(AppErrorCode.UNAUTHORIZED, {
        message: 'No API token provided'
      });
    }
    const {
      expiresIn,
      scope
    } = input;
    if (IS_BILLING_ENABLED()) {
      const token = await getApiTokenByToken({
        token: apiToken
      });
      if (!token.userId) {
        throw new AppError(AppErrorCode.UNAUTHORIZED, {
          message: 'Invalid API token'
        });
      }
      const organisationClaim = await getOrganisationClaimByTeamId({
        teamId: token.teamId
      });
      if (!organisationClaim.flags.embedAuthoring) {
        throw new AppError(AppErrorCode.UNAUTHORIZED, {
          message: 'Embedded Authoring is not included in your current plan. Please contact support.'
        });
      }
    }
    const presignToken = await createEmbeddingPresignToken({
      apiToken,
      expiresIn,
      scope
    });
    return {
      ...presignToken
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: 'Failed to create embedding presign token'
    });
  }
});

export { createEmbeddingPresignTokenRoute };
//# sourceMappingURL=create-embedding-presign-token.js.map
