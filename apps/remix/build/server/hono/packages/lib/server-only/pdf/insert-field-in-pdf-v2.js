import '../konva/skia-backend.js';
import Konva from 'konva';
import { renderField } from '../../universal/field-renderer/render-field.js';
import { ensureFontLibrary } from './helpers.js';

// sort-imports-ignore
const insertFieldInPDFV2 = async ({
  pageWidth,
  pageHeight,
  fields
}) => {
  ensureFontLibrary();
  let stage = new Konva.Stage({
    width: pageWidth,
    height: pageHeight
  });
  let layer = new Konva.Layer();
  // Render the fields onto the layer.
  for (const field of fields) {
    renderField({
      scale: 1,
      field: {
        renderId: field.id.toString(),
        ...field,
        width: Number(field.width),
        height: Number(field.height),
        positionX: Number(field.positionX),
        positionY: Number(field.positionY)
      },
      translations: null,
      pageLayer: layer,
      pageWidth,
      pageHeight,
      mode: 'export'
    });
  }
  stage.add(layer);
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const canvas = layer.canvas._canvas;
  // Embed the SVG into the PDF
  const pdf = await canvas.toBuffer('pdf');
  stage.destroy();
  layer.destroy();
  stage = null;
  layer = null;
  return pdf;
};

export { insertFieldInPDFV2 };
//# sourceMappingURL=insert-field-in-pdf-v2.js.map
