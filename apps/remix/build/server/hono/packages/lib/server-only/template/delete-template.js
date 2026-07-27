import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType, WebhookTriggerEvents } from '@prisma/client';
import { ZWebhookDocumentSchema, mapEnvelopeToWebhookDocumentPayload } from '../../types/webhook-payload.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';
import { triggerWebhook } from '../webhooks/trigger/trigger-webhook.js';

const deleteTemplate = async ({
  id,
  userId,
  teamId
}) => {
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id,
    type: EnvelopeType.TEMPLATE,
    userId,
    teamId
  });
  const templateToDelete = await prismaWithReplicas.envelope.findUniqueOrThrow({
    where: envelopeWhereInput,
    include: {
      documentMeta: true,
      recipients: true
    }
  });
  const deletedTemplate = await prismaWithReplicas.envelope.delete({
    where: envelopeWhereInput
  });
  await triggerWebhook({
    event: WebhookTriggerEvents.TEMPLATE_DELETED,
    data: ZWebhookDocumentSchema.parse(mapEnvelopeToWebhookDocumentPayload(templateToDelete)),
    userId,
    teamId
  });
  return deletedTemplate;
};

export { deleteTemplate };
//# sourceMappingURL=delete-template.js.map
