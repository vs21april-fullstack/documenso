import { z } from 'zod';

/**
 * Required for empty responses since we currently can't 201 requests for our openapi setup.
 *
 * Without this it will throw an error in Speakeasy SDK when it tries to parse an empty response.
 */
const ZSuccessResponseSchema = z.object({
  success: z.boolean()
});
const ZGenericSuccessResponse = {
  success: true
};

export { ZGenericSuccessResponse, ZSuccessResponseSchema };
//# sourceMappingURL=schema.js.map
