import { getRecipientSuggestions } from '../../../lib/server-only/recipient/get-recipient-suggestions.js';
import { authenticatedProcedure } from '../trpc.js';
import { ZGetRecipientSuggestionsRequestSchema, ZGetRecipientSuggestionsResponseSchema } from './find-recipient-suggestions.types.js';

/**
 * @private
 */
const findRecipientSuggestionsRoute = authenticatedProcedure.input(ZGetRecipientSuggestionsRequestSchema).output(ZGetRecipientSuggestionsResponseSchema).query(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    query
  } = input;
  ctx.logger.info({
    input: {
      query
    }
  });
  const suggestions = await getRecipientSuggestions({
    userId: user.id,
    teamId,
    query
  });
  return {
    results: suggestions
  };
});

export { findRecipientSuggestionsRoute };
//# sourceMappingURL=find-recipient-suggestions.js.map
