import { DOCUMENT_AUDIT_LOG_TYPE } from '../../types/document-audit-logs.js';
import { getFileServerSide } from '../../universal/upload/get-file.server.js';
import { putPdfFileServerSide } from '../../universal/upload/put-file.server.js';
import { createDocumentAuditLogData } from '../../utils/document-audit-logs.js';
import { prisma as prismaWithReplicas } from '../../../prisma/index.js';
import { PDF } from '@libpdf/core';
import { EnvelopeType } from '@prisma/client';
import { AppError, AppErrorCode } from '../../errors/app-error.js';
import { mapFieldToLegacyField } from '../../utils/fields.js';
import { canRecipientFieldsBeModified } from '../../utils/recipients.js';
import { assertEnvelopeMutable } from '../envelope/assert-envelope-mutable.js';
import { getEnvelopeWhereInput } from '../envelope/get-envelope-by-id.js';
import { whiteoutRegions } from '../pdf/auto-place-fields.js';

const isPlaceholderPosition = position => {
  return 'placeholder' in position;
};
const createEnvelopeFields = async ({
  userId,
  teamId,
  id,
  fields,
  requestMetadata
}) => {
  const {
    envelopeWhereInput
  } = await getEnvelopeWhereInput({
    id,
    type: null,
    // Null to allow any type of envelope.
    userId,
    teamId
  });
  const envelope = await prismaWithReplicas.envelope.findFirst({
    where: envelopeWhereInput,
    include: {
      recipients: true,
      fields: true,
      envelopeItems: {
        include: {
          documentData: true
        }
      }
    }
  });
  if (!envelope) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope not found'
    });
  }
  assertEnvelopeMutable(envelope);
  if (envelope.type === EnvelopeType.DOCUMENT && envelope.completedAt) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Envelope already complete'
    });
  }
  const firstEnvelopeItem = envelope.envelopeItems[0];
  if (!firstEnvelopeItem) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: 'Envelope item not found'
    });
  }
  const hasPlaceholderFields = fields.some(field => isPlaceholderPosition(field));
  /*
    Cache of loaded PDF documents keyed by envelope item ID.
    Only loaded when at least one field uses placeholder positioning.
    We keep the full PDF objects so we can both read text and draw white boxes
    over resolved placeholders before saving back.
  */
  const pdfCache = new Map();
  if (hasPlaceholderFields) {
    for (const item of envelope.envelopeItems) {
      const bytes = await getFileServerSide(item.documentData);
      const pdfDoc = await PDF.load(new Uint8Array(bytes));
      pdfCache.set(item.id, pdfDoc);
    }
  }
  /*
    Collect placeholder bounding boxes that need to be whited out, grouped by
    envelope item ID. Populated during field resolution below.
  */
  const placeholderWhiteouts = new Map();
  // Field validation and placeholder resolution.
  const validatedFields = fields.flatMap(field => {
    const recipient = envelope.recipients.find(recipient => recipient.id === field.recipientId);
    // The item to attach the fields to MUST belong to the document.
    if (field.envelopeItemId && !envelope.envelopeItems.find(envelopeItem => envelopeItem.id === field.envelopeItemId)) {
      throw new AppError(AppErrorCode.INVALID_REQUEST, {
        message: 'Item to attach fields to must belong to the document'
      });
    }
    // Each field MUST have a recipient associated with it.
    if (!recipient) {
      throw new AppError(AppErrorCode.INVALID_REQUEST, {
        message: `Recipient ${field.recipientId} not found`
      });
    }
    // Check whether the recipient associated with the field can have new fields created.
    if (!canRecipientFieldsBeModified(recipient, envelope.fields)) {
      throw new AppError(AppErrorCode.INVALID_REQUEST, {
        message: 'Recipient type cannot have fields, or they have already interacted with the document.'
      });
    }
    const envelopeItemId = field.envelopeItemId || firstEnvelopeItem.id;
    /*
      Resolve field position(s). Placeholder fields are resolved by searching the
      PDF text for the placeholder string and using its bounding box.
      When matchAll is true, all occurrences produce fields.
    */
    if (isPlaceholderPosition(field)) {
      const pdfDoc = pdfCache.get(envelopeItemId);
      if (!pdfDoc) {
        throw new AppError(AppErrorCode.NOT_FOUND, {
          message: `Could not load PDF for envelope item ${envelopeItemId}`
        });
      }
      const matches = pdfDoc.findText(field.placeholder);
      if (matches.length === 0) {
        throw new AppError(AppErrorCode.INVALID_BODY, {
          message: `Placeholder "${field.placeholder}" not found in PDF`
        });
      }
      const matchesToProcess = field.matchAll ? matches : [matches[0]];
      const pages = pdfDoc.getPages();
      return matchesToProcess.map(match => {
        const page = pages[match.pageIndex];
        /*
          Record this placeholder's bounding box for whiteout. The bbox is in
          the original PDF coordinate system (points, bottom-left origin).
        */
        if (!placeholderWhiteouts.has(envelopeItemId)) {
          placeholderWhiteouts.set(envelopeItemId, []);
        }
        placeholderWhiteouts.get(envelopeItemId).push({
          pageIndex: match.pageIndex,
          bbox: match.bbox
        });
        /*
          Convert point-based coordinates (bottom-left origin) to percentage-based
          coordinates (top-left origin) matching the system's field coordinate format.
        */
        const topLeftY = page.height - match.bbox.y - match.bbox.height;
        const widthPercent = field.width ?? match.bbox.width / page.width * 100;
        const heightPercent = field.height ?? match.bbox.height / page.height * 100;
        return {
          type: field.type,
          fieldMeta: field.fieldMeta,
          recipientId: field.recipientId,
          envelopeItemId,
          recipientEmail: recipient.email,
          page: match.pageIndex + 1,
          positionX: match.bbox.x / page.width * 100,
          positionY: topLeftY / page.height * 100,
          width: widthPercent,
          height: heightPercent
        };
      });
    }
    return {
      type: field.type,
      fieldMeta: field.fieldMeta,
      recipientId: field.recipientId,
      envelopeItemId,
      recipientEmail: recipient.email,
      page: field.page,
      positionX: field.positionX,
      positionY: field.positionY,
      width: field.width,
      height: field.height
    };
  });
  const createdFields = await prismaWithReplicas.$transaction(async tx => {
    await assertEnvelopeMutable(envelope, tx);
    const newlyCreatedFields = await Promise.all(validatedFields.map(field => tx.field.create({
      data: {
        type: field.type,
        page: field.page,
        positionX: field.positionX,
        positionY: field.positionY,
        width: field.width,
        height: field.height,
        customText: '',
        inserted: false,
        fieldMeta: field.fieldMeta,
        envelopeId: envelope.id,
        envelopeItemId: field.envelopeItemId,
        recipientId: field.recipientId
      }
    })));
    // Handle field created audit log.
    if (envelope.type === EnvelopeType.DOCUMENT) {
      await tx.documentAuditLog.createMany({
        data: newlyCreatedFields.map(createdField => {
          const recipient = validatedFields.find(field => field.recipientId === createdField.recipientId);
          return createDocumentAuditLogData({
            type: DOCUMENT_AUDIT_LOG_TYPE.FIELD_CREATED,
            envelopeId: envelope.id,
            metadata: requestMetadata,
            data: {
              fieldId: createdField.secondaryId,
              fieldRecipientEmail: recipient?.recipientEmail || '',
              fieldRecipientId: createdField.recipientId,
              fieldType: createdField.type
            }
          });
        })
      });
    }
    return newlyCreatedFields;
  });
  /*
    Draw white rectangles over each resolved placeholder in the PDF to hide the
    placeholder text, then persist the modified PDFs back to document storage.
  */
  for (const [envelopeItemId, whiteouts] of placeholderWhiteouts) {
    const pdfDoc = pdfCache.get(envelopeItemId);
    if (!pdfDoc) {
      continue;
    }
    whiteoutRegions(pdfDoc, whiteouts);
    const modifiedPdfBytes = await pdfDoc.save();
    const envelopeItem = envelope.envelopeItems.find(item => item.id === envelopeItemId);
    if (!envelopeItem) {
      continue;
    }
    const {
      documentData: newDocumentData
    } = await putPdfFileServerSide({
      name: 'document.pdf',
      type: 'application/pdf',
      arrayBuffer: async () => Promise.resolve(Buffer.from(modifiedPdfBytes))
    });
    await prismaWithReplicas.envelopeItem.update({
      where: {
        id: envelopeItemId
      },
      data: {
        documentDataId: newDocumentData.id
      }
    });
  }
  return {
    fields: createdFields.map(field => mapFieldToLegacyField(field, envelope))
  };
};

export { createEnvelopeFields };
//# sourceMappingURL=create-envelope-fields.js.map
