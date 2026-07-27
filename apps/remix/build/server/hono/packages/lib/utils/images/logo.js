import sharp from 'sharp';

/**
 * Validate and sanitise an uploaded branding logo. Re-encoding through `sharp`
 * proves the bytes are a real raster image and strips any embedded payloads.
 * Throws if the input cannot be parsed as an image.
 */
const optimiseBrandingLogo = async input => {
  return await sharp(input).resize(512, 512, {
    fit: 'inside',
    withoutEnlargement: true
  }).png({
    quality: 80
  }).toBuffer();
};

export { optimiseBrandingLogo };
//# sourceMappingURL=logo.js.map
