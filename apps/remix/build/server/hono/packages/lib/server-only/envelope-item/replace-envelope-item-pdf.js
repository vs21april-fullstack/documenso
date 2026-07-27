import { normalizePdf } from '../pdf/normalize-pdf.js';
import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { putPdfFileServerSide } from '../../universal/upload/put-file.server.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { assertEnvelopeMutable } from '../envelope/assert-envelope-mutable.js';
import { extractPdfPlaceholders, convertPlaceholdersToFieldInputs } from '../pdf/auto-place-fields.js';
import { findRecipientByPlaceholder } from '../pdf/helpers.js';
import { insertFormValuesInPdf } from '../pdf/insert-form-values-in-pdf.js';

const UNSAFE_replaceEnvelopeItemPdf = async ({
  envelope,
  recipients,
  envelopeItemId,
  oldDocumentDataId,
  data,
  user,
  apiRequestMetadata
}) => {
  let buffer = Buffer.from(await data.file.arrayBuffer());
  if (envelope.formValues) {
    buffer = await insertFormValuesInPdf({
      pdf: buffer,
      formValues: envelope.formValues
    });
  }
  const normalized = await normalizePdf(buffer, {
    flattenForm: envelope.type !== 'TEMPLATE'
  });
  const {
    cleanedPdf,
    placeholders
  } = await extractPdfPlaceholders(normalized);
  // Upload the new PDF and get a new DocumentData record.
  const {
    documentData: newDocumentData,
    filePageCount
  } = await putPdfFileServerSide({
    name: data.file.name,
    type: 'application/pdf',
    arrayBuffer: async () => Promise.resolve(cleanedPdf)
  });
  let didFieldsChange = false;
  const updatedEnvelopeItem = await prismaWithReplicas.$transaction(async tx => {
    await assertEnvelopeMutable(envelope, tx);
    const updatedItem = await tx.envelopeItem.update({
      where: {
        id: envelopeItemId,
        envelopeId: envelope.id
      },
      data: {
        documentDataId: newDocumentData.id,
        title: data.title,
        order: data.order
      }
    });
    // Todo: Audit log if we're updating the title or order.
    // Delete fields that reference pages beyond the new PDF's page count.
    const outOfBoundsFields = await tx.field.findMany({
      where: {
        envelopeId: envelope.id,
        envelopeItemId,
        page: {
          gt: filePageCount
        }
      },
      select: {
        id: true
      }
    });
    const deletedFieldIds = outOfBoundsFields.map(f => f.id);
    if (deletedFieldIds.length > 0) {
      await tx.field.deleteMany({
        where: {
          id: {
            in: deletedFieldIds
          }
        }
      });
      didFieldsChange = true;
    }
    if (recipients.length > 0 && placeholders.length > 0) {
      const orderedRecipients = [...recipients].sort((a, b) => {
        const aOrder = a.signingOrder ?? Number.MAX_SAFE_INTEGER;
        const bOrder = b.signingOrder ?? Number.MAX_SAFE_INTEGER;
        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }
        return a.id - b.id;
      });
      const fieldsToCreate = convertPlaceholdersToFieldInputs(placeholders, (recipientPlaceholder, placeholder) => findRecipientByPlaceholder(recipientPlaceholder, placeholder, orderedRecipients, orderedRecipients), updatedItem.id);
      if (fieldsToCreate.length > 0) {
        await tx.field.createMany({
          data: fieldsToCreate.map(field => ({
            envelopeId: envelope.id,
            envelopeItemId: updatedItem.id,
            recipientId: field.recipientId,
            type: field.type,
            page: field.page,
            positionX: field.positionX,
            positionY: field.positionY,
            width: field.width,
            height: field.height,
            customText: '',
            inserted: false,
            fieldMeta: field.fieldMeta || undefined
          }))
        });
        didFieldsChange = true;
      }
    }
    await tx.documentAuditLog.create({
      data: createDocumentAuditLogData({
        type: DOCUMENT_AUDIT_LOG_TYPE.ENVELOPE_ITEM_PDF_REPLACED,
        envelopeId: envelope.id,
        data: {
          envelopeItemId: updatedItem.id,
          envelopeItemTitle: updatedItem.title
        },
        user: {
          name: user.name,
          email: user.email
        },
        requestMetadata: apiRequestMetadata.requestMetadata
      })
    });
    return updatedItem;
  });
  // Delete the old DocumentData (now orphaned).
  await prismaWithReplicas.documentData.delete({
    where: {
      id: oldDocumentDataId
    }
  });
  let fields;
  if (didFieldsChange) {
    try {
      fields = await prismaWithReplicas.field.findMany({
        where: {
          envelopeId: envelope.id
        }
      });
    } catch (err) {
      // Do nothing.
      console.error(err);
    }
  }
  return {
    updatedItem: updatedEnvelopeItem,
    fields
  };
};

export { UNSAFE_replaceEnvelopeItemPdf };
//# sourceMappingURL=replace-envelope-item-pdf.js.map
