import sharp from 'sharp';

const optimiseAvatar = async bytes => {
  return await sharp(Buffer.from(bytes, 'base64')).resize(512, 512).toFormat('jpeg', {
    quality: 75
  }).toBuffer();
};

export { optimiseAvatar };
//# sourceMappingURL=avatar.js.map
