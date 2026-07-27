import { prisma as prismaWithReplicas } from '../../../../packages/prisma/index.js';
import { sValidator } from '@hono/standard-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { handleEnvelopeItemPdfRequest } from './get-envelope-item-pdf.js';

const route = new Hono();
const ZGetEnvelopeItemByTokenParamsSchema = z.object({
  token: z.string().min(1),
  envelopeId: z.string().min(1),
  envelopeItemId: z.string().min(1),
  documentDataId: z.string().min(1),
  version: z.enum(['initial', 'current'])
});
/**
 * Returns a PDF file for an envelope item using a token.
 */
route.get('/token/:token/envelope/:envelopeId/envelopeItem/:envelopeItemId/dataId/:documentDataId/:version/item.pdf', sValidator('param', ZGetEnvelopeItemByTokenParamsSchema), async c => {
  const {
    token,
    envelopeId,
    envelopeItemId,
    documentDataId,
    version
  } = c.req.valid('param');
  if (!token) {
    return c.json({
      error: 'Not found'
    }, 404);
  }
  // Recipient token based query.
  let envelopeItemWhereQuery = {
    id: envelopeItemId,
    documentDataId,
    envelope: {
      id: envelopeId,
      recipients: {
        some: {
          token
        }
      }
    }
  };
  // QR token based query.
  if (token.startsWith('qr_')) {
    envelopeItemWhereQuery = {
      id: envelopeItemId,
      documentDataId,
      envelope: {
        id: envelopeId,
        qrToken: token
      }
    };
  }
  // Validate envelope access.
  const envelopeItem = await prismaWithReplicas.envelopeItem.findFirst({
    where: envelopeItemWhereQuery,
    include: {
      documentData: true
    }
  });
  if (!envelopeItem) {
    return c.json({
      error: 'Not found'
    }, 404);
  }
  return await handleEnvelopeItemPdfRequest({
    c,
    envelopeItem,
    version,
    cacheStrategy: 'private'
  });
});

export { route as default };
//# sourceMappingURL=get-envelope-item-pdf-by-token.js.map
