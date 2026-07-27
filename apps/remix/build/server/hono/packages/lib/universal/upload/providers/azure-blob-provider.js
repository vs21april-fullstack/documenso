import path from 'node:path';
import { StorageSharedKeyCredential, BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions } from '@azure/storage-blob';
import { env } from '../../../utils/env.js';
import slugify from '@sindresorhus/slugify';
import { ONE_HOUR } from '../../../constants/time.js';
import { alphaid } from '../../id.js';

class AzureBlobProvider {
  constructor() {
    const accountName = String(env('NEXT_PRIVATE_UPLOAD_AZURE_ACCOUNT_NAME'));
    const accountKey = String(env('NEXT_PRIVATE_UPLOAD_AZURE_ACCOUNT_KEY'));
    this.containerName = String(env('NEXT_PRIVATE_UPLOAD_AZURE_CONTAINER'));
    this.credential = new StorageSharedKeyCredential(accountName, accountKey);
    const endpointOverride = env('NEXT_PRIVATE_UPLOAD_AZURE_ENDPOINT');
    const url = endpointOverride ? `${endpointOverride}/${accountName}` : `https://${accountName}.blob.core.windows.net`;
    this.serviceClient = new BlobServiceClient(url, this.credential);
  }
  buildSasUrl(key, permissions) {
    const expiresOn = new Date(Date.now() + ONE_HOUR);
    const sasToken = generateBlobSASQueryParameters({
      containerName: this.containerName,
      blobName: key,
      permissions,
      expiresOn
    }, this.credential).toString();
    const blobClient = this.serviceClient.getContainerClient(this.containerName).getBlobClient(key);
    return `${blobClient.url}?${sasToken}`;
  }
  async getPresignPostUrl(fileName, _contentType, userId) {
    const {
      name,
      ext
    } = path.parse(fileName);
    let slugified = slugify(name);
    if (slugified.length === 0 || slugified.length > 100) {
      slugified = alphaid(8);
    }
    let key = `${alphaid(12)}/${slugified}${ext}`;
    if (userId) {
      key = `${userId}/${key}`;
    }
    const url = this.buildSasUrl(key, BlobSASPermissions.parse('cw'));
    return {
      key,
      url
    };
  }
  async getAbsolutePresignPostUrl(key) {
    const url = this.buildSasUrl(key, BlobSASPermissions.parse('cw'));
    return {
      key,
      url
    };
  }
  async getPresignGetUrl(key) {
    const url = this.buildSasUrl(key, BlobSASPermissions.parse('r'));
    return {
      key,
      url
    };
  }
  async uploadFile(input) {
    const {
      name,
      ext
    } = path.parse(input.name);
    const key = `${alphaid(12)}/${slugify(name)}${ext}`;
    const containerClient = this.serviceClient.getContainerClient(this.containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(key);
    const body = input.body instanceof ArrayBuffer ? Buffer.from(input.body) : input.body;
    await blockBlobClient.uploadData(body, {
      blobHTTPHeaders: {
        blobContentType: input.type
      }
    });
    return {
      key
    };
  }
  async deleteFile(key) {
    const containerClient = this.serviceClient.getContainerClient(this.containerName);
    await containerClient.deleteBlob(key);
  }
}

export { AzureBlobProvider };
//# sourceMappingURL=azure-blob-provider.js.map
