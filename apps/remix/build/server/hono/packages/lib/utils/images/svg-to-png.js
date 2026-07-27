import sharp from 'sharp';

const svgToPng = async svg => {
  return await sharp(Buffer.from(svg)).toFormat('png').toBuffer();
};

export { svgToPng };
//# sourceMappingURL=svg-to-png.js.map
