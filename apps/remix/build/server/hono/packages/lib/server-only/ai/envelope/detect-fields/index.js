import { prisma as prismaWithReplicas } from '../../../../../prisma/index.js';
import { loadImage, createCanvas } from '@napi-rs/canvas';
import { DocumentStatus, RecipientRole } from '@prisma/client';
import { generateObject } from 'ai';
import pMap from 'p-map';
import { AppError, AppErrorCode } from '../../../../errors/app-error.js';
import { getFileServerSide } from '../../../../universal/upload/get-file.server.js';
import { resizeImageToGeminiImage } from '../../../../utils/images/resize-image-to-gemini-image.js';
import { getEnvelopeById } from '../../../envelope/get-envelope-by-id.js';
import { createEnvelopeRecipients } from '../../../recipient/create-envelope-recipients.js';
import { vertex } from '../../google.js';
import { pdfToImages } from '../../pdf-to-images.js';
import { resolveRecipientFromKey, normalizeDetectedField, buildRecipientContextMessage } from './helpers.js';
import { SYSTEM_PROMPT } from './prompt.js';
import { ZSubmitDetectedFieldsInputSchema } from './schema.js';

const detectFieldsFromEnvelope = async ({
  context,
  envelopeId,
  userId,
  teamId,
  onProgress
}) => {
  const envelope = await getEnvelopeById({
    id: {
      type: 'envelopeId',
      id: envelopeId
    },
    userId,
    teamId,
    type: null
  });
  if (envelope.status !== DocumentStatus.DRAFT) {
    throw new AppError(AppErrorCode.INVALID_REQUEST, {
      message: 'Cannot detect fields for a non-draft envelope'
    });
  }
  // Extract recipients for field assignment context
  const recipients = envelope.recipients.map(r => ({
    id: r.id,
    name: r.name,
    email: r.email
  }));
  const allFields = [];
  for (const item of envelope.envelopeItems) {
    const existingFields = await prismaWithReplicas.field.findMany({
      where: {
        envelopeItemId: item.id
      }
    });
    const pdfBytes = await getFileServerSide(item.documentData);
    const fields = await detectFieldsFromPdf({
      pdfBytes,
      existingFields,
      recipients,
      context,
      onProgress
    });
    // Resolve recipientKey to actual recipient and add context
    const fieldsWithContext = await Promise.all(fields.map(async field => {
      const {
        recipientKey,
        ...fieldWithoutKey
      } = field;
      let resolvedRecipient = resolveRecipientFromKey(recipientKey, recipients);
      // If no recipients exist, create a blank recipient
      if (!resolvedRecipient) {
        const {
          recipients: createdRecipients
        } = await createEnvelopeRecipients({
          id: {
            id: envelope.id,
            type: 'envelopeId'
          },
          recipients: [{
            name: '',
            email: '',
            role: RecipientRole.SIGNER
          }],
          userId,
          teamId
        });
        resolvedRecipient = createdRecipients[0];
      }
      return {
        ...fieldWithoutKey,
        envelopeItemId: item.id,
        recipientId: resolvedRecipient.id
      };
    }));
    allFields.push(...fieldsWithContext);
  }
  return allFields;
};
const detectFieldsFromPdf = async ({
  pdfBytes,
  recipients = [],
  existingFields = [],
  context,
  onProgress
}) => {
  const pageImages = await pdfToImages(pdfBytes);
  if (pageImages.length === 0) {
    return [];
  }
  let pagesProcessed = 0;
  let totalFieldsDetected = 0;
  const results = await pMap(pageImages, async page => {
    // Get existing fields for this page
    const fieldsOnPage = existingFields.filter(f => f.page === page.pageNumber);
    // Mask existing fields on the image
    const maskedImage = await maskFieldsOnImage({
      image: page.image,
      width: page.width,
      height: page.height,
      fields: fieldsOnPage
    });
    const rawFields = await detectFieldsFromPage({
      image: maskedImage,
      pageNumber: page.pageNumber,
      recipients,
      context
    });
    // Convert bounding boxes to normalized positions and add page number
    const normalizedFields = rawFields.map(field => ({
      ...normalizeDetectedField(field),
      pageNumber: page.pageNumber
    }));
    // Update progress
    pagesProcessed += 1;
    totalFieldsDetected += normalizedFields.length;
    onProgress?.({
      pagesProcessed,
      totalPages: pageImages.length,
      fieldsDetected: totalFieldsDetected
    });
    return normalizedFields;
  }, {
    concurrency: 5
  });
  return results.flat();
};
/**
 * Draw black rectangles over existing fields to prevent re-detection.
 */
const maskFieldsOnImage = async ({
  image,
  width,
  height,
  fields
}) => {
  if (fields.length === 0) {
    return image;
  }
  const img = await loadImage(image);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  // Draw the original image
  ctx.drawImage(img, 0, 0, width, height);
  // Draw black rectangles over existing fields
  ctx.fillStyle = '#000000';
  for (const field of fields) {
    // field positions and width,height are on a 0-100 percentage scale
    const x = field.positionX.toNumber() / 100 * width;
    const y = field.positionY.toNumber() / 100 * height;
    const w = field.width.toNumber() / 100 * width;
    const h = field.height.toNumber() / 100 * height;
    ctx.fillRect(x, y, w, h);
  }
  return canvas.encode('jpeg');
};
const detectFieldsFromPage = async ({
  image,
  pageNumber,
  recipients,
  context
}) => {
  // Resize to 1000x1000 for consistent coordinate mapping
  const resizedImage = await resizeImageToGeminiImage({
    image
  });
  // Build messages array
  const messages = [{
    role: 'user',
    content: buildRecipientContextMessage(recipients)
  }];
  // Add user-provided context if available
  if (context?.trim()) {
    messages.push({
      role: 'user',
      content: `Additional context about recipients:\n${context.trim()}`
    });
  }
  // Add the page analysis request with image
  messages.push({
    role: 'user',
    content: [{
      type: 'text',
      text: `Analyze this document page (page ${pageNumber}) and detect all empty fillable fields. Submit the fields using the tool. Remember: only detect EMPTY fields, exclude labels from bounding boxes, use 0-1000 normalized coordinates, and IGNORE any solid black rectangles (those are existing fields).`
    }, {
      type: 'image',
      image: resizedImage
    }]
  });
  const result = await generateObject({
    model: vertex('gemini-3-flash-preview'),
    system: SYSTEM_PROMPT,
    schema: ZSubmitDetectedFieldsInputSchema,
    messages,
    temperature: 0.5,
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingLevel: 'low'
        }
      }
    }
  });
  if (!result.object) {
    return [];
  }
  return result.object.fields ?? [];
};

export { detectFieldsFromEnvelope, detectFieldsFromPdf };
//# sourceMappingURL=index.js.map
