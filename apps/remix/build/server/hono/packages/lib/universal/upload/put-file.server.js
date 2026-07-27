import { env } from '../../utils/env.js';
import { PDF } from '@libpdf/core';
import { DocumentDataType } from '@prisma/client';
import { base64 } from '@scure/base';
import { match } from 'ts-pattern';
import { AppError } from '../../errors/app-error.js';
import { createDocumentData } from '../../server-only/document-data/create-document-data.js';
import { normalizePdf } from '../../server-only/pdf/normalize-pdf.js';
import { uploadS3File } from './server-actions.js';

/**
 * Uploads a document file to the appropriate storage location and creates
 * a document data record.
 */
const putPdfFileServerSide = async (file, initialData) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDF.load(new Uint8Array(arrayBuffer)).catch(e => {
    console.error(`PDF upload parse error: ${e.message}`);
    throw new AppError('INVALID_DOCUMENT_FILE');
  });
  if (pdf.isEncrypted) {
    throw new AppError('INVALID_DOCUMENT_FILE');
  }
  if (!file.name.endsWith('.pdf')) {
    file.name = `${file.name}.pdf`;
  }
  const {
    type,
    data
  } = await putFileServerSide(file);
  const createdData = await createDocumentData({
    type,
    data,
    initialData
  });
  return {
    documentData: createdData,
    filePageCount: pdf.getPageCount()
  };
};
/**
 * Uploads a pdf file and normalizes it.
 */
const putNormalizedPdfFileServerSide = async (file, options = {}) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const normalized = await normalizePdf(buffer, options);
  const fileName = file.name.endsWith('.pdf') ? file.name : `${file.name}.pdf`;
  const documentData = await putFileServerSide({
    name: fileName,
    type: 'application/pdf',
    arrayBuffer: async () => Promise.resolve(normalized)
  });
  return await createDocumentData({
    type: documentData.type,
    data: documentData.data
  });
};
/**
 * Uploads a file to the appropriate storage location.
 */
const putFileServerSide = async file => {
  const NEXT_PUBLIC_UPLOAD_TRANSPORT = env('NEXT_PUBLIC_UPLOAD_TRANSPORT');
  return await match(NEXT_PUBLIC_UPLOAD_TRANSPORT).with('s3', async () => putFileInObjectStorage(file)).with('azure-blob', async () => putFileInObjectStorage(file)).otherwise(async () => putFileInDatabase(file));
};
const putFileInDatabase = async file => {
  const contents = await file.arrayBuffer();
  const binaryData = new Uint8Array(contents);
  const asciiData = base64.encode(binaryData);
  return {
    type: DocumentDataType.BYTES_64,
    data: asciiData
  };
};
const putFileInObjectStorage = async file => {
  const buffer = await file.arrayBuffer();
  const blob = new Blob([buffer], {
    type: file.type
  });
  const newFile = new File([blob], file.name, {
    type: file.type
  });
  const {
    key
  } = await uploadS3File(newFile);
  return {
    type: DocumentDataType.S3_PATH,
    data: key
  };
};

export { putFileServerSide, putNormalizedPdfFileServerSide, putPdfFileServerSide };
//# sourceMappingURL=put-file.server.js.map
