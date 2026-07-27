import * as fs from 'node:fs';
import { env } from '../../lib/utils/env.js';
import { P12Signer } from '@libpdf/core';

const loadP12 = () => {
  const localFileContents = env('NEXT_PRIVATE_SIGNING_LOCAL_FILE_CONTENTS');
  if (localFileContents) {
    return Buffer.from(localFileContents, 'base64');
  }
  const localFilePath = env('NEXT_PRIVATE_SIGNING_LOCAL_FILE_PATH');
  if (localFilePath) {
    return fs.readFileSync(localFilePath);
  }
  if (env('NODE_ENV') !== 'production') {
    return fs.readFileSync('./example/cert.p12');
  }
  throw new Error('No certificate found for local signing');
};
const createLocalSigner = async () => {
  const p12 = loadP12();
  return await P12Signer.create(p12, env('NEXT_PRIVATE_SIGNING_PASSPHRASE') || '', {
    buildChain: true
  });
};

export { createLocalSigner };
//# sourceMappingURL=local.js.map
