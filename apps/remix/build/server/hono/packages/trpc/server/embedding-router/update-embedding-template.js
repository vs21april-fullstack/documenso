import { AppError, AppErrorCode } from '../../../lib/errors/app-error.js';
import { verifyEmbeddingPresignToken } from '../../../lib/server-only/embedding-presign/verify-embedding-presign-token.js';
import { updateEnvelope } from '../../../lib/server-only/envelope/update-envelope.js';
import { setFieldsForTemplate } from '../../../lib/server-only/field/set-fields-for-template.js';
import { setTemplateRecipients } from '../../../lib/server-only/recipient/set-template-recipients.js';
import { procedure } from '../trpc.js';
import { ZUpdateEmbeddingTemplateRequestSchema, ZUpdateEmbeddingTemplateResponseSchema } from './update-embedding-template.types.js';

const updateEmbeddingTemplateRoute = procedure.input(ZUpdateEmbeddingTemplateRequestSchema).output(ZUpdateEmbeddingTemplateResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  ctx.logger.info({
    input: {
      templateId: input.templateId
    }
  });
  try {
    const authorizationHeader = ctx.req.headers.get('authorization');
    const [presignToken] = (authorizationHeader || '').split('Bearer ').filter(s => s.length > 0);
    if (!presignToken) {
      throw new AppError(AppErrorCode.UNAUTHORIZED, {
        message: 'No presign token provided'
      });
    }
    const apiToken = await verifyEmbeddingPresignToken({
      token: presignToken,
      scope: `templateId:${input.templateId}`
    });
    const {
      templateId,
      title,
      externalId,
      recipients,
      meta
    } = input;
    await updateEnvelope({
      id: {
        type: 'templateId',
        id: templateId
      },
      userId: apiToken.userId,
      teamId: apiToken.teamId,
      data: {
        title,
        externalId
      },
      meta,
      requestMetadata: ctx.metadata
    });
    const {
      recipients: updatedRecipients
    } = await setTemplateRecipients({
      userId: apiToken.userId,
      teamId: apiToken.teamId ?? undefined,
      id: {
        type: 'templateId',
        id: templateId
      },
      recipients: recipients.map(recipient => ({
        id: recipient.id,
        email: recipient.email,
        name: recipient.name ?? '',
        role: recipient.role ?? 'SIGNER',
        signingOrder: recipient.signingOrder
      }))
    });
    const fields = recipients.flatMap(recipient => {
      const recipientId = updatedRecipients.find(r => r.id === recipient.id)?.id;
      if (!recipientId) {
        throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
          message: 'Recipient not found'
        });
      }
      return (recipient.fields ?? []).map(field => ({
        ...field,
        recipientId
      }));
    });
    await setFieldsForTemplate({
      userId: apiToken.userId,
      teamId: apiToken.teamId ?? undefined,
      id: {
        type: 'templateId',
        id: templateId
      },
      fields: fields.map(field => ({
        ...field,
        pageWidth: field.width,
        pageHeight: field.height
      }))
    });
    return {
      templateId
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(AppErrorCode.UNKNOWN_ERROR, {
      message: 'Failed to update template'
    });
  }
});

export { updateEmbeddingTemplateRoute };
//# sourceMappingURL=update-embedding-template.js.map
