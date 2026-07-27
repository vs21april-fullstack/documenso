import pMap from 'p-map';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { Path2D, Image, Canvas } from 'skia-canvas';

// @ts-expect-error napi-rs/canvas satisfies the requirements
globalThis.Path2D = Path2D;
// @ts-expect-error napi-rs/canvas satisfies the requirements
globalThis.Image = Image;
class SkiaCanvasFactory {
  _createCanvas(width, height) {
    const canvas = new Canvas(width, height);
    canvas.gpu = false;
    return canvas;
  }
  create(width, height) {
    const canvas = this._createCanvas(width, height);
    return {
      canvas,
      context: canvas.getContext('2d')
    };
  }
  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }
  destroy(canvasAndContext) {
    if (canvasAndContext.canvas) {
      canvasAndContext.canvas.width = 0;
      canvasAndContext.canvas.height = 0;
    }
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}
const pdfToImages = async (pdfBytes, options = {}) => {
  const {
    scale = 2
  } = options;
  const task = await pdfjsLib.getDocument({
    data: pdfBytes,
    CanvasFactory: SkiaCanvasFactory
  });
  const pdf = await task.promise;
  const images = await pMap(Array.from({
    length: pdf.numPages
  }), async (_, index) => {
    const pageNumber = index + 1;
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({
      scale
    });
    const canvas = new Canvas(viewport.width, viewport.height);
    canvas.gpu = false;
    const canvasContext = canvas.getContext('2d');
    await page.render({
      // @ts-expect-error napi-rs/canvas satifies the requirements
      canvas,
      // @ts-expect-error napi-rs/canvas satifies the requirements
      canvasContext,
      viewport
    }).promise;
    const result = {
      pageNumber,
      image: await canvas.toBuffer('jpeg'),
      width: Math.floor(viewport.width),
      height: Math.floor(viewport.height),
      mimeType: 'image/jpeg'
    };
    void page.cleanup();
    return result;
  }, {
    concurrency: 10
  });
  void pdf.destroy().catch(e => console.error(e));
  void task.destroy().catch(e => console.error(e));
  return images;
};

export { pdfToImages };
//# sourceMappingURL=pdf-to-images.js.map
