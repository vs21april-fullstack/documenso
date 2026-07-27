import { env } from '../../../utils/env.js';
import { AzureBlobProvider } from './azure-blob-provider.js';
import { S3Provider } from './s3-provider.js';

let cached = null;
const getStorageProvider = () => {
  if (cached) {
    return cached;
  }
  const transport = env('NEXT_PUBLIC_UPLOAD_TRANSPORT');
  switch (transport) {
    case 's3':
      cached = new S3Provider();
      return cached;
    case 'azure-blob':
      cached = new AzureBlobProvider();
      return cached;
    default:
      throw new Error(`Invalid object storage transport: "${transport}". Expected "s3" or "azure-blob".`);
  }
};

export { getStorageProvider };
//# sourceMappingURL=index.js.map
