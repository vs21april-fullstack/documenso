import { getMultipleEnvelopeWhereInput } from '../../../lib/server-only/envelope/get-envelopes-by-ids.js';
import { mapSecondaryIdToTemplateId } from '../../../lib/utils/envelope.js';
import { mapFieldToLegacyField } from '../../../lib/utils/fields.js';
import { mapRecipientToLegacyRecipient } from '../../../lib/utils/recipients.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { EnvelopeType } from '@prisma/client';
import { authenticatedProcedure } from '../trpc.js';
import { getTemplatesByIdsMeta, ZGetTemplatesByIdsRequestSchema, ZGetTemplatesByIdsResponseSchema } from './get-templates-by-ids.types.js';

const getTemplatesByIdsRoute = authenticatedProcedure.meta(getTemplatesByIdsMeta).input(ZGetTemplatesByIdsRequestSchema).output(ZGetTemplatesByIdsResponseSchema).mutation(async ({
  input,
  ctx
}) => {
  const {
    teamId,
    user
  } = ctx;
  const {
    templateIds
  } = input;
  ctx.logger.info({
    input: {
      templateIds
    }
  });
  const {
    envelopeWhereInput
  } = await getMultipleEnvelopeWhereInput({
    ids: {
      type: 'templateId',
      ids: templateIds
    },
    userId: user.id,
    teamId,
    type: EnvelopeType.TEMPLATE
  });
  const envelopes = await prismaWithReplicas.envelope.findMany({
    where: envelopeWhereInput,
    include: {
      recipients: {
        orderBy: {
          id: 'asc'
        }
      },
      envelopeItems: {
        select: {
          documentData: true
        }
      },
      fields: true,
      team: {
        select: {
          id: true,
          url: true,
          name: true
        }
      },
      documentMeta: {
        select: {
          signingOrder: true,
          distributionMethod: true
        }
      },
      directLink: {
        select: {
          token: true,
          enabled: true
        }
      }
    }
  });
  const templates = envelopes.map(envelope => {
    const legacyTemplateId = mapSecondaryIdToTemplateId(envelope.secondaryId);
    const firstTemplateDocumentData = envelope.envelopeItems[0].documentData;
    return {
      id: legacyTemplateId,
      envelopeId: envelope.id,
      type: envelope.templateType,
      visibility: envelope.visibility,
      externalId: envelope.externalId,
      title: envelope.title,
      userId: envelope.userId,
      teamId: envelope.teamId,
      authOptions: envelope.authOptions,
      createdAt: envelope.createdAt,
      updatedAt: envelope.updatedAt,
      publicTitle: envelope.publicTitle,
      publicDescription: envelope.publicDescription,
      folderId: envelope.folderId,
      useLegacyFieldInsertion: envelope.useLegacyFieldInsertion,
      team: envelope.team ? {
        id: envelope.team.id,
        url: envelope.team.url,
        name: envelope.team.name
      } : null,
      fields: envelope.fields.map(field => mapFieldToLegacyField(field, envelope)),
      recipients: envelope.recipients.map(recipient => mapRecipientToLegacyRecipient(recipient, envelope)),
      templateMeta: envelope.documentMeta ? {
        signingOrder: envelope.documentMeta.signingOrder,
        distributionMethod: envelope.documentMeta.distributionMethod
      } : null,
      directLink: envelope.directLink ? {
        token: envelope.directLink.token,
        enabled: envelope.directLink.enabled
      } : null,
      templateDocumentDataId: firstTemplateDocumentData.id // Backwards compatibility.
    };
  });
  return {
    data: templates
  };
});

export { getTemplatesByIdsRoute };
//# sourceMappingURL=get-templates-by-ids.js.map
