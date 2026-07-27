import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { verifyEmbeddingPresignToken } from '../../../lib/server-only/embedding-presign/verify-embedding-presign-token.js';
import { createEnvelope } from '../../../lib/server-only/envelope/create-envelope.js';
import { mapSecondaryIdToTemplateId } from '../../../lib/utils/envelope.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { procedure } from '../trpc.js';
import { ZCreateEmbeddingTemplateRequestSchema, ZCreateEmbeddingTemplateResponseSchema } from './create-embedding-template.types.js';

// Todo: Envelopes - This only supports V1 documents/templates.
const createEmbeddingTemplateRoute = procedure.input(ZCreateEmbeddingTemplateRequestSchema).output(ZCreateEmbeddingTemplateResponseSchema).mutation(async ({
  input,
  ctx: {
    req,
    metadata
  }
}) => {
  try {
    const authorizationHeader = req.headers.get('authorization');
    const [presignToken] = (authorizationHeader || '').split('Bearer ').filter(s => s.length > 0);
    if (!presignToken) {
      throw new AppError(AppErrorCode.UNAUTHORIZED, {
        message: 'No presign token provided'
      });
    }
    const apiToken = await verifyEmbeddingPresignToken({
      token: presignToken
    });
    const {
      title,
      documentDataId,
      recipients,
      meta
    } = input;
    // First create the template
    const template = await createEnvelope({
      internalVersion: 1,
      userId: apiToken.userId,
      teamId: apiToken.teamId ?? undefined,
      data: {
        type: EnvelopeType.TEMPLATE,
        title,
        envelopeItems: [{
          documentDataId
        }]
      },
      meta,
      requestMetadata: metadata
    });
    const firstEnvelopeItem = template.envelopeItems[0];
    await Promise.all(recipients.map(async recipient => {
      const createdRecipient = await prismaWithReplicas.recipient.create({
        data: {
          envelopeId: template.id,
          email: recipient.email,
          name: recipient.name || '',
          role: recipient.role || 'SIGNER',
          token: `template-${template.id}-${recipient.email}`,
          signingOrder: recipient.signingOrder
        }
      });
      const fields = recipient.fields ?? [];
      const createdFields = await prismaWithReplicas.field.createMany({
        data: fields.map(field => ({
          envelopeId: template.id,
          envelopeItemId: firstEnvelopeItem.id,
          recipientId: createdRecipient.id,
          type: field.type,
          page: field.pageNumber,
          positionX: field.pageX,
          positionY: field.pageY,
          width: field.width,
          height: field.height,
          customText: '',
          inserted: false
        }))
      });
      return {
        ...createdRecipient,
        fields: createdFields
      };
    }));
    if (!template.id) {
      throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
        message: 'Failed to create template: missing template ID'
      });
    }
    return {
      templateId: mapSecondaryIdToTemplateId(template.secondaryId)
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: 'Failed to create template'
    });
  }
});

export { createEmbeddingTemplateRoute };
//# sourceMappingURL=create-embedding-template.js.map
