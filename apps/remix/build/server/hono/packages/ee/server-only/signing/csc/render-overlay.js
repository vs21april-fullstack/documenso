import { PDF, ops, PdfArray, PdfDict, PdfNumber, PdfName, AnnotationFlags } from '@libpdf/core';
import { AppError, AppErrorCode } from '../../../../lib/errors/app-error.js';
import { insertFieldInPDFV2 } from '../../../../lib/server-only/pdf/insert-field-in-pdf-v2.js';

/**
 * Render `fields` into the pre-allocated `/Stamp` annotation named `stampName`
 * on `pageNumber`. Mutates `pdfDoc` in place.
 *
 * Throws when the named stamp can't be located — every call site must have
 * materialised the stamp first via `materializeTspAnchorsForEnvelope`.
 */
const renderRecipientOverlay = async ({
  pdfDoc,
  stampName,
  pageNumber,
  fields
}) => {
  const page = pdfDoc.getPage(pageNumber - 1);
  if (!page) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: `Page ${pageNumber} not found on PDF.`
    });
  }
  const stamp = page.getStampAnnotations().find(annotation => annotation.stampName === stampName);
  if (!stamp) {
    throw new AppError(AppErrorCode.NOT_FOUND, {
      message: `TSP stamp ${stampName} not found on page ${pageNumber}.`
    });
  }
  const overlayBytes = await insertFieldInPDFV2({
    pageWidth: page.width,
    pageHeight: page.height,
    fields
  });
  const overlayDoc = await PDF.load(overlayBytes);
  const embedded = await pdfDoc.embedPage(overlayDoc, 0);
  // Bind the embedded page under a local XObject name in the appearance's
  // own /Resources. Appearance streams are scoped — they can't see the
  // parent page's resource dict.
  const xobjectName = 'X0';
  // Mirror `PDFPage.drawPage`'s no-rotation, no-scale branch:
  //   translateX = x - embedded.box.x * scaleX   (x = 0, scaleX = 1)
  //   translateY = y - embedded.box.y * scaleY   (y = 0, scaleY = 1)
  //   concatMatrix(scaleX, 0, 0, scaleY, translateX, translateY)
  // Identity matrix when the overlay PDF has an origin-aligned MediaBox;
  // a translate-only shift otherwise. No-op cost is negligible.
  const operators = [ops.pushGraphicsState(), ops.concatMatrix(1, 0, 0, 1, -embedded.box.x, -embedded.box.y), ops.paintXObject(xobjectName), ops.popGraphicsState()];
  const contentBytes = serializeOperators(operators);
  const appearanceRef = pdfDoc.createStream({
    Type: PdfName.of('XObject'),
    Subtype: PdfName.of('Form'),
    FormType: PdfNumber.of(1),
    BBox: new PdfArray([PdfNumber.of(0), PdfNumber.of(0), PdfNumber.of(page.width), PdfNumber.of(page.height)]),
    Resources: PdfDict.of({
      XObject: PdfDict.of({
        [xobjectName]: embedded.ref
      })
    })
  }, contentBytes);
  // Direct dict write — bypasses `PDFAnnotation.setNormalAppearance`, which
  // (a) re-registers the stream and (b) has a no-op branch when `/AP` is
  // absent on the annotation. See `node_modules/@libpdf/core/dist/index.mjs:
  // 4347-4357`. The PDF reader and libpdf's `getAppearance` (index.mjs:4337)
  // both follow refs transparently, so `/AP -> { N: <ref> }` is valid.
  stamp.dict.set('AP', PdfDict.of({
    N: appearanceRef
  }));
  stamp.setFlag(AnnotationFlags.Print, true);
  stamp.setFlag(AnnotationFlags.ReadOnly, true);
  stamp.setFlag(AnnotationFlags.Locked, true);
  stamp.setFlag(AnnotationFlags.LockedContents, true);
};
/**
 * Serialize a content-stream operator sequence into a single byte buffer,
 * newline-separated. Mirrors libpdf's internal `serializeOperators` (not
 * exported from `@libpdf/core`); each `Operator.toBytes()` returns one
 * operator's `operand1 operand2 ... op` slice.
 */
const serializeOperators = operators => {
  if (operators.length === 0) {
    return new Uint8Array(0);
  }
  const chunks = operators.map(operator => operator.toBytes());
  let totalLength = 0;
  for (const chunk of chunks) {
    totalLength += chunk.length + 1; // +1 for trailing newline
  }
  const out = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
    out[offset] = 0x0a;
    offset += 1;
  }
  return out;
};

export { renderRecipientOverlay };
//# sourceMappingURL=render-overlay.js.map
