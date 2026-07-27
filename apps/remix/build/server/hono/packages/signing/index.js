import { NEXT_PRIVATE_USE_LEGACY_SIGNING_SUBFILTER, NEXT_PUBLIC_SIGNING_CONTACT_INFO, NEXT_PUBLIC_WEBAPP_URL } from '../lib/constants/app.js';
import { env } from '../lib/utils/env.js';
import { match } from 'ts-pattern';
import { getTimestampAuthority } from './helpers/tsa.js';
import { createGoogleCloudSigner } from './transports/google-cloud.js';
import { createLocalSigner } from './transports/local.js';

let signer = null;
const getSigner = async () => {
  if (signer) {
    return signer;
  }
  const transport = env('NEXT_PRIVATE_SIGNING_TRANSPORT') || 'local';
  // eslint-disable-next-line require-atomic-updates
  signer = await match(transport).with('local', async () => await createLocalSigner()).with('gcloud-hsm', async () => await createGoogleCloudSigner()).otherwise(() => {
    throw new Error(`Unsupported signing transport: ${transport}`);
  });
  return signer;
};
const signPdf = async ({
  pdf
}) => {
  const signer = await getSigner();
  const tsa = getTimestampAuthority();
  const {
    bytes
  } = await pdf.sign({
    signer,
    reason: 'Signed by Documenso',
    location: NEXT_PUBLIC_WEBAPP_URL(),
    contactInfo: NEXT_PUBLIC_SIGNING_CONTACT_INFO(),
    subFilter: NEXT_PRIVATE_USE_LEGACY_SIGNING_SUBFILTER() ? 'adbe.pkcs7.detached' : 'ETSI.CAdES.detached',
    timestampAuthority: tsa ?? undefined,
    longTermValidation: !!tsa,
    archivalTimestamp: !!tsa
  });
  return bytes;
};

export { signPdf };
//# sourceMappingURL=index.js.map
