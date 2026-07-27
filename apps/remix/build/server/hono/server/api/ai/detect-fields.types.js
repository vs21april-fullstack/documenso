import { ZConfidenceLevel, ZDetectableFieldType } from '../../../packages/lib/server-only/ai/envelope/detect-fields/schema.js';
import { z } from 'zod';

const ZDetectFieldsRequestSchema = z.object({
  envelopeId: z.string().min(1).describe('The ID of the envelope to detect fields from.'),
  teamId: z.number().describe('The ID of the team the envelope belongs to.'),
  context: z.string().optional().describe('Optional context about recipients to help map fields (e.g., "David is the Employee, Lucas is the Manager").')
});
// Schema for fields returned from streaming API (before recipient resolution)
z.object({
  type: ZDetectableFieldType,
  recipientKey: z.string(),
  positionX: z.number(),
  positionY: z.number(),
  width: z.number(),
  height: z.number(),
  confidence: ZConfidenceLevel,
  pageNumber: z.number()
});
// Schema for fields after recipient resolution
const ZNormalizedFieldWithContextSchema = z.object({
  type: ZDetectableFieldType,
  positionX: z.number(),
  positionY: z.number(),
  width: z.number(),
  height: z.number(),
  confidence: ZConfidenceLevel,
  pageNumber: z.number(),
  recipientId: z.number(),
  envelopeItemId: z.string()
});
z.object({
  fields: z.array(ZNormalizedFieldWithContextSchema)
});

export { ZDetectFieldsRequestSchema, ZNormalizedFieldWithContextSchema };
//# sourceMappingURL=detect-fields.types.js.map
