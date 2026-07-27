import { getStorageProvider } from './providers/index.js';

const getPresignPostUrl = async (fileName, contentType, userId) => {
  return getStorageProvider().getPresignPostUrl(fileName, contentType, userId);
};
const getPresignGetUrl = async key => {
  return getStorageProvider().getPresignGetUrl(key);
};
/**
 * Uploads a file server-side. Name preserved for backward compatibility with
 * existing callers; underneath it delegates to the active storage provider.
 */
const uploadS3File = async file => {
  const buffer = await file.arrayBuffer();
  const {
    key
  } = await getStorageProvider().uploadFile({
    name: file.name,
    type: file.type,
    body: buffer
  });
  return {
    key
  };
};

export { getPresignGetUrl, getPresignPostUrl, uploadS3File };
//# sourceMappingURL=server-actions.js.map
