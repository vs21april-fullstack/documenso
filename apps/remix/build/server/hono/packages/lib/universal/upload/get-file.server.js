import { DocumentDataType } from '@prisma/client';
import { base64 } from '@scure/base';
import { match } from 'ts-pattern';
import { getPresignGetUrl } from './server-actions.js';

const getFileServerSide = async ({
  type,
  data
}) => {
  return await match(type).with(DocumentDataType.BYTES, () => getFileFromBytes(data)).with(DocumentDataType.BYTES_64, () => getFileFromBytes64(data)).with(DocumentDataType.S3_PATH, async () => getFileFromS3(data)).exhaustive();
};
const getFileFromBytes = data => {
  const encoder = new TextEncoder();
  const binaryData = encoder.encode(data);
  return binaryData;
};
const getFileFromBytes64 = data => {
  const binaryData = base64.decode(data);
  return binaryData;
};
const getFileFromS3 = async key => {
  const {
    url
  } = await getPresignGetUrl(key);
  const response = await fetch(url, {
    method: 'GET'
  });
  if (!response.ok) {
    throw new Error(`Failed to get file "${key}", failed with status code ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  const binaryData = new Uint8Array(buffer);
  return binaryData;
};

export { getFileServerSide };
//# sourceMappingURL=get-file.server.js.map
