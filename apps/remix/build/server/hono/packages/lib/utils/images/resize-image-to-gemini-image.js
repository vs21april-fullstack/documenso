import sharp from 'sharp';

const TARGET_SIZE = 1000;
/**
 * Resize image to 1000x1000 using fill strategy.
 * Scales to cover the target area and crops any overflow.
 */
const resizeImageToGeminiImage = async ({
  image,
  size = TARGET_SIZE
}) => {
  return await sharp(image).resize(size, size, {
    fit: 'fill'
  }).toBuffer();
};

export { TARGET_SIZE, resizeImageToGeminiImage };
//# sourceMappingURL=resize-image-to-gemini-image.js.map
